const summaryFunction = (api) => {
  const columnProgram = api.column(3, { search: "applied" }).data();
  const columnSuccess = api.column(8, { search: "applied" }).data();
  const columnPlaced = api.column(57, { search: "applied" }).data();
  const columnfJobStart = api.column(49, { search: "applied" }).data();

  const columnThreeEli = api.column(58, { search: "applied" }).data();
  const columnThreeAch = api.column(59, { search: "applied" }).data();
  const columnSixEli = api.column(60, { search: "applied" }).data();
  const columnSixAch = api.column(61, { search: "applied" }).data();
  const columnTwelveEli = api.column(62, { search: "applied" }).data();
  const columnTwelveAch = api.column(63, { search: "applied" }).data();

  console.log(columnfJobStart);

  const columnLastWageStart = api.column(48, { search: "applied" }).data();
  const columnFirstWageStart = api.column(50, { search: "applied" }).data();



// Calculate program-specific averages
const avgLastWageCulinary = calculateAverage(columnLastWageStart, columnProgram, 'Culinary Fundamentals');
const avgFirstWageCulinary = calculateAverage(columnFirstWageStart, columnProgram, 'Culinary Fundamentals');

const avgLastWageTransitional = calculateAverage(columnLastWageStart, columnProgram, 'Transitional Employment');
const avgFirstWageTransitional = calculateAverage(columnFirstWageStart, columnProgram, 'Transitional Employment');

const avgLastWageApprentice = calculateAverage(columnLastWageStart, columnProgram, 'Apprenticeship');
const avgFirstWageApprentice = calculateAverage(columnFirstWageStart, columnProgram, 'Apprenticeship');


  // Initialize counter for rows where current date is 3 months past fJobStart
  const culThreeMonthsEli = countRows(
    columnThreeEli,
    columnProgram,
    'Culinary Fundamentals'
  );
  const tranThreeMonthsEli = countRows(
    columnThreeEli,
    columnProgram,
    'Transitional Employment'
  );
  const appThreeMonthsEli = countRows(
    columnThreeEli,
    columnProgram,
    'Apprenticeship'
  );

  const culThreeMonthsAch = countRows(
    columnThreeAch,
    columnProgram,
    'Culinary Fundamentals'
  );

  const tranThreeMonthsAch= countRows(
    columnThreeAch,
    columnProgram,
    'Transitional Employment'
  );

  const appThreeMonthsAch = countRows(
    columnThreeAch,
    columnProgram,
    'Apprenticeship'
  );

  // Initialize counter for rows where current date is 3 months past fJobStart
  const culSixMonthsEli = countRows(
    columnSixEli,
    columnProgram,
    'Culinary Fundamentals'
  );
  const tranSixMonthsEli = countRows(
    columnSixEli,
    columnProgram,
    'Transitional Employment'
  );
  const appSixMonthsEli = countRows(
    columnSixEli,
    columnProgram,
    'Apprenticeship'
  );

  const culSixMonthsAch = countRows(
    columnSixAch,
    columnProgram,
    'Culinary Fundamentals'
  );
  const tranSixMonthsAch = countRows(
    columnSixAch,
    columnProgram,
    'Transitional Employment'
  );
  const appSixMonthsAch = countRows(
    columnSixAch,
    columnProgram,
    'Apprenticeship'
  );

  // Initialize counter for rows where current date is 3 months past fJobStart
  const culTwelveMonthsEli = countRows(
    columnTwelveEli,
    columnProgram,
    'Culinary Fundamentals'
  );
  const tranTwelveMonthsEli = countRows(
    columnTwelveEli,
    columnProgram,
    'Transitional Employment'
  );
  const appTwelveMonthsEli = countRows(
    columnTwelveEli,
    columnProgram,
    'Apprenticeship'
  );

  const culTwelveMonthsAch = countRows(
    columnTwelveAch,
    columnProgram,
    'Culinary Fundamentals'
  );
  const tranTwelveMonthsAch = countRows(
    columnTwelveAch,
    columnProgram,
    'Transitional Employment'
  );
  const appTwelveMonthsAch = countRows(
    columnTwelveAch,
    columnProgram,
    'Apprenticeship'
  );

  // Get the current date
  const currentDate = new Date();

  const culinaryComplete = countSuccess(columnProgram, columnSuccess, 'Culinary Fundamentals');
  const transitionalComplete = countSuccess(columnProgram, columnSuccess, 'Transitional Employment');
  const apprenticeComplete = countSuccess(columnProgram, columnSuccess, 'Apprenticeship');

  const culinaryPlaced = countPlaced(
    columnProgram,
    columnSuccess,
    columnPlaced,
    'Culinary Fundamentals'
  );
  const transitionalPlaced = countPlaced(
    columnProgram,
    columnSuccess,
    columnPlaced,
    'Transitional Employment'
  );
  const apprenticePlaced = countPlaced(
    columnProgram,
    columnSuccess,
    columnPlaced,
    'Apprenticeship'
  );

  // Remove the formatting to get integer data for summation
  let intVal = function (i) {
    return typeof i === "string"
      ? i.replace(/[\$,]/g, "") * 1
      : typeof i === "number"
      ? i
      : 0;
  };

  // Total over all pages
  culinary = api
    .column(2, { search: "applied" })
    .data()
    .filter(function (value) {
      return value === "Culinary Fundamentals";
    }).length;

  // Total over this page
  transitional = api
    .column(2, { search: "applied" })
    .data()
    .filter(function (value) {
      return value === "Transitional Employment";
    }).length;

  // Total over this page
  apprentice = api
    .column(2, { search: "applied" })
    .data()
    .filter(function (value) {
      return value === "Apprenticeship";
    }).length;


  const summaryFooter = document.getElementById("summaryFooter");

  const summaryData = [
    {
      Program: "Culinary",
      Total: culinary,
      Complete: culinaryComplete,
      Placed: culinaryPlaced,
      "Total Placed": decimalToPercent(culinaryPlaced / culinary),
      "Complete Placed": decimalToPercent(culinaryPlaced / culinaryComplete),
      "Eli 3 Mos": culThreeMonthsEli,
      "Ach 3 Mos": culThreeMonthsAch,
      "Eli 6 Mos": culSixMonthsEli,
      "Ach 6 Mos": culSixMonthsAch,
      "Eli 12 Mos": culTwelveMonthsEli,
      "Ach 12 Mos": culTwelveMonthsAch,
      "Avg Start Wage": `$${avgFirstWageCulinary}`,
      "Avg Current Wage": `$${avgLastWageCulinary}`,
    },
    {
      Program: "Transitional",
      Total: transitional,
      Complete: transitionalComplete,
      Placed: transitionalPlaced,
      "Total Placed": decimalToPercent(transitionalPlaced / transitional),
      "Complete Placed": decimalToPercent(transitionalPlaced / transitionalComplete),
      "Eli 3 Mos": tranThreeMonthsEli,
      "Ach 3 Mos": tranThreeMonthsAch,
      "Eli 6 Mos": tranSixMonthsEli,
      "Ach 6 Mos": tranSixMonthsAch,
      "Eli 12 Mos": tranTwelveMonthsEli,
      "Ach 12 Mos": tranTwelveMonthsAch,
      "Avg Start Wage": `$${avgFirstWageTransitional}`,
      "Avg Current Wage": `$${avgLastWageTransitional}`,
    },
    {
      Program: "Apprentice",
      Total: apprentice,
      Complete: apprenticeComplete,
      Placed: apprenticePlaced,
      "Total Placed": decimalToPercent(apprenticePlaced / apprentice),
      "Complete Placed": decimalToPercent(apprenticePlaced / apprenticeComplete),
      "Eli 3 Mos": appThreeMonthsEli,
      "Ach 3 Mos": appThreeMonthsAch,
      "Eli 6 Mos": appSixMonthsEli,
      "Ach 6 Mos": appSixMonthsAch,
      "Eli 12 Mos": appTwelveMonthsEli,
      "Ach 12 Mos": appTwelveMonthsAch,
      "Avg Start Wage": `$${avgFirstWageApprentice}`,
      "Avg Current Wage": `$${avgLastWageApprentice}`,
    },
  ];


function arrayToCsv(data) {
    // Extracting keys for CSV header
    const keys = Object.keys(data[0]);
    
    // Creating CSV content
    let csv = keys.join(',') + '\n'; // CSV header row

    data.forEach(obj => {
        const row = keys.map(key => obj[key]).join(',');
        csv += row + '\n';
    });

return csv
};


 window.exportCSV = function(){
    const data = arrayToCsv(summaryData); 
    result = {
        mode:"summaryCSV",
        dataCSV:data
    };

    FileMaker.PerformScriptWithOption(
        "Manage: Data Report",
        JSON.stringify(result),
        0
      );
 }


  summaryFooter.innerHTML = arrayToHtmlTable(summaryData);

  function arrayToHtmlTable(data) {
    let table = "<table>\n";
    // Adding table headers
    table += "<tr>";
    for (let key in data[0]) {
      table += `<th style="padding:2px 15px 2px 15px; text-align: right;">${key}</th>`;
    }
    table += "</tr>\n";

    // Adding table rows
    data.forEach((obj) => {
      table += "<tr>";
      for (let key in obj) {
        table += `<td style="padding:2px 15px 2px 15px; text-align: right;">${obj[key]}</td>`;
      }
      table += "</tr>\n";
    });

    table += "</table>";
    return table;
  }

  // Updated functions
  function countRows(column, columnProgram, program) {
    return column.filter((value, index) => value && value.trim() !== "" && columnProgram[index] === program).length;
  }



  function countSuccess(columnProgram, columnSuccess , program) {
    // Initialize counter for rows where program matches and success date is populated
    let programComplete = 0;

    // Iterate through the data
    for (let i = 0; i < columnProgram.length; i++) {
      // Check conditions for program match and success date being populated
      if (columnProgram[i] === program && columnSuccess[i] && columnSuccess[i].trim() !== "") {
        programComplete++;
      }
    }

    // Return the count of rows where program matches and success date is populated
    return programComplete;
  }

  function countPlaced(columnProgram, columnSuccess, columnPlaced, program) {
    // Initialize counter for rows where transitional, success, and placed are "Yes"
    let programPlaced = 0;

    // Iterate through the data
    for (let i = 0; i < columnProgram.length; i++) {
      // Check conditions for transitional, success, and placed
      if (
        columnProgram[i] === program &&
        columnPlaced[i] === "Yes"
      ) {
        programPlaced++;
      }
    }

    // Return the count of rows where transitional, success, and placed are "Yes"
    return programPlaced;
  }

  function decimalToPercent(decimal) {
    // Check if the input is NaN
    if (isNaN(decimal) || decimal === 0) {
      return "-";
    }

    // Convert decimal to percentage
    let percent = decimal * 100;

    // Format to two decimal places
    let formattedPercent = percent.toFixed(2);

    // Add percent sign
    return formattedPercent + "%";
  }

   // Function to calculate average based on program type
 function calculateAverage(wageColumn, programColumn, programFilter) {
  const filteredValues = wageColumn
    .map((wage, index) => {
      if (programColumn[index] === programFilter) {
        const numericWage = parseFloat(wage.toString().replace(/[\$,]/g, "")); // Convert to number
        return isNaN(numericWage) ? null : numericWage; // Ignore invalid numbers
      }
      return null;
    })
    .filter((value) => value !== null); // Remove null values

  if (filteredValues.length === 0) return "-"; // No valid numbers to average

  const sum = filteredValues.reduce((acc, val) => acc + val, 0);

  return (sum / filteredValues.length).toFixed(2); // Return formatted average
}

};

export { summaryFunction };
