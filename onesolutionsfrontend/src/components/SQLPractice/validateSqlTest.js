// validateSqlTest.js
const validateSqlTest = (testCase, userCode, executionResult) => {
  try {
    console.log("Validating test case:", testCase.id, "type:", testCase.type);
    console.log("User code:", userCode);
    console.log("Execution result:", executionResult);

    // Parse the test case based on type
    switch (testCase.type) {
      case "syntax-validation":
        return validateSyntax(testCase, userCode);
      case "query-validation":
        return validateQuery(testCase, userCode);
      case "result-validation":
        return validateResult(testCase, executionResult);
      case "functionality-validation":
        return validateFunctionality(testCase, userCode);
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

const validateQuery = (testCase, userCode) => {
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

  console.log("Query validation passed");
  return {
    passed: true,
    actual: "Query contains all required keywords",
    expected: "Valid query structure",
  };
};

const validateResult = (testCase, executionResult) => {
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
    const missingColumns = testCase.expectedColumns.filter(
      (col) => !columns.includes(col)
    );
    if (missingColumns.length > 0) {
      return {
        passed: false,
        actual: `Columns: ${columns.join(", ")}`,
        expected: `Should include columns: ${testCase.expectedColumns.join(", ")}`,
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

const validateSyntax = (testCase, userCode) => {
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
  switch (testCase.id) {
    case 1: // "Query should start with SELECT"
      console.log("Checking if query starts with SELECT");
      console.log("First statement:", firstStatement);
      if (!firstStatement.startsWith("select")) {
        return {
          passed: false,
          actual: `Query starts with: "${firstStatement.split(" ")[0] || "nothing"}"`,
          expected: "Query should start with SELECT",
        };
      }
      break;

    case 4: // "Query should end with semicolon"
      console.log("Checking if query ends with semicolon");
      const trimmedCode = userCode.trim();
      if (!trimmedCode.endsWith(";")) {
        return {
          passed: false,
          actual: "Query does not end with semicolon",
          expected: "Query should end with semicolon",
        };
      }
      break;

    default:
      // For other syntax tests
      break;
  }

  console.log("Syntax validation passed");
  return {
    passed: true,
    actual: "Valid SQL syntax",
    expected: "Proper SQL syntax",
  };
};

const validateFunctionality = (testCase, userCode) => {
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

  // Check if it's a SELECT query
  if (!firstStatement.startsWith("select")) {
    return {
      passed: false,
      actual: "Not a SELECT query",
      expected: "SELECT query expected",
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

  // Check for correct column order if specified
  if (testCase.expectedColumns && Array.isArray(testCase.expectedColumns)) {
    const selectMatch = firstStatement.match(/select\s+(.+?)\s+from/i);
    if (selectMatch) {
      const selectedPart = selectMatch[1];
      if (selectedPart !== "*") {
        const selectedColumns = selectedPart
          .split(",")
          .map((col) => col.trim().replace(/\s+as\s+.+$/, ""))
          .filter((col) => col);

        const expectedColumns = testCase.expectedColumns.map((col) =>
          col.toLowerCase()
        );

        // Check if all expected columns are present
        for (const expectedCol of expectedColumns) {
          if (!selectedColumns.includes(expectedCol)) {
            return {
              passed: false,
              actual: `Missing column: ${expectedCol}`,
              expected: `Should include column: ${expectedCol}`,
            };
          }
        }
      }
    }
  }

  console.log("Functionality validation passed");
  return {
    passed: true,
    actual: "Query meets all functional requirements",
    expected: "Functionally complete query",
  };
};

// Mock SQL execution function
export const mockExecuteSql = async (sql, databaseSchema = null) => {
  console.log("Executing SQL:", sql);

  // Simulate execution delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Clean and normalize SQL
  const sqlWithoutComments = sql
    .replace(/--.*$/gm, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .trim()
    .toLowerCase();

  // Mock employees table data
  const employeesData = {
    columns: [
      "employee_id",
      "first_name",
      "last_name",
      "department",
      "salary",
      "hire_date",
    ],
    results: [
      {
        employee_id: 1,
        first_name: "John",
        last_name: "Doe",
        department: "Engineering",
        salary: 75000.0,
        hire_date: "2022-01-15",
      },
      {
        employee_id: 2,
        first_name: "Jane",
        last_name: "Smith",
        department: "Marketing",
        salary: 65000.0,
        hire_date: "2022-03-20",
      },
      {
        employee_id: 3,
        first_name: "Bob",
        last_name: "Johnson",
        department: "Engineering",
        salary: 80000.0,
        hire_date: "2021-11-10",
      },
      {
        employee_id: 4,
        first_name: "Alice",
        last_name: "Williams",
        department: "Sales",
        salary: 70000.0,
        hire_date: "2023-02-01",
      },
      {
        employee_id: 5,
        first_name: "Charlie",
        last_name: "Brown",
        department: "Marketing",
        salary: 60000.0,
        hire_date: "2023-05-15",
      },
    ],
    rowCount: 5,
  };

  // Parse the SQL to understand what's being requested
  console.log("Parsing SQL:", sqlWithoutComments);

  // Check for SELECT * FROM employees (basic query)
  if (
    sqlWithoutComments.includes("select") &&
    sqlWithoutComments.includes("from employees")
  ) {
    // Check for specific columns
    if (
      sqlWithoutComments.includes(
        "select first_name, last_name, department from employees"
      )
    ) {
      return {
        success: true,
        output: "Query executed successfully. Returned 5 rows.",
        data: {
          columns: ["first_name", "last_name", "department"],
          results: employeesData.results.map((row) => ({
            first_name: row.first_name,
            last_name: row.last_name,
            department: row.department,
          })),
          rowCount: 5,
        },
      };
    }

    // Check for WHERE clause
    if (sqlWithoutComments.includes("where")) {
      // WHERE department = 'engineering'
      if (sqlWithoutComments.includes("department = 'engineering'")) {
        const filteredData = employeesData.results.filter(
          (row) => row.department.toLowerCase() === "engineering"
        );
        return {
          success: true,
          output: "Query executed successfully. Returned 2 rows.",
          data: {
            columns: employeesData.columns,
            results: filteredData,
            rowCount: filteredData.length,
          },
        };
      }

      // WHERE salary > 70000
      if (sqlWithoutComments.includes("salary > 70000")) {
        const filteredData = employeesData.results.filter(
          (row) => row.salary > 70000
        );
        return {
          success: true,
          output: "Query executed successfully. Returned 2 rows.",
          data: {
            columns: ["first_name", "last_name", "salary"],
            results: filteredData.map((row) => ({
              first_name: row.first_name,
              last_name: row.last_name,
              salary: row.salary,
            })),
            rowCount: filteredData.length,
          },
        };
      }
    }

    // Check for ORDER BY
    if (sqlWithoutComments.includes("order by")) {
      const sortedData = [...employeesData.results];

      if (sqlWithoutComments.includes("salary desc")) {
        sortedData.sort((a, b) => b.salary - a.salary);

        // Check for LIMIT
        if (sqlWithoutComments.includes("limit 3")) {
          const limitedData = sortedData.slice(0, 3);
          return {
            success: true,
            output: "Query executed successfully. Returned 3 rows.",
            data: {
              columns: ["first_name", "last_name", "salary"],
              results: limitedData.map((row) => ({
                first_name: row.first_name,
                last_name: row.last_name,
                salary: row.salary,
              })),
              rowCount: 3,
            },
          };
        }

        return {
          success: true,
          output: "Query executed successfully. Returned 5 rows.",
          data: {
            columns: ["first_name", "last_name", "salary"],
            results: sortedData.map((row) => ({
              first_name: row.first_name,
              last_name: row.last_name,
              salary: row.salary,
            })),
            rowCount: 5,
          },
        };
      }
    }

    // Check for GROUP BY
    if (sqlWithoutComments.includes("group by")) {
      // GROUP BY department with COUNT(*)
      if (sqlWithoutComments.includes("count(*)")) {
        const departmentCounts = {};
        employeesData.results.forEach((row) => {
          departmentCounts[row.department] =
            (departmentCounts[row.department] || 0) + 1;
        });

        const results = Object.entries(departmentCounts).map(
          ([dept, count]) => ({
            department: dept,
            employee_count: count,
          })
        );

        return {
          success: true,
          output: "Query executed successfully. Returned 3 rows.",
          data: {
            columns: ["department", "employee_count"],
            results: results,
            rowCount: results.length,
          },
        };
      }

      // GROUP BY department with AVG(salary)
      if (sqlWithoutComments.includes("avg(salary)")) {
        const departmentStats = {};
        employeesData.results.forEach((row) => {
          if (!departmentStats[row.department]) {
            departmentStats[row.department] = { total: 0, count: 0 };
          }
          departmentStats[row.department].total += row.salary;
          departmentStats[row.department].count += 1;
        });

        const results = Object.entries(departmentStats).map(
          ([dept, stats]) => ({
            department: dept,
            avg_salary: Math.round(stats.total / stats.count),
          })
        );

        // Sort if ORDER BY is present
        if (sqlWithoutComments.includes("order by avg_salary desc")) {
          results.sort((a, b) => b.avg_salary - a.avg_salary);
        }

        return {
          success: true,
          output: "Query executed successfully. Returned 3 rows.",
          data: {
            columns: ["department", "avg_salary"],
            results: results,
            rowCount: results.length,
          },
        };
      }
    }

    // Default SELECT response
    return {
      success: true,
      output: "Query executed successfully. Returned 5 rows.",
      data: employeesData,
    };
  }

  // Default response for other queries
  return {
    success: true,
    output: "Query executed successfully",
    data: {
      columns: ["result"],
      results: [{ result: "Query completed" }],
      rowCount: 1,
    },
  };
};

export default validateSqlTest;
