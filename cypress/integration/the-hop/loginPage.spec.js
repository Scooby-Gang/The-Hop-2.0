context('Signup functionality', () => {
    beforeEach(() => {
        cy.visit('/login') 
    });
    
    it('successfully loads', () => {
        cy.visit('/login')
    });

    it('has a login button that will bring you to homepage page when clicked', () => {
        cy.findByRole('button', {name: /login/i }).should('exist');
        cy.findByRole('button', {name: /login/i }).click();
    });
    it('has a register button that will bring you to signup page when clicked', () => {
        cy.findByRole('button', {name: /register/i}).should('exist');
        cy.findByRole('button', {name: /register/i}).click();
    });
    it('has a return to app button that will bring you to homepage page when clicked', () => {
        cy.findByRole('button', {name: /return to app/i}).should('exist');
        cy.findByRole('button', {name: /return to app/i}).click();
    });

})