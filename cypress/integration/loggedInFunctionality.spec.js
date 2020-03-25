describe('Logged In Functionality', function() {

    beforeEach(() => {
        
        // Fixtures
        cy.fixture('loginSuccess.json').as('loginSuccessJSON');
        cy.fixture('fetchUserDataSuccess.json')
            .then((userData) => {
                // Make dates dynamic so tests will always run properly
                userData.sprints['demo_00'].startDate = Cypress.moment.utc(Cypress.moment().subtract(53,'day'));
                userData.sprints['demo_00'].endDate = Cypress.moment.utc(Cypress.moment().subtract(26,'day'));

                userData.sprints['demo_0'].startDate = Cypress.moment.utc(Cypress.moment().subtract(23,'day'));
                userData.sprints['demo_0'].endDate = Cypress.moment.utc(Cypress.moment().subtract(10,'day'));

                userData.sprints['demo_1'].startDate = Cypress.moment.utc(Cypress.moment().subtract(7,'day'));
                userData.sprints['demo_1'].endDate = Cypress.moment.utc(Cypress.moment().add(6,'day'));

                userData.sprints['demo_2'].startDate = Cypress.moment.utc(Cypress.moment().add(9,'day'));
                userData.sprints['demo_2'].endDate = Cypress.moment.utc(Cypress.moment().add(29,'day'));

                userData.sprints['demo_3'].startDate = Cypress.moment.utc(Cypress.moment().add(32,'day'));
                userData.sprints['demo_3'].endDate = Cypress.moment.utc(Cypress.moment().add(87,'day'));
            })
            .as('fetchUserDataSuccessJSON');
        const userId = 'test_userId'; // should match fetchUserDataSuccess fixture

        // Network stubs
        cy.server();

        const authenticationUrl = Cypress.env('authenticationUrl');
        const firebaseUrl = Cypress.env('firebaseUrl');

        // Authentication
        cy.route('POST', `${authenticationUrl}/v1/accounts:signInWithPassword?key=*`, '@loginSuccessJSON').as('submitLogin');
        
        // GET
        cy.route('GET', `${firebaseUrl}/users/${userId}.json?auth=*`, '@fetchUserDataSuccessJSON').as('fetchDataForAuthenticatedUser');
        
        // PUT
        cy.route('PUT', `${firebaseUrl}/users/${userId}/sprints/*.json?auth=*`, {}).as('addOrUpdateSprint');
        cy.route('PUT', `${firebaseUrl}/users/${userId}/sprints/*/projects/*.json?auth=*`, {}).as('addOrUpdateProjectOnSprint');
        cy.route('PUT', `${firebaseUrl}/users/${userId}/queue/*.json?auth=*`, {}).as('addOrUpdateProjectOnQueue');

        // DELETE
        cy.route('DELETE', `${firebaseUrl}/users/${userId}/sprints/*.json?auth=*`, {}).as('deleteSprint');
        cy.route('DELETE', `${firebaseUrl}/users/${userId}/sprints/*/projects/*.json?auth=*`, {}).as('deleteProjectOnSprint');
        cy.route('DELETE', `${firebaseUrl}/users/${userId}/queue/*.json?auth=*`, {}).as('deleteProjectOnQueue');
    });

    it('FrontPage successfully loads', function() {
        cy.visit('/');
        
        cy.get('main div div h1')
            .should(($title) => {
                expect($title).to.contain('Deliberate Sprints');
            });
    });

    it('Successfully logs in with credentials', function() {

        // Navigate to Login page
        cy.get('header div a').eq(1)
            .click();

        cy.get('div h5')
            .should(($title) => {
                expect($title).to.contain('Log into Deliberate Sprints');
            });

        // Submit Login information
        const loginEmail = 'test@test.com';
        const loginPassword = 'test_pass';

        cy.get('input').eq(0)
            .type(loginEmail);
        
        cy.get('input').eq(1)
            .type(loginPassword);
        
        cy.get('button[type="submit"]')
            .click();

        // Wait for stubbed responses
        cy.wait('@submitLogin')
            .its('requestBody').should('deep.eq', 
                { 
                    email: loginEmail,
                    password: loginPassword,
                    returnSecureToken: true
                 });
            
        cy.wait('@fetchDataForAuthenticatedUser')
            .its('requestBody').should('deep.eq', null);
        
        // MainView
        
        cy.url().should('eq', Cypress.config().baseUrl + '/');
        
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
        cy.url().should('eq', Cypress.config().baseUrl + '/');
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
        cy.wait('@addOrUpdateSprint').then((xhr) => {
            expect(xhr.requestBody).to.include({ name: "Demo Sprint #5 - Demo Actions" });
            expect(xhr.requestBody).to.include({ participants: "Participant #1, Participant #2" });
            expect(xhr.requestBody).to.include({ owner: "Owner Name" });
            expect(xhr.requestBody).to.include.keys("id", "startDate", "endDate", "projects");
          });

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
        cy.wait('@addOrUpdateSprint').then((xhr) => {
            expect(xhr.requestBody).to.include({ name: "Demo Sprint #5 - New Demo Actions" });
            expect(xhr.requestBody).to.include({ participants: "Participant #1, Participant #2" });
            expect(xhr.requestBody).to.include({ owner: "Owner Name" });
            expect(xhr.requestBody).to.include.keys("id", "startDate", "endDate");
        });
        
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
        cy.wait('@addOrUpdateProjectOnSprint').then((xhr) => {
                expect(xhr.requestBody).to.nested.include({ "name.value": "Demo Project #1" })
                expect(xhr.requestBody).to.nested.include({ "manager.value": "Demo Project Manager Name" });
                expect(xhr.requestBody).to.nested.include({ "description.value": "Demo description of the project." });
                expect(xhr.requestBody).to.nested.include({ "category.value": "Demo Category" });
                expect(xhr.requestBody).to.nested.include({ "categoryLead.value": "Demo Category Lead" });
                expect(xhr.requestBody).to.nested.include({ "estimatedProjectSize.value": "1 - Extra Small" });
                expect(xhr.requestBody).to.nested.include({ "mustDo.value": "Must Do" });
                expect(xhr.requestBody).to.nested.include({ "externalDueDate.value": "" });
                expect(xhr.requestBody).to.nested.include({ "deliverables.value": "" });
                expect(xhr.requestBody).to.nested.include({ "deliverableLink.value": "" });
                expect(xhr.requestBody).to.nested.include({ "notes.value": "" });
                expect(xhr.requestBody).to.nested.include({ "completionStatus.value": "" });
                expect(xhr.requestBody).to.nested.include({ "notCompletedExplanation.value": "" });
                expect(xhr.requestBody).to.nested.include({ "statusEndOfWeek1.value": "" });
                expect(xhr.requestBody).to.nested.include({ "statusEndOfWeek2.value": "" });
                expect(xhr.requestBody).to.nested.include({ "statusEndOfWeek3.value": "" });
                expect(xhr.requestBody).to.nested.include({ "statusEndOfWeek4.value": "" });
                expect(xhr.requestBody).to.nested.include({ "statusEndOfWeek5.value": "" });
                expect(xhr.requestBody).to.nested.include({ "statusEndOfWeek6.value": "" });
                expect(xhr.requestBody).to.nested.include({ "statusEndOfWeek7.value": "" });
                expect(xhr.requestBody).to.nested.include({ "statusEndOfWeek8.value": "" });
                expect(xhr.requestBody).to.include.keys("id");
            });
        
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
        cy.wait('@addOrUpdateProjectOnSprint').then((xhr) => {
            expect(xhr.requestBody).to.nested.include({ "name.value": "New Demo Project #1" })
            expect(xhr.requestBody).to.nested.include({ "manager.value": "Demo Project Manager Name" });
            expect(xhr.requestBody).to.nested.include({ "description.value": "Demo description of the project." });
            expect(xhr.requestBody).to.nested.include({ "category.value": "Demo Category" });
            expect(xhr.requestBody).to.nested.include({ "categoryLead.value": "Demo Category Lead" });
            expect(xhr.requestBody).to.nested.include({ "estimatedProjectSize.value": "1 - Extra Small" });
            expect(xhr.requestBody).to.nested.include({ "mustDo.value": "Must Do" });
            expect(xhr.requestBody).to.nested.include({ "externalDueDate.value": "" });
            expect(xhr.requestBody).to.nested.include({ "deliverables.value": "" });
            expect(xhr.requestBody).to.nested.include({ "deliverableLink.value": "" });
            expect(xhr.requestBody).to.nested.include({ "notes.value": "" });
            expect(xhr.requestBody).to.nested.include({ "completionStatus.value": "" });
            expect(xhr.requestBody).to.nested.include({ "notCompletedExplanation.value": "" });
            expect(xhr.requestBody).to.nested.include({ "statusEndOfWeek1.value": "" });
            expect(xhr.requestBody).to.nested.include({ "statusEndOfWeek2.value": "" });
            expect(xhr.requestBody).to.nested.include({ "statusEndOfWeek3.value": "" });
            expect(xhr.requestBody).to.nested.include({ "statusEndOfWeek4.value": "" });
            expect(xhr.requestBody).to.nested.include({ "statusEndOfWeek5.value": "" });
            expect(xhr.requestBody).to.nested.include({ "statusEndOfWeek6.value": "" });
            expect(xhr.requestBody).to.nested.include({ "statusEndOfWeek7.value": "" });
            expect(xhr.requestBody).to.nested.include({ "statusEndOfWeek8.value": "" });
            expect(xhr.requestBody).to.include.keys("id");
        });
        
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
        cy.wait('@addOrUpdateProjectOnQueue').then((xhr) => {
            expect(xhr.requestBody).to.nested.include({ "name.value": "Demo Project #2" })
            expect(xhr.requestBody).to.nested.include({ "manager.value": "Demo Project Manager Name #2" });
            expect(xhr.requestBody).to.nested.include({ "description.value": "Demo description #2 of the project." });
            expect(xhr.requestBody).to.nested.include({ "category.value": "Demo Category #2" });
            expect(xhr.requestBody).to.nested.include({ "categoryLead.value": "Demo Category Lead #2" });
            expect(xhr.requestBody).to.nested.include({ "estimatedProjectSize.value": "1 - Extra Small" });
            expect(xhr.requestBody).to.nested.include({ "mustDo.value": "Must Do" });
            expect(xhr.requestBody).to.nested.include({ "externalDueDate.value": "" });
            expect(xhr.requestBody).to.nested.include({ "deliverables.value": "" });
            expect(xhr.requestBody).to.nested.include({ "deliverableLink.value": "" });
            expect(xhr.requestBody).to.nested.include({ "notes.value": "" });
            expect(xhr.requestBody).to.nested.include({ "completionStatus.value": "" });
            expect(xhr.requestBody).to.nested.include({ "notCompletedExplanation.value": "" });
            expect(xhr.requestBody).to.nested.include({ "statusEndOfWeek1.value": "" });
            expect(xhr.requestBody).to.nested.include({ "statusEndOfWeek2.value": "" });
            expect(xhr.requestBody).to.nested.include({ "statusEndOfWeek3.value": "" });
            expect(xhr.requestBody).to.nested.include({ "statusEndOfWeek4.value": "" });
            expect(xhr.requestBody).to.nested.include({ "statusEndOfWeek5.value": "" });
            expect(xhr.requestBody).to.nested.include({ "statusEndOfWeek6.value": "" });
            expect(xhr.requestBody).to.nested.include({ "statusEndOfWeek7.value": "" });
            expect(xhr.requestBody).to.nested.include({ "statusEndOfWeek8.value": "" });
            expect(xhr.requestBody).to.include.keys("id");
        });
        
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

        // Server call to add project to sprint
        cy.wait('@addOrUpdateProjectOnSprint').then((xhr) => {
            expect(xhr.requestBody).to.nested.include({ "name.value": "New Demo Project #2" })
            expect(xhr.requestBody).to.nested.include({ "manager.value": "Demo Project Manager Name #2" });
            expect(xhr.requestBody).to.nested.include({ "description.value": "Demo description #2 of the project." });
            expect(xhr.requestBody).to.nested.include({ "category.value": "Demo Category #2" });
            expect(xhr.requestBody).to.nested.include({ "categoryLead.value": "Demo Category Lead #2" });
            expect(xhr.requestBody).to.nested.include({ "estimatedProjectSize.value": "1 - Extra Small" });
            expect(xhr.requestBody).to.nested.include({ "mustDo.value": "Must Do" });
            expect(xhr.requestBody).to.nested.include({ "externalDueDate.value": "" });
            expect(xhr.requestBody).to.nested.include({ "deliverables.value": "" });
            expect(xhr.requestBody).to.nested.include({ "deliverableLink.value": "" });
            expect(xhr.requestBody).to.nested.include({ "notes.value": "" });
            expect(xhr.requestBody).to.nested.include({ "completionStatus.value": "" });
            expect(xhr.requestBody).to.nested.include({ "notCompletedExplanation.value": "" });
            expect(xhr.requestBody).to.nested.include({ "statusEndOfWeek1.value": "" });
            expect(xhr.requestBody).to.nested.include({ "statusEndOfWeek2.value": "" });
            expect(xhr.requestBody).to.nested.include({ "statusEndOfWeek3.value": "" });
            expect(xhr.requestBody).to.nested.include({ "statusEndOfWeek4.value": "" });
            expect(xhr.requestBody).to.nested.include({ "statusEndOfWeek5.value": "" });
            expect(xhr.requestBody).to.nested.include({ "statusEndOfWeek6.value": "" });
            expect(xhr.requestBody).to.nested.include({ "statusEndOfWeek7.value": "" });
            expect(xhr.requestBody).to.nested.include({ "statusEndOfWeek8.value": "" });
            expect(xhr.requestBody).to.include.keys("id");
        });

        // Server call to delete project on queue
        cy.wait('@deleteProjectOnQueue').then((xhr) => {
            expect(xhr.requestBody).to.equal(null);
        });

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
            cy.wait('@deleteProjectOnSprint').then((xhr) => {
                expect(xhr.requestBody).to.equal(null);
            });

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
            cy.wait('@deleteProjectOnSprint').then((xhr) => {
                expect(xhr.requestBody).to.equal(null);
            });

            // Confirm modal closed
            cy.get('div.MuiPaper-root h4')
                .should('not.exist');

        /* --- Deleting Project on the Queue --- */

            // Edit queue project
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
            cy.wait('@deleteProjectOnQueue').then((xhr) => {
                expect(xhr.requestBody).to.equal(null);
            });

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
        cy.wait('@deleteSprint').then((xhr) => {
            expect(xhr.requestBody).to.equal(null);
        });
        
        // Confirm modal closed
        cy.get('div.MuiPaper-root h4')
            .should('not.exist');
    });

    it('Log out and return to FrontPage', function() {

        // Click Log out
        cy.get('header div a').eq(1)
            .should('have.text', 'LOG OUT')
            .click();

        // Confirm back on FrontPage
        cy.url().should('eq', Cypress.config().baseUrl + '/');
    });

});