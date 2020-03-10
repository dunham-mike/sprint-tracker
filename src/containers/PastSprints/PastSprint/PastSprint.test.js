import React from 'react';
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json';
import * as moment from 'moment';

import PastSprint from './PastSprint';

Enzyme.configure({ adapter: new Adapter() })


/* --- Test Data --- */

const testSprint = {
    id: 'test_sprintId',
    name: 'Sprint #1',
    startDate: moment.utc("2020-01-24"), 
    endDate: moment.utc("2020-02-06"),
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

const mountSetup = (sprintData, sprintId) => {

    /* 
        <PastSprint 
            sprint={sprint} 
            openSprintStatistics={this.openSprintStatistics}
            key={sprint.id}
        />
    */

    const openSprintStatistics = jest.fn();

    const props = {
        sprint: sprintData || testSprint,
        openSprintStatistics: openSprintStatistics,
        key: sprintId || testSprint.id,
    }

    const enzymeMountWrapper = mount(
                <PastSprint {...props} />
    );

    return {
        enzymeMountWrapper,
        openSprintStatistics
    }
}


describe('PastSprint Component', () => {

    it('should match the snapshot', () => {
        const { enzymeMountWrapper } = mountSetup();
        expect(toJson(enzymeMountWrapper)).toMatchSnapshot();
    });


    /* --- Initial Display --- */

    it('should show the sprint button with the sprint title but not the sprint table', () => {
        const { enzymeMountWrapper } = mountSetup();

        // TODO: It's not clear why the wrapper has the sprint name sandwiched by undefined values. Maybe the spans are seen as undefined?
        expect(enzymeMountWrapper.find('.MuiButton-label').prop('children')).toEqual([undefined, "Sprint #1", undefined]);

        expect(enzymeMountWrapper.find('projectTable')).toHaveLength(0);
    });



    /* --- User Interaction --- */

    it('should show the sprint table and the Sprint Statistics button when the sprint button is clicked', () => {
        const { enzymeMountWrapper } = mountSetup();

        enzymeMountWrapper.find('.MuiButtonBase-root').simulate('click');

        expect(enzymeMountWrapper.find('projectTable')).toHaveLength(1);
        expect(enzymeMountWrapper.find('.MuiButton-label')).toHaveLength(2); // Second button added
    });

    it('should fire openSprintStatistics() when the Sprint Statistics button is clicked', () => {
        const { enzymeMountWrapper, openSprintStatistics } = mountSetup();

        enzymeMountWrapper.find('.MuiButtonBase-root').simulate('click'); // Open sprint
        enzymeMountWrapper.find('.MuiButton-label').at(1).simulate('click'); // Open Sprint Statistics

        expect(openSprintStatistics).toHaveBeenCalledTimes(1);
    });
});