import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { BrowserRouter } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import * as moment from 'moment';

import { editProject as UnconnectedEditProject } from './EditProject';

Enzyme.configure({ adapter: new Adapter() })

/* <EditProject 
    project={this.state.projectBeingViewed}
    sprintId={this.state.sprintIdBeingViewed}
    sprintIndex={this.state.sprintIndexBeingViewed}
    onCloseProject={this.closeEditingProject}
    actionType={"edit"}
/> 

<EditProject 
    project={null}
    sprintId={this.state.sprintIdBeingViewed}
    sprintIndex={this.state.sprintIndexBeingViewed}
    onCloseProject={this.closeCreatingProject}
    actionType={"create"}
/> */

const mountSetup = (actionType, sprintId) => {

    const onCloseProject = jest.fn();
    const onAddProject = jest.fn();
    const onUpdateProject = jest.fn();
    const onDeleteProject = jest.fn();
    const onMoveProject = jest.fn();

    const props = {
        actionType: actionType || "edit",
        project: projectData,
        sprintId: sprintId,
        sprintIndex: sprintIndex,
        onCloseProject: onCloseProject,
        onAddProject: onAddProject,
        onUpdateProject: onUpdateProject,
        onDeleteProject: onDeleteProject,
        onMoveProject: onMoveProject,
        classes: {}, // Necessary to work with Material UI
        authentication: {
            token: 'test_token',
            userId: 'test_userId',
        },
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

    const enzymeMountWrapper = mount(
        <UnconnectedEditProject {...props} />
    );

    return {
        enzymeMountWrapper,
        onCloseProject,
        onAddProject,
        onUpdateProject,
        onDeleteProject,
        onMoveProject
    }
}

describe('EditProject Component', () => {

    it('should match the snapshot', () => {
        const { enzymeMountWrapper } = mountSetup();
        expect(toJson(enzymeMountWrapper)).toMatchSnapshot();
    });
});