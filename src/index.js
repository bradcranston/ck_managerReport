//import { data } from "./data.js";

window.loadData = (json) => {
  const data = JSON.parse(json);

  const dt = new DataTable("#table", {
    data: data,
    paging: false,
    fixedHeader: true,
    scrollCollapse: true,
    scrollY: "400px",
    footerCallback: function (row, data, start, end, display) {
      const api = this.api();

      const columnCulinary = api.column(45, { search: "applied" }).data(); // Data from column index 45
      const columnSuccess = api.column(5, { search: "applied" }).data(); // Data from column index 5
      const columnTransitional = api.column(46, { search: "applied" }).data(); // Data from column index 5
      const columnApprentice = api.column(47, { search: "applied" }).data(); // Data from column index 5
      const columnPlaced = api.column(48, { search: "applied" }).data(); // Data from column index 5
      const columnfJobStart = api.column(36, { search: "applied" }).data(); // Data from column index 45
      const columnThreeAch = api.column(49, { search: "applied" }).data(); // Data from column index 45
      const columnSixAch = api.column(50, { search: "applied" }).data(); // Data from column index 45
      const columnTwelveAch = api.column(51, { search: "applied" }).data(); // Data from column index 45

console.log(columnThreeAch);

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
      const transitionalComplete = countSuccess(
        columnTransitional,
        columnSuccess
      );
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

      // Update footer headers
      api.column(0).footer().innerHTML =
        "<strong>Program</strong>" +
        "<br>" +
        "Culinary " +
        "<br>" +
        "Transitional " +
        "<br>" +
        "Apprentice ";

      // Update footer totals
      api.column(1).footer().innerHTML =
        "<strong>Total</strong>" +
        "<br>" +
        culinary +
        "<br>" +
        transitional +
        "<br>" +
        apprentice;

      // Update footer complete
      api.column(2).footer().innerHTML =
        "<strong>Complete</strong>" +
        "<br>" +
        culinaryComplete +
        "<br>" +
        transitionalComplete +
        "<br>" +
        apprenticeComplete;

      // Update footer placed
      api.column(3).footer().innerHTML =
        "<strong>Placed</strong>" +
        "<br>" +
        culinaryPlaced +
        "<br>" +
        transitionalPlaced +
        "<br>" +
        apprenticePlaced;

      // Update footer placed
      api.column(4).footer().innerHTML =
        "<strong>Total Placed</strong>" +
        "<br>" +
        decimalToPercent(culinaryPlaced / culinary) +
        "<br>" +
        decimalToPercent(transitionalPlaced / transitional) +
        "<br>" +
        decimalToPercent(apprenticePlaced / apprentice) ;


              // Update footer placed
      api.column(5).footer().innerHTML =
      "<strong>Complete Placed</strong>" +
      "<br>" +
      decimalToPercent(culinaryPlaced / culinaryComplete) +
      "<br>" +
      decimalToPercent(transitionalPlaced / transitionalComplete) +
      "<br>" +
      decimalToPercent(apprenticePlaced / apprenticeComplete) ;





      // Update footer
      api.column(6).footer().innerHTML =
        "<strong>Eligible 3 Mos</strong>" +
        "<br>" +
        culThreeMonthsEli +
        "<br>" +
        tranThreeMonthsEli +
        "<br>" +
        appThreeMonthsEli;

      // Update footer
      api.column(7).footer().innerHTML =
        "<strong>Achieved 3 Mos</strong>" +
        "<br>" +
        culThreeMonthsAch +
        "<br>" +
        tranThreeMonthsAch +
        "<br>" +
        appThreeMonthsAch ;


      // Update footer
      api.column(8).footer().innerHTML =
      "<strong>Eligible 6 Mos</strong>" +
      "<br>" +
      culSixMonthsEli +
      "<br>" +
      tranSixMonthsEli +
      "<br>" +
      appSixMonthsEli;

    // Update footer
    api.column(9).footer().innerHTML =
      "<strong>Achieved 6 Mos</strong>" +
      "<br>" +
      culSixMonthsAch +
      "<br>" +
      tranSixMonthsAch +
      "<br>" +
      appSixMonthsAch ;



      // Update footer
      api.column(10).footer().innerHTML =
      "<strong>Eligible 12 Mos</strong>" +
      "<br>" +
      culTwelveMonthsEli +
      "<br>" +
      tranTwelveMonthsEli +
      "<br>" +
      appTwelveMonthsEli;

    // Update footer
    api.column(11).footer().innerHTML =
      "<strong>Achieved 12 Mos</strong>" +
      "<br>" +
      culTwelveMonthsAch +
      "<br>" +
      tranTwelveMonthsAch +
      "<br>" +
      appTwelveMonthsAch ;
    },
    layout: {

      bottomEnd: {
        
        buttons: [
          {
              extend: 'colvis',
              collectionLayout: 'fixed columns',
              popoverTitle: 'Column visibility control'
          }
      ]
    },
      topStart: "searchBuilder"
    },
    columns: [
      {
        data: "caseId",
        name: "caseId",
        title: "Case ID",
      },
      {
        data: "active",
        title: "Active",
        name: "Active",
        type: "boolean",
      },
      {
        data: "name",
        title: "Name",
        name: "Name",
      },
      {
        data: "stage",
        title: "Stage",
        name: "stage",
      },
      {
        data: "enrolled",
        title: "Enrolled",
        name: "enrolled",
      },
      {
        data: "success",
        title: "Successful",
        name: "success",
      },
      {
        data: "passedProgram",
        title: "Passed Program",
        name: "passedProgram",
      },
      {
        data: "passedProbation",
        title: "Passed Probation",
        name: "passedProbation",
      },
      {
        data: "outOfProgram",
        title: "Out Of Program",
        name: "outOfProgram",
      },
      {
        data: "programStart",
        title: "Program Start",
        name: "programStart",
        type: "date",
      },
      {
        data: "programFY",
        title: "Program FY",
        name: "programFY",
      },
      {
        data: "archive",
        title: "Archive",
        name: "archive",
      },
      {
        data: "referralSource",
        title: "Referral Source",
        name: "referralSource",
      },
      {
        data: "fundingSource",
        title: "Funding Source",
        name: "fundingSource",
      },
      {
        data: "trainingExit",
        title: "Training Exit",
        name: "trainingExit",
      },
      {
        data: "drugHistory",
        title: "Drug History",
        name: "drugHistory",
      },
      {
        data: "alcoholHistory",
        title: "Alcohol History",
        name: "alcoholHistory",
      },
      {
        data: "mentalHistory",
        title: "Mental Health History",
        name: "mentalHistory",
      },
      {
        data: "criminalHistory",
        title: "Criminal History",
        name: "criminalHistory",
      },
      {
        data: "criminalCurrent",
        title: "Currently Serving Time",
        name: "criminalCurrent",
      },
      {
        data: "criminalStatus",
        title: "Criminal Status",
        name: "criminalStatus",
      },
      {
        data: "monthlyIncome",
        title: "Monthly Income",
        name: "monthlyIncome",
      },
      {
        data: "diplomaGED",
        title: "Diploma or GED",
        name: "diplomaGED",
      },
      {
        data: "otherAgencies",
        title: "Other Agencies",
        name: "otherAgencies",
      },
      {
        data: "employedCurrently",
        title: "Currently Employed",
        name: "employedCurrently",
      },
      {
        data: "age",
        title: "Age",
        name: "age",
      },
      {
        data: "gender",
        title: "Gender",
        name: "gender",
      },
      {
        data: "race",
        title: "Race",
        name: "race",
      },
      {
        data: "headofHouse",
        title: "Head of House",
        name: "headofHouse",
      },
      {
        data: "singleParent",
        title: "Single Parent",
        name: "singleParent",
      },
      {
        data: "numberChildren",
        title: "Number of Children",
        name: "numberChildren",
      },
      {
        data: "childCareIssue",
        title: "Childcare Issues",
        name: "childCareIssue",
      },
      {
        data: "veteran",
        title: "Veteran",
        name: "veteran",
      },
      {
        data: "i9Doc",
        title: "i9 Documentation",
        name: "i9Doc",
      },
      {
        data: "jobLastStartDate",
        title: "Last Job Start",
        name: "jobLastStartDate",
      },
      {
        data: "jobLastStartWage",
        title: "Last Wage Start",
        name: "jobLastStartWage",
      },
      {
        data: "jobFirstStartDate",
        title: "First Job Start",
        name: "jobFirstStartDate",
      },
      {
        data: "jobFirstStartWage",
        title: "First Wage Start",
        name: "jobFirstStartWage",
      },
      {
        data: "tjo",
        title: "TJO",
        name: "tjo",
      },
      {
        data: "birthDate",
        title: "Birthdate",
        name: "birthDate",
      },
      {
        data: "lastGrade",
        title: "Last Grade Completed",
        name: "lastGrade",
      },
      {
        data: "ageAtEnrollment",
        title: "Age At Enrollment",
        name: "ageAtEnrollment",
      },

      {
        data: "class",
        title: "Class",
        name: "Class",
      },
      {
        data: "household",
        title: "Household Size",
        name: "household",
      },
      {
        data: "company",
        title: "Company",
        name: "company",
      },
      {
        data: "culinary",
        title: "Culinary",
        name: "culinary",
        id: "culinary",
      },
      {
        data: "transitional",
        title: "Transitional",
        name: "transitional",
      },
      {
        data: "apprentice",
        title: "Apprentice",
        name: "apprentice",
      },
      {
        data: "placed",
        title: "Placed",
        name: "placed",
      },
      {
        data: "reten3mo",
        title: "3M Retention",
        name: "reten3mo",
      },
      {
        data: "reten6mo",
        title: "6M Retention",
        name: "reten6mo",
      },
      {
        data: "reten12mo",
        title: "12M Retention",
        name: "reten12mo",
      },
    ],

    columnDefs: [{ type: "de_date", targets: 6 }],
  });

  window.getDetails = function () {
    const result = {
      mode: "storeData",
      data: dt.searchBuilder.getDetails(),
    };
    FileMaker.PerformScriptWithOption(
      "Manage: Data Report",
      JSON.stringify(result),
      0
    );
  };

  window.rebuild = function (stored) {
    dt.searchBuilder.rebuild(JSON.parse(stored));
  };

  document.querySelectorAll("a.toggle-vis").forEach((el) => {
    el.addEventListener("click", function (e) {
      e.preventDefault();

      let columnIdx = e.target.getAttribute("data-column");
      let column = dt.column(columnIdx);

      // Toggle the visibility
      column.visible(!column.visible());
    });
  });

  window.exportFM = function () {
    let dataExport = dt.buttons.exportData({ columns: ":visible" });
    let build = {
      dataExport: dataExport,
      mode: "dataExport",
    };
    console.log(build);
    FileMaker.PerformScriptWithOption(
      "Manage: Data Report",
      JSON.stringify(build),
      "0"
    );
  };

  $(".dataTable").on("click", "tbody tr", function () {
    let build = {
      data: dt.row(this).data(),
      mode: "navigate",
    };
    FileMaker.PerformScriptWithOption(
      "Manage: Data Report",
      JSON.stringify(build),
      "0"
    );;
  });



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
  };

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
  };

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
  };

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
  };

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
  };

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
  };
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
  };

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
  };

  function decimalToPercent(decimal) {
    // Check if the input is NaN
    if (isNaN(decimal) || decimal === 0 ) {
      return "-";
  }

  // Convert decimal to percentage
  let percent = decimal * 100;
  
  // Format to two decimal places
  let formattedPercent = percent.toFixed(2);
  
  // Add percent sign
  return formattedPercent + '%';
};

};
