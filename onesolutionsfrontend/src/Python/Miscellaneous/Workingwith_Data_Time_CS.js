import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks";

const Workingwith_Data_Time_CS = ({
  subtopicId,
  goalName,
  courseName,
  subtopic,
}) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } =
    useAuth();

  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (completedContent.includes(subtopicId)) {
      setIsSubtopicCompleted(true);
    }
  }, [completedContent, subtopicId]);

  const handleContinue = async () => {
    if (isLoading || isSubtopicCompleted) return;

    try {
      setIsLoading(true);
      const result = await markSubtopicComplete(
        subtopicId,
        goalName,
        courseName
      );

      if (result.success) {
        await loadProgressSummary();
        setIsSubtopicCompleted(true);
      } else {
        alert("Failed to mark as complete. Please try again.");
      }
    } catch (error) {
      alert("Failed to mark as complete. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="intro-container">
      <h1>Working With Dates & Times | Cheat Sheet</h1>

      <section>
        <h2>Datetime</h2>
        <p>
          Python has a built-in <b>datetime</b> module which provides convenient
          objects to work with dates and times.
        </p>

        <CodeBlock language="python" code={`import datetime`} />

        <h3>Datetime classes</h3>
        <ul>
          <li>date class</li>
          <li>time class</li>
          <li>datetime class</li>
          <li>timedelta class</li>
        </ul>
      </section>

      <section>
        <h2>Working with 'date' class</h2>

        <h3>Representing Date</h3>
        <p>
          A date object can be used to represent any valid <b>date</b> (year,
          month and day).
        </p>
        <CodeBlock
          language="python"
          code={`import datetime
date_object = datetime.date(2019, 4, 13)
print(date_object)`}
        />
        <OutputBlock output={["2019-04-13"]} />

        <h3>Date Object</h3>
        <CodeBlock
          language="python"
          code={`from datetime import date
date_obj = date(2022, 2, 31)
print(date_obj)`}
        />
        <OutputBlock output={["ValueError: day is out of range for month"]} />

        <h3>Today’s Date</h3>
        <p>
          Class method <code>today()</code> returns a date object with{" "}
          <b>today’s date</b>.
        </p>
        <CodeBlock
          language="python"
          code={`import datetime
date_object = datetime.date.today()
print(date_object)`}
        />
        <OutputBlock output={["2021-02-05"]} />

        <h3>Attributes of Date Object</h3>
        <CodeBlock
          language="python"
          code={`from datetime import date
date_object = date(2019, 4, 13)
print(date_object.year)
print(date_object.month)
print(date_object.day)`}
        />
        <OutputBlock output={["2019", "4", "13"]} />
      </section>

      <section>
        <h2>Working with ‘time’ Class</h2>

        <h3>Representing Time</h3>
        <p>
          A time object can be used to represent any valid <b>time</b> (hours,
          minutes and seconds).
        </p>
        <CodeBlock
          language="python"
          code={`from datetime import time
time_object = time(11, 34, 56)
print(time_object)`}
        />
        <OutputBlock output={["11:34:56"]} />

        <h3>Attributes of Time Object</h3>
        <CodeBlock
          language="python"
          code={`from datetime import time
time_object = time(11, 34, 56)
print(time_object)
print(time_object.hour)
print(time_object.minute)
print(time_object.second)`}
        />
        <OutputBlock output={["11:34:56", "11", "34", "56"]} />
      </section>

      <section>
        <h2>Working with ‘datetime’ Class</h2>
        <p>
          The datetime class represents a valid <b>date and time</b> together.
        </p>

        <h3>Example - 1</h3>
        <CodeBlock
          language="python"
          code={`from datetime import datetime
date_time_obj = datetime(2018, 11, 28, 10, 15, 26)
print(date_time_obj.year)
print(date_time_obj.month)
print(date_time_obj.hour)
print(date_time_obj.minute)`}
        />
        <OutputBlock output={["2018", "11", "10", "15"]} />

        <h3>Example - 2</h3>
        <p>It gives the current date and time</p>
        <CodeBlock
          language="python"
          code={`import datetime
datetime_object = datetime.datetime.now()
print(datetime_object)`}
        />
        <OutputBlock output={["2021-02-05 09:26:08.077473"]} />

        <h3>DateTime object</h3>
        <CodeBlock
          language="python"
          code={`from datetime import datetime
date_time_obj = datetime(2018, 11, 28)
print(date_time_obj)`}
        />
        <OutputBlock output={["2018-11-28 00:00:00"]} />
      </section>

      <section>
        <h2>Formatting Datetime</h2>
        <p>
          The datetime classes have <code>strftime(format)</code> method to
          format the datetime into any required format like{" "}
        </p>
        <ul>
          <li>mm/dd/yyyy</li>
          <li>dd-mm-yyyy</li>
        </ul>
        <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ background: "#7fb3c8", padding: "10px" }}>
                Format Specifier
              </th>
              <th style={{ background: "#7fb3c8", padding: "10px" }}>
                Meaning
              </th>
              <th style={{ background: "#7fb3c8", padding: "10px" }}>
                Example
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "10px" }}>%y</td>
              <td style={{ padding: "10px" }}>
                Year without century as a zero-padded decimal number
              </td>
              <td style={{ padding: "10px" }}>19, 20, ...</td>
            </tr>
            <tr>
              <td style={{ padding: "10px" }}>%Y</td>
              <td style={{ padding: "10px" }}>
                Year with century as a decimal number
              </td>
              <td style={{ padding: "10px" }}>2019, 2020, ...</td>
            </tr>
            <tr>
              <td style={{ padding: "10px" }}>%b</td>
              <td style={{ padding: "10px" }}>Month as abbreviated name</td>
              <td style={{ padding: "10px" }}>Jan, Feb, ...</td>
            </tr>
            <tr>
              <td style={{ padding: "10px" }}>%B</td>
              <td style={{ padding: "10px" }}>Month as full name</td>
              <td style={{ padding: "10px" }}>January, February</td>
            </tr>
            <tr>
              <td style={{ padding: "10px" }}>%m</td>
              <td style={{ padding: "10px" }}>
                Month as a zero-padded decimal number
              </td>
              <td style={{ padding: "10px" }}>01, 02, ..., 12</td>
            </tr>
            <tr>
              <td style={{ padding: "10px" }}>%d</td>
              <td style={{ padding: "10px" }}>
                Day of the month as a zero-padded decimal number
              </td>
              <td style={{ padding: "10px" }}>01, 02, ..., 31</td>
            </tr>
            <tr>
              <td style={{ padding: "10px" }}>%a</td>
              <td style={{ padding: "10px" }}>Weekday as abbreviated name</td>
              <td style={{ padding: "10px" }}>Sun, Mon, ...</td>
            </tr>
            <tr>
              <td style={{ padding: "10px" }}>%A</td>
              <td style={{ padding: "10px" }}>Weekday as full name</td>
              <td style={{ padding: "10px" }}>Sunday, Monday</td>
            </tr>
            <tr>
              <td style={{ padding: "10px" }}>%H</td>
              <td style={{ padding: "10px" }}>
                Hour (24-hour clock) as a zero-padded decimal number
              </td>
              <td style={{ padding: "10px" }}>00, 01, ..., 23</td>
            </tr>
            <tr>
              <td style={{ padding: "10px" }}>%I</td>
              <td style={{ padding: "10px" }}>
                Hour (12-hour clock) as a zero-padded decimal number
              </td>
              <td style={{ padding: "10px" }}>01, 02, ..., 12</td>
            </tr>
            <tr>
              <td style={{ padding: "10px" }}>%p</td>
              <td style={{ padding: "10px" }}>AM or PM</td>
              <td style={{ padding: "10px" }}>AM, PM</td>
            </tr>
            <tr>
              <td style={{ padding: "10px" }}>%M</td>
              <td style={{ padding: "10px" }}>
                Minute as a zero-padded decimal number
              </td>
              <td style={{ padding: "10px" }}>00, 01, ..., 59</td>
            </tr>
            <tr>
              <td style={{ padding: "10px" }}>%S</td>
              <td style={{ padding: "10px" }}>
                Second as a zero-padded decimal number
              </td>
              <td style={{ padding: "10px" }}>00, 01, ..., 59</td>
            </tr>
          </tbody>
        </table>

        <CodeBlock
          language="python"
          code={`from datetime import datetime
now = datetime.now()
formatted_datetime_1 = now.strftime("%d %b %Y %I:%M:%S %p")
print(formatted_datetime_1)
formatted_datetime_2 = now.strftime("%d/%m/%Y, %H:%M:%S")
print(formatted_datetime_2)`}
        />
        <OutputBlock
          output={["05 Feb 2021 09:26:50 AM", "05/02/2021, 09:26:50"]}
        />
      </section>

      <section>
        <h2>Parsing Datetime</h2>
        <p>
          The class method <code>strptime()</code> creates a{" "}
          <b>datetime object</b>
          from a given string representing date and time.
        </p>

        <CodeBlock
          language="python"
          code={`from datetime import datetime
date_string = "28 November, 2018"
print(date_string)
date_object = datetime.strptime(date_string, "%d %B, %Y")
print(date_object)`}
        />
        <OutputBlock output={["28 November, 2018", "2018-11-28 00:00:00"]} />
      </section>

      <section>
        <h2>Working with ‘timedelta’ Class</h2>
        <p>
          Timedelta object represents <b>duration</b>.
        </p>

        <h3>Example 1</h3>
        <CodeBlock
          language="python"
          code={`from datetime import timedelta
delta = timedelta(days=365, hours=4)
print(delta)`}
        />
        <OutputBlock output={["365 days, 4:00:00"]} />

        <h3>Example 2</h3>
        <CodeBlock
          language="python"
          code={`from datetime import timedelta, datetime
delta = timedelta(days=365)
current_datetime = datetime.now()
print(current_datetime)
next_year_datetime = current_datetime + delta
print(next_year_datetime)`}
        />
        <OutputBlock
          output={["2021-02-05 09:28:30.239095", "2022-02-05 09:28:30.239095"]}
        />

        <h3>Calculating Time Difference</h3>
        <CodeBlock
          language="python"
          code={`import datetime
dt1 = datetime.datetime(2021, 2, 5)
dt2 = datetime.datetime(2022, 1, 1)
duration = dt2 - dt1
print(duration)
print(type(duration))`}
        />
        <OutputBlock
          output={["330 days, 0:00:00", "<class 'datetime.timedelta'>"]}
        />
      </section>

      <div className="view-continue">
        <button
          className={`btn-continue ${isSubtopicCompleted ? "completed" : ""}`}
          onClick={handleContinue}
          disabled={isSubtopicCompleted || isLoading}
        >
          {isLoading
            ? "Marking..."
            : isSubtopicCompleted
              ? "✓ Completed"
              : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default Workingwith_Data_Time_CS;
