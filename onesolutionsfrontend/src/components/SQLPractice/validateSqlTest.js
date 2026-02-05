// validateSqlTest.js
const validateSqlTest = (testCase, userCode, executionResult) => {
    try {
      // Parse the test case based on type
      switch (testCase.type) {
        case "query-validation":
          return validateQuery(testCase, userCode, executionResult);
        
        case "result-validation":
          return validateResult(testCase, executionResult);
        
        case "syntax-validation":
          return validateSyntax(testCase, userCode);
        
        case "functionality-validation":
          return validateFunctionality(testCase, userCode);
        
        default:
          return {
            passed: false,
            actual: `Unknown test type: ${testCase.type}`,
            error: `Test type ${testCase.type} not supported`
          };
      }
    } catch (error) {
      return {
        passed: false,
        actual: `Error during validation: ${error.message}`,
        error: error.message
      };
    }
  };
  
  const validateQuery = (testCase, userCode, executionResult) => {
    // Check if user's query matches expected pattern
    const cleanUserCode = userCode.toLowerCase().trim();
    const expectedKeywords = testCase.expectedKeywords || [];
    
    for (const keyword of expectedKeywords) {
      if (!cleanUserCode.includes(keyword.toLowerCase())) {
        return {
          passed: false,
          actual: `Missing required keyword: ${keyword}`,
          expected: `Should contain: ${keyword}`
        };
      }
    }
    
    // Check for forbidden keywords
    const forbiddenKeywords = testCase.forbiddenKeywords || [];
    for (const keyword of forbiddenKeywords) {
      if (cleanUserCode.includes(keyword.toLowerCase())) {
        return {
          passed: false,
          actual: `Contains forbidden keyword: ${keyword}`,
          expected: `Should not contain: ${keyword}`
        };
      }
    }
    
    return {
      passed: true,
      actual: "Query contains all required keywords",
      expected: "Valid query structure"
    };
  };
  
  const validateResult = (testCase, executionResult) => {
    if (!executionResult || !executionResult.results) {
      return {
        passed: false,
        actual: "No execution result available",
        expected: testCase.expectedResult || "Valid result set"
      };
    }
    
    const { results, columns, rowCount } = executionResult;
    
    // Check row count if specified
    if (testCase.expectedRowCount !== undefined && rowCount !== testCase.expectedRowCount) {
      return {
        passed: false,
        actual: `Returned ${rowCount} rows`,
        expected: `Should return ${testCase.expectedRowCount} rows`
      };
    }
    
    // Check specific values if expected data is provided
    if (testCase.expectedData && Array.isArray(testCase.expectedData)) {
      for (let i = 0; i < Math.min(testCase.expectedData.length, results.length); i++) {
        const expectedRow = testCase.expectedData[i];
        const actualRow = results[i];
        
        // Check each column in the expected row
        for (const [column, expectedValue] of Object.entries(expectedRow)) {
          if (actualRow[column] !== expectedValue) {
            return {
              passed: false,
              actual: `Row ${i + 1}, Column ${column}: ${actualRow[column]}`,
              expected: `Row ${i + 1}, Column ${column}: ${expectedValue}`
            };
          }
        }
      }
    }
    
    // Check column names if specified
    if (testCase.expectedColumns && Array.isArray(testCase.expectedColumns)) {
      const missingColumns = testCase.expectedColumns.filter(col => !columns.includes(col));
      if (missingColumns.length > 0) {
        return {
          passed: false,
          actual: `Columns: ${columns.join(', ')}`,
          expected: `Should include columns: ${testCase.expectedColumns.join(', ')}`
        };
      }
    }
    
    return {
      passed: true,
      actual: "Result matches expected output",
      expected: "Valid result"
    };
  };
  
  const validateSyntax = (testCase, userCode) => {
    // Basic SQL syntax validation
    const sqlKeywords = [
      'select', 'from', 'where', 'group by', 'order by', 'join', 'inner join', 
      'left join', 'right join', 'insert', 'update', 'delete', 'create', 'alter',
      'drop', 'table', 'database', 'values', 'set', 'and', 'or', 'not', 'in',
      'between', 'like', 'is null', 'is not null', 'count', 'sum', 'avg', 'min', 'max'
    ];
    
    const lines = userCode.split(';').filter(line => line.trim());
    
    if (lines.length === 0) {
      return {
        passed: false,
        actual: "No SQL statements found",
        expected: "Valid SQL statement"
      };
    }
    
    // Check for common syntax errors
    const commonErrors = [
      { pattern: /select\s+\*\s+from/i, message: "Avoid using SELECT * in practice" },
      { pattern: /drop\s+table/i, message: "DROP TABLE is not allowed" },
      { pattern: /delete\s+from/i, message: "DELETE without WHERE is dangerous" },
    ];
    
    for (const error of commonErrors) {
      if (error.pattern.test(userCode)) {
        return {
          passed: false,
          actual: error.message,
          expected: "Safe SQL syntax"
        };
      }
    }
    
    return {
      passed: true,
      actual: "Valid SQL syntax",
      expected: "Proper SQL syntax"
    };
  };
  
  const validateFunctionality = (testCase, userCode) => {
    // This would typically connect to a SQL execution engine
    // For now, we'll do basic validation
    
    const cleanCode = userCode.toLowerCase();
    
    // Check if it's a SELECT query (most common for practice)
    if (!cleanCode.startsWith('select')) {
      return {
        passed: false,
        actual: "Not a SELECT query",
        expected: "SELECT query expected"
      };
    }
    
    // Check for required clauses
    if (testCase.requiresWhere && !cleanCode.includes('where')) {
      return {
        passed: false,
        actual: "No WHERE clause found",
        expected: "Query should include WHERE clause"
      };
    }
    
    if (testCase.requiresOrderBy && !cleanCode.includes('order by')) {
      return {
        passed: false,
        actual: "No ORDER BY clause found",
        expected: "Query should include ORDER BY clause"
      };
    }
    
    if (testCase.requiresGroupBy && !cleanCode.includes('group by')) {
      return {
        passed: false,
        actual: "No GROUP BY clause found",
        expected: "Query should include GROUP BY clause"
      };
    }
    
    return {
      passed: true,
      actual: "Query meets all functional requirements",
      expected: "Functionally complete query"
    };
  };
  
  // Mock SQL execution for development
  export const mockExecuteSql = async (sql, databaseSchema = null) => {
    // This is a mock function - in production, connect to real SQL engine
    console.log("Executing SQL:", sql);
    
    // Simulate execution delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Parse the SQL to determine what to return
    const cleanSql = sql.toLowerCase().trim();
    
    // Mock responses based on query type
    if (cleanSql.includes('select')) {
      // Mock SELECT query results
      if (cleanSql.includes('count')) {
        return {
          success: true,
          output: "Query executed successfully",
          data: {
            columns: ['count'],
            results: [{ count: 25 }],
            rowCount: 1
          }
        };
      }
      
      if (cleanSql.includes('employee')) {
        return {
          success: true,
          output: "Query executed successfully",
          data: {
            columns: ['id', 'name', 'department', 'salary'],
            results: [
              { id: 1, name: 'John Doe', department: 'Engineering', salary: 75000 },
              { id: 2, name: 'Jane Smith', department: 'Marketing', salary: 65000 },
              { id: 3, name: 'Bob Johnson', department: 'Engineering', salary: 80000 }
            ],
            rowCount: 3
          }
        };
      }
      
      // Default mock response
      return {
        success: true,
        output: "Query executed successfully",
        data: {
          columns: ['result'],
          results: [{ result: 'Query completed' }],
          rowCount: 1
        }
      };
    } else if (cleanSql.includes('create table')) {
      return {
        success: true,
        output: "Table created successfully",
        data: {
          columns: ['message'],
          results: [{ message: 'Table created' }],
          rowCount: 1
        }
      };
    } else {
      // For other queries
      return {
        success: true,
        output: "Query executed successfully",
        data: {
          columns: ['affected_rows'],
          results: [{ affected_rows: 1 }],
          rowCount: 1
        }
      };
    }
  };
  
  export default validateSqlTest;