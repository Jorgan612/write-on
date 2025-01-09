import { Link } from 'react-router-dom';
import { useState } from 'react';

import Dropdown from '../dropdown/Dropdown';
import './header.scss';
import menuIcon from "../assets/icons/menu_icon.svg";

function Header() {

    const [menuIconClicked, setMenuIconClicked] = useState(false);
    const [activeMenuItem, setActiveMenuItem] = useState('/')

    const menuOptions = [{
        name: 'Dashboard',
        id: '/'
    },
    {
        name: 'Warm-up',
        id: '/warmup'
    },
    {
        name: 'Goals',
        id: '/activeGoals'
    },
    {
        name: 'Profile',
        id: '/profile'
    }];

    const handleMenuClick = (option) => {
        // This function is for mobile menua icon click

        // Need condition to determine screensize to allow for accurate dropdown menu open and close if screensize changes and menu icon shows vs doesn't show 
        setMenuIconClicked( prev => !prev ); 
        setActiveMenuItem(option);
    }


    return (
        <div className="header-container">
            <div className='app-title'>Write On!</div>
            <div className='menu-items-container'>
                {menuOptions.map((option) => (
                        <Link to={`${option.id}`}>
                            <div onClick={() => {handleMenuClick(option.id)}} className='menu-item' key={option.id}>{option.name}</div>
                        </Link>
                 ))}
            </div>
            <div className='dropdown-container'>
                <div className='menu-icon'>
                    <svg onClick={handleMenuClick} xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#D9D9D9"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
                </div>
                { menuIconClicked ? <Dropdown menuClicked={menuIconClicked} setMenuClicked={setMenuIconClicked} menuOptions={menuOptions} /> : <div className='hidden'></div> }
            </div>
        </div>
    );
}

export default Header