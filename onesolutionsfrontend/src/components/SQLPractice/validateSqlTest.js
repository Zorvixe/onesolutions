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
    .replace(/--.*$/gm, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

  // For CREATE TABLE statements, use enhanced validation
  if (cleanUserCode.includes("create table")) {
    return validateCreateTable(testCase, cleanUserCode, questionData);
  }

  // Check for required keywords
  const expectedKeywords = testCase.expectedKeywords || [];
  for (const keyword of expectedKeywords) {
    const keywordLower = keyword.toLowerCase();

    // Handle data type variations in expected keywords
    if (keywordLower.includes("int") || keywordLower.includes("integer")) {
      const intVariations = [
        "int",
        "integer",
        "int4",
        "int8",
        "bigint",
        "smallint",
      ];
      const found = intVariations.some((v) => cleanUserCode.includes(v));
      if (!found && !cleanUserCode.includes(keywordLower)) {
        return {
          passed: false,
          actual: `Missing integer data type`,
          expected: `Should contain integer type (INT, INTEGER, etc.)`,
        };
      }
    } else if (keywordLower.includes("varchar")) {
      const varcharVariations = ["varchar", "character varying", "text"];
      const found = varcharVariations.some((v) => cleanUserCode.includes(v));
      if (!found && !cleanUserCode.includes(keywordLower)) {
        return {
          passed: false,
          actual: `Missing varchar/text data type`,
          expected: `Should contain string type (VARCHAR, TEXT, etc.)`,
        };
      }
    } else if (!cleanUserCode.includes(keywordLower)) {
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
      return {
        passed: false,
        actual: `Contains forbidden keyword: ${keyword}`,
        expected: `Should not contain: ${keyword}`,
      };
    }
  }

  return {
    passed: true,
    actual: "Query contains all required keywords",
    expected: "Valid query structure",
  };
};

