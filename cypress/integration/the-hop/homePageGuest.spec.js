//variables - we can leverage Cypress.env to create file-wide variables, that way if we need to change the variable value we only have to do it in one place - cypress.json
const searchBarId = Cypress.env('searchBar');
let todayDate = new Date().toISOString().slice(0, 10);


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

    it('has a "more options" button that adds a suite of filters/options for the location search', () => {
        cy.findByRole('button', {name: /more options/i}).should('exist');
        cy.findByRole('button', {name: /more options/i}).click();
        cy.get('#offcanvasExample').within(() => {
            cy.get('.offcanvas-header').find('h3').should('contain.text', 'Search Options');
            cy.findByText(/start date/i).should('exist');
            cy.findAllByDisplayValue(todayDate).eq(0).should('exist');
            cy.findByRole('textbox').should('have.value', 5);
            cy.findByRole('textbox').click().type('{backspace}10');
            cy.findByRole('checkbox', { name: /community/i }).uncheck();
            cy.findByRole('checkbox', { name: /concerts/i }).uncheck();
            cy.findByRole('checkbox', { name: /conferences/i }).uncheck();
            cy.findByRole('checkbox', { name: /expos/i }).uncheck();
            cy.findByRole('checkbox', { name: /festivals/i }).uncheck();
            cy.findByRole('checkbox', { name: /performing arts/i }).uncheck();
            cy.findByRole('checkbox', { name: /sports/i }).uncheck();
            cy.findByRole('checkbox', { name: /community/i }).check();
            cy.findByRole('checkbox', { name: /concerts/i }).check();
            cy.findByRole('checkbox', { name: /conferences/i }).check();
            cy.findByRole('checkbox', { name: /expos/i }).check();
            cy.findByRole('checkbox', { name: /festivals/i }).check();
            cy.findByRole('checkbox', { name: /performing arts/i }).check();
            cy.findByRole('checkbox', { name: /sports/i }).check();
            cy.findByRole('button', { name: /close options/i }).click();
        })
        //test the other close button (X) in top right corner of search options
        cy.findByRole('button', {name: /more options/i}).click();
        cy.get('#offcanvasExample').within(() => {
            cy.get('.btn-close').click({force: true});
        })
    })

    it('has a "search events" button that submits location input field and all of the correct options as a query to update our map', () => {
        cy.findByRole('button', {name: /search events/i}).should('exist');
        cy.findByRole('button', {name: /search events/i}).click();
    })


})