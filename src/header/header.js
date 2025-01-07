import Dropdown from '../dropdown/Dropdown';
import './header.scss';
import menuIcon from "../assets/icons/menu_icon.svg";
import { useState } from 'react';

function Header() {

    const [menuClicked, setMenuClicked] = useState(false);

    const handleMenuClick = () => {
        setMenuClicked( prev => !prev ) 
    }


    return (
        <div className="header-container">
            <div className='app-title'>Write On!</div>
            <div className='menu-items-container'>
                <div className='menu-item'>Dashboard</div>
                <div className='menu-item'> Warm Up</div>
                <div className='menu-item'>Goals</div>
                <div className='menu-item'>Profile</div>
            </div>
            <div className='dropdown-container'>
                <div className='menu-icon'>
                    <svg onClick={handleMenuClick} xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#D9D9D9"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
                </div>
                { menuClicked ? <Dropdown menuClicked={menuClicked} /> : <div className='hidden'></div> }
            </div>
        </div>
    );
}

export default Header