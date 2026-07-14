import { useState, useEffect } from 'react';
import '../dropdown/menuDropdown.scss';

function MenuDropdown({options}) {
    const [optionMenuClicked, setOptionMenuClicked] = useState(false);
    const [optionName, setOptionName] = useState('');

    const selectMenuOption = (option) => {
        setOptionName(option.name);
        setOptionMenuClicked( false );
    }

    const openMenu = () => {
        setOptionMenuClicked( true );
    }

    useEffect(() => { 

    }, [optionMenuClicked, optionName]);

    return (
        <div className='menu-dropdown-container'>
            {/* <div className='default-option' onClick={openMenu}> */}
                {/* <div>
                    { optionName ? optionName : 'Select a Type' }
                </div> */}
                {/* <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#D9D9D9"><path d="M480-360 280-560h400L480-360Z"/></svg> */}
            {/* </div> */}
            {options.map((option) => (
                <div key={option.id} onClick={() => {selectMenuOption(option)}} className={optionMenuClicked ? 'option' : 'hidden'}>
                    {option.name}
                </div>
            ))}
        </div>
    )
}

export default MenuDropdown;