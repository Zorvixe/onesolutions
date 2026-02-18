// validateSqlTest.js
const validateSqlTest = (testCase, userCode, executionResult, questionData) => {
  try {
    console.log("Validating test case:", testCase.id, "type:", testCase.type);
    console.log("User code:", userCode);
    console.log("Execution result:", executionResult);
    console.log("Question data:", questionData);

    // Parse the test case based on type
    switch (testCase.type) {
      case "syntax-validation":
        return validateSyntax(testCase, userCode, questionData);
      case "query-validation":
        return validateQuery(testCase, userCode, questionData);
      case "result-validation":
        return validateResult(testCase, executionResult, questionData);
      case "functionality-validation":
        return validateFunctionality(testCase, userCode, questionData);
      default:
        return {
          passed: false,
          actual: `Unknown test type: ${testCase.type}`,
          expected: `Test type ${testCase.type} not supported`,
        };
    }
  } catch (error) {
    console.error("Validation error:", error);
    return {
      passed: false,
      actual: `Error during validation: ${error.message}`,
      expected: "Valid test execution",
    };
  }
};

const validateQuery = (testCase, userCode, questionData) => {
  // Clean and normalize the user code
  const cleanUserCode = userCode
    .replace(/--.*$/gm, "") // Remove single line comments
    .replace(/\/\*[\s\S]*?\*\//g, "") // Remove multi-line comments
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim()
    .toLowerCase();

  console.log("Cleaned user code for query validation:", cleanUserCode);
  console.log("Expected keywords:", testCase.expectedKeywords);
  console.log("Forbidden keywords:", testCase.forbiddenKeywords);

  // Check for required keywords
  const expectedKeywords = testCase.expectedKeywords || [];
  for (const keyword of expectedKeywords) {
    const keywordLower = keyword.toLowerCase();
    // Simple check for keyword existence
    if (!cleanUserCode.includes(keywordLower)) {
      console.log(`Missing keyword: ${keywordLower}`);
      return {
        passed: false,
        actual: `Missing required keyword: ${keyword}`,
        expected: `Should contain: ${keyword}`,
      };
    }
  }

  // Check for forbidden keywords
  const forbiddenKeywords = testCase.forbiddenKeywords || [];
  for (const keyword of forbiddenKeywords) {
    const keywordLower = keyword.toLowerCase();
    if (cleanUserCode.includes(keywordLower)) {
      console.log(`Found forbidden keyword: ${keywordLower}`);
      return {
        passed: false,
        actual: `Contains forbidden keyword: ${keyword}`,
        expected: `Should not contain: ${keyword}`,
      };
    }
  }

  // For CREATE TABLE statements, check column definitions
  if (cleanUserCode.includes("create table")) {
    return validateCreateTable(testCase, cleanUserCode, questionData);
  }

  console.log("Query validation passed");
  return {
    passed: true,
    actual: "Query contains all required keywords",
    expected: "Valid query structure",
  };
};

const validateCreateTable = (testCase, cleanUserCode, questionData) => {
  // Extract table name and columns from CREATE TABLE statement
  const createTableMatch = cleanUserCode.match(/create\s+table\s+(\w+)\s*\(([^;]+)\)/i);
  if (!createTableMatch) {
    return {
      passed: false,
      actual: "Invalid CREATE TABLE syntax",
      expected: "Proper CREATE TABLE statement",
    };
  }

  const tableName = createTableMatch[1];
  const columnDefinitions = createTableMatch[2].split(',').map(col => col.trim());

  // Check if table name matches expected
  if (testCase.expectedTableName && tableName !== testCase.expectedTableName.toLowerCase()) {
    return {
      passed: false,
      actual: `Table name: ${tableName}`,
      expected: `Table name should be: ${testCase.expectedTableName}`,
    };
  }

  // Check required columns
  const expectedColumns = testCase.expectedColumns || [];
  for (const expectedCol of expectedColumns) {
    const found = columnDefinitions.some(def => 
      def.startsWith(expectedCol.name.toLowerCase())
    );
    if (!found) {
      return {
        passed: false,
        actual: `Missing column: ${expectedCol.name}`,
        expected: `Should include column: ${expectedCol.name}`,
      };
    }
  }

  // Check column data types
  for (const expectedCol of expectedColumns) {
    const columnDef = columnDefinitions.find(def => 
      def.startsWith(expectedCol.name.toLowerCase())
    );
    if (columnDef) {
      const dataType = columnDef.split(/\s+/)[1];
      if (!dataType.includes(expectedCol.type.toLowerCase())) {
        return {
          passed: false,
          actual: `Column ${expectedCol.name} has type: ${dataType}`,
          expected: `Column ${expectedCol.name} should be: ${expectedCol.type}`,
        };
      }
    }
  }

  return {
    passed: true,
    actual: "CREATE TABLE statement is valid",
    expected: "Valid table structure",
  };
};

const validateResult = (testCase, executionResult, questionData) => {
  console.log("Validating result for test case:", testCase.id);
  console.log("Execution result:", executionResult);

  if (!executionResult || !executionResult.results) {
    return {
      passed: false,
      actual: "No execution result available",
      expected: testCase.expectedResult || "Valid result set",
    };
  }

  const { results, columns, rowCount } = executionResult;

  // Check row count if specified
  if (
    testCase.expectedRowCount !== undefined &&
    rowCount !== testCase.expectedRowCount
  ) {
    return {
      passed: false,
      actual: `Returned ${rowCount} rows`,
      expected: `Should return ${testCase.expectedRowCount} rows`,
    };
  }

  // Check specific values if expected data is provided
  if (testCase.expectedData && Array.isArray(testCase.expectedData)) {
    for (
      let i = 0;
      i < Math.min(testCase.expectedData.length, results.length);
      i++
    ) {
      const expectedRow = testCase.expectedData[i];
      const actualRow = results[i];

      // Check each column in the expected row
      for (const [column, expectedValue] of Object.entries(expectedRow)) {
        if (actualRow[column] !== expectedValue) {
          return {
            passed: false,
            actual: `Row ${i + 1}, Column ${column}: ${actualRow[column]}`,
            expected: `Row ${i + 1}, Column ${column}: ${expectedValue}`,
          };
        }
      }
    }
  }

  // Check column names if specified
  if (testCase.expectedColumns && Array.isArray(testCase.expectedColumns)) {
    const columnNames = testCase.expectedColumns.map(col => 
      typeof col === 'string' ? col : col.name
    );
    const missingColumns = columnNames.filter(
      (col) => !columns.includes(col)
    );
    if (missingColumns.length > 0) {
      return {
        passed: false,
        actual: `Columns: ${columns.join(", ")}`,
        expected: `Should include columns: ${columnNames.join(", ")}`,
      };
    }
  }

  console.log("Result validation passed");
  return {
    passed: true,
    actual: "Result matches expected output",
    expected: "Valid result",
  };
};

const validateSyntax = (testCase, userCode, questionData) => {
  console.log("Validating syntax for test case:", testCase.id);
  console.log("User code:", userCode);

  // Clean the code
  const codeWithoutComments = userCode
    .replace(/--.*$/gm, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .trim();

  // Get SQL statements
  const sqlStatements = codeWithoutComments
    .split(";")
    .filter((stmt) => stmt.trim());

  if (sqlStatements.length === 0) {
    return {
      passed: false,
      actual: "No SQL statements found",
      expected: "Valid SQL statement",
    };
  }

  const firstStatement = sqlStatements[0].toLowerCase().trim();

  // Test case specific validations
  if (testCase.id === 1) {
    const validStartKeywords = ['select', 'create', 'insert', 'update', 'delete', 'alter', 'drop'];
    const startsWithValid = validStartKeywords.some(keyword => firstStatement.startsWith(keyword));
    if (!startsWithValid) {
      return {
        passed: false,
        actual: `Query starts with: "${firstStatement.split(" ")[0] || "nothing"}"`,
        expected: `Query should start with one of: ${validStartKeywords.join(', ')}`,
      };
    }
  }

  if (testCase.id === 4) {
    console.log("Checking if query ends with semicolon");
    const trimmedCode = userCode.trim();
    if (!trimmedCode.endsWith(";")) {
      return {
        passed: false,
        actual: "Query does not end with semicolon",
        expected: "Query should end with semicolon",
      };
    }
  }

  console.log("Syntax validation passed");
  return {
    passed: true,
    actual: "Valid SQL syntax",
    expected: "Proper SQL syntax",
  };
};

const validateFunctionality = (testCase, userCode, questionData) => {
  console.log("Validating functionality for test case:", testCase.id);

  // Clean the code
  const cleanCode = userCode
    .replace(/--.*$/gm, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .trim()
    .toLowerCase();

  const sqlStatements = cleanCode.split(";").filter((stmt) => stmt.trim());
  if (sqlStatements.length === 0) {
    return {
      passed: false,
      actual: "No SQL query found",
      expected: "Valid SQL query",
    };
  }

  const firstStatement = sqlStatements[0];

  // Check if it's a valid SQL statement type
  const validTypes = ['select', 'create', 'insert', 'update', 'delete', 'alter', 'drop'];
  const isValidType = validTypes.some(type => firstStatement.startsWith(type));
  
  if (!isValidType) {
    return {
      passed: false,
      actual: "Not a valid SQL statement",
      expected: "Valid SQL statement expected",
    };
  }

  // Check for required clauses
  if (testCase.requiresWhere && !firstStatement.includes("where")) {
    return {
      passed: false,
      actual: "No WHERE clause found",
      expected: "Query should include WHERE clause",
    };
  }

  if (testCase.requiresOrderBy && !firstStatement.includes("order by")) {
    return {
      passed: false,
      actual: "No ORDER BY clause found",
      expected: "Query should include ORDER BY clause",
    };
  }

  if (testCase.requiresGroupBy && !firstStatement.includes("group by")) {
    return {
      passed: false,
      actual: "No GROUP BY clause found",
      expected: "Query should include GROUP BY clause",
    };
  }

  console.log("Functionality validation passed");
  return {
    passed: true,
    actual: "Query meets all functional requirements",
    expected: "Functionally complete query",
  };
};

// Enhanced SQL execution function with dynamic table support
export const mockExecuteSql = async (sql, databaseSchema = null, questionData = null) => {
  console.log("Executing SQL:", sql);
  console.log("Question data for execution:", questionData);

  // Simulate execution delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Clean and normalize SQL
  const sqlWithoutComments = sql
    .replace(/--.*$/gm, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .trim();

  const sqlLower = sqlWithoutComments.toLowerCase();

  try {
    // Handle CREATE TABLE statements
    if (sqlLower.includes('create table')) {
      return handleCreateTable(sqlWithoutComments, questionData);
    }
    
    // Handle INSERT statements
    if (sqlLower.includes('insert into')) {
      return handleInsert(sqlWithoutComments, questionData);
    }
    
    // Handle SELECT statements
    if (sqlLower.includes('select')) {
      return handleSelect(sqlWithoutComments, questionData);
    }
    
    // Handle UPDATE statements
    if (sqlLower.includes('update')) {
      return handleUpdate(sqlWithoutComments, questionData);
    }
    
    // Handle DELETE statements
    if (sqlLower.includes('delete')) {
      return handleDelete(sqlWithoutComments, questionData);
    }
    
    // Handle ALTER TABLE statements
    if (sqlLower.includes('alter table')) {
      return handleAlterTable(sqlWithoutComments, questionData);
    }
    
    // Handle DROP TABLE statements
    if (sqlLower.includes('drop table')) {
      return handleDropTable(sqlWithoutComments, questionData);
    }

    // Default response
    return {
      success: true,
      output: "Query executed successfully",
      data: {
        columns: ["result"],
        results: [{ result: "Query completed" }],
        rowCount: 1,
      },
    };

  } catch (error) {
    console.error("SQL execution error:", error);
    return {
      success: false,
      error: error.message,
      output: `Error: ${error.message}`,
    };
  }
};

const handleCreateTable = (sql, questionData) => {
  // Parse CREATE TABLE statement
  const createTableMatch = sql.match(/create\s+table\s+(\w+)\s*\(([^;]+)\)/i);
  if (!createTableMatch) {
    throw new Error("Invalid CREATE TABLE syntax");
  }

  const tableName = createTableMatch[1];
  const columnDefinitions = createTableMatch[2].split(',').map(col => col.trim());

  // Parse column definitions
  const columns = [];
  const dataTypes = {};
  
  columnDefinitions.forEach(def => {
    const parts = def.split(/\s+/);
    const columnName = parts[0];
    const dataType = parts[1];
    columns.push(columnName);
    dataTypes[columnName] = dataType;
  });

  // Create table structure
  const tableData = {
    name: tableName,
    columns: columns,
    dataTypes: dataTypes,
    rows: []
  };

  // Store in question data
  if (questionData) {
    if (!questionData.tables) questionData.tables = {};
    questionData.tables[tableName] = tableData;
  }

  // Format the table structure for display
  const tableStructure = [];
  columns.forEach(col => {
    tableStructure.push({
      Column: col,
      Type: dataTypes[col],
      Null: "YES",
      Default: null
    });
  });

  return {
    success: true,
    output: `✅ Table '${tableName}' created successfully`,
    data: {
      columns: ["Column", "Type", "Null", "Default"],
      results: tableStructure,
      rowCount: tableStructure.length,
      tableInfo: {
        name: tableName,
        columns: columns,
        dataTypes: dataTypes,
        rows: []
      },
      message: `Table '${tableName}' has been created with the following structure:`
    },
  };
};

const handleInsert = (sql, questionData) => {
  // Parse INSERT statement
  const insertMatch = sql.match(/insert\s+into\s+(\w+)\s*(?:\(([^)]+)\))?\s*values\s*\(([^)]+)\)/i);
  if (!insertMatch) {
    throw new Error("Invalid INSERT syntax");
  }

  const tableName = insertMatch[1];
  const columnsPart = insertMatch[2] ? insertMatch[2].split(',').map(c => c.trim()) : null;
  const valuesPart = insertMatch[3].split(',').map(v => v.trim().replace(/'/g, ''));

  // Check if table exists
  if (!questionData?.tables?.[tableName]) {
    throw new Error(`Table '${tableName}' does not exist`);
  }

  const table = questionData.tables[tableName];
  
  // Create new row
  const newRow = {};
  if (columnsPart) {
    columnsPart.forEach((col, index) => {
      newRow[col] = valuesPart[index];
    });
  } else {
    table.columns.forEach((col, index) => {
      newRow[col] = valuesPart[index];
    });
  }

  table.rows.push(newRow);

  return {
    success: true,
    output: `✅ 1 row inserted into '${tableName}'`,
    data: {
      columns: table.columns,
      results: table.rows,
      rowCount: table.rows.length,
      tableInfo: {
        name: tableName,
        columns: table.columns,
        dataTypes: table.dataTypes,
        rows: table.rows
      },
      message: `Data inserted successfully. Current table '${tableName}' data:`
    },
  };
};

const handleSelect = (sql, questionData) => {
  // Parse SELECT statement
  const selectMatch = sql.match(/select\s+(.+?)\s+from\s+(\w+)(?:\s+where\s+(.+))?/i);
  if (!selectMatch) {
    throw new Error("Invalid SELECT syntax");
  }

  const selectPart = selectMatch[1].trim();
  const tableName = selectMatch[2];
  const whereClause = selectMatch[3];

  // Check if table exists in our dynamic tables first
  if (questionData?.tables?.[tableName]) {
    const table = questionData.tables[tableName];
    let results = [...table.rows];

    // Apply WHERE clause if present
    if (whereClause) {
      results = results.filter(row => {
        // Simple WHERE parsing for demonstration
        const whereParts = whereClause.match(/(\w+)\s*=\s*'?([^'\s]+)'?/i);
        if (whereParts) {
          const [_, col, val] = whereParts;
          return row[col] == val;
        }
        return true;
      });
    }

    // Determine columns to return
    let columns = table.columns;
    let filteredResults = results;

    if (selectPart !== '*') {
      const selectedColumns = selectPart.split(',').map(c => c.trim());
      columns = selectedColumns;
      filteredResults = results.map(row => {
        const newRow = {};
        selectedColumns.forEach(col => {
          newRow[col] = row[col];
        });
        return newRow;
      });
    }

    return {
      success: true,
      output: `✅ Query executed successfully. Returned ${filteredResults.length} rows.`,
      data: {
        columns: columns,
        results: filteredResults,
        rowCount: filteredResults.length,
        tableInfo: {
          name: tableName,
          columns: table.columns,
          dataTypes: table.dataTypes,
          rows: table.rows
        },
        message: `Showing data from '${tableName}' table:`
      },
    };
  }

  // If table doesn't exist in dynamic tables, return mock data
  return getMockDataForTable(tableName, questionData);
};

const handleUpdate = (sql, questionData) => {
  // Parse UPDATE statement
  const updateMatch = sql.match(/update\s+(\w+)\s+set\s+(.+?)(?:\s+where\s+(.+))?/i);
  if (!updateMatch) {
    throw new Error("Invalid UPDATE syntax");
  }

  const tableName = updateMatch[1];
  const setClause = updateMatch[2];
  const whereClause = updateMatch[3];

  // Check if table exists
  if (!questionData?.tables?.[tableName]) {
    throw new Error(`Table '${tableName}' does not exist`);
  }

  const table = questionData.tables[tableName];
  
  // Parse SET clause
  const setParts = setClause.match(/(\w+)\s*=\s*'?([^,]+)'?/);
  if (!setParts) {
    throw new Error("Invalid SET clause");
  }

  const [_, setCol, setVal] = setParts;

  // Parse WHERE clause
  let whereCol, whereVal;
  if (whereClause) {
    const whereParts = whereClause.match(/(\w+)\s*=\s*'?([^'\s]+)'?/i);
    if (whereParts) {
      [_, whereCol, whereVal] = whereParts;
    }
  }

  // Update rows
  let updatedCount = 0;
  table.rows = table.rows.map(row => {
    if (!whereClause || (whereCol && row[whereCol] == whereVal)) {
      updatedCount++;
      return { ...row, [setCol]: setVal.replace(/'/g, '') };
    }
    return row;
  });

  return {
    success: true,
    output: `✅ ${updatedCount} row(s) updated in '${tableName}'`,
    data: {
      columns: table.columns,
      results: table.rows,
      rowCount: table.rows.length,
      tableInfo: {
        name: tableName,
        columns: table.columns,
        dataTypes: table.dataTypes,
        rows: table.rows
      },
      message: `Updated table '${tableName}' data:`
    },
  };
};

const handleDelete = (sql, questionData) => {
  // Parse DELETE statement
  const deleteMatch = sql.match(/delete\s+from\s+(\w+)(?:\s+where\s+(.+))?/i);
  if (!deleteMatch) {
    throw new Error("Invalid DELETE syntax");
  }

  const tableName = deleteMatch[1];
  const whereClause = deleteMatch[2];

  // Check if table exists
  if (!questionData?.tables?.[tableName]) {
    throw new Error(`Table '${tableName}' does not exist`);
  }

  const table = questionData.tables[tableName];
  
  // Parse WHERE clause
  let whereCol, whereVal;
  if (whereClause) {
    const whereParts = whereClause.match(/(\w+)\s*=\s*'?([^'\s]+)'?/i);
    if (whereParts) {
      [_, whereCol, whereVal] = whereParts;
    }
  }

  // Delete rows
  const initialCount = table.rows.length;
  table.rows = table.rows.filter(row => {
    if (whereClause && whereCol) {
      return row[whereCol] != whereVal;
    }
    return false; // DELETE without WHERE deletes all rows
  });

  const deletedCount = initialCount - table.rows.length;

  return {
    success: true,
    output: `✅ ${deletedCount} row(s) deleted from '${tableName}'`,
    data: {
      columns: table.columns,
      results: table.rows,
      rowCount: table.rows.length,
      tableInfo: {
        name: tableName,
        columns: table.columns,
        dataTypes: table.dataTypes,
        rows: table.rows
      },
      message: `Table '${tableName}' after deletion:`
    },
  };
};

const handleAlterTable = (sql, questionData) => {
  // Parse ALTER TABLE statement
  const alterMatch = sql.match(/alter\s+table\s+(\w+)\s+(\w+)\s+(.+)/i);
  if (!alterMatch) {
    throw new Error("Invalid ALTER TABLE syntax");
  }

  const tableName = alterMatch[1];
  const action = alterMatch[2].toLowerCase();
  const rest = alterMatch[3];

  // Check if table exists
  if (!questionData?.tables?.[tableName]) {
    throw new Error(`Table '${tableName}' does not exist`);
  }

  const table = questionData.tables[tableName];
  let actionMessage = "";

  if (action === 'add') {
    // Add column
    const columnMatch = rest.match(/(\w+)\s+(\w+)/);
    if (columnMatch) {
      const [_, colName, colType] = columnMatch;
      table.columns.push(colName);
      table.dataTypes[colName] = colType;
      // Add column to existing rows with null value
      table.rows = table.rows.map(row => ({ ...row, [colName]: null }));
      actionMessage = `Added column '${colName}' with type ${colType}`;
    }
  } else if (action === 'drop') {
    // Drop column
    const colName = rest.trim();
    const colIndex = table.columns.indexOf(colName);
    if (colIndex !== -1) {
      table.columns.splice(colIndex, 1);
      delete table.dataTypes[colName];
      // Remove column from existing rows
      table.rows = table.rows.map(row => {
        const newRow = { ...row };
        delete newRow[colName];
        return newRow;
      });
      actionMessage = `Dropped column '${colName}'`;
    }
  } else if (action === 'rename') {
    // Rename column
    const renameMatch = rest.match(/(\w+)\s+to\s+(\w+)/i);
    if (renameMatch) {
      const [_, oldName, newName] = renameMatch;
      const colIndex = table.columns.indexOf(oldName);
      if (colIndex !== -1) {
        table.columns[colIndex] = newName;
        table.dataTypes[newName] = table.dataTypes[oldName];
        delete table.dataTypes[oldName];
        // Rename column in existing rows
        table.rows = table.rows.map(row => {
          const newRow = { ...row };
          newRow[newName] = newRow[oldName];
          delete newRow[oldName];
          return newRow;
        });
        actionMessage = `Renamed column '${oldName}' to '${newName}'`;
      }
    }
  }

  return {
    success: true,
    output: `✅ Table '${tableName}' altered successfully. ${actionMessage}`,
    data: {
      columns: table.columns,
      results: table.rows,
      rowCount: table.rows.length,
      tableInfo: {
        name: tableName,
        columns: table.columns,
        dataTypes: table.dataTypes,
        rows: table.rows
      },
      message: `Updated table structure and data for '${tableName}':`
    },
  };
};

const handleDropTable = (sql, questionData) => {
  // Parse DROP TABLE statement
  const dropMatch = sql.match(/drop\s+table\s+(\w+)/i);
  if (!dropMatch) {
    throw new Error("Invalid DROP TABLE syntax");
  }

  const tableName = dropMatch[1];

  // Check if table exists
  if (!questionData?.tables?.[tableName]) {
    throw new Error(`Table '${tableName}' does not exist`);
  }

  // Store table info before deletion
  const tableInfo = { ...questionData.tables[tableName] };
  
  // Delete table
  delete questionData.tables[tableName];

  return {
    success: true,
    output: `✅ Table '${tableName}' dropped successfully`,
    data: {
      columns: ["result"],
      results: [{ result: `Table ${tableName} has been dropped` }],
      rowCount: 1,
      message: `Table '${tableName}' has been removed from the database.`,
      droppedTable: tableInfo
    },
  };
};

const getMockDataForTable = (tableName, questionData) => {
  // Provide mock data based on table name and question data
  const mockTables = {
    employees: {
      columns: ["employee_id", "first_name", "last_name", "department", "salary", "hire_date"],
      results: [
        { employee_id: 1, first_name: "John", last_name: "Doe", department: "Engineering", salary: 75000, hire_date: "2022-01-15" },
        { employee_id: 2, first_name: "Jane", last_name: "Smith", department: "Marketing", salary: 65000, hire_date: "2022-03-20" },
        { employee_id: 3, first_name: "Bob", last_name: "Johnson", department: "Engineering", salary: 80000, hire_date: "2021-11-10" },
        { employee_id: 4, first_name: "Alice", last_name: "Williams", department: "Sales", salary: 70000, hire_date: "2023-02-01" },
        { employee_id: 5, first_name: "Charlie", last_name: "Brown", department: "Marketing", salary: 60000, hire_date: "2023-05-15" },
      ],
      rowCount: 5,
    },
    student: {
      columns: ["id", "name", "age", "score"],
      results: [
        { id: 1, name: "Ram", age: 24, score: 10 },
        { id: 2, name: "Suresh", age: 21, score: 9 },
        { id: 3, name: "Venkat", age: 21, score: 43 },
        { id: 4, name: "Raj", age: 26, score: 120 },
        { id: 5, name: "Shyam", age: 28, score: 125 },
      ],
      rowCount: 5,
    },
    player: {
      columns: ["name", "age", "score"],
      results: [
        { name: "Ram", age: 28, score: 125 },
        { name: "Suresh", age: 21, score: 70 },
        { name: "Venkat", age: 21, score: 43 },
        { name: "Raj", age: 26, score: 120 },
        { name: "Charan", age: 25, score: 173 },
        { name: "Ravan", age: 20, score: 152 },
      ],
      rowCount: 6,
    },
    customer: {
      columns: ["customer_id", "first_name", "last_name", "date_of_birth", "address", "phone_number"],
      results: [
        { customer_id: 1, first_name: "John", last_name: "Doe", date_of_birth: "1990-01-15", address: "123 Main St", phone_number: 5551234 },
        { customer_id: 2, first_name: "Jane", last_name: "Smith", date_of_birth: "1985-05-20", address: "456 Oak Ave", phone_number: 5555678 },
      ],
      rowCount: 2,
    },
    order_details: {
      columns: ["order_id", "customer_id", "order_datetime", "shipped_datetime", "total_amount"],
      results: [
        { order_id: 101, customer_id: 1, order_datetime: "2024-01-15 10:30:00", shipped_datetime: "2024-01-16 14:20:00", total_amount: 299.99 },
        { order_id: 102, customer_id: 2, order_datetime: "2024-01-16 11:45:00", shipped_datetime: "2024-01-17 09:30:00", total_amount: 149.50 },
      ],
      rowCount: 2,
    },
  };

  const mockData = mockTables[tableName];
  if (mockData) {
    return {
      success: true,
      output: `✅ Query executed successfully. Returned ${mockData.rowCount} rows.`,
      data: {
        ...mockData,
        message: `Showing data from '${tableName}' table:`
      },
    };
  }

  // Default mock data
  return {
    success: true,
    output: "✅ Query executed successfully",
    data: {
      columns: ["result"],
      results: [{ result: "Query completed" }],
      rowCount: 1,
      message: "Query result:"
    },
  };
};

export default validateSqlTest;