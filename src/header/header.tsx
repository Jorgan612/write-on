import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Entry, CombinedEntry } from '../interfaces/interfaces';
import NavDropdown from '../dropdown/NavDropdown';
import './header.scss';
// import menuIcon from "../assets/icons/menu_icon.svg";
// import woLogo from "../assets/logos/wo_logo2.png";


function Header() {

    const [menuIconClicked, setMenuIconClicked] = useState(false);
    const [activeMenuItem, setActiveMenuItem] = useState('/')

    const menuOptions = [
    {
        name: 'Dashboard',
        path: '/',
        id: 'dashboard'
    },
    {
        name: 'Stats',
        path: '/stats',
        id: 'stats'
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
    }

];

    const handleMenuClick = (option: any) => {
        setMenuIconClicked( prev => !prev ); 
        setActiveMenuItem(option);
    }


    return (
        <div className="header-container">
            {/* <img className='header-logo' src={woLogo} alt='app logo' /> */}
            {/* <WordTracker setEntries={setEntries} setCombinedEntries={setCombinedEntries} /> */}

            <div className='menu-items-container'>
                {menuOptions.map((option) => (
                    <Link to={`${option.path}`} key={option.id}>
                        <div onClick={() => {handleMenuClick(option.id)}} className={activeMenuItem === option.id ? 'selected-menu-item menu-item' : 'menu-item'} >{option.name}</div>
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