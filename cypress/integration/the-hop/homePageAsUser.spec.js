const { searchBar, googleMap } = Cypress.env();
let todayDate = new Date().toISOString().slice(0, 10);


context('Home Page rendering and functionality as a logged in User', () => {
    it('successfully loads', () => {
        cy.visit('/')
        cy.location('pathname').should('eq', '/');
    })

    it('has a login button that will bring you to log in page', () => {
        cy.findByRole('button', {name: /login/i }).should('exist');
        cy.findByRole('button', {name: /login/i }).click();
    })

    it('logging in as a user will return you back to home page automatically', () => {
        cy.location('pathname').should('eq', '/login')
        cy.findByPlaceholderText(/username/i).should('exist').focus().type('jerald', {delay: 20});
        cy.findByPlaceholderText(/password/i).should('exist').focus().type('pass1', {delay: 20});
        cy.findByRole('button', { name: /login/i }).should('exist').click().wait(2000);
        cy.location('pathname').should('eq', '/');
    })

    it('renders a profile button in top right corner of homepage instead of a login button', () => {
        cy.findByRole('button', {  name: /profile/i}).should('exist').should('contain.text','Profile');
    })

    it('has profile button that displays a drop down menu when clicked', () => {
        cy.findByRole('button', {  name: /profile/i}).click();
        cy.findByRole('list', {  name: /profile/i}).should('exist').within(() => {
            cy.findAllByRole('link').first().should('exist');
            //left off here
        })
    })

    it(' displays an alert pop-up if you try to submit an empty location search', () => {
        const inputField = cy.findByTestId(searchBar);
        inputField.should('exist');
        inputField.should('contain.text', '');
        cy.findByRole('button', {name: /search events/i}).should('exist');
        cy.findByRole('button', {name: /search events/i}).click();
        cy.on('window:alert',(txt)=>{
            //Mocha assertions
            expect(txt).to.contains('Please enter a valid location');
         })
    })

})