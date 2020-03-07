import reducer from './sprints';
import * as actionTypes from '../actions/actionTypes';
import * as moment from 'moment';

import { initialDemoState } from '../initialDemoData';


/* --- Test Data --- */

const initialState = {
    sprints: [],
    queue: [],
    error: false,
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

const updatedTestSprintObject = {
    id: '1',
    name: 'Sprint #1 - January',
    startDate: moment.utc('2020-01-01'),
    endDate: moment.utc('2020-01-31'),
    participants: 'Mike, Bobby',
    owner: 'Mike',
    projects: [],
}

const stateWithOneSprintAndNoProjects = {
    sprints: [
        {
            id: '1',
            name: 'Sprint #1',
            startDate: moment.utc('2020-01-01'),
            endDate: moment.utc('2020-01-31'),
            participants: 'Mike, Bobby',
            owner: 'Mike',
            projects: [],
        }
    ],
    queue: [],
    error: false,
};

const stateWithTwoSprints = {
    sprints: [
        {
            id: '1',
            name: 'Sprint #1',
            startDate: moment.utc('2020-01-01'),
            endDate: moment.utc('2020-01-31'),
            participants: 'Mike, Bobby',
            owner: 'Mike',
            projects: [],
        },
        {
            id: '2',
            name: 'Sprint #2',
            startDate: moment.utc('2020-02-01'),
            endDate: moment.utc('2020-02-29'),
            participants: 'Mike, Bobby',
            owner: 'Mike',
            projects: [],
        },
    ],
    queue: [],
    error: false,
}

const updatedSprintId1 = {
    id: '1',
    name: 'Sprint #1',
    startDate: moment.utc('2020-03-01'),
    endDate: moment.utc('2020-03-31'),
    participants: 'Mike, Bobby',
    owner: 'Mike',
    projects: [],
}

const stateWithTwoSprintsWithSameStartDate = {
    sprints: [
        {
            id: '1',
            name: 'Sprint #1',
            startDate: moment.utc('2020-01-01'),
            endDate: moment.utc('2020-01-31'),
            participants: 'Mike, Bobby',
            owner: 'Mike',
            projects: [],
        },
        {
            id: '2',
            name: 'Sprint #2',
            startDate: moment.utc('2020-01-01'),
            endDate: moment.utc('2020-01-15'),
            participants: 'Mike, Bobby',
            owner: 'Mike',
            projects: [],
        },
    ],
    queue: [],
    error: false,
}

const stateWithTwoUnorderedSprints = {
    sprints: [
        {
            id: '2',
            name: 'Sprint #2',
            startDate: moment.utc('2020-02-01'),
            endDate: moment.utc('2020-02-29'),
            participants: 'Mike, Bobby',
            owner: 'Mike',
            projects: [],
        },
        {
            id: '1',
            name: 'Sprint #1',
            startDate: moment.utc('2020-01-01'),
            endDate: moment.utc('2020-01-31'),
            participants: 'Mike, Bobby',
            owner: 'Mike',
            projects: [],
        },
    ],
    queue: [],
    error: false,
}

const stateWithOneSprintAndOneQueueProject = {
    sprints: [
        {
            id: '1',
            name: 'Sprint #1',
            startDate: moment.utc('2020-01-01'),
            endDate: moment.utc('2020-01-31'),
            participants: 'Mike, Bobby',
            owner: 'Mike',
            projects: [],
        }
    ],
    queue: [
        {
            id: { value: '1' },
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
        }
    ],
    error: false,
};

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

const stateWithOneSprintObjectWithOneProjectObject = {
    sprints: [
        {
            id: '1',
            name: 'Sprint #1',
            startDate: moment.utc('2020-01-01'),
            endDate: moment.utc('2020-01-31'),
            participants: 'Mike, Bobby',
            owner: 'Mike',
            projects: [
                {
                    id: { value: '1' },
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
                }
            ],
        }
    ],
    queue: [],
    error: false,
};


/* --- Tests --- */

describe('sprints reducer', () => {

    /* --- Initializing Data Actions --- */

    it('should return the initial state', () => {
        expect(
            reducer(undefined, {}))
        .toEqual(
            initialState
        );
    });

    it('should handle INITIALIZE_DEMO_DATA', () => {
        expect(
            reducer(initialState, {
                type: actionTypes.INITIALIZE_DEMO_DATA,
            })
        ).toEqual(
            {
                ...initialState,
                sprints: initialDemoState.sprints,
                queue: initialDemoState.queue
            }
        );
    });

    it('should handle LOAD_SPRINT_STORE with blank fetched data', () => {
        expect(
            reducer(initialState, {
                type: actionTypes.LOAD_SPRINT_STORE,
                fetchedSprintData: null,
                fetchedQueueData: null,
            })
        ).toEqual(
                initialState
        );
    });

    it('should handle LOAD_SPRINT_STORE with populated fetched data', () => {
        expect(
            reducer(initialState, {
                type: actionTypes.LOAD_SPRINT_STORE,
                fetchedSprintData: {
                    [testSprintObject.id]: testSprintObject,
                },
                fetchedQueueData: {
                    [testProjectObject.id.value]: testProjectObject,
                }
            })
        ).toEqual(
            {
                sprints: [
                    testSprintObject
                ],
                queue: [
                    testProjectObject
                ],
                error: false
            }
        );
    });

    /* --- Sprint Actions --- */

    it('should handle ADD_SPRINT', () => {
        expect(
            reducer(initialState, {
                type: actionTypes.ADD_SPRINT,
                sprintData: testSprintObject,
            })
        ).toEqual(
            {
                sprints: [testSprintObject],
                queue: [],
                error: false,
            }
        );
    });

    it('should handle DELETE_SPRINT', () => {
        expect(
            reducer(stateWithOneSprintAndNoProjects, {
                type: actionTypes.DELETE_SPRINT,
                sprintId: '1',
            })
        ).toEqual(
            {
                sprints: [],
                queue: [],
                error: false
            }
        );
    });

    it('should not update state in DELETE_SPRINT if the sprint has a project', () => {
        expect(
            reducer(stateWithOneSprintObjectWithOneProjectObject, {
                type: actionTypes.DELETE_SPRINT,
                sprintId: '1',
            })
        ).toEqual(
            stateWithOneSprintObjectWithOneProjectObject
        );
    });

    it('should handle UPDATE_SPRINT', () => {
        expect(
            reducer(stateWithOneSprintAndNoProjects, {
                type: actionTypes.UPDATE_SPRINT,
                sprintId: '1',
                sprintData: updatedTestSprintObject
            })
        ).toEqual(
            {
                sprints: [
                    updatedTestSprintObject
                ],
                queue: [],
                error: false
            }
        );
    });

    it('should reorder sprints array when UPDATE_SPRINT changes a start date', () => {
        expect(
            reducer(stateWithTwoSprints, {
                type: actionTypes.UPDATE_SPRINT,
                sprintId: '1',
                sprintData: updatedSprintId1
            })
        ).toEqual(
            {
                sprints: [
                    stateWithTwoSprints.sprints[1],
                    updatedSprintId1
                ],
                queue: [],
                error: false
            }
        );
    });

    it('should handle ORDER_SPRINTS_BY_START_DATE when sprints have different start dates', () => {
        expect(
            reducer(stateWithTwoUnorderedSprints, {
                type: actionTypes.ORDER_SPRINTS_BY_START_DATE
            })
        ).toEqual(
            {
                sprints: [
                    stateWithTwoUnorderedSprints.sprints[1],
                    stateWithTwoUnorderedSprints.sprints[0]
                ],
                queue: [],
                error: false
            }
        );
    });

    it('should handle ORDER_SPRINTS_BY_START_DATE when sprints have the same start date but different end dates', () => {
        expect(
            reducer(stateWithTwoSprintsWithSameStartDate, {
                type: actionTypes.ORDER_SPRINTS_BY_START_DATE
            })
        ).toEqual(
            {
                sprints: [
                    stateWithTwoSprintsWithSameStartDate.sprints[1],
                    stateWithTwoSprintsWithSameStartDate.sprints[0]
                ],
                queue: [],
                error: false
            }
        );
    });



    /* --- Project Actions --- */

    it('should handle ADD_PROJECT when adding to a sprint', () => {
        expect(
            reducer(stateWithOneSprintAndNoProjects, {
                type: actionTypes.ADD_PROJECT,
                sprintId: '1',
                projectData: testProjectObject
            })
        ).toEqual(
            {
                sprints: [
                    {...stateWithOneSprintAndNoProjects.sprints[0],
                        projects: [testProjectObject]
                    }
                ],
                queue: [],
                error: false,
            }
        );
    });

    it('should handle ADD_PROJECT when adding to the queue', () => {
        expect(
            reducer(stateWithOneSprintAndNoProjects, {
                type: actionTypes.ADD_PROJECT,
                sprintId: -1,
                projectData: testProjectObject
            })
        ).toEqual(
            {
                ...stateWithOneSprintAndNoProjects,
                queue: [testProjectObject]
            }
        );
    });

    it('should handle UPDATE_PROJECT when updating on a sprint', () => {
        expect(
            reducer(stateWithOneSprintObjectWithOneProjectObject, {
                type: actionTypes.UPDATE_PROJECT,
                sprintId: '1',
                projectData: { 
                    ...stateWithOneSprintObjectWithOneProjectObject.sprints[0].projects[0],
                    name: { value: 'New Project Name' },
                }
            })
        ).toEqual(
            {
                sprints: [
                    { ...stateWithOneSprintObjectWithOneProjectObject.sprints[0],
                        projects: [
                            { 
                                ...stateWithOneSprintObjectWithOneProjectObject.sprints[0].projects[0],
                                name: { value: 'New Project Name' },
                            }
                        ]
                    }
                ],
                queue: [],
                error: false,
            }
        );
    });

    it('should handle UPDATE_PROJECT when updating on the queue', () => {
        expect(
            reducer(stateWithOneSprintAndOneQueueProject, {
                type: actionTypes.UPDATE_PROJECT,
                sprintId: -1,
                projectData: { 
                    ...stateWithOneSprintAndOneQueueProject.queue[0],
                    name: { value: 'New Project Name' },
                }
            })
        ).toEqual(
            {
                ...stateWithOneSprintAndOneQueueProject,
                queue: [
                    { 
                        ...stateWithOneSprintAndOneQueueProject.queue[0],
                        name: { value: 'New Project Name' },
                    }
                ]
            }
        );
    });

    it('should handle DELETE_PROJECT when deleting on a sprint', () => {
        expect(
            reducer(stateWithOneSprintObjectWithOneProjectObject, {
                type: actionTypes.DELETE_PROJECT,
                sprintId: '1',
                projectId: '1',
            })
        ).toEqual(
            {
                sprints: [
                    {...stateWithOneSprintObjectWithOneProjectObject.sprints[0],
                        projects: []
                    }
                ],
                queue: [],
                error: false,
            }
        );
    });

    it('should handle DELETE_PROJECT when deleting on the queue', () => {
        expect(
            reducer(stateWithOneSprintAndOneQueueProject, {
                type: actionTypes.DELETE_PROJECT,
                sprintId: -1,
                projectId: '1'
            })
        ).toEqual(
            {
                ...stateWithOneSprintAndOneQueueProject,
                queue: []
            }
        );
    });



    /* --- Misc. Actions --- */

    it('should handle CLEAR_SPRINT_STORE', () => {
        expect(
            reducer(stateWithOneSprintAndOneQueueProject, {
                type: actionTypes.CLEAR_SPRINT_STORE,
            })
        ).toEqual(
            {
                sprints: [],
                queue: [],
                error: false
            }
        );
    });

    it('should handle MARK_SERVER_UPDATE_ERROR', () => {
        expect(
            reducer(stateWithOneSprintAndOneQueueProject, {
                type: actionTypes.MARK_SERVER_UPDATE_ERROR,
            })
        ).toEqual(
            {
                ...stateWithOneSprintAndOneQueueProject,
                error: true
            }
        );
    });
});