describe('Demo Functionality', function() {

    it('demo MainView successfully loads', function() {
        cy.visit('/demo');

        // End Demo button visible
        cy.get('header div a').eq(1)
            .should('have.text', 'END DEMO');

        // Current Sprint button visible
        cy.get('button.MuiButton-contained').eq(0)
            .should('have.text', 'CURRENT SPRINT');
    });

    // TODO: Finish demo functionality

});