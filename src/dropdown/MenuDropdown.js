import { useState } from 'react';
import '../dropdown/menuDropdown.scss';

function MenuDropdown({menuClicked, setMenuClicked, options, setNewGoal}) {
    const [optionMenuClicked, setOptionMenuClicked] = useState(false);

    const selectMenuOption = () => {
        console.log('menuOption clicked!')
        setMenuClicked( prev => !prev );
        setNewGoal({name: '', id: null, value: null, type: ''})
    }

    const openMenu = () => {
        console.log('Type Menu clicked!')
        setOptionMenuClicked( prev => !prev);
    }

return ( 
    <div>
        <div className='default-option' onClick={openMenu}>Select a Type</div>
        {optionMenuClicked ? options.map((option) => (
            <div key={option.id}>
                <div onClick={() => {selectMenuOption(option.name)}} className='option'>{option.name}</div>
            </div>
        )) : <div className='hidden'></div>}

    </div>
)


}

export default MenuDropdown;