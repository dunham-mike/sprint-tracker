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





    /* --- Misc. Functionality --- */

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

    it('Clicking Create New Sprint opens the create sprint window and clicking cancel closes it.', () => {
        const { enzymeMountWrapper } = mountSetup();

        // Click Create New Sprint button
        expect(enzymeMountWrapper.find('button.MuiButton-text span.MuiButton-label').at(0).prop('children'))
            .toEqual(expect.arrayContaining(['CREATE NEW SPRINT']));
        enzymeMountWrapper.find('button.MuiButton-text span.MuiButton-label').at(0).simulate('click');

        // Create Sprint modal exists
        // console.log(enzymeMountWrapper.find('div[role="presentation"]').debug());
        // expect(enzymeMountWrapper.find('.MuiTypography-root.MuiTypography-h4').prop('children')).toEqual(["Sprint #2", " Overview"]);

        // expect(enzymeMountWrapper.find('.MuiTypography-h4').prop('children'))
        //     .toEqual(["Create", " Sprint"]);

        // // Click Future Sprints button
        // expect(enzymeMountWrapper.find('button.MuiButton-contained span.MuiButton-label').at(3).prop('children'))
        //     .toEqual(expect.arrayContaining(['FUTURE SPRINTS']));
        // enzymeMountWrapper.find('button.MuiButton-contained span.MuiButton-label').at(3).simulate('click');

        // // Two sets of Future Sprints action buttons visible (on top of current sprint's) but no others
        // expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(3).prop('children'))
        //     .toEqual(expect.arrayContaining(['ADD NEW PROJECT']));
        // expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(4).prop('children'))
        //     .toEqual(expect.arrayContaining(['EDIT SPRINT']));
        // expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(5).prop('children'))
        //     .toEqual(expect.arrayContaining(['SPRINT STATISTICS']));
        // expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(6).prop('children'))
        //     .toEqual(expect.arrayContaining(['ADD NEW PROJECT']));
        // expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(7).prop('children'))
        //     .toEqual(expect.arrayContaining(['EDIT SPRINT']));
        // expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(8).prop('children'))
        //     .toEqual(expect.arrayContaining(['SPRINT STATISTICS']));
        // expect(enzymeMountWrapper.find('button.MuiButton-outlined span.MuiButton-label').at(9))
        //     .toHaveLength(0);

        // // Future Sprints and Current Sprint tables visible but no others
        // expect(enzymeMountWrapper.find('h6.MuiTypography-root.MuiTypography-h6').at(1).prop('children'))
        //     .toEqual(expect.stringContaining('Sprint #3'));
        // expect(enzymeMountWrapper.find('h6.MuiTypography-root.MuiTypography-h6').at(2).prop('children'))
        //     .toEqual(expect.stringContaining('Sprint #4'));
        // expect(enzymeMountWrapper.find('thead tr')).toHaveLength(3);
        // expect(enzymeMountWrapper.find('tbody tr')).toHaveLength(5); // 3 from Sprint #1, 1 from Sprint #3, and 1 from Sprint #4
    });
});




// Current sprint: add new project, edit sprint, view statistics
// Next sprint: add new project, edit sprint, view statistics
// Queue: add new project
// Future sprint: add new project, edit sprint, view statistics

// No current sprint, show message
// No next sprint, show message
// Queue always shows table, even if empty
// No future sprints, show message


// Create new sprint opens create sprint window