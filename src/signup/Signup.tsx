import './Signup.scss';
import { useNavigate } from 'react-router-dom';
import { FaPenFancy, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useState } from 'react';

function Signup({ setSignedIn }: { setSignedIn: (val: boolean) => void }) {
    const navigate = useNavigate();

    const [isVisible, setIsVisible] = useState<boolean>(false);

    const returnToLandingPage = () => {
        navigate('/');
    };

    const takeToLoginPage = () => {
        navigate('/login');
    };

    const handlesSignupSubmit = () => {
        // Figure out logic to create a new user and where a list of all users will be

        setSignedIn(true);
        navigate('/dashboard');
    };

    const toggleVisibility = () => {
        setIsVisible(prev => !prev);
    };


    return (
        <form className='signup-form' onSubmit={handlesSignupSubmit}>
            <div className='app-title'>
                <h1 onClick={returnToLandingPage}>Write On <FaPenFancy /></h1>
            </div>
            <div className='username'>
                <label>Username:</label>
                <div>
                    <input type="text" placeholder="Username" />
                </div>
            </div>
            <div className='password'>
                <label>Password:</label>
                <div>
                    <input type="text" placeholder="Password" />
                    <span className='visibility-icon' onClick={toggleVisibility}>
                        {isVisible ? <FaRegEye className='icon'/> : <FaRegEyeSlash className='icon' />}
                    </span>
                </div>
            </div>
            <button type="submit">Sign up</button>
            <span className='stuck'>
                <span className='forgot-password'>Forgot password?</span>
                <span className='no-account' onClick={takeToLoginPage}>Have an account already?</span>
            </span>
        </form>
    )

}

export default Signup;