import './header.scss';

function Header() {
    return (
        <div className="header-container">
            <div className='app-title'>Write On!</div>
            <div className='menu-items-container'>
                <div>Dashboard</div>
                <div> Warm Up</div>
                <div>Goals</div>
                <div>Profile</div>
            </div>
        </div>
    );
}

export default Header