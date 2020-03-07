import * as actions from './index';
import * as actionTypes from './actionTypes';
import axios from 'axios';
import * as moment from 'moment';

// Setup for testing async action creators
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middleware = [thunk]
const mockStore = configureMockStore(middleware)


/* --- Test Data --- */

const testProjectObject = {
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
    statusEndOfWeek5: { value: '' },
    statusEndOfWeek6: { value: '' },
    statusEndOfWeek7: { value: '' },
    statusEndOfWeek8: { value: '' },
};

const testSprintObject = {
    id: '1',
    name: 'Sprint #1',
    startDate: moment.utc('2020-01-01'),
    endDate: moment.utc('2020-01-31'),
    participants: 'Mike, Bobby',
    owner: 'Mike',
    projects: [],
};


/* --- Tests --- */

describe('synchronous sprints actions', () => {

    /* --- Synchronous Action Creators --- */

    it('should create an action to order sprints by start date', () => {
        expect(
            actions.orderSprintsByStartDate()
        )
        .toEqual(
            {
                type: actionTypes.ORDER_SPRINTS_BY_START_DATE
            }
        )
      });

});

jest.mock('axios');

describe('async sprints actions', () => {

    /* --- updateProject() --- */

    it('creates UPDATE_PROJECT when updating the project on the server has been completed', () => {
        const resp = {data: 'mock_response'};
        axios.put.mockResolvedValue(resp);
    
        const expectedActions = [
            { 
                type: actionTypes.UPDATE_PROJECT,
                sprintId: 'test_sprintId',
                projectData: testProjectObject,
            }
        ];
        const store = mockStore({ sprints: [] });
    
        return store.dispatch(actions.updateProject('test_sprintId', testProjectObject, 'test_token', 'test_userId'))
            .then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it('creates MARK_SERVER_UPDATE_ERROR when updating the project on the server fails', () => {
        const error = {data: 'mock_error'};
        axios.put.mockRejectedValue(error);
    
        const expectedActions = [
            { 
                type: actionTypes.MARK_SERVER_UPDATE_ERROR,
            }
        ];
        const store = mockStore({ sprints: [] });
    
        return store.dispatch(actions.updateProject('test_sprintId', testProjectObject, 'test_token', 'test_userId'))
            .then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it('creates UPDATE_PROJECT when updating the project in the Demo', () => {
        const expectedActions = [
            { 
                type: actionTypes.UPDATE_PROJECT,
                sprintId: 'test_sprintId',
                projectData: testProjectObject,
            }
        ];
        const store = mockStore({ sprints: [] });
    
        store.dispatch(actions.updateProject('test_sprintId', testProjectObject, 'demo', 'test_userId'));
        // console.log('store.getActions():', store.getActions())
        expect(store.getActions()).toEqual(expectedActions);
    });



    /* --- addProject() --- */

    it('creates ADD_PROJECT when adding the project on the server has been completed', () => {
        const resp = {data: 'mock_response'};
        axios.put.mockResolvedValue(resp);
    
        const expectedActions = [
            { 
                type: actionTypes.ADD_PROJECT,
                sprintId: 'test_sprintId',
                projectData: testProjectObject,
            }
        ];
        const store = mockStore({ sprints: [] });
    
        return store.dispatch(actions.addProject('test_sprintId', testProjectObject, 'test_token', 'test_userId'))
            .then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it('creates MARK_SERVER_UPDATE_ERROR when adding the project on the server fails', () => {
        const error = {data: 'mock_error'};
        axios.put.mockRejectedValue(error);
    
        const expectedActions = [
            { 
                type: actionTypes.MARK_SERVER_UPDATE_ERROR,
            }
        ];
        const store = mockStore({ sprints: [] });
    
        return store.dispatch(actions.addProject('test_sprintId', testProjectObject, 'test_token', 'test_userId'))
            .then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it('creates ADD_PROJECT when adding the project in the Demo', () => {
        const expectedActions = [
            { 
                type: actionTypes.ADD_PROJECT,
                sprintId: 'test_sprintId',
                projectData: testProjectObject,
            }
        ];
        const store = mockStore({ sprints: [] });
    
        store.dispatch(actions.addProject('test_sprintId', testProjectObject, 'demo', 'test_userId'));
        expect(store.getActions()).toEqual(expectedActions);
    });



    /* --- deleteProject() --- */

    it('creates DELETE_PROJECT when deleting the project on the server has been completed', () => {
        const resp = {data: 'mock_response'};
        axios.delete.mockResolvedValue(resp);
    
        const expectedActions = [
            { 
                type: actionTypes.DELETE_PROJECT,
                sprintId: 'test_sprintId',
                projectId: 'test_projectId',
            }
        ];
        const store = mockStore({ sprints: [] });
    
        return store.dispatch(actions.deleteProject('test_sprintId', 'test_projectId', 'test_token', 'test_userId'))
            .then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it('creates MARK_SERVER_UPDATE_ERROR when deleting the project on the server fails', () => {
        const error = {data: 'mock_error'};
        axios.delete.mockRejectedValue(error);
    
        const expectedActions = [
            { 
                type: actionTypes.MARK_SERVER_UPDATE_ERROR,
            }
        ];
        const store = mockStore({ sprints: [] });
    
        return store.dispatch(actions.deleteProject('test_sprintId', 'test_projectId', 'test_token', 'test_userId'))
            .then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it('creates DELETE_PROJECT when deleting the project in the Demo', () => {
        const expectedActions = [
            { 
                type: actionTypes.DELETE_PROJECT,
                sprintId: 'test_sprintId',
                projectId: 'test_projectId',
            }
        ];
        const store = mockStore({ sprints: [] });
    
        store.dispatch(actions.deleteProject('test_sprintId', 'test_projectId', 'demo', 'test_userId'));
        // console.log('demo DELETE_PROJECT getActions():', store.getActions());
        expect(store.getActions()).toEqual(expectedActions);
    });



    /* --- moveProject() --- */

    it('creates ADD_PROJECT and DELETE_PROJECT when moving a project in the demo', () => {
        const expectedActions = [
            { 
                type: actionTypes.ADD_PROJECT,
                sprintId: 'test_destinationSprintId',
                projectData: testProjectObject,
            },
            { 
                type: actionTypes.DELETE_PROJECT,
                sprintId: 'test_originSprintId',
                projectId: testProjectObject.id.value,
            }
        ];
        const store = mockStore({ sprints: [] });
    
        store.dispatch(actions.moveProject('test_originSprintId', 'test_destinationSprintId', testProjectObject, 'demo', 'test_userId'));
        expect(store.getActions()).toEqual(expectedActions);
    });

    /*  Note: Only testing the demo condition for moveProject(), because otherwise, the action creators create multiple HTTP requests.
        Additionally, the action creators that moveProject() calls are themselves individually tested.
    */



    /* --- updateSprint() --- */

    it('creates UPDATE_SPRINT when updating the sprint on the server has been completed', () => {
        const resp = {data: 'mock_response'};
        axios.put.mockResolvedValue(resp);
    
        const expectedActions = [
            { 
                type: actionTypes.UPDATE_SPRINT,
                sprintId: testSprintObject.id,
                sprintData: testSprintObject,
            }
        ];
        const store = mockStore({ sprints: [] });
    
        return store.dispatch(actions.updateSprint(testSprintObject.id, testSprintObject, 'test_token', 'test_userId'))
            .then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it('creates MARK_SERVER_UPDATE_ERROR when updating the sprint on the server fails', () => {
        const error = {data: 'mock_error'};
        axios.put.mockRejectedValue(error);
    
        const expectedActions = [
            { 
                type: actionTypes.MARK_SERVER_UPDATE_ERROR,
            }
        ];
        const store = mockStore({ sprints: [] });
    
        return store.dispatch(actions.updateSprint(testSprintObject.id, testSprintObject, 'test_token', 'test_userId'))
            .then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it('creates UPDATE_SPRINT when updating the sprint in the Demo', () => {
        const expectedActions = [
            { 
                type: actionTypes.UPDATE_SPRINT,
                sprintId: testSprintObject.id,
                sprintData: testSprintObject,
            }
        ];
        const store = mockStore({ sprints: [] });
    
        store.dispatch(actions.updateSprint(testSprintObject.id, testSprintObject, 'demo', 'test_userId'));
        expect(store.getActions()).toEqual(expectedActions);
    });



    /* --- addSprint() --- */

    it('creates ADD_SPRINT when adding the sprint on the server has been completed', () => {
        const resp = {data: 'mock_response'};
        axios.put.mockResolvedValue(resp);
    
        const expectedActions = [
            { 
                type: actionTypes.ADD_SPRINT,
                sprintData: testSprintObject,
            }
        ];
        const store = mockStore({ sprints: [] });
    
        return store.dispatch(actions.addSprint(testSprintObject, 'test_token', 'test_userId'))
            .then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it('creates MARK_SERVER_UPDATE_ERROR when adding the sprint on the server fails', () => {
        const error = {data: 'mock_error'};
        axios.put.mockRejectedValue(error);
    
        const expectedActions = [
            { 
                type: actionTypes.MARK_SERVER_UPDATE_ERROR,
            }
        ];
        const store = mockStore({ sprints: [] });
    
        return store.dispatch(actions.addSprint(testSprintObject, 'test_token', 'test_userId'))
            .then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it('creates ADD_SPRINT when adding the sprint in the Demo', () => {
        const expectedActions = [
            { 
                type: actionTypes.ADD_SPRINT,
                sprintData: testSprintObject,
            }
        ];
        const store = mockStore({ sprints: [] });
    
        store.dispatch(actions.addSprint(testSprintObject, 'demo', 'test_userId'));
        expect(store.getActions()).toEqual(expectedActions);
    });



    /* --- deleteSprint() --- */

    it('creates DELETE_SPRINT when deleting the sprint on the server has been completed', () => {
        const resp = {data: 'mock_response'};
        axios.delete.mockResolvedValue(resp);
    
        const expectedActions = [
            { 
                type: actionTypes.DELETE_SPRINT,
                sprintId: 'test_sprintId',
            }
        ];
        const store = mockStore({ sprints: [] });
    
        return store.dispatch(actions.deleteSprint('test_sprintId', 'test_token', 'test_userId'))
            .then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it('creates MARK_SERVER_UPDATE_ERROR when deleting the sprint on the server fails', () => {
        const error = {data: 'mock_error'};
        axios.delete.mockRejectedValue(error);
    
        const expectedActions = [
            { 
                type: actionTypes.MARK_SERVER_UPDATE_ERROR,
            }
        ];
        const store = mockStore({ sprints: [] });
    
        return store.dispatch(actions.deleteSprint('test_sprintId', 'test_token', 'test_userId'))
            .then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it('creates DELETE_SPRINT when deleting the sprint in the Demo', () => {
        const expectedActions = [
            { 
                type: actionTypes.DELETE_SPRINT,
                sprintId: 'test_sprintId',
            }
        ];
        const store = mockStore({ sprints: [] });
    
        store.dispatch(actions.deleteSprint('test_sprintId', 'demo', 'test_userId'));
        expect(store.getActions()).toEqual(expectedActions);
    });

});
