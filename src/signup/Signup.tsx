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
            <div className='email'>
                <label htmlFor='email'>Email:</label>
                <div>
                    <input type="text" id='email' placeholder="Username" />
                </div>
                <label htmlFor='confirm-email'>Confirm Email:</label>
                <div>
                    <input type="text" id='confirm-email' placeholder="Username" />
                </div>

            </div>
            <div className='username'>
                <label htmlFor='username'>Username:</label>
                <div>
                    <input type="text" id='username' placeholder="Username" />
                </div>
            </div>
            <div className='password'>
                <label htmlFor='password'>Password:</label>
                <div>
                    <input type="text" id='password' placeholder="Password" />
                    <span className='visibility-icon' onClick={toggleVisibility}>
                        {isVisible ? <FaRegEye className='icon'/> : <FaRegEyeSlash className='icon' />}
                    </span>
                </div>
                <label htmlFor='confirm-password'>Confirm Password:</label>
                <div>
                    <input type="text" id='confirm-passowrd' placeholder="Password" />
                    <span className='visibility-icon' onClick={toggleVisibility}>
                        {isVisible ? <FaRegEye className='icon'/> : <FaRegEyeSlash className='icon' />}
                    </span>
                </div>
            </div>
            <span className='goal-msg1'>Let's set a few goals...</span>
            <div className='goals'>
                <label htmlFor='weekly-wc'>Weekly Word Count:</label>
                <div>
                    <input type="text" id='weekly-wc' placeholder="How many words do you aim to write each week?" />
                </div>
                <label htmlFor='weekly-session'>Weekly Session Frequency:</label>
                <div>
                    <input type="text" id='weekly-session' placeholder="How many days a week will you write?" />
                </div>
                <label htmlFor='overall'>Overall Word Count:</label>
                <div>
                    <input type="text" id='overall' placeholder="What is your target word count?" />
                </div>
            </div>
            <span className='goal-msg'>Need a moment to think? </span>
            <span className='goal-msg'>You can update goals at any time from your personal dashboard.</span>
            <button type="submit">Sign up</button>
            <span className='stuck'>
                <span className='forgot-password'>Forgot password?</span>
                <span className='no-account' onClick={takeToLoginPage}>Have an account already?</span>
            </span>
        </form>
    )
}

export default Signup;