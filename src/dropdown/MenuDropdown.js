import { useState, useEffect } from 'react';
import '../dropdown/menuDropdown.scss';

function MenuDropdown({options, setSwitchGroup, setGroupInfo}) {

    const selectMenuOption = (option) => {
        setGroupInfo(option);
        setSwitchGroup(false);
    }

    return (
        <>
            <div className='dropdown-backdrop' onClick={() => setSwitchGroup(false)}></div>

            <div className='menu-dropdown-container'>
                {options.map((option) => (
                    <p key={option.groupId} className='option' onClick={() => {selectMenuOption(option)}}>
                        {option.name}
                    </p>
                ))}
            </div>
        </>
    )
}

export default MenuDropdown;