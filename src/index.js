//import { data } from "./data.js";

import {summaryFunction} from "./summary.js"


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

      summaryFunction(api);

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

};
