import React, { Component } from "react";
import MaterialTable from "material-table";
import blue from '@material-ui/core/colors/blue';

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
    // Automatically get column names from first row of data; not using this approach in favor of manual formatting
    // const columnNames = Object.keys(props.tableData[0]).map(
    //     key => {
    //         return {
    //             title: props.tableData[0][key].displayName,
    //             field: key
    //         }
    //     }
    // );
    // console.log(columnNames);

    const width100 = { width: 100 };
    const width150 = { width: 150 };
    const width200 = { width: 200 };
    const width225 = { width: 225 };
    const width250 = { width: 250 };
    const width350 = { width: 350 };
    const blue500 = { headerStyle: { backgroundColor: blue[500] }};
    const blue600 = { headerStyle: { backgroundColor: blue[600] }};
    const blue700 = { headerStyle: { backgroundColor: blue[700] }};
    const blue800 = { headerStyle: { backgroundColor: blue[800] }};
    const blue900 = { headerStyle: { backgroundColor: blue[900] }};
    

    const manualColumnNames = [
        // {title: "Project ID", field: "id", ...width100, ...blue500}, // No need for user to see
        {title: "Project Name", field: "name", ...width250, ...blue500 },
        {title: "Project Manager", field: "manager", ...width100, ...blue500 },
        {title: "Description", field: "description", ...width350, ...blue500 },
        {title: "Category", field: "category", ...width150, ...blue600 },
        {title: "Category Lead", field: "categoryLead", ...width100, ...blue600 },
        {title: "Estimated Project Size", field: "estimatedProjectSize", ...width200, ...blue600 },
        {title: "Must Do or Nice-to-Have?", field: "mustDo", ...width200, ...blue600 },
        {title: "External Due Date", field: "externalDueDate", ...width150, ...blue700 },
        {title: "Deliverables / Outcomes", field: "deliverables", ...width250, ...blue700 },
        {title: "Link to Deliverable", field: "deliverableLink", ...width150, ...blue700 },
        {title: "Notes", field: "notes", ...width250, ...blue700 },
        {title: "Did We Fully Complete the Expected Deliverable?", field: "completionStatus", ...width250, ...blue800 },
        {title: "If Not, Why Not?", field: "notCompletedExplanation", ...width250, ...blue800 },
        {title: "Status End of Week 1 (0-100%)", field: "statusEndOfWeek1", ...width225, ...blue900 },
        {title: "Status End of Week 2 (0-100%)", field: "statusEndOfWeek2", ...width225, ...blue900 },
        {title: "Status End of Week 3 (0-100%)", field: "statusEndOfWeek3", ...width225, ...blue900 },
        {title: "Status End of Week 4 (0-100%)", field: "statusEndOfWeek4", ...width225, ...blue900 },
    ];

    // Load each row into a table data object of the expected format
    const formattedTableData = props.tableData.map(row => {
        let formattedRowObject = {};

        // console.log('row:');
        // console.log(row);

        let keysArray = Object.keys(row);
        // console.log('keysArray:', keysArray);

        for (let i=0; i<keysArray.length; i++) {
            let key = keysArray[i];
            // console.log('key:', key);
            formattedRowObject[key] = row[key].value;
        }

        // console.log('formattedRowObject:', formattedRowObject);
        
        return formattedRowObject;
    });

    // console.log(formattedTableData);

    return (
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
            icons={tableIcons}
            // columns={columnNames} // Favoring the manually formatted columns approach
            columns={manualColumnNames}
            data={formattedTableData}
            title={props.tableTitle}
            actions={[
                {
                  icon: Edit,
                  tooltip: 'Edit Project',
                  onClick: (event, rowData) => {
                    let newRowData = {...rowData};
                    delete newRowData['tableData'];
                    return props.onOpenProject(newRowData, props.sprintType, manualColumnNames);
                  }
                  
                //   {
                //       alert("You edited " + rowData.name);
                //       console.log(event);
                //       console.log(rowData);
                //       console.log(props.sprintType);
                //   },
                }]}
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
                    backgroundColor: blue[500], // Default background color
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


/* Original example. Note usage of "lookup".

<MaterialTable
            icons={tableIcons}
          columns={[
            { title: "First Name", field: "name" },
            { title: "Last Name", field: "surname" },
            { title: "Birth Year", field: "birthYear", type: "numeric" },
            {
              title: "Birth City",
              field: "birthCity",
              lookup: { 34: "Istanbul", 63: "Not Constantinople" }
            }
          ]}
          data={[
            { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 }
          ]}
          title={props.tableTitle}
        />
*/