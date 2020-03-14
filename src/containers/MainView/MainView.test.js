import React from 'react';
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json';
import moment from 'moment'; 

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

const queueData = [
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
        projects: [],
    },
    {
        id: 'test_sprintId3',
        name: 'Sprint #3',
        startDate: moment.utc(moment().add(27,'day')),
        endDate: moment.utc(moment().add(48,'day')),
        participants: 'Mike, Bobby',
        owner: 'Mike',
        projects: [],
    },
    {
        id: 'test_sprintId4',
        name: 'Sprint #4',
        startDate: moment.utc(moment().add(50,'day')),
        endDate: moment.utc(moment().add(78,'day')),
        participants: 'Mike, Bobby',
        owner: 'Mike',
        projects: [],
    }
];

const mountSetup = (sprintData, isDemo) => {

    const onOrderSprintsByStartDate = jest.fn();
    const onInitiateDemo = jest.fn();

    const props = {
        onOrderSprintsByStartDate: onOrderSprintsByStartDate,
        onInitiateDemo: onInitiateDemo,
        isDemo: isDemo || true,
        classes: {}, // Necessary to work with Material UI
        sprints: sprintData || dynamicSprintData,
        queue: queueData,
    }

    const enzymeMountWrapper = mount(
        <UnconnectedMainView {...props} />
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



    /* --- Basic Component Rendering --- */

    // it('should render the 5 buttons, with the current sprint open when there is one.', () => {
    //     const { enzymeMountWrapper } = mountSetup();


    // });

});

// Basic rendering: 5 buttons on left side, current sprint open

// Current sprint: toggle open, see table and 3 buttons, toggle close and they disappear
// Next sprint: toggle open, see table and 3 buttons, toggle close and they disappear
// Queue: toggle open, see table and 3 buttons, toggle close and they disappear
// Future sprint: toggle open, see table and 3 buttons, toggle close and they disappear

// Current sprint: add new project, edit sprint, view statistics
// Next sprint: add new project, edit sprint, view statistics
// Queue: add new project
// Future sprint: add new project, edit sprint, view statistics

// No current sprint, show message
// No next sprint, show message
// Queue always shows table, even if empty
// No future sprints, show message

// Show as many future sprints as you have (excluding the one for next)

// Create new sprint opens create sprint window