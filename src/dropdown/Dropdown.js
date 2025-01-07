import '../dropdown/dropdown.scss';
import { useState } from 'react';

function Dropdown({menuClicked, setMenuClicked}) {

    const dropdownOptions = [{
        name: 'Dashboard',
        id: 'dashboard'
    },
    {
        name: 'Warm Up',
        id: 'warmup'
    },
    {
        name: 'Goals',
        id: 'goals'
    },
    {
        name: 'Profile',
        id: 'profile'
    }];

    const [selectedOption, setSelectedOption] = useState('');

    const selectOption = (option) => {
        console.log('option', option)
        setSelectedOption(option);
        setMenuClicked(false);
        console.log('selectedOption', selectedOption)
    }

return (
    <ul className='dropdown-options-container'>
        {
         dropdownOptions.map((option) => (
            <li onClick={() => {selectOption(option.id)}} className='option' key={option.id}>{option.name}</li>
         ))   
        }
    </ul>
   );
}

export default Dropdown;