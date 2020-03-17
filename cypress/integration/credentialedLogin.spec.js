describe('Login', function() {
    it('FrontPage successfully loads', function() {
        cy.visit('/');
        
        cy.get('main div div h1')
            .should(($title) => {
                expect($title).to.contain('Deliberate Sprints');
            });
    });

    it('successfully logs in with credentials', function() {

        // Login
        
        cy.get('header div a').eq(1).click();

        cy.get('div h5')
            .should(($title) => {
                expect($title).to.contain('Log into Deliberate Sprints');
            });
        
        cy.get('input').eq(0)
            .type('md@gmail.com');
        
        cy.get('input').eq(1)
            .type('nonenone');
        
        cy.get('button[type="submit"]')
            .click();
        
        // MainView
        
        cy.url().should('eq', Cypress.config().baseUrl + '/');
        
        cy.get('button.MuiButton-contained').eq(0)
            .should('have.text', 'CURRENT SPRINT');
    });


});