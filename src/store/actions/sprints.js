import * as actionTypes from './actionTypes';

export const updateProject = (sprintId, projectData) => {
    return {
        type: actionTypes.UPDATE_PROJECT,
        sprintId: sprintId,
        projectData: projectData
    }
};