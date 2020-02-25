import * as actionTypes from '../actions/actionTypes';

const initialState = {
    sprints: [{
        id: 1,
        order: 1,
        startDate: 'February 24, 2020',
        endDate: 'March 6, 2020',
        participants: ['Mike', 'Bobby'],
        owner: 'Mike',
        projects: [
            {
                id: { displayName: "Project ID", displayOnSprint: true, value: 1 },
                name: { displayName: "Project Name", displayOnSprint: true, value: 'Verify course equivalencies & Grad Requirements in Illuminate' },
                manager: { displayName: "Project Manager", displayOnSprint: true, value: 'Bobby' },
                description: { displayName: "Description", displayOnSprint: true, value: '-Audit all historical expeditions grades & match courses to equivalents' },
                category: { displayName: "Category", displayOnSprint: true, value: 'Grades & Transcripts' },
                categoryLead: { displayName: "Category Lead", displayOnSprint: true, value: 'Bobby' },
                estimatedProjectSize: { displayName: "Estimated Project Size", displayOnSprint: true, value: '3 - Small-to-Medium' },
                mustDo: { displayName: "Must Do or Nice-to-Have?", displayOnSprint: true, value: 'Nice-to-Have' },
                externalDueDate: { displayName: "External Due Date", displayOnSprint: true, value: null },
                deliverables: { displayName: "Deliverables / Outcomes", displayOnSprint: true, value: 'Historical Illuminate courses matched with current equivalencies.' },
                deliverableLink: { displayName: "Link to Deliverable", displayOnSprint: true, value: null },
                notes: { displayName: "Notes", displayOnSprint: true, value: null },
                completionStatus: { displayName: "Did We Fully Complete the Expected Deliverable?", displayOnSprint: true, value: null },
                notCompletedExplanation: { displayName: "If Not, Why Not?", displayOnSprint: true, value: null },
                statusEndOfWeek1: { displayName: "Status End of Week 1 (0-100%)", displayOnSprint: true, value: null },
                statusEndOfWeek2: { displayName: "Status End of Week 2 (0-100%)", displayOnSprint: true, value: null },
                statusEndOfWeek3: { displayName: "Status End of Week 3 (0-100%)", displayOnSprint: true, value: null },
                statusEndOfWeek4: { displayName: "Status End of Week 4 (0-100%)", displayOnSprint: true, value: null },
            },
            {
                id: { displayName: "Project ID", displayOnSprint: true, value: 2 },
                name: { displayName: "Project Name", displayOnSprint: true, value: 'Verify course equivalencies & Grad Requirements in Illuminate' },
                manager: { displayName: "Project Manager", displayOnSprint: true, value: 'Bobby' },
                description: { displayName: "Description", displayOnSprint: true, value: '-Audit all historical expeditions grades & match courses to equivalents' },
                category: { displayName: "Category", displayOnSprint: true, value: 'Grades & Transcripts' },
                categoryLead: { displayName: "Category Lead", displayOnSprint: true, value: 'Bobby' },
                estimatedProjectSize: { displayName: "Estimated Project Size", displayOnSprint: true, value: '3 - Small-to-Medium' },
                mustDo: { displayName: "Must Do or Nice-to-Have?", displayOnSprint: true, value: 'Nice-to-Have' },
                externalDueDate: { displayName: "External Due Date", displayOnSprint: true, value: null },
                deliverables: { displayName: "Deliverables / Outcomes", displayOnSprint: true, value: 'Historical Illuminate courses matched with current equivalencies.' },
                deliverableLink: { displayName: "Link to Deliverable", displayOnSprint: true, value: null },
                notes: { displayName: "Notes", displayOnSprint: true, value: null },
                completionStatus: { displayName: "Did We Fully Complete the Expected Deliverable?", displayOnSprint: true, value: null },
                notCompletedExplanation: { displayName: "If Not, Why Not?", displayOnSprint: true, value: null },
                statusEndOfWeek1: { displayName: "Status End of Week 1 (0-100%)", displayOnSprint: true, value: null },
                statusEndOfWeek2: { displayName: "Status End of Week 2 (0-100%)", displayOnSprint: true, value: null },
                statusEndOfWeek3: { displayName: "Status End of Week 3 (0-100%)", displayOnSprint: true, value: null },
                statusEndOfWeek4: { displayName: "Status End of Week 4 (0-100%)", displayOnSprint: true, value: null },
            },
            {
                id: { displayName: "Project ID", displayOnSprint: true, value: 3 },
                name: { displayName: "Project Name", displayOnSprint: true, value: 'Verify course equivalencies & Grad Requirements in Illuminate' },
                manager: { displayName: "Project Manager", displayOnSprint: true, value: 'Bobby' },
                description: { displayName: "Description", displayOnSprint: true, value: '-Audit all historical expeditions grades & match courses to equivalents' },
                category: { displayName: "Category", displayOnSprint: true, value: 'Grades & Transcripts' },
                categoryLead: { displayName: "Category Lead", displayOnSprint: true, value: 'Bobby' },
                estimatedProjectSize: { displayName: "Estimated Project Size", displayOnSprint: true, value: '3 - Small-to-Medium' },
                mustDo: { displayName: "Must Do or Nice-to-Have?", displayOnSprint: true, value: 'Nice-to-Have' },
                externalDueDate: { displayName: "External Due Date", displayOnSprint: true, value: null },
                deliverables: { displayName: "Deliverables / Outcomes", displayOnSprint: true, value: 'Historical Illuminate courses matched with current equivalencies.' },
                deliverableLink: { displayName: "Link to Deliverable", displayOnSprint: true, value: null },
                notes: { displayName: "Notes", displayOnSprint: true, value: null },
                completionStatus: { displayName: "Did We Fully Complete the Expected Deliverable?", displayOnSprint: true, value: null },
                notCompletedExplanation: { displayName: "If Not, Why Not?", displayOnSprint: true, value: null },
                statusEndOfWeek1: { displayName: "Status End of Week 1 (0-100%)", displayOnSprint: true, value: null },
                statusEndOfWeek2: { displayName: "Status End of Week 2 (0-100%)", displayOnSprint: true, value: null },
                statusEndOfWeek3: { displayName: "Status End of Week 3 (0-100%)", displayOnSprint: true, value: null },
                statusEndOfWeek4: { displayName: "Status End of Week 4 (0-100%)", displayOnSprint: true, value: null },
            }
        ]
    }]
}

const getIndexWithSprintId = (state, sprintId) => {
    for(let i=0; i<state.sprints.length; i++) {
        if(state.sprints[i].id === sprintId) {
            return i;
        }
    };

    // If no match found, return null
    return null;
}

const updateProject = (state, action) => {
    //     type: actionTypes.UPDATE_PROJECT,
    //     sprintId: sprintId,
    //     projectData: projectData

    console.log('Should update the project in this function');
    console.log('SprintId:', action.sprintId);
    console.log('Sprint index:', getIndexWithSprintId(state, action.sprintId));

    return state; // Until I return the updated state
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.UPDATE_PROJECT: return updateProject(state, action);
        default: return state;
    }
}

export default reducer;