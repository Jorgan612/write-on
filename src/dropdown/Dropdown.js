import '../dropdown/dropdown.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Dropdown({menuClicked, setMenuClicked, menuOptions}) {

    const [selectedOption, setSelectedOption] = useState('');

    const selectDropdownOption = (option) => {
        setSelectedOption(option);
        setMenuClicked(false);
    }

return (
    <ul className='dropdown-options-container'>
        {menuOptions.map((option) => (
            <Link to={`${option.id}`}>
                <li onClick={() => {selectDropdownOption(option.id)}} className='option' key={option.id}>{option.name}</li>
            </Link>
         ))}
    </ul>
   );
}

export default Dropdown;