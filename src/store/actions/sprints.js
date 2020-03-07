import * as actionTypes from './actionTypes';
import axios from 'axios';

const FIREBASE_URL = process.env.REACT_APP_FIREBASE_URL;

export const updateProject = (sprintId, projectData, token, userId) => {
    return dispatch => {
        if(token === 'demo') { // Skip server logic if this is the demo
            return dispatch(updateProjectInStore(sprintId, projectData));
        } else {
            let updateProjectURL = FIREBASE_URL + '/users/' + userId; 

            if(sprintId === -1) {
                // Add to queue
                updateProjectURL += '/queue/' + projectData.id.value + '.json?auth=' + token;
            } else {
                // Add to normal sprint
                updateProjectURL += '/sprints/' + sprintId + '/projects/' + projectData.id.value + '.json?auth=' + token;
            }

            return axios.put(updateProjectURL, projectData)
                .then((response) => {
                    console.log('updateProject response:', response);
                    dispatch(updateProjectInStore(sprintId, projectData));
                })
                .catch(error => {
                    console.log('[Error] Updating this project failed:', error);
                    dispatch(markServerUpdateError());
                });
        }
    }
};

const markServerUpdateError = () => {
    return {
        type: actionTypes.MARK_SERVER_UPDATE_ERROR,
    }
}

const updateProjectInStore = (sprintId, projectData) => {
    return {
        type: actionTypes.UPDATE_PROJECT,
        sprintId: sprintId,
        projectData: projectData
    }
};

export const addProject = (sprintId, projectData, token, userId) => {
    return dispatch => {
        if(token === 'demo') { // Skip server logic if this is the demo
            dispatch(addProjectToStore(sprintId, projectData));
        } else {
            let addProjectURL = FIREBASE_URL + '/users/' + userId; 

            if(sprintId === -1) {
                // Add to queue
                addProjectURL += '/queue/' + projectData.id.value + '.json?auth=' + token;
            } else {
                // Add to normal sprint
                addProjectURL += '/sprints/' + sprintId + '/projects/' + projectData.id.value + '.json?auth=' + token;
            }

            return axios.put(addProjectURL, projectData)
                .then((response) => {
                    console.log('addProject response:', response);
                    dispatch(addProjectToStore(sprintId, projectData));
                })
                .catch(error => {
                    console.log('[Error] Adding this project failed:', error);
                    dispatch(markServerUpdateError());
                });
        }        
    }
    
};

const addProjectToStore = (sprintId, projectData) => {
    return {
        type: actionTypes.ADD_PROJECT,
        sprintId: sprintId,
        projectData: projectData
    }
}

export const deleteProject = (sprintId, projectId, token, userId) => {
    return dispatch => {
        if(token === 'demo') { // Skip server logic if this is the demo
            dispatch(deleteProjectInStore(sprintId, projectId));
        } else {
            let deleteProjectURL = FIREBASE_URL + '/users/' + userId; 

            if(sprintId === -1) {
                // Delete from queue
                deleteProjectURL += '/queue/' + projectId + '.json?auth=' + token;
            } else {
                // Delete from normal sprint
                deleteProjectURL += '/sprints/' + sprintId + '/projects/' + projectId + '.json?auth=' + token;
            }

            return axios.delete(deleteProjectURL)
                .then((response) => {
                    console.log('deleteProject response:', response);
                    dispatch(deleteProjectInStore(sprintId, projectId));
                })
                .catch(error => {
                    console.log('[Error] Deleting this project failed:', error);
                    dispatch(markServerUpdateError());
                });
        }
    }
};

const deleteProjectInStore = (sprintId, projectId) => {
    return {
        type: actionTypes.DELETE_PROJECT,
        sprintId: sprintId,
        projectId: projectId,
    }
};

export const moveProject = (originSprintId, destinationSprintId, projectData, token, userId) => {
    return dispatch => {
        dispatch(addProject(destinationSprintId, projectData, token, userId));
        dispatch(deleteProject(originSprintId, projectData.id.value, token, userId));
    }
}

export const updateSprint = (sprintId, sprintData, token, userId) => {
    return dispatch => {
        if(token === 'demo') { // Skip server logic if this is the demo
            dispatch(updateSprintInStore(sprintId, sprintData));
        } else {
            let updateSprintURL = FIREBASE_URL + '/users/' + userId + '/sprints/' + sprintData.id + '.json?auth=' + token; 

            return axios.put(updateSprintURL, sprintData)
                .then((response) => {
                    console.log('updateSprint response:', response);
                    dispatch(updateSprintInStore(sprintId, sprintData));
                })
                .catch(error => {
                    console.log('[Error] Updating this sprint failed:', error);
                    dispatch(markServerUpdateError());
                });
        } 
    }
};

const updateSprintInStore = (sprintId, sprintData) => {
    return {
        type: actionTypes.UPDATE_SPRINT,
        sprintId: sprintId,
        sprintData: sprintData
    }
};

export const addSprint = (sprintData, token, userId) => {
   return dispatch => {
        if(token === 'demo') { // Skip server logic if this is the demo
            dispatch(addSprintToStore(sprintData));
        } else {
            let addSprintURL = FIREBASE_URL + '/users/' + userId + '/sprints/' + sprintData.id + '.json?auth=' + token; 

            return axios.put(addSprintURL, sprintData)
                .then((response) => {
                    console.log('addSprint response:', response);
                    dispatch(addSprintToStore(sprintData));
                })
                .catch(error => {
                    console.log('[Error] Adding this sprint failed:', error);
                    dispatch(markServerUpdateError());
                });
        }
    }
};

const addSprintToStore = (sprintData) => {
    return {
        type: actionTypes.ADD_SPRINT,
        sprintData: sprintData
    }
};

export const deleteSprint = (sprintId, token, userId) => {
    return dispatch => {
        if(token === 'demo') { // Skip server logic if this is the demo
            dispatch(deleteSprintInStore(sprintId));
        } else {
            let deleteSprintURL = FIREBASE_URL + '/users/' + userId + '/sprints/' + sprintId + '.json?auth=' + token; 

            return axios.delete(deleteSprintURL)
                .then((response) => {
                    console.log('deleteSprint response:', response);
                    dispatch(deleteSprintInStore(sprintId));
                })
                .catch(error => {
                    console.log('[Error] Deleting this sprint failed:', error);
                    dispatch(markServerUpdateError());
                });
        }
    }
};

const deleteSprintInStore = (sprintId) => {
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