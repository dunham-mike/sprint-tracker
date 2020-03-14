import React from 'react';
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json';
// Changed import from 'import * as moment' to accommodate testing, per: https://github.com/palantir/blueprint/issues/959#issuecomment-562836914
import moment from 'moment'; 

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
    projectId={null}
    sprintId={this.state.sprintIdBeingViewed}
    sprintIndex={this.state.sprintIndexBeingViewed}
    onCloseProject={this.closeCreatingProject}
    actionType={"create"}
/> */

const mountSetup = (actionType, staticDates, sprintId, sprintIndex, projectId, sprintLengthInDays) => {

    const onCloseProject = jest.fn();
    const onAddProject = jest.fn();
    const onUpdateProject = jest.fn();
    const onDeleteProject = jest.fn();
    const onMoveProject = jest.fn();

    let startDate = moment.utc(moment());
    let endDate = moment.utc(moment().add((sprintLengthInDays || 15) - 1,'day'));

    if(staticDates) {
        startDate = moment.utc("2019–12–31", 'YYYY-MM-DD');
        endDate = moment.utc("2020–01–15", 'YYYY-MM-DD');
    }

    const props = {
        actionType: actionType || "edit",
        sprintId: sprintId || 'test_sprintId',
        sprintIndex: sprintIndex || 0,
        projectId: projectId || 1,
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
                    startDate: startDate,
                    endDate: endDate,
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
            ],
        queue: [
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
        const { enzymeMountWrapper } = mountSetup("edit", true);
        expect(toJson(enzymeMountWrapper)).toMatchSnapshot();
    });



    /* --- Basic Component Rendering --- */

    it('[Edit action] Should show: 1.) edit title, 2.) input fields in the correct order; 3.) cancel and save buttons;' + 
        'and 4.) delete and assign to another sprint buttons', () => {
        const { enzymeMountWrapper } = mountSetup();

        // Title
        expect(enzymeMountWrapper.find('.MuiTypography-root.MuiTypography-h4').prop('children')).toEqual(['Edit', ' Project']);

        // Input Fields
        expect(enzymeMountWrapper.find('form div label').at(0).prop('children')).toEqual(['Sprint ID', '*']);
        expect(enzymeMountWrapper.find('form div label').at(1).prop('children')).toEqual(['Project ID', '*']);
        expect(enzymeMountWrapper.find('form div label').at(2).prop('children')).toEqual(['Project Name', '*']);
        expect(enzymeMountWrapper.find('form div label').at(3).prop('children')).toEqual(['Project Manager', '*']);
        expect(enzymeMountWrapper.find('form div label').at(4).prop('children')).toEqual(['Description', '*']);
        expect(enzymeMountWrapper.find('form div label').at(5).prop('children')).toEqual(['Category', '*']);
        expect(enzymeMountWrapper.find('form div label').at(6).prop('children')).toEqual(['Category Lead', '*']);
        expect(enzymeMountWrapper.find('form div label').at(7).prop('children')).toEqual(['Estimated Project Size', '*']);
        expect(enzymeMountWrapper.find('form div label').at(8).prop('children')).toEqual(['Must Do or Nice-to-Have?', '*']);
        expect(enzymeMountWrapper.find('form div label').at(9).prop('children')).toEqual(['External Due Date', null]);
        expect(enzymeMountWrapper.find('form div label').at(10).prop('children')).toEqual(['Deliverables / Outcomes', null]);
        expect(enzymeMountWrapper.find('form div label').at(11).prop('children')).toEqual(['Link to Deliverable', null]);
        expect(enzymeMountWrapper.find('form div label').at(12).prop('children')).toEqual(['Notes', null]);
        expect(enzymeMountWrapper.find('form div label').at(13).prop('children')).toEqual(['Did We Fully Complete the Expected Deliverable?', null]);
        expect(enzymeMountWrapper.find('form div label').at(14).prop('children')).toEqual(['If Not, Why Not?', null]);
        expect(enzymeMountWrapper.find('form div label').at(15).prop('children')).toEqual(['Status End of Week 1 (0-100%)', null]);
        expect(enzymeMountWrapper.find('form div label').at(16).prop('children')).toEqual(['Status End of Week 2 (0-100%)', null]);

        // Cancel and Save Buttons
        expect(enzymeMountWrapper.find('div button span.MuiButton-label').at(0).prop('children')).toEqual(expect.arrayContaining(['CANCEL']));
        expect(enzymeMountWrapper.find('div button span.MuiButton-label').at(3).prop('children')).toEqual(expect.arrayContaining(['SAVE']));

        // Delete and Assign to Another Sprint Buttons
        expect(enzymeMountWrapper.find('div button span.MuiButton-label').at(1).prop('children')).toEqual(expect.arrayContaining(['DELETE PROJECT']));
        expect(enzymeMountWrapper.find('div button span.MuiButton-label').at(2).prop('children')).toEqual(expect.arrayContaining(['ASSIGN TO ANOTHER SPRINT']));
    });

    it('[Edit action] Should render all the same edit elements for a project loaded from the queue', () => {
        const { enzymeMountWrapper } = mountSetup("edit", undefined, -1, -1, 4);

        // Title
        expect(enzymeMountWrapper.find('.MuiTypography-root.MuiTypography-h4').prop('children')).toEqual(['Edit', ' Project']);

        // Input Fields
        expect(enzymeMountWrapper.find('form div label').at(0).prop('children')).toEqual(['Sprint ID', '*']);
        expect(enzymeMountWrapper.find('form div label').at(1).prop('children')).toEqual(['Project ID', '*']);
        expect(enzymeMountWrapper.find('form div label').at(2).prop('children')).toEqual(['Project Name', '*']);
        expect(enzymeMountWrapper.find('form div label').at(3).prop('children')).toEqual(['Project Manager', '*']);
        expect(enzymeMountWrapper.find('form div label').at(4).prop('children')).toEqual(['Description', '*']);
        expect(enzymeMountWrapper.find('form div label').at(5).prop('children')).toEqual(['Category', '*']);
        expect(enzymeMountWrapper.find('form div label').at(6).prop('children')).toEqual(['Category Lead', '*']);
        expect(enzymeMountWrapper.find('form div label').at(7).prop('children')).toEqual(['Estimated Project Size', '*']);
        expect(enzymeMountWrapper.find('form div label').at(8).prop('children')).toEqual(['Must Do or Nice-to-Have?', '*']);
        expect(enzymeMountWrapper.find('form div label').at(9).prop('children')).toEqual(['External Due Date', null]);
        expect(enzymeMountWrapper.find('form div label').at(10).prop('children')).toEqual(['Deliverables / Outcomes', null]);
        expect(enzymeMountWrapper.find('form div label').at(11).prop('children')).toEqual(['Link to Deliverable', null]);
        expect(enzymeMountWrapper.find('form div label').at(12).prop('children')).toEqual(['Notes', null]);
        expect(enzymeMountWrapper.find('form div label').at(13).prop('children')).toEqual(['Did We Fully Complete the Expected Deliverable?', null]);
        expect(enzymeMountWrapper.find('form div label').at(14).prop('children')).toEqual(['If Not, Why Not?', null]);
        expect(enzymeMountWrapper.find('form div label').at(15).prop('children')).toEqual(['Status End of Week 1 (0-100%)', null]);
        expect(enzymeMountWrapper.find('form div label').at(16).prop('children')).toEqual(['Status End of Week 2 (0-100%)', null]);

        // Cancel and Save Buttons
        expect(enzymeMountWrapper.find('div button span.MuiButton-label').at(0).prop('children')).toEqual(expect.arrayContaining(['CANCEL']));
        expect(enzymeMountWrapper.find('div button span.MuiButton-label').at(3).prop('children')).toEqual(expect.arrayContaining(['SAVE']));

        // Delete and Assign to Another Sprint Buttons
        expect(enzymeMountWrapper.find('div button span.MuiButton-label').at(1).prop('children')).toEqual(expect.arrayContaining(['DELETE PROJECT']));
        expect(enzymeMountWrapper.find('div button span.MuiButton-label').at(2).prop('children')).toEqual(expect.arrayContaining(['ASSIGN TO ANOTHER SPRINT']));

        // Click Assign to Another Sprint button
        expect(enzymeMountWrapper.find('div button span.MuiButton-label').at(2).prop('children')).toEqual(expect.arrayContaining(['ASSIGN TO ANOTHER SPRINT']));
        enzymeMountWrapper.find('div button span.MuiButton-label').at(2).simulate('click');
            
        // The queue is marked as the current assignment
        expect(enzymeMountWrapper.find('li.MuiListItem-root.MuiListItem-gutters')).toHaveLength(1); // Exactly one non-button item
        expect(enzymeMountWrapper.find('li div span').prop('children')).toEqual('[Current Assignment] Project Queue');
    });

    it('[Create action] Should show: 1.) create title, 2.) input fields in the correct order, including 8 status fields for queue projects;' +  
        '3.) the generated project id; 4.) cancel and save buttons; and 5.) no delete button and no assign to another sprint button', () => {
        const { enzymeMountWrapper } = mountSetup("create", false, -1, -1);

        // Title
        expect(enzymeMountWrapper.find('.MuiTypography-root.MuiTypography-h4').prop('children')).toEqual(['Create', ' Project']);

        // Input Fields
        expect(enzymeMountWrapper.find('form div label').at(0).prop('children')).toEqual(['Sprint ID', '*']);
        expect(enzymeMountWrapper.find('form div label').at(1).prop('children')).toEqual(['Project ID', '*']);
        expect(enzymeMountWrapper.find('form div label').at(2).prop('children')).toEqual(['Project Name', '*']);
        expect(enzymeMountWrapper.find('form div label').at(3).prop('children')).toEqual(['Project Manager', '*']);
        expect(enzymeMountWrapper.find('form div label').at(4).prop('children')).toEqual(['Description', '*']);
        expect(enzymeMountWrapper.find('form div label').at(5).prop('children')).toEqual(['Category', '*']);
        expect(enzymeMountWrapper.find('form div label').at(6).prop('children')).toEqual(['Category Lead', '*']);
        expect(enzymeMountWrapper.find('form div label').at(7).prop('children')).toEqual(['Estimated Project Size', '*']);
        expect(enzymeMountWrapper.find('form div label').at(8).prop('children')).toEqual(['Must Do or Nice-to-Have?', '*']);
        expect(enzymeMountWrapper.find('form div label').at(9).prop('children')).toEqual(['External Due Date', null]);
        expect(enzymeMountWrapper.find('form div label').at(10).prop('children')).toEqual(['Deliverables / Outcomes', null]);
        expect(enzymeMountWrapper.find('form div label').at(11).prop('children')).toEqual(['Link to Deliverable', null]);
        expect(enzymeMountWrapper.find('form div label').at(12).prop('children')).toEqual(['Notes', null]);
        expect(enzymeMountWrapper.find('form div label').at(13).prop('children')).toEqual(['Did We Fully Complete the Expected Deliverable?', null]);
        expect(enzymeMountWrapper.find('form div label').at(14).prop('children')).toEqual(['If Not, Why Not?', null]);
        expect(enzymeMountWrapper.find('form div label').at(15).prop('children')).toEqual(['Status End of Week 1 (0-100%)', null]);
        expect(enzymeMountWrapper.find('form div label').at(16).prop('children')).toEqual(['Status End of Week 2 (0-100%)', null]);
        expect(enzymeMountWrapper.find('form div label').at(17).prop('children')).toEqual(['Status End of Week 3 (0-100%)', null]);
        expect(enzymeMountWrapper.find('form div label').at(18).prop('children')).toEqual(['Status End of Week 4 (0-100%)', null]);
        expect(enzymeMountWrapper.find('form div label').at(19).prop('children')).toEqual(['Status End of Week 5 (0-100%)', null]);
        expect(enzymeMountWrapper.find('form div label').at(20).prop('children')).toEqual(['Status End of Week 6 (0-100%)', null]);
        expect(enzymeMountWrapper.find('form div label').at(21).prop('children')).toEqual(['Status End of Week 7 (0-100%)', null]);
        expect(enzymeMountWrapper.find('form div label').at(22).prop('children')).toEqual(['Status End of Week 8 (0-100%)', null]);

        // Generated Sprint UUID
        expect(enzymeMountWrapper.find('form div div').at(1).prop('children')).toHaveLength(36);

        // Cancel and Save Buttons
        expect(enzymeMountWrapper.find('div button span.MuiButton-label').at(0).prop('children')).toEqual(expect.arrayContaining(['CANCEL']));
        expect(enzymeMountWrapper.find('div button span.MuiButton-label').at(1).prop('children')).toEqual(expect.arrayContaining(['SAVE']));

        // No Delete or Assign to Another Sprint Buttons
        expect(enzymeMountWrapper.find('div button span.MuiButton-label').at(3)).toHaveLength(0);
    });



    /* --- Deleting a Project --- */

    it('[Edit action] Should open a confirmation dialog when deleting a project and clicking the confirm option fires off onDeleteProject() and onCloseProject()', () => {
        const { enzymeMountWrapper, onDeleteProject, onCloseProject } = mountSetup();

        // Click Delete Sprint button
        expect(enzymeMountWrapper.find('div button span.MuiButton-label').at(1).prop('children')).toEqual(expect.arrayContaining(['DELETE PROJECT']));
        enzymeMountWrapper.find('div button span.MuiButton-label').at(1).simulate('click');
      
        // Check for dialog container being open and correct message
        expect(enzymeMountWrapper.find('.MuiDialog-container')).toHaveLength(1);
        expect(enzymeMountWrapper.find('.MuiDialog-container').props().children._owner.pendingProps.open).toBe(true);
        expect(enzymeMountWrapper.find('h2.MuiTypography-root.MuiTypography-h6').prop('children'))
            .toEqual("Are you certain you want to delete the 'Verify course equivalencies & Grad Requirements in Illuminate' project?");

        // Click confirmation action
        enzymeMountWrapper.find('div.MuiDialogActions-root button.MuiButton-textSecondary').simulate('click');
        
        // Dialog container no longer open
        expect(enzymeMountWrapper.find('.MuiDialog-container')).toHaveLength(1);
        expect(enzymeMountWrapper.find('.MuiDialog-container').props().children._owner.pendingProps.open).toBe(false);

        // onDeleteProject() fires
        expect(onDeleteProject).toHaveBeenCalledTimes(1);
        
        // onCloseProject() fires
        expect(onCloseProject).toHaveBeenCalledTimes(1);
    });

    it('[Edit action] Should open a confirmation dialog when deleting a project and clicking the cancel option should dismiss it', () => {
        const { enzymeMountWrapper, onDeleteProject } = mountSetup();

        // Click Delete Sprint button
        expect(enzymeMountWrapper.find('div button span.MuiButton-label').at(1).prop('children')).toEqual(expect.arrayContaining(['DELETE PROJECT']));
        enzymeMountWrapper.find('div button span.MuiButton-label').at(1).simulate('click');
      
        // Check for dialog container being open and correct message
        expect(enzymeMountWrapper.find('.MuiDialog-container')).toHaveLength(1);
        expect(enzymeMountWrapper.find('.MuiDialog-container').props().children._owner.pendingProps.open).toBe(true);
        expect(enzymeMountWrapper.find('h2.MuiTypography-root.MuiTypography-h6').prop('children'))
            .toEqual("Are you certain you want to delete the 'Verify course equivalencies & Grad Requirements in Illuminate' project?");

        // Click confirmation action
        enzymeMountWrapper.find('div.MuiDialogActions-root button.MuiButton-textPrimary').simulate('click');
        
        // Dialog container no longer open
        expect(enzymeMountWrapper.find('.MuiDialog-container')).toHaveLength(1);
        expect(enzymeMountWrapper.find('.MuiDialog-container').props().children._owner.pendingProps.open).toBe(false);

        // onDeleteProject() does not fire
        expect(onDeleteProject).toHaveBeenCalledTimes(0);
    });



    /* --- Moving a Project --- */

    it('[Edit action] Should open a dialog when moving a project between sprints. The current sprint should not be clickable. ' +
        'Clicking another sprint should fire onMoveProject() and onCloseProject().', () => {
        const { enzymeMountWrapper, onMoveProject, onCloseProject } = mountSetup();
    
        // Click Assign to Another Sprint button
        expect(enzymeMountWrapper.find('div button span.MuiButton-label').at(2).prop('children')).toEqual(expect.arrayContaining(['ASSIGN TO ANOTHER SPRINT']));
        enzymeMountWrapper.find('div button span.MuiButton-label').at(2).simulate('click');
          
        // Check for dialog container being open and correct message
        expect(enzymeMountWrapper.find('.MuiDialog-container')).toHaveLength(1);
        expect(enzymeMountWrapper.find('.MuiDialog-container').props().children._owner.pendingProps.open).toBe(true);
        expect(enzymeMountWrapper.find('h2.MuiTypography-root.MuiTypography-h6').prop('children'))
            .toEqual('Select New Sprint');
            
        // Current sprint assignment is not clickable
        expect(enzymeMountWrapper.find('li.MuiListItem-root.MuiListItem-gutters')).toHaveLength(1); // Exactly one non-button item
        enzymeMountWrapper.find('li.MuiListItem-root.MuiListItem-gutters').simulate('click'); // Click it
        expect(enzymeMountWrapper.find('.MuiDialog-container').props().children._owner.pendingProps.open).toBe(true); // Dialog container still open

        // Click Project Queue item
        expect(enzymeMountWrapper.find('div.MuiButtonBase-root div .MuiListItemText-primary').at(2).prop('children')).toEqual('Project Queue');
        enzymeMountWrapper.find('div.MuiButtonBase-root div .MuiListItemText-primary').at(2).simulate('click');
        
        // Dialog container no longer open
        expect(enzymeMountWrapper.find('.MuiDialog-container')).toHaveLength(0);
        // expect(enzymeMountWrapper.find('.MuiDialog-container').props().children._owner.pendingProps.open).toBe(false);

        // onMoveProject() fires
        expect(onMoveProject).toHaveBeenCalledTimes(1);
        
        // onCloseProject() fires
        expect(onCloseProject).toHaveBeenCalledTimes(1);
    });

    it('[Edit action] Should open a dialog when moving a project between sprints and clicking the cancel option should dismiss it.', () => {
        const { enzymeMountWrapper } = mountSetup();
    
        // Click Assign to Another Sprint button
        expect(enzymeMountWrapper.find('div button span.MuiButton-label').at(2).prop('children')).toEqual(expect.arrayContaining(['ASSIGN TO ANOTHER SPRINT']));
        enzymeMountWrapper.find('div button span.MuiButton-label').at(2).simulate('click');
          
        // Check for dialog container being open and correct message
        expect(enzymeMountWrapper.find('.MuiDialog-container')).toHaveLength(1);
        expect(enzymeMountWrapper.find('.MuiDialog-container').props().children._owner.pendingProps.open).toBe(true);
        expect(enzymeMountWrapper.find('h2.MuiTypography-root.MuiTypography-h6').prop('children'))
            .toEqual('Select New Sprint');

        // Click Cancel item
        expect(enzymeMountWrapper.find('div.MuiButtonBase-root div .MuiListItemText-primary').at(3).prop('children')).toEqual('Cancel');
        enzymeMountWrapper.find('div.MuiButtonBase-root div .MuiListItemText-primary').at(3).simulate('click');
        
        // Dialog container no longer open
        expect(enzymeMountWrapper.find('.MuiDialog-container')).toHaveLength(0);
    });



    /* --- Updating a Project --- */

    it("[Edit action] Should start with the Save button disabled, update a field's value when user input changes, " +
        'and then enable the Save button. Upon clickng Save/submitting the form, should fire off onUpdateProject() and onCloseProject().', () => {
        const { enzymeMountWrapper, onUpdateProject, onCloseProject } = mountSetup();

        // Save button starts disabled
        expect(enzymeMountWrapper.find('div button span.MuiButton-label').at(3).prop('children')).toEqual(expect.arrayContaining(['SAVE']));
        expect(enzymeMountWrapper.find('div button.MuiButtonBase-root').at(3).prop('disabled')).toEqual(true);

        // Update a field
        expect(enzymeMountWrapper.find('div input input').at(0).prop('value')).toEqual('Verify course equivalencies & Grad Requirements in Illuminate'); // Before
        enzymeMountWrapper.find('div input input').at(0).simulate('change', { target: {value: 'New Project Name' } } ); 
        expect(enzymeMountWrapper.find('div input input').at(0).prop('value')).toEqual('New Project Name'); // After

        // Save button is now enabled
        expect(enzymeMountWrapper.find('div button.MuiButtonBase-root').at(3).prop('disabled')).toEqual(false);
        
        // Submit form
        enzymeMountWrapper.find('div button.MuiButtonBase-root').at(3).simulate('submit');

        // Update and close functions fired
        expect(onUpdateProject).toHaveBeenCalledTimes(1);
        expect(onCloseProject).toHaveBeenCalledTimes(1);
    });



    /* --- Creating a Project --- */

    it("[Create action] Should start with the Save button disabled. Update 4 out of 5 required inputs and Save button still disabled." +
        'Update 5th input, and Save button enabled. Submitting form fires off onAddProject() and onCloseProject().', () => {
        const { enzymeMountWrapper, onAddProject, onCloseProject } = mountSetup("create");

        // Save button starts disabled
        expect(enzymeMountWrapper.find('div button span.MuiButton-label').at(1).prop('children')).toEqual(expect.arrayContaining(['SAVE']));
        expect(enzymeMountWrapper.find('div button.MuiButtonBase-root').at(1).prop('disabled')).toEqual(true);

        // Update first 4 fields
        // Field #1: project name
        expect(enzymeMountWrapper.find('input input').at(0).prop('value')).toEqual(''); // Before
        enzymeMountWrapper.find('input input').at(0).simulate('change', { target: {value: 'New Project Name' } } ); 
        expect(enzymeMountWrapper.find('input input').at(0).prop('value')).toEqual('New Project Name'); // After
        
        // Field #2: project manager
        expect(enzymeMountWrapper.find('input input').at(1).prop('value')).toEqual(''); // Before
        enzymeMountWrapper.find('input input').at(1).simulate('change', { target: { value: 'New Project Manager' } } ); 
        expect(enzymeMountWrapper.find('input input').at(1).prop('value')).toEqual('New Project Manager'); // After

        // Field #3: description
        expect(enzymeMountWrapper.find('input textarea').at(0).prop('value')).toEqual(''); // Before
        enzymeMountWrapper.find('input textarea').at(0).simulate('change', { target: { value: 'New Description' } } ); 
        expect(enzymeMountWrapper.find('input textarea').at(0).prop('value')).toEqual('New Description'); // After

        // Field #4: category
        expect(enzymeMountWrapper.find('input input').at(2).prop('value')).toEqual(''); // Before
        enzymeMountWrapper.find('input input').at(2).simulate('change', { target: {value: 'New Category' } } ); 
        expect(enzymeMountWrapper.find('input input').at(2).prop('value')).toEqual('New Category'); // After

        // Save button still disabled
        expect(enzymeMountWrapper.find('div button.MuiButtonBase-root').at(1).prop('disabled')).toEqual(true);

        // Field #5: category lead
        expect(enzymeMountWrapper.find('input input').at(3).prop('value')).toEqual(''); // Before
        enzymeMountWrapper.find('input input').at(3).simulate('change', { target: {value: 'New Category Lead' } } ); 
        expect(enzymeMountWrapper.find('input input').at(3).prop('value')).toEqual('New Category Lead'); // After

        // Save button is now enabled
        expect(enzymeMountWrapper.find('div button.MuiButtonBase-root').at(1).prop('disabled')).toEqual(false);
        
        // Submit form
        enzymeMountWrapper.find('div button.MuiButtonBase-root').at(1).simulate('submit');

        // Add and close functions fired
        expect(onAddProject).toHaveBeenCalledTimes(1);
        expect(onCloseProject).toHaveBeenCalledTimes(1);
    });



    /* --- Misc. Functionality --- */

    it("[Both action] Only displays number of status fields equal to the sprint length.", () => {
        const { enzymeMountWrapper } = mountSetup(undefined, undefined, undefined, undefined, undefined, 42);

        // Should only display 6 weeks of status fields
        expect(enzymeMountWrapper.find('label').at(15).prop('children')).toEqual(["Status End of Week 1 (0-100%)", null]);
        expect(enzymeMountWrapper.find('label').at(16).prop('children')).toEqual(["Status End of Week 2 (0-100%)", null]);
        expect(enzymeMountWrapper.find('label').at(17).prop('children')).toEqual(["Status End of Week 3 (0-100%)", null]);
        expect(enzymeMountWrapper.find('label').at(18).prop('children')).toEqual(["Status End of Week 4 (0-100%)", null]);
        expect(enzymeMountWrapper.find('label').at(19).prop('children')).toEqual(["Status End of Week 5 (0-100%)", null]);
        expect(enzymeMountWrapper.find('label').at(20).prop('children')).toEqual(["Status End of Week 6 (0-100%)", null]);
        expect(enzymeMountWrapper.find('label').at(21)).toHaveLength(0);
    });

    it("[Both action] The 4 select element types have all the expected options.", () => {
            const { enzymeMountWrapper } = mountSetup("create");

            // console.log(enzymeMountWrapper.find('form').debug());

            // Estimated Project Size
            expect(enzymeMountWrapper.find('option').at(0).prop('value')).toEqual('1 - Extra Small');
            expect(enzymeMountWrapper.find('option').at(1).prop('value')).toEqual('2 - Small');
            expect(enzymeMountWrapper.find('option').at(2).prop('value')).toEqual('3 - Small-to-Medium');
            expect(enzymeMountWrapper.find('option').at(3).prop('value')).toEqual('5 - Medium');
            expect(enzymeMountWrapper.find('option').at(4).prop('value')).toEqual('8 - Medium-to-Large');
            expect(enzymeMountWrapper.find('option').at(5).prop('value')).toEqual('13 - Large');
            expect(enzymeMountWrapper.find('option').at(6).prop('value')).toEqual('21 - Extra Large');
            expect(enzymeMountWrapper.find('option').at(7).prop('value')).toEqual('34 - Gargantuan');

            // Must Do or Nice-to-Have?
            expect(enzymeMountWrapper.find('option').at(8).prop('value')).toEqual('Must Do');
            expect(enzymeMountWrapper.find('option').at(9).prop('value')).toEqual('Nice-to-Have');

            // Did We Fully Complete the Expected Deliverable?
            expect(enzymeMountWrapper.find('option').at(10).prop('value')).toEqual('');
            expect(enzymeMountWrapper.find('option').at(11).prop('value')).toEqual('Yes');
            expect(enzymeMountWrapper.find('option').at(12).prop('value')).toEqual('No, but mostly did');
            expect(enzymeMountWrapper.find('option').at(13).prop('value')).toEqual('No, but partially did');
            expect(enzymeMountWrapper.find('option').at(14).prop('value')).toEqual('No');

            // Status End of Week 1 (0-100%)
            expect(enzymeMountWrapper.find('option').at(15).prop('value')).toEqual('');
            expect(enzymeMountWrapper.find('option').at(16).prop('value')).toEqual('0%');
            expect(enzymeMountWrapper.find('option').at(17).prop('value')).toEqual('25%');
            expect(enzymeMountWrapper.find('option').at(18).prop('value')).toEqual('50%');
            expect(enzymeMountWrapper.find('option').at(19).prop('value')).toEqual('75%');
            expect(enzymeMountWrapper.find('option').at(20).prop('value')).toEqual('100%');
    });

    it("[Both action] Clicking the upper-right cancel button closes the sprint.", () => {
            const { enzymeMountWrapper, onCloseProject } = mountSetup("create");
    
            enzymeMountWrapper.find('div button span.MuiButton-label').at(0).simulate('click');
            expect(onCloseProject).toHaveBeenCalledTimes(1);
        });

    it("[Both action] Clicking the bottom cancel button closes the sprint.", () => {
        const { enzymeMountWrapper, onCloseProject } = mountSetup("edit");

        enzymeMountWrapper.find('div button span.MuiButton-label').at(0).simulate('click');
        expect(onCloseProject).toHaveBeenCalledTimes(1);
    });



    /* --- Error Conditions --- */

    it("[Error] Passing a non-conforming action type to the project should throw an error.", () => {

        expect(() => mountSetup("non-conforming action")).toThrow();
    });

    it("[Error] Passing a non-existent sprintId to the project should throw an error.", () => {

        expect(() => mountSetup("edit", undefined, "error_sprintId")).toThrow();
    });

    it("[Error] Passing a non-existent sprintIndex to the project should throw an error.", () => {

        expect(() => mountSetup("edit", undefined, undefined, 99)).toThrow();
    });

    it("[Error] Passing a sprintIndex and a sprintId that conflict to the project should throw an error.", () => {

        expect(() => mountSetup("edit", undefined, "test_sprintId2", 0)).toThrow();
    });

    it("[Error] Passing a non-existent projectId should throw an error.", () => {

        expect(() => mountSetup("edit", undefined, undefined, undefined, 'error_projectId')).toThrow();
    });
});