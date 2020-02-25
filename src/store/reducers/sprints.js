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
                id: { value: 1 },
                name: { value: 'Verify course equivalencies & Grad Requirements in Illuminate' },
                manager: { value: 'Bobby' },
                description: { value: '-Audit all historical expeditions grades & match courses to equivalents' },
                category: { value: 'Grades & Transcripts' },
                categoryLead: { value: 'Bobby' },
                estimatedProjectSize: { value: '3 - Small-to-Medium' },
                mustDo: { value: 'Nice-to-Have' },
                externalDueDate: { value: '' },
                deliverables: { value: 'Historical Illuminate courses matched with current equivalencies.' },
                deliverableLink: { value: '' },
                notes: { value: '' },
                completionStatus: { value: '' },
                notCompletedExplanation: { value: '' },
                statusEndOfWeek1: { value: '' },
                statusEndOfWeek2: { value: '' },
                statusEndOfWeek3: { value: '' },
                statusEndOfWeek4: { value: '' },
            },
            {
                id: { value: 2 },
                name: { value: 'Verify course equivalencies & Grad Requirements in Illuminate' },
                manager: { value: 'Bobby' },
                description: { value: '-Audit all historical expeditions grades & match courses to equivalents' },
                category: { value: 'Grades & Transcripts' },
                categoryLead: { value: 'Bobby' },
                estimatedProjectSize: { value: '3 - Small-to-Medium' },
                mustDo: { value: 'Nice-to-Have' },
                externalDueDate: { value: '' },
                deliverables: { value: 'Historical Illuminate courses matched with current equivalencies.' },
                deliverableLink: { value: '' },
                notes: { value: '' },
                completionStatus: { value: '' },
                notCompletedExplanation: { value: '' },
                statusEndOfWeek1: { value: '' },
                statusEndOfWeek2: { value: '' },
                statusEndOfWeek3: { value: '' },
                statusEndOfWeek4: { value: '' },
            },
            {
                id: { value: 3 },
                name: { value: 'Verify course equivalencies & Grad Requirements in Illuminate' },
                manager: { value: 'Bobby' },
                description: { value: '-Audit all historical expeditions grades & match courses to equivalents' },
                category: { value: 'Grades & Transcripts' },
                categoryLead: { value: 'Bobby' },
                estimatedProjectSize: { value: '3 - Small-to-Medium' },
                mustDo: { value: 'Nice-to-Have' },
                externalDueDate: { value: '' },
                deliverables: { value: 'Historical Illuminate courses matched with current equivalencies.' },
                deliverableLink: { value: '' },
                notes: { value: '' },
                completionStatus: { value: '' },
                notCompletedExplanation: { value: '' },
                statusEndOfWeek1: { value: '' },
                statusEndOfWeek2: { value: '' },
                statusEndOfWeek3: { value: '' },
                statusEndOfWeek4: { value: '' },
            }
        ]
    }]
}

const getSprintIndexWithSprintId = (state, sprintId) => {
    for(let i=0; i<state.sprints.length; i++) {
        if(state.sprints[i].id === sprintId) {
            return i;
        }
    };

    // If no match found, return null
    return null;
};

const getProjectIndexWithSprintIndexAndProjectId = (state, sprintIndex, projectId) => {
    const projectArray = state.sprints[sprintIndex].projects;
    console.log('projectArray:', projectArray);

    for(let i=0; i<projectArray.length; i++) {
        if(projectArray[i].id.value === projectId) {
            return i;
        }
    }

    // If no match found, return null
    return null;
}

const updateObjectInArray = (array, newItemIndex, newItem) => {
    // Based on: https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns/#updating-an-item-in-an-array
    return array.map((item, index) => {
      if (index !== newItemIndex) {
        // This isn't the item we care about - keep it as-is
        return item;
      }
      // Otherwise, this is the one we want - return an updated value
      return {
        ...item, // TODO: don't understand what the spread operator here is doing...
        ...newItem
      }
    })
  }

const updateProject = (state, action) => {
    //     type: actionTypes.UPDATE_PROJECT,
    //     sprintId: sprintId,
    //     projectData: projectData

    const sprintIndex = getSprintIndexWithSprintId(state, action.sprintId);
    const projectIndex = getProjectIndexWithSprintIndexAndProjectId(state, sprintIndex, action.projectData.id.value);

    // console.log('SprintId:', action.sprintId);
    // console.log('Sprint index:', sprintIndex);
    // console.log('projectIndex:', projectIndex);
    // console.log('projectData:', action.projectData);

    if (sprintIndex === null || projectIndex === null) {
        console.log('[ERROR] Cannot find sprint and/or project index in current state');
        return state;
    } else {
        // Create new array of projects from the chosen sprint, with the updated projectData replaced at the correct spot
        const newProjectsArray = updateObjectInArray(state.sprints[sprintIndex].projects, projectIndex, action.projectData);
        // Create a new sprint object, and then overwrite the existing projects with the newProjectsArray
        let newSprintObject = { ...state.sprints[sprintIndex] };
        newSprintObject['projects'] = newProjectsArray;
        // Create a new array of all the sprints, with the newSprintObject overwriting the sprint at the correct index
        const newSprintsArray = updateObjectInArray(state.sprints, sprintIndex, newSprintObject);

        return {
            ...state,
            sprints: newSprintsArray
        };
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.UPDATE_PROJECT: return updateProject(state, action);
        default: return state;
    }
}

export default reducer;