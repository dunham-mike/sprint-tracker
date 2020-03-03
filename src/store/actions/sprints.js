import * as actionTypes from './actionTypes';

export const updateProject = (sprintId, projectData) => {
    return {
        type: actionTypes.UPDATE_PROJECT,
        sprintId: sprintId,
        projectData: projectData
    }
};

export const addProject = (sprintId, projectData) => {
    return {
        type: actionTypes.ADD_PROJECT,
        sprintId: sprintId,
        projectData: projectData
    }
};

export const deleteProject = (sprintId, projectId) => {
    return {
        type: actionTypes.DELETE_PROJECT,
        sprintId: sprintId,
        projectId: projectId,
    }
};

export const moveProject = (originSprintId, destinationSprintId, projectData) => {
    return dispatch => {
        dispatch(addProject(destinationSprintId, projectData));
        dispatch(deleteProject(originSprintId, projectData.id.value));
    }
}

export const updateSprint = (sprintId, sprintData) => {
    return {
        type: actionTypes.UPDATE_SPRINT,
        sprintId: sprintId,
        sprintData: sprintData
    }
};

export const addSprint = (sprintData) => {
    return {
        type: actionTypes.ADD_SPRINT,
        sprintData: sprintData
    }
};

export const deleteSprint = (sprintId) => {
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