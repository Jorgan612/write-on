import '../dropdown/navDropdown.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function NavDropdown({menuClicked, setMenuClicked, options}) {

    const [selectedOption, setSelectedOption] = useState('');

    const selectDropdownOption = (option) => {
        setSelectedOption(option);
        setMenuClicked(false);
    }

return (
    <ul className='dropdown-options-container'>
        {options.map((option) => (
            <Link to={`${option.path}`} key={option.id}>
                <li onClick={() => {selectDropdownOption(option.id)}} className='option'>{option.name}</li>
            </Link>
         ))}
    </ul>
   );
}

export default NavDropdown;