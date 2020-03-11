import React from 'react';
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json';
import * as moment from 'moment';

import Sprint from './Sprint';

Enzyme.configure({ adapter: new Adapter() });

const testSprint = {
    id: 'test_sprintId',
    name: 'Sprint #1',
    startDate: moment.utc("2020-01-24"), 
    endDate: moment.utc("2020-02-20"),
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
};

/* <Sprint 
    sprint={this.props.sprints[this.state.currentSprintIndex]} 
    sprintId={
        // This check is necessary to avoid an error when first deleting the current sprint
        this.props.sprints[this.state.currentSprintIndex]
        ? this.props.sprints[this.state.currentSprintIndex].id
        : null
    }
    onOpenProject={this.openEditingProject}
    sprintType="current"
/> */

const mountSetup = (sprintData, sprintId, sprintType) => {

    const onOpenProject = jest.fn();

    const props = {
        sprint: sprintData || null,
        sprintId: sprintId || null,
        onOpenProject: onOpenProject,
        sprintType: sprintType || 'current'
    }

    const enzymeMountWrapper = mount(
        <Sprint
            {...props}
        />
    );

    return {
        enzymeMountWrapper,
        onOpenProject
    }
}

describe('Sprint Component', () => {

    it('should match the snapshot', () => {
        const { enzymeMountWrapper } = mountSetup(testSprint, testSprint.id, "current");
        expect(toJson(enzymeMountWrapper)).toMatchSnapshot();
    });



    /* --- Displaying Current, Next, and Future Sprints --- */

    it('should display a "current" sprint, and length should be 28 days/4 weeks', () => {
        const { enzymeMountWrapper } = mountSetup(testSprint, testSprint.id, "current");

        expect(enzymeMountWrapper.find('.MuiTypography-root.MuiTypography-h6').prop('children')).toEqual('Sprint #1: 1/24 to 2/20/20');

        expect(enzymeMountWrapper.find('.MuiButtonBase-root.MuiTableSortLabel-root div').at(13).prop('children'))
            .toEqual('Status End of Week 1 (0-100%)');
        expect(enzymeMountWrapper.find('.MuiButtonBase-root.MuiTableSortLabel-root div').at(14).prop('children'))
            .toEqual('Status End of Week 2 (0-100%)');
        expect(enzymeMountWrapper.find('.MuiButtonBase-root.MuiTableSortLabel-root div').at(15).prop('children'))
            .toEqual('Status End of Week 3 (0-100%)');
        expect(enzymeMountWrapper.find('.MuiButtonBase-root.MuiTableSortLabel-root div').at(16).prop('children'))
            .toEqual('Status End of Week 4 (0-100%)');
        expect(enzymeMountWrapper.find('.MuiButtonBase-root.MuiTableSortLabel-root div').at(17))
            .toHaveLength(0);
    });

    it('should display 5 weekly status columns for a sprint of 29 days', () => {
        const { enzymeMountWrapper } = mountSetup(
            {
                ...testSprint,
                endDate: moment.utc("2020-02-21")
            }, 
            testSprint.id, 
            "current"
        );

        expect(enzymeMountWrapper.find('.MuiButtonBase-root.MuiTableSortLabel-root div').at(13).prop('children'))
            .toEqual('Status End of Week 1 (0-100%)');
        expect(enzymeMountWrapper.find('.MuiButtonBase-root.MuiTableSortLabel-root div').at(14).prop('children'))
            .toEqual('Status End of Week 2 (0-100%)');
        expect(enzymeMountWrapper.find('.MuiButtonBase-root.MuiTableSortLabel-root div').at(15).prop('children'))
            .toEqual('Status End of Week 3 (0-100%)');
        expect(enzymeMountWrapper.find('.MuiButtonBase-root.MuiTableSortLabel-root div').at(16).prop('children'))
            .toEqual('Status End of Week 4 (0-100%)');
        expect(enzymeMountWrapper.find('.MuiButtonBase-root.MuiTableSortLabel-root div').at(17).prop('children'))
            .toEqual('Status End of Week 5 (0-100%)');
        expect(enzymeMountWrapper.find('.MuiButtonBase-root.MuiTableSortLabel-root div').at(18))
            .toHaveLength(0);
    });

    it('should display a "next" sprint', () => {
        const { enzymeMountWrapper } = mountSetup(testSprint, testSprint.id, "next");

        expect(enzymeMountWrapper.find('.MuiTypography-root.MuiTypography-h6').prop('children')).toEqual('Sprint #1: 1/24 to 2/20/20');
    });

    it('should display a "future" sprint', () => {
        const { enzymeMountWrapper } = mountSetup(testSprint, testSprint.id, "future");

        expect(enzymeMountWrapper.find('.MuiTypography-root.MuiTypography-h6').prop('children')).toEqual('Sprint #1: 1/24 to 2/20/20');
    });



    /* --- Displaying the Queue --- */

    it('should display the "queue," and length should be 8 weeks regardless of start and end dates', () => {
        const { enzymeMountWrapper } = mountSetup(testSprint.projects, -1, "queue");

        expect(enzymeMountWrapper.find('.MuiTypography-root.MuiTypography-h6').prop('children')).toEqual('Queue');

        expect(enzymeMountWrapper.find('.MuiButtonBase-root.MuiTableSortLabel-root div').at(13).prop('children'))
            .toEqual('Status End of Week 1 (0-100%)');
        expect(enzymeMountWrapper.find('.MuiButtonBase-root.MuiTableSortLabel-root div').at(14).prop('children'))
            .toEqual('Status End of Week 2 (0-100%)');
        expect(enzymeMountWrapper.find('.MuiButtonBase-root.MuiTableSortLabel-root div').at(15).prop('children'))
            .toEqual('Status End of Week 3 (0-100%)');
        expect(enzymeMountWrapper.find('.MuiButtonBase-root.MuiTableSortLabel-root div').at(16).prop('children'))
            .toEqual('Status End of Week 4 (0-100%)');
        expect(enzymeMountWrapper.find('.MuiButtonBase-root.MuiTableSortLabel-root div').at(17).prop('children'))
            .toEqual('Status End of Week 5 (0-100%)');
        expect(enzymeMountWrapper.find('.MuiButtonBase-root.MuiTableSortLabel-root div').at(18).prop('children'))
            .toEqual('Status End of Week 6 (0-100%)');
        expect(enzymeMountWrapper.find('.MuiButtonBase-root.MuiTableSortLabel-root div').at(19).prop('children'))
            .toEqual('Status End of Week 7 (0-100%)');
        expect(enzymeMountWrapper.find('.MuiButtonBase-root.MuiTableSortLabel-root div').at(20).prop('children'))
            .toEqual('Status End of Week 8 (0-100%)');
        expect(enzymeMountWrapper.find('.MuiButtonBase-root.MuiTableSortLabel-root div').at(21))
            .toHaveLength(0);
    });



    /* --- Not Displaying Sprints --- */
    
    it('should not display a sprint table when a null sprint is passed', () => {
        const { enzymeMountWrapper } = mountSetup(null, null, "current");

        // Don't display a sprint table
        expect(enzymeMountWrapper.find('.MuiTypography-root.MuiTypography-h6')).toHaveLength(0);
    });

    it('should not display a sprint table when a "past" sprint is passed', () => {
        const { enzymeMountWrapper } = mountSetup(testSprint, testSprint.id, "past");

        // Don't display a sprint table
        expect(enzymeMountWrapper.find('.MuiTypography-root.MuiTypography-h6')).toHaveLength(0);
    });

    it('should not display a sprint table when a non-current, non-next, non-future sprint is passed', () => {
        const { enzymeMountWrapper } = mountSetup(testSprint, testSprint.id, "non_conforming_sprint_type");

        // Don't display a sprint table
        expect(enzymeMountWrapper.find('.MuiTypography-root.MuiTypography-h6')).toHaveLength(0);
    });

});