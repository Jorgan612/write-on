import { useState, useEffect } from 'react';
import '../dropdown/menuDropdown.scss';

function MenuDropdown({options, goal, newGoal}) {
    const [optionMenuClicked, setOptionMenuClicked] = useState(false);
    const [goalName, setGoalName] = useState('');

    const selectMenuOption = (name) => {
        setGoalName(name);
        setOptionMenuClicked( false );
        newGoal(name);
        // setNewGoal({name: '', id: null, value: null, type: ''})
    }

    const openMenu = () => {
        setOptionMenuClicked( true );
    }

    useEffect(() => { 

    }, [optionMenuClicked, goalName]);

    return (
        <div className='menu-dropdown-container'>
            <div className='default-option' onClick={openMenu}>
                { goalName ? goalName : 'Select a Type' }
            </div>
            {optionMenuClicked && options.map((option) => (
                <div key={option.id} onClick={() => {selectMenuOption(option.type)}} className='option'>
                    {option.name}
                </div>
            ))}
        </div>
    )


}

export default MenuDropdown;