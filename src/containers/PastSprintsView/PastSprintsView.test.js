import React from 'react';
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import * as moment from 'moment';

import PastSprintsView from './PastSprintsView';

Enzyme.configure({ adapter: new Adapter() });

const twoTestSprints = {
    sprints: {
        sprints: 
            [
                {
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
                },
                {
                    id: 'test_sprintId2',
                    name: 'Sprint #2',
                    startDate: moment.utc("2020-02-10"),
                    endDate: moment.utc("2020-03-06"),
                    participants: 'Mike, Bobby',
                    owner: 'Mike',
                    projects: [],
                }
            ]
    }
};

const oneTestSprint = {
    sprints: {
        sprints: 
            [
                {
                    id: 'test_sprintId2',
                    name: 'Sprint #2',
                    startDate: moment.utc("2020-02-10"),
                    endDate: moment.utc("2020-03-06"),
                    participants: 'Mike, Bobby',
                    owner: 'Mike',
                    projects: [],
                }
            ]
    }
};

const zeroTestSprints = {
    sprints: {
        sprints: []
    }
};


const mountSetup = (storeData) => {

    const mockStore = configureStore([]);
    
    let store = mockStore(storeData || twoTestSprints);

    const enzymeMountWrapper = mount(
        <Provider store={store}>
            <PastSprintsView />
        </Provider>
    );

    return {
        enzymeMountWrapper
    }
}

describe('PastSprintsView Component', () => {

    it('should match the snapshot', () => {
        const { enzymeMountWrapper } = mountSetup();
        expect(toJson(enzymeMountWrapper)).toMatchSnapshot();
    });



    /* --- Zero Sprints --- */

    it('should show a message when there are no past sprints to display', () => {
        const { enzymeMountWrapper } = mountSetup(zeroTestSprints);

        expect(enzymeMountWrapper.find('.MuiTypography-root.MuiTypography-h5').prop('children')).toEqual('There are no completed sprints to display.');
    });



    /* --- One Sprint --- */

    it('should render one sprint button when there is only one past sprint', () => {
        const { enzymeMountWrapper } = mountSetup(oneTestSprint);

        expect(enzymeMountWrapper.find('.MuiButton-label')).toHaveLength(2); // Title button and one sprint button

        expect(enzymeMountWrapper.find('.MuiButton-label').at(1).prop('children')).toEqual([undefined, "Sprint #2", undefined]);
    });

    it('should display the Sprint Statistics component when the Sprint Statistics button is clicked and hide it when the cancel button is clicked', () => {
        const { enzymeMountWrapper } = mountSetup(oneTestSprint);

        enzymeMountWrapper.find('.MuiButtonBase-root').at(1).simulate('click'); // Open sprint
        enzymeMountWrapper.find('.MuiButton-outlined').at(0).simulate('click'); // Open Sprint Statistics

        expect(enzymeMountWrapper.find('.MuiTypography-root.MuiTypography-h4').prop('children')).toEqual(["Sprint #2", " Overview"]);

        enzymeMountWrapper.find('.MuiSvgIcon-root.MuiSvgIcon-fontSizeLarge').simulate('click'); // Click cancel button

        expect(enzymeMountWrapper.find('.MuiTypography-root.MuiTypography-h4')).toHaveLength(0);
    });



    /* --- Two Sprints --- */

    it('should render two sprint buttons when there are two past sprints, and they should be rendered in reverse order of end date', () => {
        const { enzymeMountWrapper } = mountSetup(twoTestSprints);

        expect(enzymeMountWrapper.find('.MuiButton-label')).toHaveLength(3); // Title button and twp sprint buttons
        expect(enzymeMountWrapper.find('.MuiButton-label').at(1).prop('children')).toEqual([undefined, "Sprint #2", undefined]);
        expect(enzymeMountWrapper.find('.MuiButton-label').at(2).prop('children')).toEqual([undefined, "Sprint #1", undefined]);
    });

});