import { useState, useEffect } from 'react';
import '../dropdown/menuDropdown.scss';

function MenuDropdown({options, goal, newGoal}) {
    const [optionMenuClicked, setOptionMenuClicked] = useState(false);
    const [goalName, setGoalName] = useState('');

    const selectMenuOption = (option) => {
        setGoalName(option.name);
        setOptionMenuClicked( false );
        newGoal(option);
        // setNewGoal({name: '', id: null, value: null, type: ''})
    }

    const openMenu = () => {
        setOptionMenuClicked( true );
    }

    useEffect(() => { 
        console.log('goalName', goalName)

    }, [optionMenuClicked, goalName]);

    return (
        <div className='menu-dropdown-container'>
            <div className='default-option' onClick={openMenu}>
                <div>
                    { goalName ? goalName : 'Select a Type' }
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#D9D9D9"><path d="M480-360 280-560h400L480-360Z"/></svg>
            </div>
            {options.map((option) => (
                <div key={option.id} onClick={() => {selectMenuOption(option)}} className={optionMenuClicked ? 'option' : 'hidden'}>
                    {option.name}
                </div>
            ))}
        </div>
    )


}

export default MenuDropdown;