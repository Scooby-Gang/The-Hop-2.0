/**
 * @jest-environment jsdom
 */
import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen} from '@testing-library/react'

import { SearchBox } from '../src/client/components/homepage/SearchBox'

describe('SearchBox', () => {
    beforeAll(() => {
        render(<SearchBox />);
        
        // screen.getByRole('')
        // screen.getByRole('textbox')
    });
    
    test('renders SearchBox component', () => {
        // render(<SearchBox />);
        
        // screen.debug()
        // screen.getByRole(/textbox/)
        expect(screen.getByTestId('searchInput')).toBeInTheDocument();
        expect(screen.getByTestId('searchInput')).toHaveTextContent('');         
        // screen.debug()
    });
    
    //user able to type and search while search button clicked
    test('User able to type and submit a location to search', async () => {
        // screen.queryByRole();
        // let userInput;
        // const searchLocationBtn = jest.fn(() => {
        //     userInput = 'San Jose'
        // }) 
        
        const searchBtn = await screen.queryByRole('button', {name: 'Search Events'})
        //search input starts off null
        expect(screen.getByTestId('searchInput')).not.toBeNull();
        console.log('TTTTTTEST',await screen.queryByTestId('searchInput'))
        expect(screen.getByTestId('searchInput').value).toHaveTextContent('');
        await userEvent.click(searchBtn);
        //user types San Jose into search input
        await userEvent.type(screen.queryByTestId('searchInput'), 'San Jose');
        //We should be able to check by the text 'San Jose', to be in document. 
        expect(screen.getByText('San Jose')).toBeInTheDocument();
        //user should be able to submit entry

        
        // expect(userInput === 'San Jose')
    });
    //test whether it will alert if no input was made and button is clicked
    global.alert = jest.fn();
    test('it will alert user when no location input exists', async ()=> {
        const searchBtn = screen.queryByRole('button', {name: 'Search Events'});
        await userEvent.click(searchBtn);
        expect(global.alert).toBeCalledWith('Please enter a valid location');
        // screen.debug()
    });
    
    //after button clicked, a drop down list will show and 25 is the limit
    //test if map is interractive?check the api
    //test the event card has correct info listed
    //test the number of event card is consistant with the number of events innerhtml was shown
    //test the event card has two button
    //test the event card searching button is working or not (by fireEvent)
    //test the event card save button is disabled before login
    //test the event card save button is enabled after login
    //test the event card save button will save the event after clicked
    //test if a slide bar will show after more option button is clicked
    //test the boolean values of all categories are true initially
    //test the boolean values of all categories are false after selection
    //test the radius has a input box and value has to be a number
    //test the date is today's date initially 
    //tets the date is the date user selected
    //test will more option button will close out the slide bar
})