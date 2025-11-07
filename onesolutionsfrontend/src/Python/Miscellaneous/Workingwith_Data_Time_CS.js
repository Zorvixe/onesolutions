import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const Workingwith_Data_Time_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>Working With Dates & Times | Cheat Sheet</h1>

      {/* Datetime Module */}
      <section>
        <h2>Datetime Module</h2>
        <p>
          Python provides the built-in <b>datetime</b> module for working with dates and times.
        </p>
        <p>Commonly used classes in datetime:</p>
        <ul>
          <li>date</li>
          <li>time</li>
          <li>datetime</li>
          <li>timedelta</li>
        </ul>
      </section>

      {/* Working with date class */}
      <section>
        <h2>Working with date class</h2>
        <p>Creating a date object:</p>
        <CodeBlock language="python" code={`from datetime import date\nmy_date = date(2025, 10, 14)\nprint(my_date)`} />

        <p>Today's date using <code>today()</code>:</p>
        <CodeBlock language="python" code={`today = date.today()\nprint(today)`} />

        <p>Date attributes:</p>
        <CodeBlock language="python" code={`print(today.year)\nprint(today.month)\nprint(today.day)`} />
      </section>

      {/* Working with time class */}
      <section>
        <h2>Working with time class</h2>
        <p>Creating a time object:</p>
        <CodeBlock language="python" code={`from datetime import time\nmy_time = time(14, 30, 45)\nprint(my_time)`} />

        <p>Time attributes:</p>
        <CodeBlock language="python" code={`print(my_time.hour)\nprint(my_time.minute)\nprint(my_time.second)`} />
      </section>

      {/* Working with datetime class */}
      <section>
        <h2>Working with datetime class</h2>
        <p>Creating a datetime object:</p>
        <CodeBlock language="python" code={`from datetime import datetime\ndt = datetime(2025, 10, 14, 14, 30, 0)\nprint(dt)`} />

        <p>Current date and time:</p>
        <CodeBlock language="python" code={`now = datetime.now()\nprint(now)`} />

        <p>Datetime attributes:</p>
        <CodeBlock language="python" code={`print(now.year)\nprint(now.month)\nprint(now.day)\nprint(now.hour)\nprint(now.minute)\nprint(now.second)`} />
      </section>

      {/* Formatting datetime */}
      <section>
        <h2>Formatting Datetime</h2>
        <p>Use <code>strftime(format)</code> to format datetime:</p>
        <CodeBlock language="python" code={`formatted = now.strftime("%d-%m-%Y %H:%M:%S")\nprint(formatted)`} />

        <p>Common format specifiers:</p>
        <ul>
          <li>%Y - Year with century</li>
          <li>%m - Month (01-12)</li>
          <li>%d - Day of month (01-31)</li>
          <li>%H - Hour (24-hour)</li>
          <li>%M - Minute (00-59)</li>
          <li>%S - Second (00-59)</li>
          <li>%b/%B - Month name short/full</li>
          <li>%a/%A - Weekday short/full</li>
          <li>%p - AM/PM</li>
        </ul>
      </section>

      {/* Parsing datetime */}
      <section>
        <h2>Parsing Datetime</h2>
        <p>Create a datetime object from a string using <code>strptime()</code>:</p>
        <CodeBlock language="python" code={`dt_str = "14-10-2025 14:30:00"\ndt_obj = datetime.strptime(dt_str, "%d-%m-%Y %H:%M:%S")\nprint(dt_obj)`} />
      </section>

      {/* Working with timedelta */}
      <section>
        <h2>Working with timedelta</h2>
        <p>Timedelta represents duration or difference between dates:</p>
        <CodeBlock language="python" code={`from datetime import timedelta\ndelta = timedelta(days=5, hours=3)\nprint(delta)`} />

        <p>Calculate new date/time:</p>
        <CodeBlock language="python" code={`future_date = today + timedelta(days=10)\nprint(future_date)`} />

        <p>Time difference between two dates:</p>
        <CodeBlock language="python" code={`diff = datetime(2025,10,20) - datetime(2025,10,14)\nprint(diff.days, "days")`} />
      </section>

      {/* Continue Button */}
      <div className="view-continue">
        <button
          className={`btn-continue ${isSubtopicCompleted ? "completed" : ""}`}
          onClick={handleContinue}
          disabled={isSubtopicCompleted}
        >
          {isSubtopicCompleted ? "Completed" : "Continue"}
        </button>
      </div>
    </div>
  );
};



export default Workingwith_Data_Time_CS
