//variables - we can leverage Cypress.env to create file-wide variables, that way if we need to change the variable value we only have to do it in one place - cypress.json
const searchBarId = Cypress.env('searchBar');


context('Home Page functionality', () => {
    it('successfully loads', () => {
        cy.visit('/')
    })
    
    it('has a login button that will bring you to log in page when clicked', () => {
        cy.findByRole('button', {name: /login/i }).should('exist');
        cy.findByRole('button', {name: /login/i }).click();
        cy.findByRole('button', {name: /return to app/i}).should('exist');
        cy.findByRole('button', {name: /return to app/i}).click();
    })
    
    it('has a location input field that is fully functional', () => {
        const inputField = cy.findByTestId(searchBarId);

        inputField.should('exist');
        inputField.click().type('This Is A Test{leftArrow}{leftArrow}{leftArrow}{leftArrow}{leftArrow}{backspace}{backspace}{backspace}{backspace} @#$%&!() {selectAll}{backspace}', {delay: 20});
        inputField.type('San Jose{enter}')
    })

    it('has a "more options" button taht adds a suite of filters/options for the location search', () => {
        cy.findByRole('button', {name: /more options/i}).should('exist');
        cy.findByRole('button', {name: /more options/i}).click();
        cy.get('#offcanvasExample').within(() => {
            cy.get('.offcanvas-header').find('h3').should('contain.text', 'Search Options');
            cy.findByText(/start date/i).should('exist');

        })
        
    })


})