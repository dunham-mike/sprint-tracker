import * as actionTypes from './actionTypes';

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

export const addProject = (sprintId, projectData) => {
    /* 
        Firebase:
        - Add projectData to projects object
        - Add project to associated sprintId
    */

    return {
        type: actionTypes.ADD_PROJECT,
        sprintId: sprintId,
        projectData: projectData
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

export const addSprint = (sprintData) => {
    /* 
        Firebase:
        - Add new sprint to sprint object
    */

    return {
        type: actionTypes.ADD_SPRINT,
        sprintData: sprintData
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