import React from 'react';
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json';
import moment from 'moment'; 

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import MainView from './MainView';

import { MainView as UnconnectedMainView } from './MainView';

Enzyme.configure({ adapter: new Adapter() })

/* 
<MainView />
<MainView isDemo={true} />
*/

const staticSprintData = [
    {
        id: 'test_sprintId',
        name: 'Sprint #1',
        startDate: moment.utc("2120-01-24"), 
        endDate: moment.utc("2120-02-06"),
        participants: 'Mike, Bobby',
        owner: 'Mike',
        projects: [
            {
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
                statusEndOfWeek1: { value: '25%' },
                statusEndOfWeek2: { value: '' },
                statusEndOfWeek3: { value: '' },
                statusEndOfWeek4: { value: '' },
                statusEndOfWeek5: { value: '' },
                statusEndOfWeek6: { value: '' },
                statusEndOfWeek7: { value: '' },
                statusEndOfWeek8: { value: '' },
            },
            {
                id: { value: 2 },
                name: { value: 'Verify course equivalencies & Grad Requirements in Illuminate' },
                manager: { value: 'Mike' },
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
            },
            {
                id: { value: 3 },
                name: { value: 'Verify course equivalencies & Grad Requirements in Illuminate' },
                manager: { value: 'Bobby' },
                description: { value: '-Audit all historical expeditions grades & match courses to equivalents' },
                category: { value: 'Grades & Transcripts' },
                categoryLead: { value: 'Bobby' },
                estimatedProjectSize: { value: '1 - Extra Small' },
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
            },
        ],
    },
    {
        id: 'test_sprintId2',
        name: 'Sprint #2',
        startDate: moment.utc("2120-02-10"),
        endDate: moment.utc("2120-03-06"),
        participants: 'Mike, Bobby',
        owner: 'Mike',
        projects: [],
    },
    {
        id: 'test_sprintId3',
        name: 'Sprint #3',
        startDate: moment.utc("2120-03-09"),
        endDate: moment.utc("2120-03-30"),
        participants: 'Mike, Bobby',
        owner: 'Mike',
        projects: [],
    },
    {
        id: 'test_sprintId4',
        name: 'Sprint #4',
        startDate: moment.utc("2120-04-01"),
        endDate: moment.utc("2120-05-06"),
        participants: 'Mike, Bobby',
        owner: 'Mike',
        projects: [],
    }
];

const testQueueData = [
    {
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
        statusEndOfWeek1: { value: '25%' },
        statusEndOfWeek2: { value: '' },
        statusEndOfWeek3: { value: '' },
        statusEndOfWeek4: { value: '' },
        statusEndOfWeek5: { value: '' },
        statusEndOfWeek6: { value: '' },
        statusEndOfWeek7: { value: '' },
        statusEndOfWeek8: { value: '' },
    },
    {
        id: { value: 2 },
        name: { value: 'Verify course equivalencies & Grad Requirements in Illuminate' },
        manager: { value: 'Mike' },
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
    },
    {
        id: { value: 3 },
        name: { value: 'Verify course equivalencies & Grad Requirements in Illuminate' },
        manager: { value: 'Bobby' },
        description: { value: '-Audit all historical expeditions grades & match courses to equivalents' },
        category: { value: 'Grades & Transcripts' },
        categoryLead: { value: 'Bobby' },
        estimatedProjectSize: { value: '1 - Extra Small' },
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
    },
];

