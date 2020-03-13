import React from 'react';
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json';
import * as moment from 'moment';

// import EditSprint from './EditSprint';
import { editSprint as UnconnectedEditSprint } from './EditSprint';

Enzyme.configure({ adapter: new Adapter() })

/* <EditSprint
    sprintId={this.state.sprintIdBeingViewed}
    onCloseSprint={this.closeEditingSprint}
    actionType={"edit"}
/> */

/* <EditSprint
    onCloseSprint={this.closeCreatingSprint}
    actionType={"create"}
/> */

const mountSetup = (actionType, sprintId) => {

    const onCloseSprint = jest.fn();
    const onAddSprint = jest.fn();
    const onUpdateSprint = jest.fn();
    const onDeleteSprint = jest.fn();

    const props = {
        sprintId: sprintId || 'test_sprintId',
        onCloseSprint: onCloseSprint,
        onAddSprint: onAddSprint,
        onUpdateSprint: onUpdateSprint,
        onDeleteSprint: onDeleteSprint,
        actionType: actionType || 'edit',
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
        <UnconnectedEditSprint {...props} />
    );

    return {
        enzymeMountWrapper,
        onCloseSprint,
        onAddSprint,
        onUpdateSprint,
        onDeleteSprint
    }
}

describe('EditSprint Component', () => {

    it('should match the snapshot', () => {
        const { enzymeMountWrapper } = mountSetup();
        expect(toJson(enzymeMountWrapper)).toMatchSnapshot();
    });



    /* --- Basic Component Rendering --- */

    it('[Edit action] Should show: 1.) edit title, 2.) input fields in the correct order; 3.) cancel and save buttons; and 4.) delete button', () => {
        const { enzymeMountWrapper } = mountSetup();

        // Title
        expect(enzymeMountWrapper.find('.MuiTypography-root.MuiTypography-h4').prop('children')).toEqual(['Edit', ' Sprint']);

        // Input Fields
        expect(enzymeMountWrapper.find('form div label').at(0).prop('children')).toEqual(['Sprint ID', '*']);
        expect(enzymeMountWrapper.find('form div label').at(1).prop('children')).toEqual(['Sprint Name (e.g., Sprint #4)', '*']);
        expect(enzymeMountWrapper.find('form div label').at(2).prop('children')).toEqual(['Start Date', '*']);
        expect(enzymeMountWrapper.find('form div label').at(3).prop('children')).toEqual(['End Date', '*']);
        expect(enzymeMountWrapper.find('form div label').at(4).prop('children')).toEqual(['Sprint Participants', '*']);
        expect(enzymeMountWrapper.find('form div label').at(5).prop('children')).toEqual(['Sprint Owner', '*']);

        // Cancel and Save Buttons
        expect(enzymeMountWrapper.find('div button span.MuiButton-label').at(0).prop('children')).toEqual(expect.arrayContaining(['CANCEL']));
        expect(enzymeMountWrapper.find('div button span.MuiButton-label').at(2).prop('children')).toEqual(expect.arrayContaining(['SAVE']));

        // Delete Button
        expect(enzymeMountWrapper.find('div button span.MuiButton-label').at(1).prop('children')).toEqual(expect.arrayContaining(['DELETE SPRINT']));
    });

    it('[Create action] Should show: 1.) create title, 2.) input fields in the correct order; 3.) the generated sprint id; 4.) cancel and save buttons; and 5.) no delete button', () => {
        const { enzymeMountWrapper } = mountSetup("create");

        // Title
        expect(enzymeMountWrapper.find('.MuiTypography-root.MuiTypography-h4').prop('children')).toEqual(['Create', ' Sprint']);

        // Input Fields
        expect(enzymeMountWrapper.find('form div label').at(0).prop('children')).toEqual(['Sprint ID', '*']);
        expect(enzymeMountWrapper.find('form div label').at(1).prop('children')).toEqual(['Sprint Name (e.g., Sprint #4)', '*']);
        expect(enzymeMountWrapper.find('form div label').at(2).prop('children')).toEqual(['Start Date', '*']);
        expect(enzymeMountWrapper.find('form div label').at(3).prop('children')).toEqual(['End Date', '*']);
        expect(enzymeMountWrapper.find('form div label').at(4).prop('children')).toEqual(['Sprint Participants', '*']);
        expect(enzymeMountWrapper.find('form div label').at(5).prop('children')).toEqual(['Sprint Owner', '*']);

        // Generated Sprint UUID
        expect(enzymeMountWrapper.find('form div div').at(0).prop('children')).toHaveLength(36);

        // Cancel and Save Buttons
        expect(enzymeMountWrapper.find('div button span.MuiButton-label').at(0).prop('children')).toEqual(expect.arrayContaining(['CANCEL']));
        expect(enzymeMountWrapper.find('div button span.MuiButton-label').at(1).prop('children')).toEqual(expect.arrayContaining(['SAVE']));

        // No Delete Button
        expect(enzymeMountWrapper.find('div button span.MuiButton-label').at(3)).toHaveLength(0);
    });



    /* --- Deleting a Sprint --- */

    it('[Edit action] Should open a restricted dialog when deleting a sprint with projects and clicking the option text closes it', () => {
        const { enzymeMountWrapper } = mountSetup();

        // Click Delete Sprint button
        enzymeMountWrapper.find('div button span.MuiButton-label').at(1).simulate('click');
      
        // Check for dialog container being open and correct message
        expect(enzymeMountWrapper.find('.MuiDialog-container')).toHaveLength(1);
        expect(enzymeMountWrapper.find('.MuiDialog-container').props().children._owner.pendingProps.open).toBe(true);
        expect(enzymeMountWrapper.find('h2.MuiTypography-root.MuiTypography-h6').prop('children'))
            .toEqual('This sprint cannot be deleted, because it has projects attached to it.');
        
        // Click dismissal message
        enzymeMountWrapper.find('div.MuiDialogActions-root button').simulate('click');

        // Dialog container no longer open
        expect(enzymeMountWrapper.find('.MuiDialog-container')).toHaveLength(1);
        expect(enzymeMountWrapper.find('.MuiDialog-container').props().children._owner.pendingProps.open).toBe(false);
    });

    it('[Edit action] Should open a confirmation dialog when deleting a sprint with no projects and clicking the confirm option fires off onDeleteSprint()', () => {
        const { enzymeMountWrapper, onCloseSprint, onDeleteSprint } = mountSetup('edit', 'test_sprintId2');

        // Click Delete Sprint button
        enzymeMountWrapper.find('div button span.MuiButton-label').at(1).simulate('click');
      
        // Check for dialog container being open and correct message
        expect(enzymeMountWrapper.find('.MuiDialog-container')).toHaveLength(1);
        expect(enzymeMountWrapper.find('.MuiDialog-container').props().children._owner.pendingProps.open).toBe(true);
        expect(enzymeMountWrapper.find('h2.MuiTypography-root.MuiTypography-h6').prop('children'))
            .toEqual("Are you certain you want to delete the 'Sprint #2' sprint?");

        // Click confirmation action
        enzymeMountWrapper.find('div.MuiDialogActions-root button.MuiButton-textSecondary').simulate('click');
        
        // Dialog container no longer open
        expect(enzymeMountWrapper.find('.MuiDialog-container')).toHaveLength(1);
        expect(enzymeMountWrapper.find('.MuiDialog-container').props().children._owner.pendingProps.open).toBe(false);

        // onCloseSprint() fires
        expect(onCloseSprint).toHaveBeenCalledTimes(1);

        // onDeleteSprint() fires
        expect(onDeleteSprint).toHaveBeenCalledTimes(1);
        // Finally got mocking mapDispatchToProps() to work via ignoring the mock store and just passing data as props: https://github.com/reduxjs/react-redux/issues/325#issuecomment-306628305
    });

    it('[Edit action] Should open a confirmation dialog when deleting a sprint with no projects and clicking the cancel option should dismiss it', () => {
        const { enzymeMountWrapper, onDeleteSprint } = mountSetup('edit', 'test_sprintId2');

        // Click Delete Sprint button
        enzymeMountWrapper.find('div button span.MuiButton-label').at(1).simulate('click');
      
        // Check for dialog container being open and correct message
        expect(enzymeMountWrapper.find('.MuiDialog-container')).toHaveLength(1);
        expect(enzymeMountWrapper.find('.MuiDialog-container').props().children._owner.pendingProps.open).toBe(true);
        expect(enzymeMountWrapper.find('h2.MuiTypography-root.MuiTypography-h6').prop('children'))
            .toEqual("Are you certain you want to delete the 'Sprint #2' sprint?");

        // Click confirmation action
        enzymeMountWrapper.find('div.MuiDialogActions-root button.MuiButton-textPrimary').simulate('click');
        
        // Dialog container no longer open
        expect(enzymeMountWrapper.find('.MuiDialog-container')).toHaveLength(1);
        expect(enzymeMountWrapper.find('.MuiDialog-container').props().children._owner.pendingProps.open).toBe(false);

        // onDeleteSprint() does not fire
        expect(onDeleteSprint).toHaveBeenCalledTimes(0);
    });



    /* --- Updating a Sprint --- */

    it("[Edit action] Should start with the Save button disabled, update a field's value when user input changes, " +
        'and then enable the Save button. Upon clickng Save/submitting the form, should fire off onUpdateSprint() and onCloseSprint().', () => {
        const { enzymeMountWrapper, onUpdateSprint, onCloseSprint } = mountSetup();

        // Save button starts disabled
        expect(enzymeMountWrapper.find('div button span.MuiButton-label').at(2).prop('children')).toEqual(expect.arrayContaining(['SAVE']));
        expect(enzymeMountWrapper.find('div button.MuiButtonBase-root').at(2).prop('disabled')).toEqual(true);

        // Update a field
        expect(enzymeMountWrapper.find('input input').at(0).prop('value')).toEqual('Sprint #1'); // Before
        enzymeMountWrapper.find('input input').at(0).simulate('change', { target: {value: 'New Sprint Name' } } ); 
        expect(enzymeMountWrapper.find('input input').at(0).prop('value')).toEqual('New Sprint Name'); // After

        // Save button is now enabled
        expect(enzymeMountWrapper.find('div button.MuiButtonBase-root').at(2).prop('disabled')).toEqual(false);
        
        // Submit form
        enzymeMountWrapper.find('div button.MuiButtonBase-root').at(2).simulate('submit');

        // Update and close functions fired
        expect(onUpdateSprint).toHaveBeenCalledTimes(1);
        expect(onCloseSprint).toHaveBeenCalledTimes(1);
    });



    /* --- Creating a Sprint --- */

    it("[Create action] Should start with the Save button disabled. Update 4 out of 5 fields and Save button still disabled." +
        'Update 5th field, and Save button enabled. Submitting form fires off onAddSprint() and onCloseSprint().', () => {
        const { enzymeMountWrapper, onAddSprint, onCloseSprint } = mountSetup("create");

        // Save button starts disabled
        expect(enzymeMountWrapper.find('div button span.MuiButton-label').at(1).prop('children')).toEqual(expect.arrayContaining(['SAVE']));
        expect(enzymeMountWrapper.find('div button.MuiButtonBase-root').at(1).prop('disabled')).toEqual(true);

        // Update first 4 fields
        // Field #1: sprint name
        expect(enzymeMountWrapper.find('input input').at(0).prop('value')).toEqual(''); // Before
        enzymeMountWrapper.find('input input').at(0).simulate('change', { target: {value: 'New Sprint Name' } } ); 
        expect(enzymeMountWrapper.find('input input').at(0).prop('value')).toEqual('New Sprint Name'); // After
        
        // Field #2: start date
        expect(enzymeMountWrapper.find('input input').at(1).prop('value')).toEqual(''); // Before
        enzymeMountWrapper.find('input input').at(1).simulate('change', { target: { value: moment.utc('2020-01-01') } } ); 
        expect(moment.utc(enzymeMountWrapper.find('input input').at(1).prop('value')).toString())
            .toEqual(moment.utc('2020-01-01').toString()); // After; had to use moment() functions to ensure these were in the same format

        // Field #3: end date
        expect(enzymeMountWrapper.find('input input').at(2).prop('value')).toEqual(''); // Before
        enzymeMountWrapper.find('input input').at(2).simulate('change', { target: { value: moment.utc('2020-01-29') } } ); 
        expect(moment.utc(enzymeMountWrapper.find('input input').at(2).prop('value')).toString())
            .toEqual(moment.utc('2020-01-29').toString());

        // Field #4: sprint participants
        expect(enzymeMountWrapper.find('input input').at(3).prop('value')).toEqual(''); // Before
        enzymeMountWrapper.find('input input').at(3).simulate('change', { target: {value: 'Mike, Bobby' } } ); 
        expect(enzymeMountWrapper.find('input input').at(3).prop('value')).toEqual('Mike, Bobby'); // After

        // Save button still disabled
        expect(enzymeMountWrapper.find('div button.MuiButtonBase-root').at(1).prop('disabled')).toEqual(true);

        // Field #5: sprint owner
        expect(enzymeMountWrapper.find('input input').at(4).prop('value')).toEqual(''); // Before
        enzymeMountWrapper.find('input input').at(4).simulate('change', { target: {value: 'Mike' } } ); 
        expect(enzymeMountWrapper.find('input input').at(4).prop('value')).toEqual('Mike'); // After

        // Save button is now enabled
        expect(enzymeMountWrapper.find('div button.MuiButtonBase-root').at(1).prop('disabled')).toEqual(false);
        
        // Submit form
        enzymeMountWrapper.find('div button.MuiButtonBase-root').at(1).simulate('submit');

        // Add and close functions fired
        expect(onAddSprint).toHaveBeenCalledTimes(1);
        expect(onCloseSprint).toHaveBeenCalledTimes(1);
    });



    /* --- Misc. Functionality --- */

    it("[Edit action] Clicking a date field renders the pop-up calendar. Choosing a new date updates the value." +
        'Clicking away closes the pop-up calendar. Clicking upper-right cancel button fires onCloseSprint().', () => {
        const { enzymeMountWrapper, onCloseSprint } = mountSetup();

        // Click start date field and open pop-up calendar
        expect(moment.utc(enzymeMountWrapper.find('input input').at(1).prop('value')).toString())
            .toEqual(moment.utc('2020-01-24').toString()); // Before
        expect(enzymeMountWrapper.find('div.rdt.rdtOpen')).toHaveLength(0); // Before
        enzymeMountWrapper.find('input input').at(1).simulate('click'); // Click
        expect(enzymeMountWrapper.find('div.rdt.rdtOpen')).toHaveLength(1); // After

        // Click a new start date to update the input's value
        enzymeMountWrapper.find('table tbody tr td').at(3).simulate('click');
        expect(moment.utc(enzymeMountWrapper.find('input input').at(1).prop('value')).toString())
            .toEqual(moment.utc('2020-01-01').toString()); 
        
        // Click away to close the pop-up calendar
        enzymeMountWrapper.find('input input').at(0).simulate('click');
        expect(enzymeMountWrapper.find('div.rdt.rdtOpen')).toHaveLength(0); // Back to original state

        // Clicking the upper-right cancel button closes the sprint
        enzymeMountWrapper.find('.MuiSvgIcon-root.MuiSvgIcon-fontSizeLarge').simulate('click');
        expect(onCloseSprint).toHaveBeenCalledTimes(1);
    });

    it("[Create action] Clicking the bottom cancel button closes the sprint.", () => {
        const { enzymeMountWrapper, onCloseSprint } = mountSetup("create");

        enzymeMountWrapper.find('div button span.MuiButton-label').at(0).simulate('click');
        expect(onCloseSprint).toHaveBeenCalledTimes(1);
    });



    /* --- Error Conditions --- */

    it("[Error] Passing a non-conforming action type to the sprint should throw an error.", () => {

        expect(() => mountSetup("non-conforming action")).toThrow();
    });

    it("[Error] Passing a non-existent sprintId to the sprint should throw an error.", () => {

        expect(() => mountSetup("edit", "error_sprintId")).toThrow();
    });


});