import * as actionTypes from './actionTypes';
import axios from 'axios';

const FIREBASE_URL = process.env.REACT_APP_FIREBASE_URL;

export const updateProject = (sprintId, projectData) => {
    /* 
        Firebase:
        - Replace project's data with new projectData
    */

    return {
        type: actionTypes.UPDATE_PROJECT,
        sprintId: sprintId,
        projectData: projectData
    }
};

export const addProjectToStore = (sprintId, projectData) => {
    return {
        type: actionTypes.ADD_PROJECT,
        sprintId: sprintId,
        projectData: projectData
    }
}

export const addProject = (sprintId, projectData, token, userId) => {
    return dispatch => {
        if(token === 'demo') { // Skip server logic if this is the demo
            dispatch(addProjectToStore(sprintId, projectData));
        }

        let addProjectURL = FIREBASE_URL + '/users/' + userId; 

        if(sprintId === -1) {
            // Add to queue
            addProjectURL += '/queue/' + projectData.id.value + '.json?auth=' + token;
        } else {
            // Add to normal sprint
            addProjectURL += '/sprints/' + sprintId + '/projects/' + projectData.id.value + '.json?auth=' + token;
        }

        axios.put(addProjectURL, projectData)
            .then((response) => {
                console.log('addProject response:', response);
                dispatch(addProjectToStore(sprintId, projectData));
            })
            .catch(error => {
                console.log('[Error] Adding this project failed:', error);
                // TODO: kill app here
            });
    }
    
};

export const deleteProject = (sprintId, projectId) => {
    /* 
        Firebase:
        - Delete project from projects object
        - Delete projects from associated sprintId
    */

    return {
        type: actionTypes.DELETE_PROJECT,
        sprintId: sprintId,
        projectId: projectId,
    }
};

export const moveProject = (originSprintId, destinationSprintId, projectData) => {
    /* 
        Firebase:
        - Updated projectData on project and update its associated sprint
        - Delete project from originSprintId
        - Add project to destinationSprintId
    */

    return dispatch => {
        dispatch(addProject(destinationSprintId, projectData));
        dispatch(deleteProject(originSprintId, projectData.id.value));
    }
}

export const updateSprint = (sprintId, sprintData) => {
    /* 
        Firebase:
        - Update data for sprint object
    */

    return {
        type: actionTypes.UPDATE_SPRINT,
        sprintId: sprintId,
        sprintData: sprintData
    }
};

export const addSprintToStore = (sprintData) => {
    return {
        type: actionTypes.ADD_SPRINT,
        sprintData: sprintData
    }
};

export const addSprint = (sprintData, token, userId) => {
   return dispatch => {
        if(token === 'demo') { // Skip server logic if this is the demo
            dispatch(addSprintToStore(sprintData));
        }

        let addSprintURL = FIREBASE_URL + '/users/' + userId + '/sprints/' + sprintData.id + '.json?auth=' + token; 

        axios.put(addSprintURL, sprintData)
            .then((response) => {
                console.log('addSprint response:', response);
                dispatch(addSprintToStore(sprintData));
            })
            .catch(error => {
                console.log('[Error] Adding this sprint failed:', error);
                // TODO: kill app here
            });
    }
};

export const deleteSprint = (sprintId) => {
    /* 
        Firebase:
        - Delete sprint from sprint object
    */

    return {
        type: actionTypes.DELETE_SPRINT,
        sprintId: sprintId,
    }
};

export const orderSprintsByStartDate = () => {
    return {
        type: actionTypes.ORDER_SPRINTS_BY_START_DATE
    }
};