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

export const orderSprintsByStartDate = () => {
    return {
        type: actionTypes.ORDER_SPRINTS_BY_START_DATE
    }
};