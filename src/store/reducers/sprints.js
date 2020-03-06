import * as actionTypes from '../actions/actionTypes';
import { initialDemoState } from '../initialData';
import { convertObjectIntoArrayOfItsValues } from '../utility';
import * as moment from 'moment';

const initialState = {
    sprints: [],
    queue: [],
    error: false,
}

const getSprintIndexWithSprintId = (state, sprintId) => {
    console.log('Start of getSprintIndexWithSprintId');
    console.log('state.sprints.length:', state.sprints.length);

    for(let i=0; i<state.sprints.length; i++) {
        console.log('running i =', i);
        if(state.sprints[i].id === sprintId) {
            console.log('returning i=', i);
            return i;
        }
    };

    console.log('returning null');
    // If no match found, return null
    return null;
};

const getProjectIndexWithSprintIndexAndProjectId = (state, sprintIndex, projectId) => {
    console.log('state:', state);
    console.log('sprintIndex:', sprintIndex);
    console.log('projectId:', projectId);

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
    console.log('state:', state);
    console.log('action:', action);
    console.log('action.sprintId:', action.sprintId);

    const sprintIndex = getSprintIndexWithSprintId(state, action.sprintId);
    console.log('sprintIndex:', sprintIndex);
    const projectIndex = getProjectIndexWithSprintIndexAndProjectId(state, sprintIndex, action.projectData.id.value);
    // console.log('sprintIndex:', sprintIndex);
    // console.log('projectIndex:', projectIndex);

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

const addProjectOnSprint = (state, action) => {
    const sprintIndex = getSprintIndexWithSprintId(state, action.sprintId);

    if (sprintIndex === null) {
        console.log('[ERROR] Cannot find sprint index in current state');
        return state;
    } else {
        console.log('Placeholder: add project to an existing sprint');
        let newProjectsArray = [...state.sprints[sprintIndex].projects];
        newProjectsArray.push(action.projectData);

        let newSprintObject = {...state.sprints[sprintIndex]};
        newSprintObject.projects = newProjectsArray;

        let newSprintsArray = updateObjectInArray(state.sprints, sprintIndex, newSprintObject);

        return {
            ...state,
            sprints: newSprintsArray
        }
    }
}

const deleteProjectOnSprint = (state, action) => {
    const sprintIndex = getSprintIndexWithSprintId(state, action.sprintId);

    if (sprintIndex === null) {
        console.log('[ERROR] Cannot find sprint index in current state');
        return state;
    } else {
        const projectIndex = getProjectIndexWithSprintIndexAndProjectId(state, sprintIndex, action.projectId);
        let newProjectsArray = [...state.sprints[sprintIndex].projects];

        newProjectsArray = [...newProjectsArray.slice(0, projectIndex), ...newProjectsArray.slice(projectIndex + 1)];

        let newSprintObject = {...state.sprints[sprintIndex]};
        newSprintObject.projects = newProjectsArray;

        let newSprintsArray = updateObjectInArray(state.sprints, sprintIndex, newSprintObject);

        return {
            ...state,
            sprints: newSprintsArray
        }
    }
}

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

const addProjectOnQueue = (state, action) => {
    const newQueueArray = [...state.queue]
    newQueueArray.push(action.projectData);

    return {
        ...state,
        queue: newQueueArray
    }
}

const deleteProjectOnQueue = (state, action) => {
    const queueIndex = getProjectIndexWithSprintIndexAndProjectId(state, action.sprintId, action.projectId);

    let newQueueArray = [...state.queue];

    newQueueArray = [...newQueueArray.slice(0, queueIndex), ...newQueueArray.slice(queueIndex + 1)];

    return {
        ...state,
        queue: newQueueArray
    };
}

const updateProject = (state, action) => {
    if (action.sprintId === -1) {
        return updateProjectOnQueue(state, action);
    } else {
        return updateProjectOnSprint(state, action);
    }
};

const addProject = (state, action) => {
    if (action.sprintId === -1) {
        return addProjectOnQueue(state, action);
    } else {
        return addProjectOnSprint(state, action);
    }
}

const deleteProject = (state, action) => {
    if (action.sprintId === -1) {
        return deleteProjectOnQueue(state, action);
    } else {
        return deleteProjectOnSprint(state, action);
    }
}

const updateSprint = (state, action) => {
    // Important Note: action.sprintData does NOT include the existing projects, so those need to be copied onto the updated sprint object
    const sprintIndex = getSprintIndexWithSprintId(state, action.sprintId);
    let newSprintObjectWithProjects = {...action.sprintData};
    newSprintObjectWithProjects['projects'] = state.sprints[sprintIndex].projects;

    // Put the updated sprint object into a new copy of the sprints array
    let updatedFullSprintsArray = updateObjectInArray(state.sprints, sprintIndex, newSprintObjectWithProjects);

    // Check if startDate changed, and if so, reorder the full sprints array
    if(state.sprints[sprintIndex].startDate.toString() !== newSprintObjectWithProjects.startDate.toString()) {  
        updatedFullSprintsArray = getNewSprintsArrayOrderedByStartDate(updatedFullSprintsArray);
    }

    return {
        ...state,
        sprints: updatedFullSprintsArray
    };
};

const addSprint = (state, action) => {
    console.log('addSprint reducer function firing');

    // Important Note: action.sprintData does NOT include a projects key, so that needs to be added
    let newSprintObjectWithProjects = {...action.sprintData};
    newSprintObjectWithProjects['projects'] = [];

    // Push the updated sprint object onto a new copy of the sprints array
    let updatedFullSprintsArray = [...state.sprints];
    updatedFullSprintsArray.push(newSprintObjectWithProjects);

    // If the new sprint's start date is not after the last sprint's start date, then reorder
    if(state.sprints.length > 1 && state.sprints[state.sprints.length-1].startDate > newSprintObjectWithProjects.startDate) {
        updatedFullSprintsArray = getNewSprintsArrayOrderedByStartDate(updatedFullSprintsArray);
    }

    return {
        ...state,
        sprints: updatedFullSprintsArray
    };
}

const deleteSprint = (state, action) => {
    const sprintIndex = getSprintIndexWithSprintId(state, action.sprintId);

    if (state.sprints[sprintIndex].projects.length > 0) {
        console.log('[Reducer] deleteSprint error, because sprint still has projects on it.')
        return state;
    }

    let newSprintsArray = [...state.sprints];

    newSprintsArray = [...newSprintsArray.slice(0, sprintIndex), ...newSprintsArray.slice(sprintIndex + 1)];

    return {
        ...state,
        sprints: newSprintsArray
    }
}

// NOTE: It's important that the sprints always be sorted by start date, so other reducer functions should call this one if they edit any sprint's start date
const getNewSprintsArrayOrderedByStartDate = (sprintsArray) => {
    let newDateOrderedSprintsArray = [...sprintsArray];

    newDateOrderedSprintsArray.sort((a, b) => {
        return a.startDate - b.startDate
    });

    return newDateOrderedSprintsArray;
}

const orderSprintsByStartDate = (state, action) => {
    const dateOrderedSprintsArray = getNewSprintsArrayOrderedByStartDate(state.sprints); // This uses a helper function, because other reducer functions will also use this helper.

    return {
        ...state,
        sprints: dateOrderedSprintsArray
    };
}

const clearSprintStore = (state, action) => {
    return {
        ...state,
        sprints: [],
        queue: [],
    }
}

const loadSprintStore = (state, action) => {
    let sprintArray = [];
    let queueArray = [];

    // Convert fetched sprint data into an array of sprints and format the individual sprint objects into what the Redux store expects
    if(action.fetchedSprintData) {
        sprintArray = convertObjectIntoArrayOfItsValues(action.fetchedSprintData);

        for (let i=0; i<sprintArray.length; i++) {
            // Add a projects key-value pair if there isn't one
            if(!sprintArray[i].projects) {
                sprintArray[i]['projects'] = [];
            } else {
                // Turn projects object into an array
                sprintArray[i]['projects'] = convertObjectIntoArrayOfItsValues(sprintArray[i]['projects']);
            }
    
            // Convert start and end dates into moment objects
            sprintArray[i].startDate = moment.utc(sprintArray[i].startDate);
            sprintArray[i].endDate = moment.utc(sprintArray[i].endDate);
        }
    }
    
    // Convert fetched queue data into an array of projects
    if(action.fetchedQueueData) {
        queueArray = convertObjectIntoArrayOfItsValues(action.fetchedQueueData);
    }
    
    return {
        ...state,
        sprints: sprintArray,
        queue: queueArray,
    }
}

const initializeDemoData = (state, action) => {
    return {
        ...state,
        sprints: initialDemoState['sprints'],
        queue: initialDemoState['queue'],
    }
}

const markServerUpdateError = (state, action) => {
    return {
        ...state,
        error: true,
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.UPDATE_PROJECT: return updateProject(state, action);
        case actionTypes.ADD_PROJECT: return addProject(state, action);
        case actionTypes.DELETE_PROJECT: return deleteProject(state, action);
        case actionTypes.UPDATE_SPRINT: return updateSprint(state, action);
        case actionTypes.ADD_SPRINT: return addSprint(state, action);
        case actionTypes.DELETE_SPRINT: return deleteSprint(state, action);
        case actionTypes.ORDER_SPRINTS_BY_START_DATE: return orderSprintsByStartDate(state, action);
        case actionTypes.CLEAR_SPRINT_STORE: return clearSprintStore(state, action);
        case actionTypes.LOAD_SPRINT_STORE: return loadSprintStore(state, action);
        case actionTypes.INITIALIZE_DEMO_DATA: return initializeDemoData(state, action);
        case actionTypes.MARK_SERVER_UPDATE_ERROR: return markServerUpdateError(state, action);
        default: return state;
    }
};

export default reducer;