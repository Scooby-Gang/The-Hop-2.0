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
            cy.findAllByRole('link').first().should('exist').within(() => {
               cy.findByRole('img').should('have.attr', 'src')
            });
            cy.findAllByRole('link').eq(1).should('exist');
            cy.findAllByRole('link').eq(2).should('exist').contains('Profile Page');
            cy.findAllByRole('link').eq(3).should('exist').contains('Logout');
        });
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

    it('has a location input field that is fully functional', () => {
        const inputField = cy.findByTestId(searchBar);

        inputField.should('exist');
        inputField.click().type('San Jose{enter}', {delay: 20});
        
    })

    it('has a search events button that fetches data from our 3rd party APIs', () => {
        cy.findByRole('button', {name: /search events/i}).should('exist');
        cy.findByRole('button', {name: /search events/i}).click();
    })

    it('displays a list of events, with its info as well as options', () => {
        cy.findByTestId('eventsList').should('exist');
        cy.findByTestId('numOfEvents').find('p').should('contain.text', 'No. of events found:');
        cy.findAllByTestId('eventCard').first().within(() => {
            cy.get('h5').should('exist');
            cy.get('p').first().should('contain.text', 'Category').next().should('exist');
            cy.get('p').eq(2).should('contain.text', 'Labels').next().should('exist');
            cy.get('p').eq(4).should('contain.text', 'Predicted Attendance').next().should('exist');
            cy.get('p').eq(6).should('contain.text', 'Start Time').next().should('exist');
            cy.get('p').eq(8).should('contain.text', 'End Time').next().should('exist');
            cy.get('p').eq(10).should('contain.text', 'Venue').next().should('exist');
            cy.get('p').eq(12).should('contain.text', 'Address').next().should('exist');
        })
    })

    it('displays a button to google the event and a save event button that is now enabled as we are a logged in user', () => {
        cy.findAllByTestId('eventCard').first().within(() => {
            cy.findByTestId("magnifyingGlass").should('exist');
            // cy.findByTestId("magnifyingGlass").click();
            cy.findByTestId("userSaveEvent").should('exist')
            cy.findByTestId("userSaveEvent").should('be.enabled').contains('Save Event').click();
        })
    })

    it('displays a message: "Event has been saved already for user" if event is already saved for user and the user tries to save the event again', () => {
        cy.findAllByTestId('eventCard').first().within(() => {
            cy.findByTestId('alreadySaved').should('exist').find('p').should('contain.text', 'Event has been saved already for user');
        })
    })

})