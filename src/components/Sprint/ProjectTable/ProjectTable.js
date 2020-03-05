import React from "react";
import MaterialTable from "material-table";
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import yellow from '@material-ui/core/colors/yellow';

import { forwardRef } from 'react';

// import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
// import Check from '@material-ui/icons/Check';
// import ChevronLeft from '@material-ui/icons/ChevronLeft';
// import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
// import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
// import FilterList from '@material-ui/icons/FilterList';
// import FirstPage from '@material-ui/icons/FirstPage';
// import LastPage from '@material-ui/icons/LastPage';
// import Remove from '@material-ui/icons/Remove';
// import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
// import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    // Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    // Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    // Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    // Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    // DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    // Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    // Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    // FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    // LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    // NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    // PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    // ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    // ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
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
        // {title: "Project ID", field: "id", ...width100, ...color1}, // No need for user to see
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
        // {title: "Status End of Week 1 (0-100%)", field: "statusEndOfWeek1", ...width225, ...color5 },
        // {title: "Status End of Week 2 (0-100%)", field: "statusEndOfWeek2", ...width225, ...color5 },
        // {title: "Status End of Week 3 (0-100%)", field: "statusEndOfWeek3", ...width225, ...color5 },
        // {title: "Status End of Week 4 (0-100%)", field: "statusEndOfWeek4", ...width225, ...color5 },
        // {title: "Status End of Week 5 (0-100%)", field: "statusEndOfWeek5", ...width225, ...color5 },
        // {title: "Status End of Week 6 (0-100%)", field: "statusEndOfWeek6", ...width225, ...color5 },
        // {title: "Status End of Week 7 (0-100%)", field: "statusEndOfWeek7", ...width225, ...color5 },
        // {title: "Status End of Week 8 (0-100%)", field: "statusEndOfWeek8", ...width225, ...color5 },
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
          let newRowData = {...rowData};
          delete newRowData['tableData'];
          return props.onOpenProject(newRowData, props.sprintId, manualColumnNames);
        }
      }];

    if (props.pastSprint) {
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