import { useState, useEffect } from 'react';
import '../dropdown/menuDropdown.scss';

function MenuDropdown({options}) {
    const [optionMenuClicked, setOptionMenuClicked] = useState(false);
    const [goalName, setGoalName] = useState('');

    const selectMenuOption = (name) => {
        setGoalName(name);
        setOptionMenuClicked( false );

        // setNewGoal({name: '', id: null, value: null, type: ''})
    }

    const openMenu = () => {
        setOptionMenuClicked( true );
    }

    useEffect(() => { 
        console.log(optionMenuClicked); 
    }, [optionMenuClicked]);

return ( 
    <div className='menu-dropdown-container'>
        <div className='default-option' onClick={openMenu}>
            { goalName || 'Select a Type' }
        </div>
        {optionMenuClicked && options.map((option) => (
            <div key={option.id} onClick={() => {selectMenuOption(option.name)}} className='option'>
                {option.name}
            </div>
        ))}
    </div>
)


}

export default MenuDropdown;