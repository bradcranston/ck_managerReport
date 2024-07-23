const summaryFunction = (api) => {
  const columnCulinary = api.column(45, { search: "applied" }).data(); // Data from column index 45
  const columnSuccess = api.column(5, { search: "applied" }).data(); // Data from column index 5
  const columnTransitional = api.column(46, { search: "applied" }).data(); // Data from column index 5
  const columnApprentice = api.column(47, { search: "applied" }).data(); // Data from column index 5
  const columnPlaced = api.column(48, { search: "applied" }).data(); // Data from column index 5
  const columnfJobStart = api.column(36, { search: "applied" }).data(); // Data from column index 45
  const columnThreeAch = api.column(49, { search: "applied" }).data(); // Data from column index 45
  const columnSixAch = api.column(50, { search: "applied" }).data(); // Data from column index 45
  const columnTwelveAch = api.column(51, { search: "applied" }).data(); // Data from column index 45

  // Initialize counter for rows where current date is 3 months past fJobStart
  const culThreeMonthsEli = countRowsThreeMonthsPast(
    columnCulinary,
    columnSuccess,
    columnfJobStart
  );
  const tranThreeMonthsEli = countRowsThreeMonthsPast(
    columnTransitional,
    columnSuccess,
    columnfJobStart
  );
  const appThreeMonthsEli = countRowsThreeMonthsPast(
    columnApprentice,
    columnSuccess,
    columnfJobStart
  );

  const culThreeMonthsAch = countRowsThreeMonthsAch(
    columnCulinary,
    columnSuccess,
    columnfJobStart,
    columnThreeAch
  );

  const tranThreeMonthsAch = countRowsThreeMonthsAch(
    columnTransitional,
    columnSuccess,
    columnfJobStart,
    columnThreeAch
  );

  const appThreeMonthsAch = countRowsThreeMonthsAch(
    columnApprentice,
    columnSuccess,
    columnfJobStart,
    columnThreeAch
  );

  // Initialize counter for rows where current date is 3 months past fJobStart
  const culSixMonthsEli = countRowsSixMonthsPast(
    columnCulinary,
    columnSuccess,
    columnfJobStart
  );
  const tranSixMonthsEli = countRowsSixMonthsPast(
    columnTransitional,
    columnSuccess,
    columnfJobStart
  );
  const appSixMonthsEli = countRowsSixMonthsPast(
    columnApprentice,
    columnSuccess,
    columnfJobStart
  );

  const culSixMonthsAch = countRowsSixMonthsAch(
    columnCulinary,
    columnSuccess,
    columnfJobStart,
    columnSixAch
  );
  const tranSixMonthsAch = countRowsSixMonthsAch(
    columnTransitional,
    columnSuccess,
    columnfJobStart,
    columnSixAch
  );
  const appSixMonthsAch = countRowsSixMonthsAch(
    columnApprentice,
    columnSuccess,
    columnfJobStart,
    columnSixAch
  );

  // Initialize counter for rows where current date is 3 months past fJobStart
  const culTwelveMonthsEli = countRowsTwelveMonthsPast(
    columnCulinary,
    columnSuccess,
    columnfJobStart
  );
  const tranTwelveMonthsEli = countRowsTwelveMonthsPast(
    columnTransitional,
    columnSuccess,
    columnfJobStart
  );
  const appTwelveMonthsEli = countRowsTwelveMonthsPast(
    columnApprentice,
    columnSuccess,
    columnfJobStart
  );

  const culTwelveMonthsAch = countRowsTwelveMonthsAch(
    columnTransitional,
    columnSuccess,
    columnfJobStart,
    columnTwelveAch
  );
  const tranTwelveMonthsAch = countRowsTwelveMonthsAch(
    columnTransitional,
    columnSuccess,
    columnfJobStart,
    columnTwelveAch
  );
  const appTwelveMonthsAch = countRowsTwelveMonthsAch(
    columnTransitional,
    columnSuccess,
    columnfJobStart,
    columnTwelveAch
  );

  // Get the current date
  const currentDate = new Date();

  const culinaryComplete = countSuccess(columnCulinary, columnSuccess);
  const transitionalComplete = countSuccess(columnTransitional, columnSuccess);
  const apprenticeComplete = countSuccess(columnApprentice, columnSuccess);

  const culinaryPlaced = countPlaced(
    columnCulinary,
    columnSuccess,
    columnPlaced
  );
  const transitionalPlaced = countPlaced(
    columnTransitional,
    columnSuccess,
    columnPlaced
  );
  const apprenticePlaced = countPlaced(
    columnApprentice,
    columnSuccess,
    columnPlaced
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
    .column(45, { search: "applied" })
    .data()
    .filter(function (value) {
      return value === "Yes";
    }).length;

  // Total over this page
  transitional = api
    .column(46, { search: "applied" })
    .data()
    .filter(function (value) {
      return value === "Yes";
    }).length;

  // Total over this page
  apprentice = api
    .column(47, { search: "applied" })
    .data()
    .filter(function (value) {
      return value === "Yes";
    }).length;

  const summaryFooter = document.getElementById("summaryFooter");

  const summaryData = [
    {
      Program: "Culinary",
      Total: culinary,
      Complete: culinaryComplete,
      Placed: culinaryPlaced,
      "Total Placed": decimalToPercent(culinaryPlaced / culinary),
      "Complete Placed": decimalToPercent(culinaryComplete / culinary),
      "Eli 3 Mos": culThreeMonthsEli,
      "Ach 3 Mos": culThreeMonthsAch,
      "Eli 6 Mos": culSixMonthsEli,
      "Ach 6 Mos": culSixMonthsAch,
      "Eli 12 Mos": culTwelveMonthsEli,
      "Ach 12 Mos": culTwelveMonthsAch,
    },
    {
      Program: "Transitional",
      Total: transitional,
      Complete: transitionalComplete,
      Placed: transitionalPlaced,
      "Total Placed": decimalToPercent(transitionalPlaced / transitional),
      "Complete Placed": decimalToPercent(transitionalComplete / transitional),
      "Eli 3 Mos": tranThreeMonthsEli,
      "Ach 3 Mos": tranThreeMonthsAch,
      "Eli 6 Mos": tranSixMonthsEli,
      "Ach 6 Mos": tranSixMonthsAch,
      "Eli 12 Mos": tranTwelveMonthsEli,
      "Ach 12 Mos": tranTwelveMonthsAch,
    },
    {
      Program: "Apprentice",
      Total: apprentice,
      Complete: apprenticeComplete,
      Placed: apprenticePlaced,
      "Total Placed": decimalToPercent(apprenticePlaced / apprentice),
      "Complete Placed": decimalToPercent(apprenticeComplete / apprentice),
      "Eli 3 Mos": appThreeMonthsEli,
      "Ach 3 Mos": appThreeMonthsAch,
      "Eli 6 Mos": appSixMonthsEli,
      "Ach 6 Mos": appSixMonthsAch,
      "Eli 12 Mos": appTwelveMonthsEli,
      "Ach 12 Mos": appTwelveMonthsAch,
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

  function countRowsThreeMonthsPast(
    columnProgram,
    columnSuccess,
    columnfJobStart
  ) {
    // Initialize counter for rows where current date is 3 months past fJobStart
    var threeMonthsPastCount = 0;

    // Get the current date
    var currentDate = new Date();

    // Iterate through the data
    for (var i = 0; i < columnProgram.length; i++) {
      // Check conditions for transitional and success
      if (columnProgram[i] === "Yes" && columnSuccess[i] === "Yes") {
        // Get the fJobStart date from the column (assuming it's a Date object or a parsable date string)
        var fJobStartDate = new Date(columnfJobStart[i]);

        // Calculate the date that is 3 months from fJobStart
        var threeMonthsPastDate = new Date(fJobStartDate);
        threeMonthsPastDate.setMonth(threeMonthsPastDate.getMonth() + 3);

        // Check if the current date is 3 months past fJobStart
        if (currentDate >= threeMonthsPastDate) {
          threeMonthsPastCount++;
        }
      }
    }

    // Return the count of rows where the current date is 3 months past fJobStart
    return threeMonthsPastCount;
  }

  function countRowsThreeMonthsAch(
    columnProgram,
    columnSuccess,
    columnfJobStart,
    columnThreeMonthsAch
  ) {
    // Initialize counter for rows where current date is 3 months past fJobStart
    var threeMonthsPastCount = 0;

    // Get the current date
    var currentDate = new Date();

    // Iterate through the data
    for (var i = 0; i < columnProgram.length; i++) {
      // Check conditions for transitional and success
      if (
        columnProgram[i] === "Yes" &&
        columnSuccess[i] === "Yes" &&
        columnThreeMonthsAch[i] === "Yes"
      ) {
        // Get the fJobStart date from the column (assuming it's a Date object or a parsable date string)
        var fJobStartDate = new Date(columnfJobStart[i]);

        // Calculate the date that is 3 months from fJobStart
        var threeMonthsPastDate = new Date(fJobStartDate);
        threeMonthsPastDate.setMonth(threeMonthsPastDate.getMonth() + 3);

        // Check if the current date is 3 months past fJobStart
        if (currentDate >= threeMonthsPastDate) {
          threeMonthsPastCount++;
        }
      }
    }

    // Return the count of rows where the current date is 3 months past fJobStart
    return threeMonthsPastCount;
  }

  function countRowsSixMonthsPast(
    columnProgram,
    columnSuccess,
    columnfJobStart
  ) {
    // Initialize counter for rows where current date is 3 months past fJobStart
    var sixMonthsPastCount = 0;

    // Get the current date
    var currentDate = new Date();

    // Iterate through the data
    for (var i = 0; i < columnProgram.length; i++) {
      // Check conditions for transitional and success
      if (columnProgram[i] === "Yes" && columnSuccess[i] === "Yes") {
        // Get the fJobStart date from the column (assuming it's a Date object or a parsable date string)
        var fJobStartDate = new Date(columnfJobStart[i]);

        // Calculate the date that is 3 months from fJobStart
        var sixMonthsPastDate = new Date(fJobStartDate);
        sixMonthsPastDate.setMonth(sixMonthsPastDate.getMonth() + 6);

        // Check if the current date is 3 months past fJobStart
        if (currentDate >= sixMonthsPastDate) {
          sixMonthsPastCount++;
        }
      }
    }

    // Return the count of rows where the current date is 3 months past fJobStart
    return sixMonthsPastCount;
  }

  function countRowsSixMonthsAch(
    columnProgram,
    columnSuccess,
    columnfJobStart,
    columnSixMonthsAch
  ) {
    // Initialize counter for rows where current date is 3 months past fJobStart
    var sixMonthsPastCount = 0;

    // Get the current date
    var currentDate = new Date();

    // Iterate through the data
    for (var i = 0; i < columnProgram.length; i++) {
      // Check conditions for transitional and success
      if (
        columnProgram[i] === "Yes" &&
        columnSuccess[i] === "Yes" &&
        columnSixMonthsAch[i] === "Yes"
      ) {
        // Get the fJobStart date from the column (assuming it's a Date object or a parsable date string)
        var fJobStartDate = new Date(columnfJobStart[i]);

        // Calculate the date that is 3 months from fJobStart
        var sixMonthsPastDate = new Date(fJobStartDate);
        sixMonthsPastDate.setMonth(sixMonthsPastDate.getMonth() + 6);

        // Check if the current date is 3 months past fJobStart
        if (currentDate >= sixMonthsPastDate) {
          sixMonthsPastCount++;
        }
      }
    }

    // Return the count of rows where the current date is 3 months past fJobStart
    return sixMonthsPastCount;
  }

  function countRowsTwelveMonthsPast(
    columnProgram,
    columnSuccess,
    columnfJobStart
  ) {
    // Initialize counter for rows where current date is 3 months past fJobStart
    var twelveMonthsPastCount = 0;

    // Get the current date
    var currentDate = new Date();

    // Iterate through the data
    for (var i = 0; i < columnProgram.length; i++) {
      // Check conditions for transitional and success
      if (columnProgram[i] === "Yes" && columnSuccess[i] === "Yes") {
        // Get the fJobStart date from the column (assuming it's a Date object or a parsable date string)
        var fJobStartDate = new Date(columnfJobStart[i]);

        // Calculate the date that is 3 months from fJobStart
        var twelveMonthsPastDate = new Date(fJobStartDate);
        twelveMonthsPastDate.setMonth(twelveMonthsPastDate.getMonth() + 12);

        // Check if the current date is 3 months past fJobStart
        if (currentDate >= twelveMonthsPastDate) {
          twelveMonthsPastCount++;
        }
      }
    }

    // Return the count of rows where the current date is 3 months past fJobStart
    return twelveMonthsPastCount;
  }

  function countRowsTwelveMonthsAch(
    columnProgram,
    columnSuccess,
    columnfJobStart,
    columnTwelveMonthsAch
  ) {
    // Initialize counter for rows where current date is 3 months past fJobStart
    var twelveMonthsPastCount = 0;

    // Get the current date
    var currentDate = new Date();

    // Iterate through the data
    for (var i = 0; i < columnProgram.length; i++) {
      // Check conditions for transitional and success
      if (
        columnProgram[i] === "Yes" &&
        columnSuccess[i] === "Yes" &&
        columnTwelveMonthsAch[i] === "Yes"
      ) {
        // Get the fJobStart date from the column (assuming it's a Date object or a parsable date string)
        var fJobStartDate = new Date(columnfJobStart[i]);

        // Calculate the date that is 3 months from fJobStart
        var twelveMonthsPastDate = new Date(fJobStartDate);
        twelveMonthsPastDate.setMonth(twelveMonthsPastDate.getMonth() + 12);

        // Check if the current date is 3 months past fJobStart
        if (currentDate >= twelveMonthsPastDate) {
          twelveMonthsPastCount++;
        }
      }
    }

    // Return the count of rows where the current date is 3 months past fJobStart
    return twelveMonthsPastCount;
  }
  function countSuccess(columnProgram, columnSuccess) {
    // Initialize counter for rows where both culinary and success are "Yes"
    var programComplete = 0;

    // Iterate through the data
    for (let i = 0; i < columnProgram.length; i++) {
      // Check conditions for culinary and success
      if (columnProgram[i] === "Yes" && columnSuccess[i] === "Yes") {
        programComplete++;
      }
    }

    // Return the count of rows where both culinary and success are "Yes"
    return programComplete;
  }

  function countPlaced(columnProgram, columnSuccess, columnPlaced) {
    // Initialize counter for rows where transitional, success, and placed are "Yes"
    var programPlaced = 0;

    // Iterate through the data
    for (let i = 0; i < columnProgram.length; i++) {
      // Check conditions for transitional, success, and placed
      if (
        columnProgram[i] === "Yes" &&
        columnSuccess[i] === "Yes" &&
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
};

export { summaryFunction };
