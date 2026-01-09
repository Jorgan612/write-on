import { Link } from 'react-router-dom';
import { useState } from 'react';

import NavDropdown from '../dropdown/NavDropdown';
import WordTracker from '../tracker/WordTracker';
import './header.scss';
// import menuIcon from "../assets/icons/menu_icon.svg";
// import woLogo from "../assets/logos/wo_logo2.png";

function Header({setEntries}) {

    const [menuIconClicked, setMenuIconClicked] = useState(false);
    const [activeMenuItem, setActiveMenuItem] = useState('/')

    const menuOptions = [{
        name: 'Dashboard',
        path: '/',
        id: 'dashboard'
    },
    {
        name: 'Warm-up',
        path: '/warmup',
        id: 'warmup'
    },
    {
        name: 'Goals',
        path: '/activeGoals',
        id: 'activeGoals'
    },
    {
        name: 'Profile',
        path: '/profile',
        id: 'profile'
    }];

    const handleMenuClick = (option: any) => {
        console.log('OPTION', option)
        // This function is for mobile menu icon click

        // Need condition to determine screensize to allow for accurate dropdown menu open and close if screensize changes and menu icon shows vs doesn't show 
        setMenuIconClicked( prev => !prev ); 
        setActiveMenuItem(option);
    }


    return (
        <div className="header-container">
            {/* <img className='header-logo' src={woLogo} alt='app logo' /> */}
            <WordTracker setEntries={setEntries}/>

            <div className='menu-items-container'>
                {menuOptions.map((option) => (
                        <Link to={`${option.path}`} key={option.id}>
                            <div onClick={() => {handleMenuClick(option.id)}} className='menu-item' >{option.name}</div>
                        </Link>
                 ))}
            </div>
            <div className='dropdown-container'>
                <div className='menu-icon'>
                    <svg onClick={handleMenuClick} xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#D9D9D9"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
                </div>
                { menuIconClicked ? <NavDropdown menuClicked={menuIconClicked} setMenuClicked={setMenuIconClicked} options={menuOptions} /> : <div className='hidden'></div> }
            </div>
        </div>
    );
}

export default Header