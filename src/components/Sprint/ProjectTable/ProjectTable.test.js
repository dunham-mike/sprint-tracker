import React from 'react';
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json';

import ProjectTable from './ProjectTable';

Enzyme.configure({ adapter: new Adapter() });

/* <ProjectTable 
    tableData={props.sprint.projects} 
    tableTitle={
        props.sprint.name + ': ' 
        + moment(props.sprint.startDate).format("M") + '/' + moment(props.sprint.startDate).format("D") + 
        // Conditionally show start date's year if it is different than the end date's year
        (moment(props.sprint.startDate).format("YY") !== moment(props.sprint.endDate).format("YY") ? '/' + moment(props.sprint.startDate).format("YY") : '' )
        + ' to ' + moment(props.sprint.endDate).format("M") + '/' + moment(props.sprint.endDate).format("D") + '/' + moment(props.sprint.endDate).format("YY")
    }
    sprintId={props.sprintId}
    onOpenProject={props.onOpenProject}
    sprintType={props.sprintType}
    sprintLength={getSprintLength()}
/> */

const testProjects = [
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

const mountSetup = (sprintType) => {

    const onOpenProject = jest.fn();

    const props = {
        tableData: testProjects,
        tableTitle: 'Sprint #1: 1/24 to 2/6/20',
        sprintId: 'test_sprintId',
        onOpenProject: onOpenProject,
        sprintType: sprintType || 'current',
        sprintLength: 2,
    }

    const enzymeMountWrapper = mount(
        <ProjectTable
            {...props}
        />
    );

    return {
        enzymeMountWrapper,
        onOpenProject
    }
}

describe('ProjectTable Component', () => {

    it('should match the snapshot', () => {
        const { enzymeMountWrapper } = mountSetup();
        expect(toJson(enzymeMountWrapper)).toMatchSnapshot();
    });



    /* --- Common Functionality --- */

    it('should display the correct number of rows for the projects passed in', () => {
        const { enzymeMountWrapper } = mountSetup();

        expect(enzymeMountWrapper.find('.MuiTableRow-root')).toHaveLength(4); // Header + 3 projects
    });

    it('should fire the onOpenProject() function when clicking the edit button', () => {
        const { enzymeMountWrapper, onOpenProject } = mountSetup();

        enzymeMountWrapper.find('button[title="Edit Project"]').at(0).simulate('click');
        expect(onOpenProject).toHaveBeenCalledTimes(1);
    });

    it('should display the correct number of status columns based on the sprint length', () => {
        const { enzymeMountWrapper } = mountSetup();

        expect(enzymeMountWrapper.find('.MuiButtonBase-root.MuiTableSortLabel-root div').at(13).prop('children'))
            .toEqual('Status End of Week 1 (0-100%)');
        expect(enzymeMountWrapper.find('.MuiButtonBase-root.MuiTableSortLabel-root div').at(14).prop('children'))
            .toEqual('Status End of Week 2 (0-100%)');
        expect(enzymeMountWrapper.find('.MuiButtonBase-root.MuiTableSortLabel-root div').at(15))
            .toHaveLength(0);
    });



    /* --- Sprint Type-Specific Functionality --- */

    it('should not display an edit button on "past" sprints and display the column headers in yellow', () => {
        const { enzymeMountWrapper } = mountSetup('past');

        expect(enzymeMountWrapper.find('button[title="Edit Project"]')).toHaveLength(0);

        // Per: https://stackoverflow.com/a/48019898
        expect(enzymeMountWrapper.find('.MuiTableCell-root.MuiTableCell-head').at(0).prop('style'))
            .toHaveProperty('backgroundColor', '#ffee58');  // Or: .backgroundColor).toEqual('#ffee58') 
    });
    
    it('should display blue column headers for "current" sprints', () => {
        const { enzymeMountWrapper } = mountSetup('current');

        expect(enzymeMountWrapper.find('.MuiTableCell-root.MuiTableCell-head').at(0).prop('style'))
            .toHaveProperty('backgroundColor', '#2196f3');  // Or: .backgroundColor).toEqual('#ffee58') 
    });

    it('should display red column headers for "next" sprints', () => {
        const { enzymeMountWrapper } = mountSetup('next');

        expect(enzymeMountWrapper.find('.MuiTableCell-root.MuiTableCell-head').at(0).prop('style'))
            .toHaveProperty('backgroundColor', '#ef5350');  // Or: .backgroundColor).toEqual('#ffee58') 
    });

    it('should display grey column headers for the "queue"', () => {
        const { enzymeMountWrapper } = mountSetup('queue');

        expect(enzymeMountWrapper.find('.MuiTableCell-root.MuiTableCell-head').at(0).prop('style'))
            .toHaveProperty('backgroundColor', '#e0e0e0');  // Or: .backgroundColor).toEqual('#ffee58') 
    });

});