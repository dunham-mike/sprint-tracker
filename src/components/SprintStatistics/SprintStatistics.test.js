import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
// import { Redirect } from 'react-router-dom';
import * as moment from 'moment';

import SprintStatistics from './SprintStatistics';

Enzyme.configure({ adapter: new Adapter() })

const mountSetup = (sprintId, sprintIndex) => {

    const props = {
        sprintId: sprintId || 'test_sprintId',
        sprintIndex: sprintIndex || 0,
        onCloseSprintStatistics: jest.fn()
    }

    const mockStore = configureStore([]);
    
    let store = mockStore({
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
    });

    const enzymeMountWrapper = mount(
        <BrowserRouter>
            <Provider store={store}>
                <SprintStatistics {...props} />
            </Provider>
        </BrowserRouter>
    );

    return {
        enzymeMountWrapper
    }
}

/* 
    <SprintStatistics 
        sprintId = {this.state.sprintIdBeingViewed}
        sprintIndex= {this.state.sprintIndexBeingViewed}
        onCloseSprintStatistics = {this.closeSprintStatistics}
    />
*/


describe('SprintStatistics Component', () => {

    it('should match the snapshot', () => {
        const { enzymeMountWrapper } = mountSetup();
        expect(toJson(enzymeMountWrapper)).toMatchSnapshot();
    });

    /* --- Populated Sprint --- */

    it('should show the correct sprint title for a populated sprint', () => {
        const { enzymeMountWrapper } = mountSetup();
        expect(enzymeMountWrapper.find('.MuiTypography-root.MuiTypography-h4').prop('children')).toEqual(['Sprint #1', ' Overview']);
    });

    it('should show the correct Sprint Size information for a populated sprint', () => {
        const { enzymeMountWrapper } = mountSetup();
        expect(enzymeMountWrapper.find('.MuiTypography-root.MuiTypography-body2').at(0).prop('children')).toEqual([3, ' projects']);
        expect(enzymeMountWrapper.find('.MuiTypography-root.MuiTypography-body2').at(1).prop('children')).toEqual([7, ' project points', ' (3.5 avg. per PM)']);
    });

    it('should show the correct Allocation by Project Manager information for a populated sprint', () => {
        const { enzymeMountWrapper } = mountSetup();
        expect(enzymeMountWrapper.find('.MuiTypography-root.MuiListItemText-primary.MuiTypography-body1').at(0).prop('children')).toEqual('Bobby');
        expect(enzymeMountWrapper.find('.MuiTypography-root.MuiTypography-body2').at(2).prop('children')).toEqual('2 projects  |  4 project points');

        expect(enzymeMountWrapper.find('.MuiTypography-root.MuiListItemText-primary.MuiTypography-body1').at(1).prop('children')).toEqual('Mike');
        expect(enzymeMountWrapper.find('.MuiTypography-root.MuiTypography-body2').at(3).prop('children')).toEqual('1 project  |  3 project points');
    });

    it('should show the correct Projects by Category information for a populated sprint', () => {
        const { enzymeMountWrapper } = mountSetup();
        expect(enzymeMountWrapper.find('.MuiTypography-root.MuiListItemText-primary.MuiTypography-body1').at(2).prop('children')).toEqual('Grades & Transcripts');
        expect(enzymeMountWrapper.find('.MuiTypography-root.MuiTypography-body2').at(4).prop('children')).toEqual('3 projects  |  7 project points');
    });

    it('should show the correct Sprint Progress information for a populated sprint', () => {
        const { enzymeMountWrapper } = mountSetup();
        expect(enzymeMountWrapper.find('.MuiTypography-root.MuiTypography-h6').at(3).prop('children')).toEqual("Sprint Progress");
        expect(enzymeMountWrapper.find('.recharts-responsive-container')).toHaveLength(1);
    });



    /* --- Unpopulated Sprint --- */

    it('should show the correct sprint title for an unpopulated sprint', () => {
        const { enzymeMountWrapper } = mountSetup('test_sprintId2', 1);
        expect(enzymeMountWrapper.find('.MuiTypography-root.MuiTypography-h4').prop('children')).toEqual(['Sprint #2', ' Overview']);
    });

    it('should show the correct Sprint Size information for an unpopulated sprint', () => {
        const { enzymeMountWrapper } = mountSetup('test_sprintId2', 1);
        expect(enzymeMountWrapper.find('.MuiTypography-root.MuiTypography-body2').at(0).prop('children')).toEqual([0, ' projects']);
        expect(enzymeMountWrapper.find('.MuiTypography-root.MuiTypography-body2').at(1).prop('children')).toEqual([0, ' project points', '']);
    });

    it('should show the correct Allocation by Project Manager and Projects by Category information for an unpopulated sprint', () => {
        const { enzymeMountWrapper } = mountSetup('test_sprintId2', 1);
        // No project manager or project category name displayed
        expect(enzymeMountWrapper.find('.MuiTypography-root.MuiListItemText-primary.MuiTypography-body1')).toHaveLength(0); 
        // No project manager size or project category size information displayed
        expect(enzymeMountWrapper.find('.MuiTypography-root.MuiTypography-body2').at(2)).toHaveLength(0);
    });

    it('should show the correct Sprint Progress information for an unpopulated sprint', () => {
        const { enzymeMountWrapper } = mountSetup('test_sprintId2', 1);
        expect(enzymeMountWrapper.find('.MuiTypography-root.MuiTypography-h6').at(3).prop('children')).toEqual("Sprint Progress");
        expect(enzymeMountWrapper.find('.recharts-responsive-container')).toHaveLength(1);
    });

});