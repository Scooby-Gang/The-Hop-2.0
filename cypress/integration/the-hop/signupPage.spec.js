const newUsername = Cypress.env('newUsername');
const newPassword = Cypress.env('newPassword');
const newEmail = Cypress.env('newEmail');

describe('Test signup page', ()=> {

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
        });
        
        
        it('has a back to login account button that will bring you to login page when clicked', () => {
            cy.findByRole('button', {name: /back to login/i}).should('exist');
            cy.findByRole('button', {name: /back to login/i}).click();
            cy.location('pathname').should('eq', '/login');
            cy.wait(1000)
        });
        
        it('has an username input field that is fully functional', () => {
            const usernameField = cy.findByTestId(newUsername);
            
            usernameField.should('exist');
            usernameField.click().type('John Doe')
            cy.wait(500)
        })
        
        it('has a password input field that is fully functional', () => {
            const passwordField = cy.findByTestId(newPassword);
            
            passwordField.should('exist');
            passwordField.click().type('johnpass')
            cy.wait(500)
        })
        
        it('has an email input field that is fully functional', () => {
            const emailField = cy.findByTestId(newEmail);
            
            emailField.should('exist');
            emailField.click().type('johndoe@test.com')
            cy.wait(500)
        })
        
    })

    context('mock a testing data and reset the database', ()=> {
        beforeEach(()=> { 
            cy.visit('/signup');        
        })
        
        it('if having username, password and email input field signed up correctly will redirect to the home page', () => {
            
            //static testing data
            const newUser = {
                id:1,
                username: "John Doe1",
                password: "johnpass1",
                email: "johndoe1@test.com"
            }
            
            const newUserData = {
                "username": "John Doe1",
                "email": "johndoe1@test.com",
                "home_location": null
            }

            //part og e2e testing (GET method)
            //type new user info to test signup and redirect to the page
            cy.get('input[id=usernameCreateUserForm]').type(newUser.username);
            cy.get('input[id=passwordCreateUserForm]').type(newUser.password);
            cy.get('input[id=emailCreateUserForm]').type(newUser.email);
            cy.get('#createAccountBtn').click(()=> {
                cy.intercept('POST', 'http://localhost:3000/api/users','fixture:signup').as('signup');
                cy.visit('/signup');
                cy.wait('@signup');
            }).location('pathname').should('eq', '/');
            cy.wait(1000)      
            
            //find the profile dropdown menu 
            cy.findByRole('button', {name: /profile/i}).should('exist');
            cy.findByRole('button', {name: /profile/i}).click();
            cy.wait(1000)

            //part og e2e testing (DELETE method)
            //log out the user and delete the new user testing data from database
            cy.findByRole('link', {  name: /logout/i}).click().location('pathname').should('eq', '/');;
            cy.request({
                method : 'DELETE', 
                url : 'http://localhost:3000/api/users',
                body : newUserData})
            
        })
    })
        
})