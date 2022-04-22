const usernameLogin = Cypress.env('usernameLogin');
const passwordLogin = Cypress.env('passwordLogin');


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
        cy.wait(1000)  
    });

    it('has a register button that will bring you to signup page when clicked', () => {
        cy.findByRole('button', {name: /register/i}).should('exist');
        cy.get('#registerRedirectButton').click();
        cy.location('pathname').should('eq', '/signup');
        cy.wait(1000)
    });

    it('has a return to app button that will bring you to homepage page when clicked', () => {
        cy.findByRole('button', {name: /return to app/i}).should('exist');
        cy.get('#returnToAppButton').click();
        cy.location('pathname').should('eq', '/');
        cy.wait(1000)
    });

    it('has an username input field that is fully functional', () => {
        const username = cy.findByTestId(usernameLogin);

        username.should('exist');
        username.click().type('John Doe{enter}')
        cy.wait(1000)
    })

    it('has a password input field that is fully functional', () => {
        const password= cy.findByTestId(passwordLogin);

        password.should('exist');
        password.click().type('johnpass{enter}')
        cy.wait(1000)
    })

    it('wrong username and password should trigger an alert with an error message', ()=> {

        cy.get('#usernameLoginForm').type('randomTest');
        cy.get('#passwordLoginForm').type('test');
        cy.get('#loginButton').click();
        cy.on('window:alert', (text) => {
            expect(text).to.equal('Wrong password!');
        });
        cy.wait(1000)    
    })

    it('empty username and password should trigger an alert with an error message', ()=> {

        cy.get('#usernameLoginForm').type(' ');
        cy.get('#passwordLoginForm').type(' ');
        cy.get('#loginButton').click();
        cy.on('window:alert', (text) => {
            expect(text).to.equal('Wrong password!');
        });   
        cy.wait(1000)  
    })
    
    it('should login with correct username and password and redirect to the home page', ()=> {

        cy.get('#usernameLoginForm').type('FloraTest');
        cy.get('#passwordLoginForm').type('flora');
        cy.get('#loginButton').click();
        cy.location('pathname').should('eq', '/');
        cy.findByRole('button', {name: /profile/i}).should('exist');
    })

})