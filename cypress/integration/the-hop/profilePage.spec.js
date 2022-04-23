context('Profile page rendering and functionality', () => {
    it('visits login page, able to log in', () => {
        cy.visit('/login');
        cy.get('#usernameLoginForm').type('jerald');
        cy.get('#passwordLoginForm').type('pass1');
        cy.get('#loginButton').click();
        cy.location('pathname').should('eq', '/');
        cy.findByRole('button', {name: /profile/i}).should('exist');
    })
    
    it('has correct url endpoint', () => { 
        cy.findByRole('button', {name: /profile/i}).click();
        cy.findByRole('link', {name: /profile page/i}).click();
        cy.location('pathname').should('eq', '/profile');   
    })

    it('has a homepage button that functions as intended', ()=> {
        cy.findByRole('button', {name: /profile/i}).click();
        cy.findByRole('link', {name: /home page/i}).should('exist').click();
        cy.location('pathname').should('eq', '/');
        cy.findByRole('button', {name: /profile/i}).click();
        cy.findByRole('link', {name: /profile page/i}).click();
    })

    it('render the saved event card', ()=> {
        cy.get('h2').contains(/saved events/i);
        cy.get('#savedEventCard > div').first().should('exist').within(() => {
            cy.get('h5').should('exist');
            cy.get('p').first().should('exist');
            cy.get('p').eq(1).should('exist');
            cy.get('p').eq(2).should('exist');
            cy.get('p').last().should('exist');
            cy.findByTestId('SearchIcon').should('exist');
            // cy.findByTestId('SearchIcon').click();
            cy.findByTestId('DeleteRoundedIcon').should('exist');
            cy.findByTestId('DeleteRoundedIcon').click();
        });
        
    })

})