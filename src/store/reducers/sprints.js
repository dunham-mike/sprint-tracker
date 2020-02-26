import * as actionTypes from '../actions/actionTypes';
import { initialSprintState } from '../initialData';

const initialState = initialSprintState;

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
    let projectArray;
    if (sprintIndex === -1) { // A value of -1 indicates the sprint is the queue
        projectArray = state.queue;
    } else {
        projectArray = state.sprints[sprintIndex].projects;
    }
    
    console.log('projectArray:', projectArray);

    for(let i=0; i<projectArray.length; i++) {
        if(projectArray[i].id.value === projectId) {
            return i;
        }
    }

    // If no match found, return null
    return null;
};

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
};

const updateProjectOnSprint = (state, action) => {
    const sprintIndex = getSprintIndexWithSprintId(state, action.sprintId);
    const projectIndex = getProjectIndexWithSprintIndexAndProjectId(state, sprintIndex, action.projectData.id.value);
    console.log('sprintIndex:', sprintIndex);
    console.log('projectIndex:', projectIndex);

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
};

const updateProjectOnQueue = (state, action) => {
    // action.sprintId should equal -1, which will search the queue when passed to this function
    const projectIndex = getProjectIndexWithSprintIndexAndProjectId(state, action.sprintId, action.projectData.id.value);

    if (projectIndex === null) {
        return state;
    } else {
        // Create new array of projects from the queue, with the updated projectData replaced at the correct spot
        const newProjectsArray = updateObjectInArray(state.queue, projectIndex, action.projectData);

        // Assign newProjectsArray to the queue key
        return {
            ...state,
            queue: newProjectsArray
        };
    }
};

const updateProject = (state, action) => {
    // console.log('updateProject', action.sprintId);
    if (action.sprintId === -1) {
        return updateProjectOnQueue(state, action);
    } else {
        return updateProjectOnSprint(state, action);
    }
};


// NOTE: It's important that the sprints always be sorted by start date, so other reducer functions should call this one if they edit any sprint's start date
const orderSprintsByStartDate = (state, action) => {
    let dateOrderedSprintsArray = [...state.sprints];

    dateOrderedSprintsArray.sort((a, b) => {
        return a.startDate - b.startDate
    });

    return {
        ...state,
        sprints: dateOrderedSprintsArray
    };
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.UPDATE_PROJECT: return updateProject(state, action);
        case actionTypes.ORDER_SPRINTS_BY_START_DATE: return orderSprintsByStartDate(state, action);
        default: return state;
    }
};

export default reducer;