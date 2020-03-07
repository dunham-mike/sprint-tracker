import * as actions from './index';
import * as actionTypes from './actionTypes';
import axios from 'axios';

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

    it('creates UPDATE_PROJECT when updating the project on the server been done', () => {
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



    /* --- deleteProject() --- */



    /* --- moveProject() --- */



    /* --- updateSprint() --- */



    /* --- addSprint() --- */



    /* --- deleteSprint() --- */



});
