describe('Login', function() {

    it('FrontPage successfully loads', function() {
        cy.visit('/');
        
        cy.get('main div div h1')
            .should(($title) => {
                expect($title).to.contain('Deliberate Sprints');
            });
    });

    it('successfully logs in with credentials', function() {

        // Routes to observe requests
        const authenticationUrl = Cypress.env('authenticationUrl');

        cy.server()
        cy.route('POST', `${authenticationUrl}/v1/accounts:signInWithPassword?key=*`).as('submitLogin');

        const firebaseUrl = Cypress.env('firebaseUrl');
        cy.route('GET', `${firebaseUrl}/users/*.json?auth=*`).as('fetchDataForAuthenticatedUser');

        // Login page loads
        cy.get('header div a').eq(1).click();

        cy.get('div h5')
            .should(($title) => {
                expect($title).to.contain('Log into Deliberate Sprints');
            });

        // Submit login information
        const loginEmail = 'md@gmail.com';
        const loginPassword = 'nonenone';
        
        cy.get('input').eq(0)
            .type(loginEmail);
        
        cy.get('input').eq(1)
            .type(loginPassword);
        
        cy.get('button[type="submit"]')
            .click();

        // Login is successful
        cy.wait('@submitLogin')
            .then((xhr) => {
                expect(xhr.requestBody).to.include({ email: loginEmail });
                expect(xhr.requestBody).to.include({ password: loginPassword });
                expect(xhr.requestBody).to.include({ returnSecureToken: true });
                expect(xhr.responseBody).to.include({ registered: true });
                expect(xhr.responseBody).to.include.keys(
                    "localId",
                    "email",
                    "idToken",
                    "refreshToken",
                    "expiresIn"
                );
            });

        // Loading user data is successful
        cy.wait('@fetchDataForAuthenticatedUser')
            .then((xhr) => {
                expect(xhr.requestBody).to.eq(null);
                expect(xhr.responseBody).to.include.keys(
                    "firstName",
                    "lastName",
                    "queue",
                    "sprints"
                );
            });
        
        // MainView visible
        cy.url().should('eq', Cypress.config().baseUrl + '/');
        
        cy.get('button.MuiButton-contained').eq(0)
            .should('have.text', 'CURRENT SPRINT');
    });

});