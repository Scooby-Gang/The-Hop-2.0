const newUsername = Cypress.env('newUsername');
const newPassword = Cypress.env('newPassword');
const newEmail = Cypress.env('newEmail');

context('Signup functionality', () => {
    beforeEach(() => {
        cy.visit('/signup') 
    });
    it('successfully loads', () => {
        cy.visit('/signup')
    });

    it('has a create account button that will bring you to homepage page when clicked', () => {
        cy.findByRole('button', {name: /create account/i }).should('exist');
        cy.findByRole('button', {name: /create account/i }).click();
        cy.findByRole('button', {name: /back to login/i}).should('exist');
        cy.findByRole('button', {name: /back to login/i}).click();
    });

    it('has a back to login account button that will bring you to login page when clicked', () => {
        cy.findByRole('button', {name: /back to login/i}).should('exist');
        cy.findByRole('button', {name: /back to login/i}).click();
    });

    it('has an username input field that is fully functional', () => {
        const usernameField = cy.findByTestId(newUsername);

        usernameField.should('exist');
        usernameField.click().type('John Doe{enter}')
    })

    it('has a password input field that is fully functional', () => {
        const passwordField = cy.findByTestId(newPassword);

        passwordField.should('exist');
        passwordField.click().type('johnpass{enter}')
    })

    it('has an email input field that is fully functional', () => {
        const emailField = cy.findByTestId(newEmail);

        emailField.should('exist');
        emailField.click().type('johndoe@test.com{enter}')
    })


})