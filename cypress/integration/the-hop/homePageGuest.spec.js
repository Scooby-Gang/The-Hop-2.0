//variables - we can leverage Cypress.env to create file-wide variables, that way if we need to change the variable value we only have to do it in one place - cypress.json
const { searchBar, googleMap } = Cypress.env();
let todayDate = new Date().toISOString().slice(0, 10);


context('Home Page functionality', () => {
    it('successfully loads', () => {
        cy.visit('/')
        cy.location('pathname').should('eq', '/');
    })
    
    it('has a login button that will bring you to log in page when clicked and a return to app link that brings us back to home', () => {
        cy.findByRole('button', {name: /login/i }).should('exist');
        cy.findByRole('button', {name: /login/i }).click();
        cy.location('pathname').should('eq', '/login');
        cy.findByRole('button', {name: /return to app/i}).should('exist');
        cy.findByRole('button', {name: /return to app/i}).click();
        cy.location('pathname').should('eq', '/');
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
        inputField.click().type('This Is A Test{leftArrow}{leftArrow}{leftArrow}{leftArrow}{leftArrow}{backspace}{backspace}{backspace}{backspace} @#$%&!() {selectAll}{backspace}', {delay: 20});
        inputField.type('San Jose{enter}');
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

    it('has a map that can be navigated and features working as intended', () => {
        const fullScreen = cy.findByRole('button', { name: /toggle fullscreen view/i });
        // const map = cy.get('#app > div > div > div:nth-child(2) > div > div > div:nth-child(2) > div:nth-child(2)')
        cy.findByRole('menuitemradio', { name: /show satellite imagery/i }).click().wait(500);
        fullScreen.click().wait(500);
        cy.get(googleMap).trigger('mousedown', 'center').trigger('mousemove', 115, 240, {force: true}).wait(1000).trigger('mousemove', 240, 125, {force: true}).wait(1000).trigger('mouseup', 'center')
        cy.findByRole('menuitemcheckbox', { name: /labels/i }).click();
        cy.findByRole('button', {  name: /zoom in/i}).click().click()
        cy.findByRole('menuitemradio', { name: /show satellite imagery/i }).click().wait(500);
        cy.findByRole('menuitemcheckbox', { name: /labels/i }).click();
        cy.findByRole('button', {  name: /zoom out/i}).click().click()
        fullScreen.click().wait(500);
        cy.findByRole('menuitemradio', {  name: /show street map/i}).click().wait(1500)
        cy.findByRole('menuitemcheckbox', { name: /terrain/i }).click().wait(1000);
        cy.findByRole('button', {  name: /zoom in/i}).click().wait(1500)
        cy.findByRole('menuitemradio', {  name: /show street map/i}).click().wait(500)
        cy.findByRole('menuitemcheckbox', { name: /terrain/i }).click().wait(1000);
        
    })

    

    it('has a "search events" button that submits location input field and all of the correct options as a query to update our map using a fixture for stubbing network responses', () => {
        let eventsData;
        let mapData;
        cy.fixture('events').then((data) => {
            cy.log('Events DATA: ', data);
            eventsData = data;
        });
        // cy.fixture('map').then((data) => {
        //     // cy.log('Events DATA: ', data);
        //     mapData = data;
        // });
        cy.intercept('GET', 'https://api.predicthq.com/v1/events/*', eventsData).as('getEvents')
        // cy.intercept('GET', '**/maps.googleapis.com/maps/api/geocode/*', mapData).as('getMap');

        
        cy.findByRole('button', {name: /search events/i}).should('exist');
        cy.findByRole('button', {name: /search events/i}).click();
        // cy.wait('@getMap').then((res) => {
        //     cy.log('Response: ', res)
        // })
        cy.wait('@getEvents').then((res) => {
            cy.log('Response: ', res)
        })
        
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

    it('displays a button to google the event and a save event button that should be disabled unless logged in within the event card', () => {
        cy.findAllByTestId('eventCard').first().within(() => {
            cy.findByTestId("magnifyingGlass").should('exist');
            // cy.findByTestId("magnifyingGlass").click();
            cy.findByTestId("saveEvent").should('exist')
            // cy.findByTestId("saveEvent").should('be.disabled')
        })
    })
})