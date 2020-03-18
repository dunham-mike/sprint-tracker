describe('Signup', function() {

    it('FrontPage successfully loads', function() {
        cy.visit('/');
        
        cy.get('main div div h1')
            .should(($title) => {
                expect($title).to.contain('Deliberate Sprints');
            });
    });

    it('attempts to sign up with an existing email address and receives an error from the server', function() {

        // Routes to observe requests
        const authenticationUrl = Cypress.env('authenticationUrl');

        cy.server()
        cy.route('POST', `${authenticationUrl}/v1/accounts:signUp?key=*`).as('submitSignup');

        // Signup page loads
        cy.get('a.MuiButton-outlined').eq(0).click();

        cy.get('div h5')
            .should(($title) => {
                expect($title).to.contain('Create Account');
            });

        // Submit signup information
        const signupEmail = 'md@gmail.com';
        const signupPassword = 'nonenone';

        cy.get('input').eq(0)
            .type('test_firstName');
        
        cy.get('input').eq(1)
            .type('test_lastName');
        
        cy.get('input').eq(2)
            .type(signupEmail);
        
        cy.get('input').eq(3)
            .type(signupPassword);
        
        cy.get('button[type="submit"]')
            .click();

        // Signup is NOT successful
        cy.wait('@submitSignup')
            .then((xhr) => {
                expect(xhr.requestBody).to.include({ email: signupEmail });
                expect(xhr.requestBody).to.include({ password: signupPassword });
                expect(xhr.requestBody).to.include({ returnSecureToken: true });
                expect(xhr.responseBody).to.nested.include({ "error.code": 400 });
                expect(xhr.responseBody).to.nested.include({ "error.message": "EMAIL_EXISTS" });
            });

        // Error message is displayed
        cy.get('#signupErrorMessage')
            .should(($message) => {
                expect($message).to.contain('An account with that email address already exists');
            });
    });

});