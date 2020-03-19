import React from "react";
import MaterialTable from "material-table";
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import yellow from '@material-ui/core/colors/yellow';

import { forwardRef } from 'react';

import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Clear from '@material-ui/icons/Clear';
import Edit from '@material-ui/icons/Edit';
import Search from '@material-ui/icons/Search';

const tableIcons = {
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  };

const projectTable = (props) => {
    // Widths for table columns
    const width100 = { width: 100 };
    const width150 = { width: 150 };
    const width200 = { width: 200 };
    const width225 = { width: 225 };
    const width250 = { width: 250 };
    const width350 = { width: 350 };

    // Colors for sections of table column headers
    let color1 = { headerStyle: { backgroundColor: blue[500] }};
    let color2 = { headerStyle: { backgroundColor: blue[600] }};
    let color3 = { headerStyle: { backgroundColor: blue[700] }};
    let color4 = { headerStyle: { backgroundColor: blue[800] }};
    let color5 = { headerStyle: { backgroundColor: blue[900] }};

    if(props.sprintType === "next") {
        color1 = { headerStyle: { backgroundColor: red[400] }};
        color2 = { headerStyle: { backgroundColor: red[500] }};
        color3 = { headerStyle: { backgroundColor: red[600] }};
        color4 = { headerStyle: { backgroundColor: red[700] }};
        color5 = { headerStyle: { backgroundColor: red[800] }};
    } else if(props.sprintType === "queue") {
        color1 = { headerStyle: { backgroundColor: grey[300], color: '#000' }};
        color2 = { headerStyle: { backgroundColor: grey[400], color: '#000' }};
        color3 = { headerStyle: { backgroundColor: grey[500], color: '#000' }};
        color4 = { headerStyle: { backgroundColor: grey[600] }};
        color5 = { headerStyle: { backgroundColor: grey[700] }};
    } else if(props.sprintType === "past") {
        color1 = { headerStyle: { backgroundColor: yellow[400], color: '#000' }};
        color2 = { headerStyle: { backgroundColor: yellow[500], color: '#000' }};
        color3 = { headerStyle: { backgroundColor: yellow[600], color: '#000' }};
        color4 = { headerStyle: { backgroundColor: yellow[700], color: '#000' }};
        color5 = { headerStyle: { backgroundColor: yellow[800], color: '#000' }};
    } 

    const defaultBackgroundColor = color1.headerStyle.backgroundColor;

    const manualColumnNames = [
        {title: "Project Name", field: "name", ...width250, ...color1 },
        {title: "Project Manager", field: "manager", ...width100, ...color1 },
        {title: "Description", field: "description", ...width350, ...color1 },
        {title: "Category", field: "category", ...width150, ...color2 },
        {title: "Category Lead", field: "categoryLead", ...width100, ...color2 },
        {title: "Estimated Project Size", field: "estimatedProjectSize", ...width200, ...color2 },
        {title: "Must Do or Nice-to-Have?", field: "mustDo", ...width200, ...color2 },
        {title: "External Due Date", field: "externalDueDate", ...width150, ...color3 },
        {title: "Deliverables / Outcomes", field: "deliverables", ...width250, ...color3 },
        {title: "Link to Deliverable", field: "deliverableLink", ...width150, ...color3 },
        {title: "Notes", field: "notes", ...width250, ...color3 },
        {title: "Did We Fully Complete the Expected Deliverable?", field: "completionStatus", ...width250, ...color4 },
        {title: "If Not, Why Not?", field: "notCompletedExplanation", ...width250, ...color4 },
    ];

    // Add status columns
    for(let i=1; i<=props.sprintLength && i<=8; i++) { // Start at Week 1; don't go past Week 8
        const columnObject = {
            title: "Status End of Week " + i + " (0-100%)",
            field: "statusEndOfWeek" + i,
            ...width225,
            ...color5
        };

        manualColumnNames.push(columnObject);
    }

    // Load each row into a table data object of the expected format
    const formattedTableData = props.tableData.map(row => {
        let formattedRowObject = {};
        let keysArray = Object.keys(row);

        for (let i=0; i<keysArray.length; i++) {
            let key = keysArray[i];
            formattedRowObject[key] = row[key].value;
        }

        return formattedRowObject;
    });

    let actionsArray = [{
        icon: Edit,
        tooltip: 'Edit Project',
        onClick: (event, rowData) => {
            // console.log('rowData:', rowData);
            let newRowData = {...rowData};
            delete newRowData['tableData'];
            return props.onOpenProject(newRowData.id, props.sprintId);
        }
      }];

    if (props.sprintType === 'past') {
        actionsArray = [];
    }

    return (
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
            icons={tableIcons}
            columns={manualColumnNames}
            data={formattedTableData}
            title={props.tableTitle}
            actions={actionsArray}
            localization={{
                header: {
                    actions: ''
                }
            }}
            options={{
            //   filtering: true, // Search seems to accomplish the same thing
                tableLayout: 'fixed',
                sorting: true,
                headerStyle: {
                    backgroundColor: defaultBackgroundColor, // Default background color
                    color: '#FFF',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    padding: 10,
                },
                cellStyle: {
                    fontSize: '0.8rem',
                },
                showFirstLastPageButtons: false,
                padding: 'dense',
                fixedColumns: {
                    left: 1 // This is buggy but looks okay for one column
                },
                paging: false,
          }}
        />
      </div>
    );
}

export default projectTable;