const dynamicSprintData = [
    {
        id: 'test_sprintId',
        name: 'Sprint #1',
        startDate: moment.utc(moment().subtract(7,'day')),
        endDate: moment.utc(moment().add(7,'day')),
        participants: 'Mike, Bobby',
        owner: 'Mike',
        projects: [
            {
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
                statusEndOfWeek1: { value: '25%' },
                statusEndOfWeek2: { value: '' },
                statusEndOfWeek3: { value: '' },
                statusEndOfWeek4: { value: '' },
                statusEndOfWeek5: { value: '' },
                statusEndOfWeek6: { value: '' },
                statusEndOfWeek7: { value: '' },
                statusEndOfWeek8: { value: '' },
            },
            {
                id: { value: 2 },
                name: { value: 'Verify course equivalencies & Grad Requirements in Illuminate' },
                manager: { value: 'Mike' },
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
            },
            {
                id: { value: 3 },
                name: { value: 'Verify course equivalencies & Grad Requirements in Illuminate' },
                manager: { value: 'Bobby' },
                description: { value: '-Audit all historical expeditions grades & match courses to equivalents' },
                category: { value: 'Grades & Transcripts' },
                categoryLead: { value: 'Bobby' },
                estimatedProjectSize: { value: '1 - Extra Small' },
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
            },
        ],
    },
    {
        id: 'test_sprintId2',
        name: 'Sprint #2',
        startDate: moment.utc(moment().add(10,'day')),
        endDate: moment.utc(moment().add(24,'day')),
        participants: 'Mike, Bobby',
        owner: 'Mike',
        projects: [
            {
                id: { value: 4 },
                name: { value: 'Verify course equivalencies & Grad Requirements in Illuminate' },
                manager: { value: 'Bobby' },
                description: { value: '-Audit all historical expeditions grades & match courses to equivalents' },
                category: { value: 'Grades & Transcripts' },
                categoryLead: { value: 'Bobby' },
                estimatedProjectSize: { value: '1 - Extra Small' },
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
            },
        ],
    },
    {
        id: 'test_sprintId3',
        name: 'Sprint #3',
        startDate: moment.utc(moment().add(27,'day')),
        endDate: moment.utc(moment().add(48,'day')),
        participants: 'Mike, Bobby',
        owner: 'Mike',
        projects: [
            {
                id: { value: 5 },
                name: { value: 'Verify course equivalencies & Grad Requirements in Illuminate' },
                manager: { value: 'Bobby' },
                description: { value: '-Audit all historical expeditions grades & match courses to equivalents' },
                category: { value: 'Grades & Transcripts' },
                categoryLead: { value: 'Bobby' },
                estimatedProjectSize: { value: '1 - Extra Small' },
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
            },
        ],
    },
];

const extraSprint = {
    id: 'test_sprintId4',
    name: 'Sprint #4',
    startDate: moment.utc(moment().add(50,'day')),
    endDate: moment.utc(moment().add(78,'day')),
    participants: 'Mike, Bobby',
    owner: 'Mike',
    projects: [
        {
            id: { value: 6 },
            name: { value: 'Verify course equivalencies & Grad Requirements in Illuminate' },
            manager: { value: 'Bobby' },
            description: { value: '-Audit all historical expeditions grades & match courses to equivalents' },
            category: { value: 'Grades & Transcripts' },
            categoryLead: { value: 'Bobby' },
            estimatedProjectSize: { value: '1 - Extra Small' },
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
        },
    ],
};

const mountSetup = (sprintData, queueData, isDemo) => {

    const onOrderSprintsByStartDate = jest.fn();
    const onInitiateDemo = jest.fn();

    const props = {
        onOrderSprintsByStartDate: onOrderSprintsByStartDate,
        onInitiateDemo: onInitiateDemo,
        isDemo: isDemo || true,
        classes: {}, // Necessary to work with Material UI
        sprints: sprintData || dynamicSprintData,
        queue: queueData || testQueueData,
    }

    const enzymeMountWrapper = mount(
        <UnconnectedMainView {...props} />
    );

    return {
        enzymeMountWrapper,
        onInitiateDemo,
    }
}

const mountSetupWithMockStore = (sprintData, isDemo) => {
    const onOrderSprintsByStartDate = jest.fn();
    const onInitiateDemo = jest.fn();

    const props = {
        onOrderSprintsByStartDate: onOrderSprintsByStartDate,
        onInitiateDemo: onInitiateDemo,
        isDemo: isDemo || true,
        classes: {}, // Necessary to work with Material UI
    }

    // Add thunk to avoid an error, per: https://philihp.com/2018/testing-a-redux-connected-component-with-thunk-actions-with-enzyme.html
    const mockStore = configureStore([thunk]);
    
    let store = mockStore({
        sprints: {
            sprints: sprintData || dynamicSprintData,
            queue: testQueueData,
        },
        authentication: {
            token: 'test_token',
            userId: 'test_userId',
        }
    });

    const enzymeMountWrapper = mount(
        <Provider store={store}>
            <MainView {...props} />
        </Provider>
    );

    return {
        enzymeMountWrapper,
    }
}