const validateCreateTable = (testCase, cleanUserCode, questionData) => {
  // Extract table name and columns from CREATE TABLE statement
  const createTableMatch = cleanUserCode.match(
    /create\s+table\s+(\w+)\s*\(([^;]+)\)/i
  );
  if (!createTableMatch) {
    return {
      passed: false,
      actual: "Invalid CREATE TABLE syntax",
      expected: "Proper CREATE TABLE statement",
    };
  }

  const tableName = createTableMatch[1];
  const columnDefinitions = createTableMatch[2]
    .split(",")
    .map((col) => col.trim());

  // Check if table name matches expected
  if (
    testCase.expectedTableName &&
    tableName !== testCase.expectedTableName.toLowerCase()
  ) {
    return {
      passed: false,
      actual: `Table name: ${tableName}`,
      expected: `Table name should be: ${testCase.expectedTableName}`,
    };
  }

  // Check required columns
  const expectedColumns = testCase.expectedColumns || [];
  for (const expectedCol of expectedColumns) {
    const found = columnDefinitions.some((def) =>
      def.toLowerCase().startsWith(expectedCol.name.toLowerCase())
    );
    if (!found) {
      return {
        passed: false,
        actual: `Missing column: ${expectedCol.name}`,
        expected: `Should include column: ${expectedCol.name}`,
      };
    }
  }

  // Check column data types with flexible matching
  for (const expectedCol of expectedColumns) {
    const columnDef = columnDefinitions.find((def) =>
      def.toLowerCase().startsWith(expectedCol.name.toLowerCase())
    );

    if (columnDef) {
      // Extract the data type part (after column name)
      const parts = columnDef.split(/\s+/);
      if (parts.length < 2) {
        return {
          passed: false,
          actual: `Column ${expectedCol.name} has no data type specified`,
          expected: `Column ${expectedCol.name} should be: ${expectedCol.type}`,
        };
      }

      const dataType = parts[1].toLowerCase();
      const expectedType = expectedCol.type.toLowerCase();

      // Define valid type variations
      const typeVariations = {
        integer: ["integer", "int", "int4", "int8", "bigint", "smallint"],
        varchar: [
          "varchar",
          "character varying",
          "char varying",
          "nvarchar",
          "text",
        ],
        "varchar(200)": [
          "varchar(200)",
          "varchar",
          "character varying(200)",
          "text",
        ],
        text: ["text", "varchar", "character varying", "clob"],
        date: ["date", "datetime", "timestamp", "timestamp without time zone"],
        decimal: ["decimal", "numeric", "number", "float", "double", "real"],
        float: ["float", "real", "double", "double precision", "decimal"],
      };

      // Check if the data type matches any valid variation
      const isValid = checkDataTypeMatch(
        dataType,
        expectedType,
        typeVariations
      );

      if (!isValid) {
        return {
          passed: false,
          actual: `Column ${expectedCol.name} has type: ${dataType}`,
          expected: `Column ${expectedCol.name} should be compatible with: ${expectedCol.type}`,
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

// Helper function to check if data type matches expected type with variations
const checkDataTypeMatch = (actualType, expectedType, typeVariations) => {
  // Direct match
  if (actualType === expectedType) return true;

  // Check if expected type has variations
  if (typeVariations[expectedType]) {
    return typeVariations[expectedType].some(
      (variation) =>
        actualType.includes(variation) || variation.includes(actualType)
    );
  }

  // For parameterized types like varchar(200), check base type
  if (expectedType.includes("(")) {
    const baseExpectedType = expectedType.split("(")[0];
    if (typeVariations[baseExpectedType]) {
      return typeVariations[baseExpectedType].some((variation) =>
        actualType.startsWith(variation)
      );
    }
  }

  // Check if actual type contains expected type or vice versa
  return actualType.includes(expectedType) || expectedType.includes(actualType);
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
        if (actualRow[column] != expectedValue) {
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
    const columnNames = testCase.expectedColumns.map((col) =>
      typeof col === "string" ? col : col.name
    );
    const missingColumns = columnNames.filter((col) => !columns.includes(col));
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
    const validStartKeywords = [
      "select",
      "create",
      "insert",
      "update",
      "delete",
      "alter",
      "drop",
    ];
    const startsWithValid = validStartKeywords.some((keyword) =>
      firstStatement.startsWith(keyword)
    );
    if (!startsWithValid) {
      return {
        passed: false,
        actual: `Query starts with: "${firstStatement.split(" ")[0] || "nothing"}"`,
        expected: `Query should start with one of: ${validStartKeywords.join(", ")}`,
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
  const validTypes = [
    "select",
    "create",
    "insert",
    "update",
    "delete",
    "alter",
    "drop",
  ];
  const isValidType = validTypes.some((type) =>
    firstStatement.startsWith(type)
  );

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
export const mockExecuteSql = async (
  sql,
  databaseSchema = null,
  questionData = null
) => {
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
    // Initialize tables object if it doesn't exist
    if (questionData && !questionData.tables) {
      questionData.tables = {};
    }

    // Initialize tables from tableData if provided
    if (questionData?.tableData) {
      Object.entries(questionData.tableData).forEach(
        ([tableName, tableInfo]) => {
          if (!questionData.tables[tableName]) {
            questionData.tables[tableName] = {
              name: tableName,
              columns: tableInfo.columns,
              dataTypes: tableInfo.columns.reduce((acc, col) => {
                if (
                  col.toLowerCase().includes("id") ||
                  col.toLowerCase().includes("age") ||
                  col.toLowerCase().includes("score") ||
                  col.toLowerCase().includes("salary")
                ) {
                  acc[col] = "INTEGER";
                } else if (col.toLowerCase().includes("date")) {
                  acc[col] = "DATE";
                } else if (
                  col.toLowerCase().includes("amount") ||
                  col.toLowerCase().includes("price")
                ) {
                  acc[col] = "DECIMAL";
                } else {
                  acc[col] = "VARCHAR";
                }
                return acc;
              }, {}),
              rows: tableInfo.rows
                ? tableInfo.rows.map((row) => {
                    const rowObj = {};
                    tableInfo.columns.forEach((col, idx) => {
                      rowObj[col] = row[idx];
                    });
                    return rowObj;
                  })
                : [],
            };
          }
        }
      );
    }

    // Handle multiple statements (split by semicolon)
    const statements = sqlWithoutComments
      .split(";")
      .filter((stmt) => stmt.trim());
    if (statements.length > 1) {
      let lastResult = null;
      for (const statement of statements) {
        if (statement.trim()) {
          lastResult = await executeSingleStatement(
            statement.trim(),
            questionData
          );
        }
      }
      return lastResult;
    }

    // Single statement
    return await executeSingleStatement(sqlWithoutComments, questionData);
  } catch (error) {
    console.error("SQL execution error:", error);
    return {
      success: false,
      error: error.message,
      output: `Error: ${error.message}`,
    };
  }
};

const executeSingleStatement = async (sql, questionData) => {
  if (!sql || typeof sql !== "string") {
    throw new Error("Invalid SQL");
  }

  const cleanedSql = sql.trim();
  const sqlLower = cleanedSql.toLowerCase();

  if (sqlLower.startsWith("create table")) {
    return handleCreateTable(cleanedSql, questionData);
  }

  if (sqlLower.startsWith("insert into")) {
    return handleInsert(cleanedSql, questionData);
  }

  if (sqlLower.startsWith("select")) {
    return handleSelect(cleanedSql, questionData);
  }

  if (sqlLower.startsWith("update")) {
    return handleUpdate(cleanedSql, questionData);
  }

  if (sqlLower.startsWith("delete from")) {
    return handleDelete(cleanedSql, questionData);
  }

  if (sqlLower.startsWith("alter table")) {
    return handleAlterTable(cleanedSql, questionData);
  }

  if (sqlLower.startsWith("drop table")) {
    return handleDropTable(cleanedSql, questionData);
  }

  return {
    success: false,
    output: "Unsupported SQL statement",
  };
};

const handleCreateTable = (sql, questionData) => {
  // Parse CREATE TABLE statement
  const createTableMatch = sql.match(/create\s+table\s+(\w+)\s*\(([^;]+)\)/i);
  if (!createTableMatch) {
    throw new Error("Invalid CREATE TABLE syntax");
  }

  const tableName = createTableMatch[1];
  const columnDefinitions = createTableMatch[2]
    .split(",")
    .map((col) => col.trim());

  // Parse column definitions
  const columns = [];
  const dataTypes = {};

  columnDefinitions.forEach((def) => {
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
    rows: [],
  };

  // Store in question data
  if (questionData) {
    if (!questionData.tables) questionData.tables = {};
    questionData.tables[tableName] = tableData;
  }

  // Format the table structure for display
  const tableStructure = [];
  columns.forEach((col) => {
    tableStructure.push({
      Column: col,
      Type: dataTypes[col],
      Null: "YES",
      Default: null,
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
        rows: [],
      },
      message: `Table '${tableName}' has been created with the following structure:`,
    },
  };
};

const handleInsert = (sql, questionData) => {
  // Parse INSERT statement - handle multiple rows
  // Match pattern: INSERT INTO table (cols) VALUES (vals), (vals), ...
  const insertMatch = sql.match(
    /insert\s+into\s+(\w+)\s*(?:\(([^)]+)\))?\s*values\s*(.+)/is
  );
  if (!insertMatch) {
    throw new Error("Invalid INSERT syntax");
  }

  const tableName = insertMatch[1];
  const columnsPart = insertMatch[2]
    ? insertMatch[2].split(",").map((c) => c.trim())
    : null;

  // Get the values part (everything after VALUES)
  const valuesPart = insertMatch[3].trim();

  // Parse multiple value sets
  const valueSets = [];
  let currentSet = "";
  let parenCount = 0;
  let inQuotes = false;
  let quoteChar = "";

  // Parse the values part character by character to handle nested parentheses and quotes
  for (let i = 0; i < valuesPart.length; i++) {
    const char = valuesPart[i];

    // Handle quotes
    if (
      (char === "'" || char === '"') &&
      (i === 0 || valuesPart[i - 1] !== "\\")
    ) {
      if (!inQuotes) {
        inQuotes = true;
        quoteChar = char;
      } else if (char === quoteChar) {
        inQuotes = false;
      }
    }

    if (!inQuotes) {
      if (char === "(") {
        parenCount++;
      } else if (char === ")") {
        parenCount--;
      }
    }

    currentSet += char;

    // When we close a parentheses at root level, we have a complete value set
    if (!inQuotes && parenCount === 0 && char === ")") {
      // Look ahead to see if there's a comma
      let j = i + 1;
      while (j < valuesPart.length && valuesPart[j] === " ") j++;

      if (j < valuesPart.length && valuesPart[j] === ",") {
        // Found a comma, this value set is complete
        valueSets.push(currentSet.trim());
        currentSet = "";
        i = j; // Skip the comma
      } else if (j >= valuesPart.length) {
        // End of string, this is the last value set
        valueSets.push(currentSet.trim());
      }
    }
  }

  // If no multiple sets found using the above method, try splitting by '),(' pattern
  if (valueSets.length === 0) {
    const matches = valuesPart.match(/\([^)]+\)/g);
    if (matches) {
      matches.forEach((match) => valueSets.push(match));
    } else {
      // Single value set
      valueSets.push(valuesPart);
    }
  }

  // Check if table exists
  if (!questionData?.tables?.[tableName]) {
    throw new Error(`Table '${tableName}' does not exist`);
  }

  const table = questionData.tables[tableName];
  const insertedRows = [];

  // Process each value set
  for (const valueSet of valueSets) {
    // Extract values from the parentheses
    const cleanValueSet = valueSet.replace(/^\(|\)$/g, "").trim();

    // Parse values - handle both single and double quotes and escaped quotes
    const values = [];
    let currentValue = "";
    let inQuotes = false;
    let quoteChar = "";

    for (let i = 0; i < cleanValueSet.length; i++) {
      const char = cleanValueSet[i];

      // Handle escaped quotes
      if (char === "\\" && i < cleanValueSet.length - 1) {
        const nextChar = cleanValueSet[i + 1];
        if (nextChar === "'" || nextChar === '"') {
          currentValue += nextChar;
          i++; // Skip the next character
          continue;
        }
      }

      // Handle quotes
      if (
        (char === "'" || char === '"') &&
        (i === 0 || cleanValueSet[i - 1] !== "\\")
      ) {
        if (!inQuotes) {
          inQuotes = true;
          quoteChar = char;
        } else if (char === quoteChar) {
          inQuotes = false;
        } else {
          currentValue += char;
        }
      } else if (char === "," && !inQuotes) {
        values.push(currentValue.trim());
        currentValue = "";
      } else {
        currentValue += char;
      }
    }

    // Add the last value
    if (currentValue) {
      values.push(currentValue.trim());
    }

    // Clean values (remove quotes if they were part of the string)
    const cleanedValues = values.map((v) => {
      v = v.trim();
      // Remove surrounding quotes
      if (
        (v.startsWith("'") && v.endsWith("'")) ||
        (v.startsWith('"') && v.endsWith('"'))
      ) {
        return v.slice(1, -1);
      }
      // Handle numeric values
      if (!isNaN(v) && v !== "") {
        return Number(v);
      }
      return v;
    });

    // Create new row
    const newRow = {};
    if (columnsPart) {
      columnsPart.forEach((col, index) => {
        newRow[col.trim()] = cleanedValues[index];
      });
    } else {
      table.columns.forEach((col, index) => {
        newRow[col] = cleanedValues[index];
      });
    }

    table.rows.push(newRow);
    insertedRows.push(newRow);
  }

  return {
    success: true,
    output: `✅ ${insertedRows.length} row(s) inserted into '${tableName}'`,
    data: {
      columns: table.columns,
      results: table.rows,
      rowCount: table.rows.length,
      tableInfo: {
        name: tableName,
        columns: table.columns,
        dataTypes: table.dataTypes,
        rows: table.rows,
      },
      message: `Data inserted successfully. Current table '${tableName}' data:`,
    },
  };
};

const handleSelect = (sql, questionData) => {
  if (!sql || typeof sql !== "string") {
    throw new Error("Invalid SELECT syntax");
  }

  // -----------------------------
  // Normalize SQL
  // -----------------------------
  const cleanedSql = sql.replace(/\s+/g, " ").trim().replace(/;$/, "");

  const selectMatch = cleanedSql.match(
    /^select\s+(.+?)\s+from\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*(?:where\s+(.+))?$/i
  );

  if (!selectMatch) {
    throw new Error("Invalid SELECT syntax");
  }

  const selectPart = selectMatch[1].trim();
  const tableName = selectMatch[2].trim();
  const whereClause = selectMatch[3];

  // -----------------------------
  // Initialize table from tableData
  // -----------------------------
  if (!questionData?.tables?.[tableName]) {
    if (questionData?.tableData?.[tableName]) {
      const tableInfo = questionData.tableData[tableName];

      if (!questionData.tables) {
        questionData.tables = {};
      }

      questionData.tables[tableName] = {
        name: tableName,
        columns: tableInfo.columns,
        dataTypes: tableInfo.columns.reduce((acc, col) => {
          if (
            col.toLowerCase().includes("age") ||
            col.toLowerCase().includes("score") ||
            col.toLowerCase().includes("price") ||
            col.toLowerCase().includes("rating")
          ) {
            acc[col] = "INTEGER";
          } else {
            acc[col] = "VARCHAR";
          }
          return acc;
        }, {}),
        rows: tableInfo.rows.map((row) => {
          const rowObj = {};
          tableInfo.columns.forEach((col, index) => {
            rowObj[col] = row[index];
          });
          return rowObj;
        }),
      };
    }
  }

  if (!questionData?.tables?.[tableName]) {
    throw new Error(`Table '${tableName}' does not exist`);
  }

  const table = questionData.tables[tableName];
  let results = [...table.rows];

  // -----------------------------
  // WHERE clause handling (FIXED)
  // -----------------------------
  // -----------------------------
  // WHERE clause handling (FIXED WITH OR SUPPORT)
  // -----------------------------
  if (whereClause) {
    // Split by OR first
    const orConditions = whereClause.split(/\s+or\s+/i);

    results = results.filter((row) => {
      return orConditions.some((orCondition) => {
        // Split each OR part by AND
        const andConditions = orCondition.split(/\s+and\s+/i);

        return andConditions.every((condition) => {
          const match = condition.match(
            /(\w+)\s*(>=|<=|!=|<>|=|>|<|like)\s*['"]?([^'"]+)['"]?/i
          );

          if (!match) return true;

          const col = match[1];
          const operator = match[2].toLowerCase();
          let value = match[3];

          const rowValue = row[col];

          // Convert numeric value if needed
          if (!isNaN(value) && value.trim() !== "") {
            value = Number(value);
          }

          switch (operator) {
            case "=":
              return rowValue == value;

            case "!=":
            case "<>":
              return rowValue != value;

            case ">":
              return rowValue > value;

            case "<":
              return rowValue < value;

            case ">=":
              return rowValue >= value;

            case "<=":
              return rowValue <= value;

            case "like":
              const pattern = value.toLowerCase().replace(/%/g, "");
              return rowValue?.toString().toLowerCase().includes(pattern);

            default:
              return true;
          }
        });
      });
    });
  }

  // -----------------------------
  // Column Selection
  // -----------------------------
  let columns = table.columns;
  let filteredResults = results;

  if (selectPart !== "*") {
    const selectedColumns = selectPart.split(",").map((c) => c.trim());

    columns = selectedColumns;

    filteredResults = results.map((row) => {
      const newRow = {};
      selectedColumns.forEach((col) => {
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
        rows: table.rows,
      },
      message: `Showing data from '${tableName}' table:`,
    },
  };
};

const handleUpdate = (sql, questionData) => {
  // Parse UPDATE statement
  const updateMatch = sql.match(
    /update\s+(\w+)\s+set\s+(.+?)(?:\s+where\s+(.+))?;?$/i
  );

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

  // --------------------------
  // Parse SET clause
  // --------------------------
  const setPairs = setClause.split(",").map((pair) => pair.trim());
  const updates = [];

  setPairs.forEach((pair) => {
    const setMatch = pair.match(/(\w+)\s*=\s*(.+)/);
    if (setMatch) {
      const column = setMatch[1];
      let value = setMatch[2].trim();

      // Remove single or double quotes
      value = value.replace(/['"]/g, "");

      // Convert numeric values
      if (!isNaN(value)) {
        value = Number(value);
      }

      updates.push({ column, value });
    }
  });

  if (updates.length === 0) {
    throw new Error("No valid columns provided in SET clause");
  }

  // --------------------------
  // Parse WHERE clause
  // --------------------------
  let whereCol = null;
  let whereOperator = "=";
  let whereVal = null;

  if (whereClause) {
    const whereMatch = whereClause.match(
      /(\w+)\s*([=<>!]+)?\s*['"]?([^'"]+)['"]?/i
    );

    if (whereMatch) {
      whereCol = whereMatch[1];
      whereOperator = whereMatch[2] || "=";
      whereVal = whereMatch[3];

      // Convert number if numeric
      if (!isNaN(whereVal)) {
        whereVal = Number(whereVal);
      }
    }
  }

  // --------------------------
  // Update rows
  // --------------------------
  let updatedCount = 0;

  table.rows = table.rows.map((row) => {
    let shouldUpdate = true;

    if (whereCol) {
      const rowValue = row[whereCol];

      switch (whereOperator) {
        case "=":
          shouldUpdate = rowValue == whereVal;
          break;
        case "!=":
        case "<>":
          shouldUpdate = rowValue != whereVal;
          break;
        case ">":
          shouldUpdate = rowValue > whereVal;
          break;
        case "<":
          shouldUpdate = rowValue < whereVal;
          break;
        case ">=":
          shouldUpdate = rowValue >= whereVal;
          break;
        case "<=":
          shouldUpdate = rowValue <= whereVal;
          break;
        default:
          shouldUpdate = false;
      }
    }

    if (shouldUpdate) {
      updatedCount++;
      const updatedRow = { ...row };

      updates.forEach((update) => {
        if (table.columns.includes(update.column)) {
          updatedRow[update.column] = update.value;
        }
      });

      return updatedRow;
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
        rows: table.rows,
      },
      message: `Updated table '${tableName}' data:`,
    },
  };
};

const handleDelete = (sql, questionData) => {
  // Parse DELETE statement (supports semicolon)
  const deleteMatch = sql.match(
    /delete\s+from\s+(\w+)(?:\s+where\s+(.+))?;?$/i
  );

  if (!deleteMatch) {
    throw new Error("Invalid DELETE syntax");
  }

  const tableName = deleteMatch[1];
  const whereClause = deleteMatch[2];

  // ----------------------------
  // Initialize table from tableData if not already initialized
  // ----------------------------
  if (!questionData?.tables?.[tableName]) {
    if (questionData?.tableData?.[tableName]) {
      const tableInfo = questionData.tableData[tableName];

      if (!questionData.tables) {
        questionData.tables = {};
      }

      questionData.tables[tableName] = {
        name: tableName,
        columns: tableInfo.columns,
        dataTypes: tableInfo.columns.reduce((acc, col) => {
          if (
            col.toLowerCase().includes("age") ||
            col.toLowerCase().includes("score")
          ) {
            acc[col] = "INTEGER";
          } else {
            acc[col] = "VARCHAR";
          }
          return acc;
        }, {}),
        rows: tableInfo.rows.map((row) => {
          const rowObj = {};
          tableInfo.columns.forEach((col, index) => {
            rowObj[col] = row[index];
          });
          return rowObj;
        }),
      };
    }
  }

  // Final existence check
  if (!questionData?.tables?.[tableName]) {
    throw new Error(`Table '${tableName}' does not exist`);
  }

  const table = questionData.tables[tableName];

  // ----------------------------
  // Parse WHERE clause
  // ----------------------------
  let whereCol = null;
  let whereOperator = "=";
  let whereVal = null;

  if (whereClause) {
    const whereMatch = whereClause.match(
      /(\w+)\s*([=<>!]+)?\s*['"]?([^'"]+)['"]?/i
    );

    if (whereMatch) {
      whereCol = whereMatch[1];
      whereOperator = whereMatch[2] || "=";
      whereVal = whereMatch[3];

      // Convert numeric values
      if (!isNaN(whereVal)) {
        whereVal = Number(whereVal);
      }
    }
  }

  // ----------------------------
  // Delete rows
  // ----------------------------
  const initialCount = table.rows.length;

  if (!whereCol) {
    // DELETE without WHERE → delete all
    table.rows = [];
  } else {
    table.rows = table.rows.filter((row) => {
      const rowValue = row[whereCol];

      switch (whereOperator) {
        case "=":
          return rowValue != whereVal;
        case "!=":
        case "<>":
          return rowValue == whereVal;
        case ">":
          return rowValue <= whereVal;
        case "<":
          return rowValue >= whereVal;
        case ">=":
          return rowValue < whereVal;
        case "<=":
          return rowValue > whereVal;
        default:
          return true;
      }
    });
  }

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
        rows: table.rows,
      },
      message: `Table '${tableName}' after deletion:`,
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

  if (action === "add") {
    // Add column

    const columnMatch = rest.match(/(?:column\s+)?(\w+)\s+(\w+)/i);
    if (columnMatch) {
      const [_, colName, colType] = columnMatch;
      table.columns.push(colName);
      table.dataTypes[colName] = colType;
      // Add column to existing rows with null value
      table.rows = table.rows.map((row) => ({ ...row, [colName]: null }));
      actionMessage = `Added column '${colName}' with type ${colType}`;
    }
  } else if (action === "drop" || action === "drop column") {
    // Drop column
    const colName = rest.trim();
    const colIndex = table.columns.indexOf(colName);
    if (colIndex !== -1) {
      table.columns.splice(colIndex, 1);
      delete table.dataTypes[colName];
      // Remove column from existing rows
      table.rows = table.rows.map((row) => {
        const newRow = { ...row };
        delete newRow[colName];
        return newRow;
      });
      actionMessage = `Dropped column '${colName}'`;
    }
  } else if (action === "rename" || action === "rename column") {
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
        table.rows = table.rows.map((row) => {
          const newRow = { ...row };
          newRow[newName] = newRow[oldName];
          delete newRow[oldName];
          return newRow;
        });
        actionMessage = `Renamed column '${oldName}' to '${newName}'`;
      }
    }
  } else if (action === "modify" || action === "alter column") {
    // Modify column type
    const modifyMatch = rest.match(/(\w+)\s+(\w+)/);
    if (modifyMatch) {
      const [_, colName, newType] = modifyMatch;
      if (table.columns.includes(colName)) {
        table.dataTypes[colName] = newType;
        actionMessage = `Modified column '${colName}' to type ${newType}`;
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
        rows: table.rows,
      },
      message: `Updated table structure and data for '${tableName}':`,
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
      droppedTable: tableInfo,
    },
  };
};

export default validateSqlTest;
