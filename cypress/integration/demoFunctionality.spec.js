describe('Demo Functionality', function() {

    it('FrontPage successfully loads and clicks on Try Demo button', function() {
        cy.visit('/');
        
        cy.get('main a.MuiButton-contained')
            .should('have.text', 'TRY A DEMO')
            .click();
    });

    it('demo MainView successfully loads', function() {

        cy.url().should('eq', Cypress.config().baseUrl + '/demo');

        // End Demo button visible
        cy.get('header div a').eq(1)
            .should('have.text', 'END DEMO');

        // Current Sprint button visible
        cy.get('button.MuiButton-contained').eq(0)
            .should('have.text', 'CURRENT SPRINT');
    });

    it('PastSprints successfully loads', function() {

        // Toggle sidebar open
        cy.get('button.MuiButtonBase-root').eq(0).click();

        // Open Past Sprints
        cy.get('div.MuiListItemText-root').eq(1)
            .should('have.text', 'Past Sprints')
            .click();

        // On correct page
        cy.url().should('eq', Cypress.config().baseUrl + '/past-sprints');

        // Display correct sprints and toggle one
        cy.get('button.MuiButton-contained').eq(0)
            .should('have.text', 'PAST SPRINTS')
        cy.get('button.MuiButton-contained').eq(1)
            .should('have.text', 'Sprint #0 - Semester Launch Preparation')
            .click();
        cy.get('button.MuiButton-contained').eq(2)
            .should('have.text', 'Sprint #00 - Off-Semester Maintenance');

        // View Sprint Statistics

            // Click Sprint Statistics for top sprint
            cy.get('button.MuiButton-outlined')
                .should('have.text', 'SPRINT STATISTICS')
                .click();
            
            // Check that Sprint Statistics modal rendered
            cy.get('div.MuiPaper-root h4')
                .should('have.text', 'Sprint #0 - Semester Launch Preparation Overview')
                .click();
            
            // Click cancel button
            cy.get('div.MuiPaper-root svg.MuiSvgIcon-root.MuiSvgIcon-fontSizeLarge')
                .click();
            
            // Confirm modal closed
            cy.get('div.MuiPaper-root h4')
                .should('not.exist');

        // Sprint table displays properly
        cy.get('thead tr').should('have.length', 2);
        cy.get('tbody tr').should('have.length', 6);
    });

    it('Navigate back to MainView', function() {

        // Click Deliberate Sprints in app bar
        cy.get('a.MuiTypography-h6')
            .should('have.text', 'Deliberate Sprints')
            .click();
        
        // Back on MainView
        cy.url().should('eq', Cypress.config().baseUrl + '/demo');
    });

    it('Create new sprint', function() {

        // Click Create New Sprint
        cy.get('button.MuiButton-text')
            .should('have.text', 'CREATE NEW SPRINT')
            .click();

        // Confirm modal opened
        cy.get('div.MuiPaper-root h4')
            .should('have.text', 'Create Sprint');

        // Sprint Name
        cy.get('input').eq(1)
            .type('Demo Sprint #5 - Demo Actions');

        // Start Date
        cy.get('input').eq(2)
            .click();
        cy.get('th.rdtNext').eq(0)
            .click()
            .click()
            .click()
            .click()
            .click();
        cy.get('div.rdtPicker td').eq(7)
            .click();

        // End Date
        cy.get('input').eq(3)
            .click();
        cy.get('th.rdtNext').eq(1)
            .click()
            .click()
            .click()
            .click()
            .click();
        cy.get('div.rdtPicker td').eq(62)
            .click();
        
        // Sprint Participants
        cy.get('input').eq(4)
            .type('Participant #1, Participant #2');
        
        // Sprint Owner
        cy.get('input').eq(5)
            .type('Owner Name');
        
        // Save
        cy.get('form button.MuiButton-contained').eq(1)
            .should('have.text', 'SAVE')
            .click();

        // Confirm modal closed
        cy.get('div.MuiPaper-root h4')
            .should('not.exist');
    });

    it('Edit sprint', function() {

        // Close Current Sprint
        cy.get('button.MuiButton-contained').eq(0)
            .should('have.text', 'CURRENT SPRINT')
            .click();
        
        // Open Future Sprints
        cy.get('button.MuiButton-contained').eq(3)
            .should('have.text', 'FUTURE SPRINTS')
            .click();
        
        // Click Edit Sprint for sprint just added
        cy.get('button.MuiButton-outlined').eq(7)
            .should('have.text', 'EDIT SPRINT')
            .click();
    
        // Edit sprint name
        cy.get('form input').eq(0)
            .clear()
            .type('Demo Sprint #5 - New Demo Actions');
        
        // Save
        cy.get('form button.MuiButton-contained').eq(1)
            .should('have.text', 'SAVE')
            .click();
        
        // Confirm modal closed
        cy.get('div.MuiPaper-root h4')
            .should('not.exist');
    });

    it('Add new project', function() {
        
        // Click Add New Project for sprint just added
        cy.get('button.MuiButton-outlined').eq(6)
            .should('have.text', 'ADD NEW PROJECT')
            .click();
    
        // Project Name
        cy.get('form input').eq(0)
            .type('Demo Project #1');

        // Project Manager
        cy.get('form input').eq(1)
            .type('Demo Project Manager Name');

        // Description
        cy.get('form textarea').eq(0)
            .type('Demo description of the project.');

        // Category
        cy.get('form input').eq(2)
            .type('Demo Category');
        
        // Category Lead
        cy.get('form input').eq(3)
            .type('Demo Category Lead');

        // Save
        cy.get('form button.MuiButton-contained').eq(1)
            .should('have.text', 'SAVE')
            .click();
        
        // Confirm modal closed
        cy.get('div.MuiPaper-root h4')
            .should('not.exist');
    });

    it('Edit project', function() {
        
        // Edit project just added
        cy.get('td button path').eq(12)
            .click({force: true});
            // Forcing this because Cypress is reporting the button is covered when it isn't
        
        // Edit Project Name
        cy.get('form input').eq(0)
            .clear()
            .type('New Demo Project #1');
        
        // Save
        cy.get('form button.MuiButton-contained').eq(1)
            .should('have.text', 'SAVE')
            .click();
        
        // Confirm modal closed
        cy.get('div.MuiPaper-root h4')
            .should('not.exist');
    });

    it('Add new project to the queue', function() {

        // Open Project Queue
        cy.get('button.MuiButton-contained').eq(2)
            .should('have.text', 'PROJECT QUEUE')
            .click();
        
        // Click Add New Project for the queue
        cy.get('button.MuiButton-outlined').eq(0)
            .should('have.text', 'ADD NEW PROJECT')
            .click();
    
        // Project Name
        cy.get('form input').eq(0)
            .type('Demo Project #2');

        // Project Manager
        cy.get('form input').eq(1)
            .type('Demo Project Manager Name #2');

        // Description
        cy.get('form textarea').eq(0)
            .type('Demo description #2 of the project.');

        // Category
        cy.get('form input').eq(2)
            .type('Demo Category #2');
        
        // Category Lead
        cy.get('form input').eq(3)
            .type('Demo Category Lead #2');

        // Save
        cy.get('form button.MuiButton-contained').eq(1)
            .should('have.text', 'SAVE')
            .click();
        
        // Confirm modal closed
        cy.get('div.MuiPaper-root h4')
            .should('not.exist');
    });

    it('Edit and move project on queue to new sprint', function() {
        
        // Edit project just added
        cy.get('td button path').eq(3)
            .click({force: true});
            // Forcing this because Cypress is reporting the button is covered when it isn't
        
        // Edit Project Name
        cy.get('form input').eq(0)
            .clear()
            .type('New Demo Project #2');
        
        // Move Project
        cy.get('form button.MuiButton-outlined').eq(1)
            .should('have.text', 'ASSIGN TO ANOTHER SPRINT')
            .click();
        
        // Assign to new sprint
        cy.get('ul div.MuiListItem-root').eq(4)
            .click();
        
        // Confirm modal closed
        cy.get('div.MuiPaper-root h4')
            .should('not.exist');
    });

    it('View sprint statistics', function() {

        // Click Sprint Statistics for new sprint
        cy.get('button.MuiButton-outlined').eq(9)
            .should('have.text', 'SPRINT STATISTICS')
            .click();
        
        // Check that Sprint Statistics modal rendered
        cy.get('div.MuiPaper-root h4')
            .should('have.text', 'Demo Sprint #5 - New Demo Actions Overview')
            .click();
        
        // Click cancel button
        cy.get('div.MuiPaper-root svg.MuiSvgIcon-root.MuiSvgIcon-fontSizeLarge')
            .click();
        
        // Confirm modal closed
        cy.get('div.MuiPaper-root h4')
            .should('not.exist');
    });

    it('Attempt and fail to delete new sprint', function() {
        
        // Click Edit Sprint for new sprint
        cy.get('button.MuiButton-outlined').eq(8)
            .should('have.text', 'EDIT SPRINT')
            .click();
        
        // Click Delete Sprint
        cy.get('form button.MuiButton-outlined').eq(0)
            .should('have.text', 'DELETE SPRINT')
            .click();

        // Dismiss Dialog
        cy.get('div.MuiDialog-paper button').eq(0)
            .should('have.text', 'OKAY, TAKE ME BACK.')
            .click();
        
        // Click cancel button
        cy.get('div.MuiPaper-root svg.MuiSvgIcon-root.MuiSvgIcon-fontSizeLarge')
            .click();
        
        // Confirm modal closed
        cy.get('div.MuiPaper-root h4')
            .should('not.exist');
    });

    it('Delete both projects on the new sprint and a project on the queue', function() {

        /* --- Deleting 1st Project --- */

            // Edit project just added
            cy.get('td button path').eq(18)
                // .click()
                .click({force: true});

            // Click Delete Project
            cy.get('form button.MuiButton-outlined').eq(0)
                .should('have.text', 'DELETE PROJECT')
                .click();
            
            // Confirm Deletion
            cy.get('div.MuiDialog-paper button.MuiButton-textSecondary')
                .should('have.text', "YES, I'M CERTAIN I WANT TO DELETE IT.")
                .click();

            // Confirm modal closed
            cy.get('div.MuiPaper-root h4')
                .should('not.exist');
        
        /* --- Deleting 2nd Project --- */

            // Edit project just added
            cy.get('td button path').eq(18)
                // .click()
                .click({force: true});

            // Click Delete Project
            cy.get('form button.MuiButton-outlined').eq(0)
                .should('have.text', 'DELETE PROJECT')
                .click();
            
            // Confirm deletion
            cy.get('div.MuiDialog-paper button.MuiButton-textSecondary')
                .should('have.text', "YES, I'M CERTAIN I WANT TO DELETE IT.")
                .click();

            // Confirm modal closed
            cy.get('div.MuiPaper-root h4')
                .should('not.exist');

        /* --- Deleting Project on the Queue --- */

            // Edit project just added
            cy.get('td button path').eq(5)
                .click({force: true});

            // Click Delete Project
            cy.get('form button.MuiButton-outlined').eq(0)
                .should('have.text', 'DELETE PROJECT')
                .click();
            
            // Confirm deletion
            cy.get('div.MuiDialog-paper button.MuiButton-textSecondary')
                .should('have.text', "YES, I'M CERTAIN I WANT TO DELETE IT.")
                .click();

            // Confirm modal closed
            cy.get('div.MuiPaper-root h4')
                .should('not.exist');
    });

    it('Delete new sprint', function() {
        
        // Click Edit Sprint for new sprint
        cy.get('button.MuiButton-outlined').eq(8)
            .should('have.text', 'EDIT SPRINT')
            .click();
        
        // Click Delete Sprint
        cy.get('form button.MuiButton-outlined').eq(0)
            .should('have.text', 'DELETE SPRINT')
            .click();

        // Confirm deletion
        cy.get('div.MuiDialog-paper button.MuiButton-textSecondary')
                .should('have.text', "YES, I'M CERTAIN I WANT TO DELETE IT.")
                .click();
        
        // Confirm modal closed
        cy.get('div.MuiPaper-root h4')
            .should('not.exist');
    });

    it('End demo and return to FrontPage', function() {

        // Click End Demo
        cy.get('header div a').eq(1)
            .should('have.text', 'END DEMO')
            .click();

        // Confirm back on FrontPage
        cy.url().should('eq', Cypress.config().baseUrl + '/');
    });

});