describe('MainView Component', () => {

    it('should match the snapshot', () => {
        const { enzymeMountWrapper } = mountSetup(staticSprintData);
        expect(toJson(enzymeMountWrapper)).toMatchSnapshot();
    });



    /* --- Basic Component Rendering & Toggling Current Sprint --- */

    it('should render the 5 buttons, with only the current sprint open when there is one. Toggling the Current Sprint button ' +
        'should remove the sprint table and action buttons. Toggling the button should add them again.', () => {
        const { enzymeMountWrapper } = mountSetup();

        // Current Sprint button visible
        expect(enzymeMountWrapper.find('button.MuiButton-contained span.MuiButton-label').at(0).prop('children'))
            .toEqual(expect.arrayContaining(['CURRENT SPRINT']));

        // Current Sprint action buttons visible and no other sprint's action buttons visible
        expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(0).prop('children'))
            .toEqual(expect.arrayContaining(['ADD NEW PROJECT']));
        expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(1).prop('children'))
            .toEqual(expect.arrayContaining(['EDIT SPRINT']));
        expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(2).prop('children'))
            .toEqual(expect.arrayContaining(['SPRINT STATISTICS']));
        expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(3))
            .toHaveLength(0);

        // Current Sprint table visible and no other tables visible
        expect(enzymeMountWrapper.find('h6.MuiTypography-root.MuiTypography-h6').prop('children'))
            .toEqual(expect.stringContaining('Sprint #1'));
        expect(enzymeMountWrapper.find('thead tr')).toHaveLength(1);
        expect(enzymeMountWrapper.find('tbody tr')).toHaveLength(3);

        // Next Sprint button visible
        expect(enzymeMountWrapper.find('button.MuiButton-contained span.MuiButton-label').at(1).prop('children'))
            .toEqual(expect.arrayContaining(['NEXT SPRINT']));

        // Project Queue button visible
        expect(enzymeMountWrapper.find('button.MuiButton-contained span.MuiButton-label').at(2).prop('children'))
            .toEqual(expect.arrayContaining(['PROJECT QUEUE']));

        // Future Sprints button visible
        expect(enzymeMountWrapper.find('button.MuiButton-contained span.MuiButton-label').at(3).prop('children'))
            .toEqual(expect.arrayContaining(['FUTURE SPRINTS']));

        // Create New Sprint button visible
        expect(enzymeMountWrapper.find('button.MuiButton-text span.MuiButton-label').at(0).prop('children'))
            .toEqual(expect.arrayContaining(['CREATE NEW SPRINT']));

        /* Close Toggle */

        // Click Current Sprint button
        enzymeMountWrapper.find('button.MuiButton-contained span.MuiButton-label').at(0).simulate('click');

        // Current Sprint's action buttons disappear
        expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label')).toHaveLength(0);
        expect(enzymeMountWrapper.find('h6.MuiTypography-root.MuiTypography-h6')).toHaveLength(0);

        /* Open Toggle */

        // Click Current Sprint button again
        enzymeMountWrapper.find('button.MuiButton-contained span.MuiButton-label').at(0).simulate('click');

        // Current Sprint action buttons visible and no other sprint's action buttons visible
        expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(0).prop('children'))
            .toEqual(expect.arrayContaining(['ADD NEW PROJECT']));
        expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(1).prop('children'))
            .toEqual(expect.arrayContaining(['EDIT SPRINT']));
        expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(2).prop('children'))
            .toEqual(expect.arrayContaining(['SPRINT STATISTICS']));
        expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(3))
            .toHaveLength(0);

        // Current Sprint table visible and no other tables visible
        expect(enzymeMountWrapper.find('h6.MuiTypography-root.MuiTypography-h6').prop('children'))
            .toEqual(expect.stringContaining('Sprint #1'));
        expect(enzymeMountWrapper.find('thead tr')).toHaveLength(1);
        expect(enzymeMountWrapper.find('tbody tr')).toHaveLength(3);
    });

    it('Toggling the Next Sprint button should open the sprint table and action buttons. Clicking the button again should close them.', () => {
        const { enzymeMountWrapper } = mountSetup();

        // Click Next Sprint button
        expect(enzymeMountWrapper.find('button.MuiButton-contained span.MuiButton-label').at(1).prop('children'))
            .toEqual(expect.arrayContaining(['NEXT SPRINT']));
        enzymeMountWrapper.find('button.MuiButton-contained span.MuiButton-label').at(1).simulate('click');

        // Next Sprint action buttons visible (on top of current sprint's) but not for later sprints
        expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(3).prop('children'))
            .toEqual(expect.arrayContaining(['ADD NEW PROJECT']));
        expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(4).prop('children'))
            .toEqual(expect.arrayContaining(['EDIT SPRINT']));
        expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(5).prop('children'))
            .toEqual(expect.arrayContaining(['SPRINT STATISTICS']));
        expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(6))
            .toHaveLength(0);

        // Next Sprint and Current Sprint tables visible but no others
        expect(enzymeMountWrapper.find('h6.MuiTypography-root.MuiTypography-h6').at(1).prop('children'))
            .toEqual(expect.stringContaining('Sprint #2'));
        expect(enzymeMountWrapper.find('thead tr')).toHaveLength(2);
        expect(enzymeMountWrapper.find('tbody tr')).toHaveLength(4); // 3 from Sprint #1 and 1 from Sprint #2

        // Toggle Next Sprint button again
        enzymeMountWrapper.find('button.MuiButton-contained span.MuiButton-label').at(1).simulate('click');

        // No actions buttons after Current Sprint
        expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(3))
            .toHaveLength(0);

        // No table after Current Sprint
        expect(enzymeMountWrapper.find('h6.MuiTypography-root.MuiTypography-h6').at(1)).toHaveLength(0);
        expect(enzymeMountWrapper.find('thead tr')).toHaveLength(1);
        expect(enzymeMountWrapper.find('tbody tr')).toHaveLength(3); 
    });

    it('Toggling the Project Queue button should open the project table and one action button. Clicking the button again should close them.', () => {
        const { enzymeMountWrapper } = mountSetup();

        // Click Project Queue button
        expect(enzymeMountWrapper.find('button.MuiButton-contained span.MuiButton-label').at(2).prop('children'))
            .toEqual(expect.arrayContaining(['PROJECT QUEUE']));
        enzymeMountWrapper.find('button.MuiButton-contained span.MuiButton-label').at(2).simulate('click');

        // Queue's single action button (Add New Project) visible (on top of current sprint's actions) but nothing for later sprints
        expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(3).prop('children'))
            .toEqual(expect.arrayContaining(['ADD NEW PROJECT']));
        expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(4))
            .toHaveLength(0);

        // Queue and Current Sprint tables visible but no others
        expect(enzymeMountWrapper.find('h6.MuiTypography-root.MuiTypography-h6').at(1).prop('children'))
            .toEqual(expect.stringContaining('Queue'));
        expect(enzymeMountWrapper.find('thead tr')).toHaveLength(2);
        expect(enzymeMountWrapper.find('tbody tr')).toHaveLength(6); // 3 from Sprint #1 and 3 from Queue

        // Toggle Queue button again
        enzymeMountWrapper.find('button.MuiButton-contained span.MuiButton-label').at(2).simulate('click');

        // No actions buttons after Current Sprint
        expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(3))
            .toHaveLength(0);

        // No table after Current Sprint
        expect(enzymeMountWrapper.find('h6.MuiTypography-root.MuiTypography-h6').at(1)).toHaveLength(0);
        expect(enzymeMountWrapper.find('thead tr')).toHaveLength(1);
        expect(enzymeMountWrapper.find('tbody tr')).toHaveLength(3); 
    });

    it('Toggling the Future Sprints button should open the one sprint table and action buttons. Clicking the button again should close them.', () => {
        const { enzymeMountWrapper } = mountSetup();

        // Click Future Sprints button
        expect(enzymeMountWrapper.find('button.MuiButton-contained span.MuiButton-label').at(3).prop('children'))
            .toEqual(expect.arrayContaining(['FUTURE SPRINTS']));
        enzymeMountWrapper.find('button.MuiButton-contained span.MuiButton-label').at(3).simulate('click');

        // Future Sprints action buttons visible (on top of current sprint's) but no others
        expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(3).prop('children'))
            .toEqual(expect.arrayContaining(['ADD NEW PROJECT']));
        expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(4).prop('children'))
            .toEqual(expect.arrayContaining(['EDIT SPRINT']));
        expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(5).prop('children'))
            .toEqual(expect.arrayContaining(['SPRINT STATISTICS']));
        expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(6))
            .toHaveLength(0);

        // Future Sprints and Current Sprint tables visible but no others
        expect(enzymeMountWrapper.find('h6.MuiTypography-root.MuiTypography-h6').at(1).prop('children'))
            .toEqual(expect.stringContaining('Sprint #3'));
        expect(enzymeMountWrapper.find('thead tr')).toHaveLength(2);
        expect(enzymeMountWrapper.find('tbody tr')).toHaveLength(4); // 3 from Sprint #1 and 1 from Sprint #3

        // Toggle Future Sprints button again
        enzymeMountWrapper.find('button.MuiButton-contained span.MuiButton-label').at(3).simulate('click');

        // No actions buttons after Current Sprint
        expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(3))
            .toHaveLength(0);

        // No table after Current Sprint
        expect(enzymeMountWrapper.find('h6.MuiTypography-root.MuiTypography-h6').at(1)).toHaveLength(0);
        expect(enzymeMountWrapper.find('thead tr')).toHaveLength(1);
        expect(enzymeMountWrapper.find('tbody tr')).toHaveLength(3); 
    });



    /* --- Action Buttons for Each Sprint Type and the Queue --- */

    it("Current Sprint's three action buttons should open the appropriate modals and close properly.", () => {
        const { enzymeMountWrapper } = mountSetupWithMockStore();

        /* --- Add New Project --- */

            // Click Add New Project
            expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(0).prop('children'))
                .toEqual(expect.arrayContaining(['ADD NEW PROJECT']));
            enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(0).simulate('click');

            // Add New Project modal visible with the correct sprint Id
            expect(enzymeMountWrapper.find('.MuiTypography-h4').prop('children'))
                .toEqual(["Create", " Project"]);
            expect(enzymeMountWrapper.find('[data-testid="readonly"]').at(0).prop('children'))
                .toEqual("test_sprintId");

            // Click upper-right cancel button and modal is removed
            enzymeMountWrapper.find('.MuiSvgIcon-root.MuiSvgIcon-fontSizeLarge').simulate('click');
            expect(enzymeMountWrapper.find('.MuiTypography-h4')).toHaveLength(0);

        /* --- Edit Sprint --- */

            // Click Edit Sprint
            expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(1).prop('children'))
                .toEqual(expect.arrayContaining(['EDIT SPRINT']));
            enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(1).simulate('click');

            // Edit Sprint modal visible with the correct sprint Id
            expect(enzymeMountWrapper.find('.MuiTypography-h4').prop('children'))
                .toEqual(["Edit", " Sprint"]);
            expect(enzymeMountWrapper.find('[data-testid="readonly"]').at(0).prop('children'))
                .toEqual("test_sprintId");

            // Click upper-right cancel button and modal is removed
            enzymeMountWrapper.find('.MuiSvgIcon-root.MuiSvgIcon-fontSizeLarge').simulate('click');
            expect(enzymeMountWrapper.find('.MuiTypography-h4')).toHaveLength(0);

        /* --- Sprint Statistics --- */

            // Click Sprint Statistics
            expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(2).prop('children'))
                .toEqual(expect.arrayContaining(['SPRINT STATISTICS']));
            enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(2).simulate('click');

            // Sprint Statistics modal visible with the correct sprint name
            expect(enzymeMountWrapper.find('.MuiTypography-h4').prop('children'))
                .toEqual(["Sprint #1", " Overview"]);

            // Click upper-right cancel button and modal is removed
            enzymeMountWrapper.find('.MuiSvgIcon-root.MuiSvgIcon-fontSizeLarge').simulate('click');
            expect(enzymeMountWrapper.find('.MuiTypography-h4')).toHaveLength(0);
    });

    it("Next Sprint's three action buttons should open the appropriate modals and close properly.", () => {
        const { enzymeMountWrapper } = mountSetupWithMockStore();

        /* --- Toggle Next Sprint Open --- */

            // Close Current Sprint
            expect(enzymeMountWrapper.find('button.MuiButton-contained span.MuiButton-label').at(0).prop('children'))
                .toEqual(expect.arrayContaining(['CURRENT SPRINT']));
            enzymeMountWrapper.find('button.MuiButton-contained span.MuiButton-label').at(0).simulate('click');

            // Click Next Sprint button
            expect(enzymeMountWrapper.find('button.MuiButton-contained span.MuiButton-label').at(1).prop('children'))
                .toEqual(expect.arrayContaining(['NEXT SPRINT']));
            enzymeMountWrapper.find('button.MuiButton-contained span.MuiButton-label').at(1).simulate('click');

        /* --- Add New Project --- */

            // Click Add New Project
            expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(0).prop('children'))
                .toEqual(expect.arrayContaining(['ADD NEW PROJECT']));
            enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(0).simulate('click');

            // Add New Project modal visible with the correct sprint Id
            expect(enzymeMountWrapper.find('.MuiTypography-h4').prop('children'))
                .toEqual(["Create", " Project"]);
            expect(enzymeMountWrapper.find('[data-testid="readonly"]').at(0).prop('children'))
                .toEqual("test_sprintId2");

            // Click upper-right cancel button and modal is removed
            enzymeMountWrapper.find('.MuiSvgIcon-root.MuiSvgIcon-fontSizeLarge').simulate('click');
            expect(enzymeMountWrapper.find('.MuiTypography-h4')).toHaveLength(0);

        /* --- Edit Sprint --- */

            // Click Edit Sprint
            expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(1).prop('children'))
                .toEqual(expect.arrayContaining(['EDIT SPRINT']));
            enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(1).simulate('click');

            // Edit Sprint modal visible with the correct sprint Id
            expect(enzymeMountWrapper.find('.MuiTypography-h4').prop('children'))
                .toEqual(["Edit", " Sprint"]);
            expect(enzymeMountWrapper.find('[data-testid="readonly"]').at(0).prop('children'))
                .toEqual("test_sprintId2");

            // Click upper-right cancel button and modal is removed
            enzymeMountWrapper.find('.MuiSvgIcon-root.MuiSvgIcon-fontSizeLarge').simulate('click');
            expect(enzymeMountWrapper.find('.MuiTypography-h4')).toHaveLength(0);

        /* --- Sprint Statistics --- */

            // Click Sprint Statistics
            expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(2).prop('children'))
                .toEqual(expect.arrayContaining(['SPRINT STATISTICS']));
            enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(2).simulate('click');

            // Sprint Statistics modal visible with the correct sprint name
            expect(enzymeMountWrapper.find('.MuiTypography-h4').prop('children'))
                .toEqual(["Sprint #2", " Overview"]);

            // Click upper-right cancel button and modal is removed
            enzymeMountWrapper.find('.MuiSvgIcon-root.MuiSvgIcon-fontSizeLarge').simulate('click');
            expect(enzymeMountWrapper.find('.MuiTypography-h4')).toHaveLength(0);
    });

    it("Future Sprint's three action buttons should open the appropriate modals and close properly.", () => {
        const { enzymeMountWrapper } = mountSetupWithMockStore();

        /* --- Toggle Future Sprints Open --- */

            // Close Current Sprint
            expect(enzymeMountWrapper.find('button.MuiButton-contained span.MuiButton-label').at(0).prop('children'))
                .toEqual(expect.arrayContaining(['CURRENT SPRINT']));
            enzymeMountWrapper.find('button.MuiButton-contained span.MuiButton-label').at(0).simulate('click');

            // Click Future Sprints button
            expect(enzymeMountWrapper.find('button.MuiButton-contained span.MuiButton-label').at(3).prop('children'))
                .toEqual(expect.arrayContaining(['FUTURE SPRINTS']));
            enzymeMountWrapper.find('button.MuiButton-contained span.MuiButton-label').at(3).simulate('click');

        /* --- Add New Project --- */

            // Click Add New Project
            expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(0).prop('children'))
                .toEqual(expect.arrayContaining(['ADD NEW PROJECT']));
            enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(0).simulate('click');

            // Add New Project modal visible with the correct sprint Id
            expect(enzymeMountWrapper.find('.MuiTypography-h4').prop('children'))
                .toEqual(["Create", " Project"]);
            expect(enzymeMountWrapper.find('[data-testid="readonly"]').at(0).prop('children'))
                .toEqual("test_sprintId3");

            // Click upper-right cancel button and modal is removed
            enzymeMountWrapper.find('.MuiSvgIcon-root.MuiSvgIcon-fontSizeLarge').simulate('click');
            expect(enzymeMountWrapper.find('.MuiTypography-h4')).toHaveLength(0);

        /* --- Edit Sprint --- */

            // Click Edit Sprint
            expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(1).prop('children'))
                .toEqual(expect.arrayContaining(['EDIT SPRINT']));
            enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(1).simulate('click');

            // Edit Sprint modal visible with the correct sprint Id
            expect(enzymeMountWrapper.find('.MuiTypography-h4').prop('children'))
                .toEqual(["Edit", " Sprint"]);
            expect(enzymeMountWrapper.find('[data-testid="readonly"]').at(0).prop('children'))
                .toEqual("test_sprintId3");

            // Click upper-right cancel button and modal is removed
            enzymeMountWrapper.find('.MuiSvgIcon-root.MuiSvgIcon-fontSizeLarge').simulate('click');
            expect(enzymeMountWrapper.find('.MuiTypography-h4')).toHaveLength(0);

        /* --- Sprint Statistics --- */

            // Click Sprint Statistics
            expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(2).prop('children'))
                .toEqual(expect.arrayContaining(['SPRINT STATISTICS']));
            enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(2).simulate('click');

            // Sprint Statistics modal visible with the correct sprint name
            expect(enzymeMountWrapper.find('.MuiTypography-h4').prop('children'))
                .toEqual(["Sprint #3", " Overview"]);

            // Click upper-right cancel button and modal is removed
            enzymeMountWrapper.find('.MuiSvgIcon-root.MuiSvgIcon-fontSizeLarge').simulate('click');
            expect(enzymeMountWrapper.find('.MuiTypography-h4')).toHaveLength(0);
    });

    it("Project Queue's one action button should open the appropriate modal and close properly.", () => {
        const { enzymeMountWrapper } = mountSetupWithMockStore();

        /* --- Toggle Project Queue Open --- */

            // Close Current Sprint
            expect(enzymeMountWrapper.find('button.MuiButton-contained span.MuiButton-label').at(0).prop('children'))
                .toEqual(expect.arrayContaining(['CURRENT SPRINT']));
            enzymeMountWrapper.find('button.MuiButton-contained span.MuiButton-label').at(0).simulate('click');

            // Click Project Queue button
            expect(enzymeMountWrapper.find('button.MuiButton-contained span.MuiButton-label').at(2).prop('children'))
                .toEqual(expect.arrayContaining(['PROJECT QUEUE']));
            enzymeMountWrapper.find('button.MuiButton-contained span.MuiButton-label').at(2).simulate('click');

        /* --- Add New Project --- */

            // Click Add New Project
            expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(0).prop('children'))
                .toEqual(expect.arrayContaining(['ADD NEW PROJECT']));
            enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(0).simulate('click');

            // Add New Project modal visible with the correct sprint Id
            expect(enzymeMountWrapper.find('.MuiTypography-h4').prop('children'))
                .toEqual(["Create", " Project"]);
            expect(enzymeMountWrapper.find('[data-testid="readonly"]').at(0).prop('children'))
                .toEqual("n/a - on Project Queue");

            // Click upper-right cancel button and modal is removed
            enzymeMountWrapper.find('.MuiSvgIcon-root.MuiSvgIcon-fontSizeLarge').simulate('click');
            expect(enzymeMountWrapper.find('.MuiTypography-h4')).toHaveLength(0);
    });



    /* --- Misc. Functionality --- */

    it('When there are no sprints and no queue, should show messages for missing data.', () => {
        const { enzymeMountWrapper } = mountSetup([], []); // Blank arrays for sprints and the queue

        // Current Sprint message visible by default
        expect(enzymeMountWrapper.find('[data-testid="NoCurrentSprint"]').prop('children'))
            .toEqual("No current sprint.");

        // Click Next Sprint button
        expect(enzymeMountWrapper.find('[data-testid="NoNextSprint"]')).toHaveLength(0);
        enzymeMountWrapper.find('button.MuiButton-contained span.MuiButton-label').at(1).simulate('click');

        // Next Sprint missing message visible
        expect(enzymeMountWrapper.find('[data-testid="NoNextSprint"]').prop('children'))
            .toEqual("No upcoming sprint.");

        // Click Project Queue button
        expect(enzymeMountWrapper.find('[data-testid="NoQueueProjects"]')).toHaveLength(0);
        enzymeMountWrapper.find('button.MuiButton-contained span.MuiButton-label').at(2).simulate('click');        

        // Queue Projects missing message visible
        expect(enzymeMountWrapper.find('[data-testid="NoQueueProjects"]').prop('children'))
            .toEqual("No projects in the queue.");

        // Click Future Sprints button
        expect(enzymeMountWrapper.find('[data-testid="NoFutureSprints"]')).toHaveLength(0);
        enzymeMountWrapper.find('button.MuiButton-contained span.MuiButton-label').at(3).simulate('click');

        // Future Sprints missing message visible
        expect(enzymeMountWrapper.find('[data-testid="NoFutureSprints"]').prop('children'))
            .toEqual("No upcoming sprints.");
    });

    it('Toggling the Future Sprints button should open two sprint tables and two sets of action buttons when there are two future sprints.', () => {
        let twoFutureSprintsData = [...dynamicSprintData];
        twoFutureSprintsData.push(extraSprint);
        
        const { enzymeMountWrapper } = mountSetup(twoFutureSprintsData);

        // Click Future Sprints button
        expect(enzymeMountWrapper.find('button.MuiButton-contained span.MuiButton-label').at(3).prop('children'))
            .toEqual(expect.arrayContaining(['FUTURE SPRINTS']));
        enzymeMountWrapper.find('button.MuiButton-contained span.MuiButton-label').at(3).simulate('click');

        // Two sets of Future Sprints action buttons visible (on top of current sprint's) but no others
        expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(3).prop('children'))
            .toEqual(expect.arrayContaining(['ADD NEW PROJECT']));
        expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(4).prop('children'))
            .toEqual(expect.arrayContaining(['EDIT SPRINT']));
        expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(5).prop('children'))
            .toEqual(expect.arrayContaining(['SPRINT STATISTICS']));
        expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(6).prop('children'))
            .toEqual(expect.arrayContaining(['ADD NEW PROJECT']));
        expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(7).prop('children'))
            .toEqual(expect.arrayContaining(['EDIT SPRINT']));
        expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(8).prop('children'))
            .toEqual(expect.arrayContaining(['SPRINT STATISTICS']));
        expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(9))
            .toHaveLength(0);

        // Future Sprints and Current Sprint tables visible but no others
        expect(enzymeMountWrapper.find('h6.MuiTypography-root.MuiTypography-h6').at(1).prop('children'))
            .toEqual(expect.stringContaining('Sprint #3'));
        expect(enzymeMountWrapper.find('h6.MuiTypography-root.MuiTypography-h6').at(2).prop('children'))
            .toEqual(expect.stringContaining('Sprint #4'));
        expect(enzymeMountWrapper.find('thead tr')).toHaveLength(3);
        expect(enzymeMountWrapper.find('tbody tr')).toHaveLength(5); // 3 from Sprint #1, 1 from Sprint #3, and 1 from Sprint #4
    });

    it('Clicking Create New Sprint opens the create sprint window and clicking cancel button closes it.', () => {
        const { enzymeMountWrapper } = mountSetupWithMockStore(); // Mock store necessary so that EditSprint can access it

        // Click Create New Sprint button
        expect(enzymeMountWrapper.find('button.MuiButton-text span.MuiButton-label').at(0).prop('children'))
            .toEqual(expect.arrayContaining(['CREATE NEW SPRINT']));
        enzymeMountWrapper.find('button.MuiButton-text span.MuiButton-label').at(0).simulate('click');

        // Create Sprint modal exists
        expect(enzymeMountWrapper.find('.MuiTypography-h4').prop('children'))
            .toEqual(["Create", " Sprint"]);
        
        // Click upper-right cancel button
        enzymeMountWrapper.find('.MuiSvgIcon-root.MuiSvgIcon-fontSizeLarge').simulate('click');

        // Create Sprint modal no longer exists
        expect(enzymeMountWrapper.find('.MuiTypography-h4')).toHaveLength(0);
    });

    it("Clicking the edit icon on a project's table row opens the Edit Project window and clicking the cancel button closes it.", () => {
        const { enzymeMountWrapper } = mountSetupWithMockStore();

        // Click Edit Project button
        enzymeMountWrapper.find('tbody tr td div button').at(0).simulate('click');

        // Edit Project modal exists and is the correct project
        expect(enzymeMountWrapper.find('.MuiTypography-h4').prop('children'))
            .toEqual(["Edit", " Project"]);
        expect(enzymeMountWrapper.find('[data-testid="readonly"]').at(0).prop('children'))
            .toEqual("test_sprintId");
        expect(enzymeMountWrapper.find('[data-testid="readonly"]').at(1).prop('children'))
            .toEqual(1);
        
        // Click upper-right cancel button
        enzymeMountWrapper.find('.MuiSvgIcon-root.MuiSvgIcon-fontSizeLarge').simulate('click');

        // Create Sprint modal no longer exists
        expect(enzymeMountWrapper.find('.MuiTypography-h4')).toHaveLength(0);
    });

    it("Loading the MainView with isDemo = true will call onInitiateDemo().", () => {
        const { enzymeMountWrapper, onInitiateDemo } = mountSetup(undefined, undefined, true);

        expect(onInitiateDemo).toHaveBeenCalled();
    });
});