// import * as actionTypes from '../actions/actionTypes';

const initialState = {
    sprints: [{
        id: 1,
        order: 1,
        startDate: 'February 24, 2020',
        endDate: 'March 6, 2020',
        participants: ['Mike', 'Bobby'],
        owner: 'Mike',
        projects: [{
            id: 1,
            name: 'Verify course equivalencies & Grad Requirements in Illuminate',
            manager: 'Bobby',
            description: '-Audit all historical expeditions grades & match courses to equivalents',
            category: 'Grades & Transcripts',
            categoryLead: 'Bobby',
            estimatedProjectSize: '3 - Small-to-Medium',
            mustDo: 'Nice-to-Have',
            externalDueDate: null,
            deliverables: 'Historical Illuminate courses matched with current equivalencies.',
            deliverableLink: null,
            notes: null,
            deliverableCompletion: {
                completed: null,
                notCompletedExplanation: null
            },
            weekByWeekStatuses: {
                week1: null,
                week2: null,
                week3: null,
                week4: null
            }
        }]
    }]

}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        default: return state;
    }
}

export default reducer;