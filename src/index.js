//import { data } from "./data.js";

import {summaryFunction} from "./summary.js"

window.loadData = (json) => {
  const data = JSON.parse(json);
  console.log('loadData called with', data.length, 'records');
  console.log('Sample record:', data[0]);

  // Helper functions for active trainee tracking
  function isActiveTraineeDuringPeriod(startDate, endDate, reportStartDate, reportEndDate) {
    if (!startDate || startDate.trim() === "") return false;
    
    try {
      const traineeStart = new Date(startDate);
      const traineeEnd = endDate && endDate.trim() !== "" ? new Date(endDate) : new Date(); // If no end date, assume still active
      const periodStart = new Date(reportStartDate);
      const periodEnd = new Date(reportEndDate);
      
      // Check if dates are valid
      if (isNaN(traineeStart.getTime()) || isNaN(periodStart.getTime()) || isNaN(periodEnd.getTime())) {
        console.warn('Invalid date found:', { startDate, endDate, reportStartDate, reportEndDate });
        return false;
      }
      
      // Check for overlap: trainee was active at any point during the report period
      return traineeStart <= periodEnd && traineeEnd >= periodStart;
    } catch (error) {
      console.error('Error parsing dates:', error, { startDate, endDate, reportStartDate, reportEndDate });
      return false;
    }
  }

  function countActiveTrainees(reportStartDate, reportEndDate) {
    let activeCount = 0;
    let startedCount = 0;
    let completedCount = 0;
    
    const allData = dt.rows({ search: 'applied' }).data();
    const allowedStatuses = ['Enrolled', 'Retention', 'Provisional'];
    
    for (let i = 0; i < allData.length; i++) {
      const rowData = allData[i];
      const startDate = rowData.programStart; 
      const endDate = rowData.trainingExit;   
      const programStatus = rowData.statusContact;
      
      // Only count rows with allowed Program Status
      if (!allowedStatuses.includes(programStatus)) {
        continue; // Skip this row
      }
      
      // Check if active during period
      if (isActiveTraineeDuringPeriod(startDate, endDate, reportStartDate, reportEndDate)) {
        activeCount++;
      }
      
      // Check if started during period
      if (startDate) {
        const start = new Date(startDate);
        const periodStart = new Date(reportStartDate);
        const periodEnd = new Date(reportEndDate);
        if (start >= periodStart && start <= periodEnd) {
          startedCount++;
        }
      }
      
      // Check if completed during period
      if (endDate) {
        const trimmedEndDate = typeof endDate === 'string' ? endDate.trim() : endDate.toString().trim();
        if (trimmedEndDate !== "") {
          const end = new Date(endDate);
          const periodStart = new Date(reportStartDate);
          const periodEnd = new Date(reportEndDate);
          if (end >= periodStart && end <= periodEnd) {
            completedCount++;
          }
        }
      }
    }
    
    return { activeCount, startedCount, completedCount };
  }

  const dt = new DataTable("#table", {
    data: data,
    paging: false,
    fixedHeader: true,
    scrollCollapse: true,
    scrollY: "400px",
    footerCallback: function () {
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
 columns : [
  {
    index: 0,
    data: null,
    name: "activeDuringPeriod",
    title: "Active During Period",
    orderable: false,
    searchable: false,
    render: function () {
      return '<span class="active-status badge badge-secondary">Not Set</span>';
    }
  },
  {
    index: 1,
    data: "caseId",
    name: "caseId",
    title: "Case ID",
  },
  {
    index: 2,
    data: "statusContact",
    title: "Program Status",
    name: "Program Status",
    type: "boolean",
  },
  {
    index: 3,
    data: "program",
    title: "Program",
    name: "Program"
  },
  {
    index: 4,
    data: "waitListDate",
    title: "Wait List Date",
    name: "waitListDate",
    type: "date",
  },
  {
    index: 5,
    data: "waitListNote",
    title: "Wait List Note",
    name: "waitListNote",
    width: "150px",
    render: function (data, type) {
      if (type === 'display' && data) {
        // Truncate text and add tooltip
        const truncatedText = data.length > 25 ? data.substring(0, 25) + '...' : data;
        return `<span title="${data}" class="wait-list-note">${truncatedText}</span>`;
      }
      return data || '';
    }
  },
  {
    index: 6,
    data: "name",
    title: "Name",
    name: "Name",
  },
  {
    index: 7,
    data: "phone",
    title: "Phone",
    name: "Phone",
  },
  {
    index: 8,
    data: "email",
    title: "Email",
    name: "Email",
  },
  {
    index: 9,
    data: "status",
    title: "Training Status",
    name: "status",
  },
  {
    index: 10,
    data: "enrolled",
    title: "Enrolled",
    name: "enrolled",
  },
  {
    index: 11,
    data: "rapid",
    title: "Rapid Re-hire",
    name: "rapid",
  },
  {
    index: 12,
    data: "passedProgram",
    title: "Completed Training",
    name: "passedProgram",
  },
  {
    index: 13,
    data: "passedProbation",
    title: "Passed Probation",
    name: "passedProbation",
  },
  {
    index: 14,
    data: "programStart",
    title: "Program Start",
    name: "programStart",
    type: "date",
  },
  {
    index: 15,
    data: "programFY",
    title: "Program FY",
    name: "programFY",
  },
  {
    index: 16,
    data: "programCY",
    title: "Program CY",
    name: "programCY",
  },
  {
    index: 17,
    data: "fsnap",
    title: "SNAP",
    name: "snap",
  },
  {
    index: 18,
    data: "firtp",
    title: "IRTP",
    name: "irtp",
  },
  {
    index: 19,
    data: "fbcc",
    title: "BCC",
    name: "bcc",
  },
  {
    index: 20,
    data: "archive",
    title: "Archive",
    name: "archive",
  },
  {
    index: 21,
    data: "zip",
    title: "Zip",
    name: "zip",
  },
  {
    index: 22,
    data: "referralSource",
    title: "Referral Source",
    name: "referralSource",
  },
  {
    index: 23,
    data: "referringAgency",
    title: "Referring Agency",
    name: "referringAgency",
  },
  {
    index: 24,
    data: "supportiveServicesKind",
    title: "Supportive Services",
    name: "supportiveServicesKind",
  },
  {
    index: 25,
    data: "caseWorker1",
    title: "Case Worker 1",
    name: "caseWorker1",
  },
  {
    index: 26,
    data: "caseWorkerPhone1",
    title: "Case Worker Phone 1",
    name: "caseWorkerPhone1",
  },
  {
    index: 27,
    data: "caseWorker2",
    title: "Case Worker 2",
    name: "caseWorker2",
  },
  {
    index: 28,
    data: "caseWorkerPhone2",
    title: "Case Worker Phone 2",
    name: "caseWorkerPhone2",
  },
  {
    index: 29,
    data: "percentFPL",
    title: "Percent of FPL",
    name: "percentFPL",
  },
  {
    index: 30,
    data: "trainingExit",
    title: "Training Exit",
    name: "trainingExit",
  },
  {
    index: 31,
    data: "drugHistory",
    title: "Drug History",
    name: "drugHistory",
  },
  {
    index: 32,
    data: "alcoholHistory",
    title: "Alcohol History",
    name: "alcoholHistory",
  },
  {
    index: 33,
    data: "mentalHistory",
    title: "Mental Health History",
    name: "mentalHistory",
  },
  {
    index: 34,
    data: "criminalHistory",
    title: "Criminal History",
    name: "criminalHistory",
  },
  {
    index: 35,
    data: "criminalCurrent",
    title: "Currently Serving Time",
    name: "criminalCurrent",
  },
  {
    index: 36,
    data: "criminalStatus",
    title: "Criminal Status",
    name: "criminalStatus",
  },
  {
    index: 37,
    data: "homeless",
    title: "Homeless/Insecure Housing",
    name: "homeless",
  },
  {
    index: 38,
    data: "monthlyIncome",
    title: "Monthly Income",
    name: "monthlyIncome",
  },
  {
    index: 39,
    data: "diplomaGED",
    title: "Diploma or GED",
    name: "diplomaGED",
  },
  {
    index: 40,
    data: "employedCurrently",
    title: "Currently Employed",
    name: "employedCurrently",
  },
  {
    index: 41,
    data: "age",
    title: "Age",
    name: "age",
  },
  {
    index: 42,
    data: "gender",
    title: "Gender",
    name: "gender",
  },
  {
    index: 43,
    data: "race",
    title: "Race",
    name: "race",
  },
  {
    index: 44,
    data: "headofHouse",
    title: "Head of House",
    name: "headofHouse",
  },
  {
    index: 45,
    data: "singleParent",
    title: "Single Parent",
    name: "singleParent",
  },
  {
    index: 46,
    data: "numberChildren",
    title: "Number of Children",
    name: "numberChildren",
  },
  {
    index: 47,
    data: "ageChildren",
    title: "Age of Children",
    name: "ageChildren",
  },
  {
    index: 48,
    data: "childCareIssue",
    title: "Childcare Issues",
    name: "childCareIssue",
  },
  {
    index: 49,
    data: "veteran",
    title: "Veteran",
    name: "veteran",
  },
  {
    index: 50,
    data: "i9Doc",
    title: "i9 Documentation",
    name: "i9Doc",
  },
  {
    index: 51,
    data: "jobLastStartDate",
    title: "Last Job Start",
    name: "jobLastStartDate",
  },
  {
    index: 52,
    data: "jobLastStartWage",
    title: "Current Wage",
    name: "jobLastStartWage",
  },
  {
    index: 53,
    data: "jobFirstStartDate",
    title: "First Job Start",
    name: "jobFirstStartDate",
  },
  {
    index: 54,
    data: "jobFirstStartWage",
    title: "Start Wage",
    name: "jobFirstStartWage",
  },
  {
    index: 55,
    data: "birthDate",
    title: "Birthdate",
    name: "birthDate",
  },
  {
    index: 56,
    data: "lastGrade",
    title: "Last Grade Completed",
    name: "lastGrade",
  },
  {
    index: 57,
    data: "ageAtEnrollment",
    title: "Age At Enrollment",
    name: "ageAtEnrollment",
  },
  {
    index: 58,
    data: "class",
    title: "Class",
    name: "Class",
  },
  {
    index: 59,
    data: "household",
    title: "Household Size",
    name: "household",
  },
  {
    index: 60,
    data: "company",
    title: "Company",
    name: "company",
  },
  {
    index: 61,
    data: "placed",
    title: "Placed",
    name: "placed",
  },
  {
    index: 62,
    data: "reten3moeli",
    title: "3M Retention Eligible",
    name: "reten3moeli",
  },
  {
    index: 63,
    data: "reten3mo",
    title: "3M Retention",
    name: "reten3mo",
  },
  {
    index: 64,
    data: "reten6moeli",
    title: "6M Retention Eligible",
    name: "reten6moeli",
  },
  {
    index: 65,
    data: "reten6mo",
    title: "6M Retention",
    name: "reten6mo",
  },
  {
    index: 66,
    data: "reten12moeli",
    title: "12M Retention Eligible",
    name: "reten12moeli",
  },
  {
    index: 67,
    data: "reten12mo",
    title: "12M Retention",
    name: "reten12mo",
  }
],

    columnDefs: [{ type: "de_date", targets: 6 }],
  });



  window.getDetails = function () {
    const result = {
      mode: "storeData",
      data: dt.searchBuilder.getDetails(),
      columns: dt.state().columns,
      state: dt.state()
    };
    FileMaker.PerformScriptWithOption(
      "Manage: Data Report",
      JSON.stringify(result),
      0
    );
  };


  window.hideAllCols = function () {
    dt.column(0).visible(false);
    dt.column(1).visible(false);
    dt.column(2).visible(false);
    dt.column(3).visible(false);
    dt.column(4).visible(false);
    dt.column(5).visible(false);
    dt.column(6).visible(false);
    dt.column(7).visible(false);
    dt.column(8).visible(false);
    dt.column(9).visible(false);
    dt.column(10).visible(false);
    dt.column(11).visible(false);
    dt.column(12).visible(false);
    dt.column(13).visible(false);
    dt.column(14).visible(false);
    dt.column(15).visible(false);
    dt.column(16).visible(false);
    dt.column(17).visible(false);
    dt.column(18).visible(false);
    dt.column(19).visible(false);
    dt.column(20).visible(false);
    dt.column(21).visible(false);
    dt.column(22).visible(false);
    dt.column(23).visible(false);
    dt.column(24).visible(false);
    dt.column(25).visible(false);
    dt.column(26).visible(false);
    dt.column(27).visible(false);
    dt.column(28).visible(false);
    dt.column(29).visible(false);
    dt.column(30).visible(false);
    dt.column(31).visible(false);
    dt.column(32).visible(false);
    dt.column(33).visible(false);
    dt.column(34).visible(false);
    dt.column(35).visible(false);
    dt.column(36).visible(false);
    dt.column(37).visible(false);
    dt.column(38).visible(false);
    dt.column(39).visible(false);
    dt.column(40).visible(false);
    dt.column(41).visible(false);
    dt.column(42).visible(false);
    dt.column(43).visible(false);
    dt.column(44).visible(false);
    dt.column(45).visible(false);
    dt.column(46).visible(false);
    dt.column(47).visible(false);
    dt.column(48).visible(false);
    dt.column(49).visible(false);
    dt.column(50).visible(false);
    dt.column(51).visible(false);
    dt.column(52).visible(false);
    dt.column(53).visible(false);
    dt.column(54).visible(false);
    dt.column(55).visible(false);
    dt.column(56).visible(false);
    dt.column(57).visible(false);
    dt.column(58).visible(false);
    dt.column(59).visible(false);
    dt.column(60).visible(false);
    dt.column(61).visible(false);
    dt.column(62).visible(false);
    dt.column(63).visible(false);
    dt.column(64).visible(false);
    dt.column(65).visible(false);
  };


  window.showAllCols = function () {
    dt.column(0).visible(true);
    dt.column(1).visible(true);
    dt.column(2).visible(true);
    dt.column(3).visible(true);
    dt.column(4).visible(true);
    dt.column(5).visible(true);
    dt.column(6).visible(true);
    dt.column(7).visible(true);
    dt.column(8).visible(true);
    dt.column(9).visible(true);
    dt.column(10).visible(true);
    dt.column(11).visible(true);
    dt.column(12).visible(true);
    dt.column(13).visible(true);
    dt.column(14).visible(true);
    dt.column(15).visible(true);
    dt.column(16).visible(true);
    dt.column(17).visible(true);
    dt.column(18).visible(true);
    dt.column(19).visible(true);
    dt.column(20).visible(true);
    dt.column(21).visible(true);
    dt.column(22).visible(true);
    dt.column(23).visible(true);
    dt.column(24).visible(true);
    dt.column(25).visible(true);
    dt.column(26).visible(true);
    dt.column(27).visible(true);
    dt.column(28).visible(true);
    dt.column(29).visible(true);
    dt.column(30).visible(true);
    dt.column(31).visible(true);
    dt.column(32).visible(true);
    dt.column(33).visible(true);
    dt.column(34).visible(true);
    dt.column(35).visible(true);
    dt.column(36).visible(true);
    dt.column(37).visible(true);
    dt.column(38).visible(true);
    dt.column(39).visible(true);
    dt.column(40).visible(true);
    dt.column(41).visible(true);
    dt.column(42).visible(true);
    dt.column(43).visible(true);
    dt.column(44).visible(true);
    dt.column(45).visible(true);
    dt.column(46).visible(true);
    dt.column(47).visible(true);
    dt.column(48).visible(true);
    dt.column(49).visible(true);
    dt.column(50).visible(true);
    dt.column(51).visible(true);
    dt.column(52).visible(true);
    dt.column(53).visible(true);
    dt.column(54).visible(true);
    dt.column(55).visible(true);
    dt.column(56).visible(true);
    dt.column(57).visible(true);
    dt.column(58).visible(true);
    dt.column(59).visible(true);
    dt.column(60).visible(true);
    dt.column(61).visible(true);
    dt.column(62).visible(true);
    dt.column(63).visible(true);
    dt.column(64).visible(true);
    dt.column(65).visible(true);
  };

  window.rebuild = function (stored) {
   // dt.searchBuilder.rebuild(JSON.parse(stored));
           // Restore the state to the table
           dt.state.clear(); // Optional: clear any previously saved state
           dt.state(JSON.parse(stored));
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

  // Date Range Filter Event Handlers
  $('#filterByDateRange').on('click', function() {
    const startDate = $('#startDate').val();
    const endDate = $('#endDate').val();
    
    if (!startDate || !endDate) {
      alert('Please select both start and end dates');
      return;
    }
    
    if (new Date(startDate) > new Date(endDate)) {
      alert('Start date must be before end date');
      return;
    }
    
    console.log('Filtering with date range:', startDate, 'to', endDate);
    
    // Apply custom search function to filter rows
    $.fn.dataTable.ext.search.push(function(settings, data, dataIndex) {
      // Get the row data
      const rowData = dt.row(dataIndex).data();
      const programStart = rowData.programStart;
      const trainingExit = rowData.trainingExit;
      const programStatus = rowData.statusContact;
      
      // Only include rows with specific Program Status values
      const allowedStatuses = ['Enrolled', 'Retention', 'Provisional'];
      if (!allowedStatuses.includes(programStatus)) {
        return false; // Hide rows that don't have the allowed status
      }
      
      const isActive = isActiveTraineeDuringPeriod(programStart, trainingExit, startDate, endDate);
      
      // Update the active status cell for this row
      const row = dt.row(dataIndex).node();
      if (row) {
        const cell = row.cells[0]; // First column (Active During Period)
        if (isActive) {
          cell.innerHTML = '<span class="active-status badge badge-success">Active</span>';
        } else {
          cell.innerHTML = '<span class="active-status badge badge-danger">Not Active</span>';
        }
      }
      
      return isActive; // Return true to show the row, false to hide it
    });
    
    // Redraw the table to apply the filter
    dt.draw();
    
    // Calculate and display summary counts
    const counts = countActiveTrainees(startDate, endDate);
    console.log('Summary counts:', counts);
    $('#activeTraineesCount').text(counts.activeCount);
    $('#startedDuringPeriod').text(counts.startedCount);
    $('#completedDuringPeriod').text(counts.completedCount);
    $('#activeSummary').show();
  });

  $('#clearDateFilter').on('click', function() {
    // Clear the date inputs
    $('#startDate').val('');
    $('#endDate').val('');
    
    // Remove the custom search filter
    $.fn.dataTable.ext.search.pop();
    
    // Reset all active status cells
    dt.rows().every(function() {
      const cell = this.node().cells[0]; // First column
      cell.innerHTML = '<span class="active-status badge badge-secondary">Not Set</span>';
    });
    
    // Redraw the table to show all rows
    dt.draw();
    
    // Hide the summary
    $('#activeSummary').hide();
  });

  // Toggle Active Trainees Report Section
  $('#toggleActiveTraineesReport').on('click', function() {
    const section = $('#activeTraineesReportSection');
    const button = $(this);
    
    if (section.is(':visible')) {
      section.slideUp(300);
      button.html('<i class="fas fa-chart-line"></i> Show Active Trainees Report');
      button.removeClass('btn-primary').addClass('btn-outline-primary');
    } else {
      section.slideDown(300);
      button.html('<i class="fas fa-chart-line"></i> Hide Active Trainees Report');
      button.removeClass('btn-outline-primary').addClass('btn-primary');
    }
  });

};
