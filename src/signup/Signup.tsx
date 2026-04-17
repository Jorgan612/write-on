import './Signup.scss';
import { useNavigate } from 'react-router-dom';
import { FaPenFancy, FaRegEye, FaRegEyeSlash, FaPlusCircle } from 'react-icons/fa';
import { useState } from 'react';

function Signup({ setSignedIn }: { setSignedIn: (val: boolean) => void }) {
    const navigate = useNavigate();

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false);

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

    return (
        <form className='signup-form' onSubmit={handlesSignupSubmit}>
            <div className='app-title'>
                <h1 onClick={returnToLandingPage}>Write On <FaPenFancy /></h1>
            </div>
            <div className='email'>
                <label htmlFor='email'><span className='asterisk'>*</span>Email:</label>
                <div>
                    <input required type="text" id='email' />
                </div>
                <label htmlFor='confirm-email'><span className='asterisk'>*</span>Confirm Email:</label>
                <div>
                    <input required type="text" id='confirm-email' />
                </div>

            </div>
            <div className='username'>
                <label htmlFor='username'><span className='asterisk'>*</span>Username:</label>
                <div>
                    <input required type="text" id='username' />
                </div>
            </div>
            <div className='password'>
                <label htmlFor='password'><span className='asterisk'>*</span>Password:</label>
                <div>
                    <input required type="text" id='password' />
                    <span className='visibility-icon' onClick={() => setIsPasswordVisible(prev => !prev)}>
                        {isPasswordVisible ? <FaRegEye className='icon'/> : <FaRegEyeSlash className='icon' />}
                    </span>
                </div>
                <label htmlFor='confirm-password'><span className='asterisk'>*</span>Confirm Password:</label>
                <div>
                    <input required type="text" id='confirm-passowrd' />
                    <span className='visibility-icon' onClick={() => setIsConfirmPasswordVisible(prev => !prev)}>
                        {isConfirmPasswordVisible ? <FaRegEye className='icon'/> : <FaRegEyeSlash className='icon' />}
                    </span>
                </div>
            </div>

            <span className='msg1'>Optional Details</span>
            <span className='goal-msg'>(These will show on your user profile.)</span>
            <div className='pronouns'>
                <label htmlFor='pronouns'>Pronouns:</label>
                <div>
                    <input type="text" id='pronouns' />
                </div>
            </div>
            <div className='bio'>
                <label htmlFor='bio'>Bio:</label>
                <div className='textarea-container'>
                    <textarea id='bio' maxLength={250}></textarea>
                </div>
            </div>
            <p>Personal Website</p>
            <div className='website'>
                <label htmlFor='website-name'>Website name:</label>
                <div>
                    <input type="text" id='website-name' />
                </div>
                <label htmlFor='website-url'>Website URL:</label>
                <div>
                    <input type="text" id='website-url' />
                </div>
            </div>
            <p>Socials</p>
            <div className='socials'>
                <label htmlFor='social-handle'>Handle:</label>
                <div>
                    <input type="text" id='social-handle' />
                </div>
                <label htmlFor='social-url'>Social URL:</label>
                <div>
                    <input type="text" id='social-url' />
                </div>
            </div>
            <div className='add-social'>
                <FaPlusCircle className='icon' title='Add another social' />
            </div>
            <span className='msg1'>Let's set some goals...</span>
            <span className='goal-msg'>(Your goals are only visible to you.)</span>
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
            <span className='goal-msg'>You can update goals at any time from your personal dashboard.</span>
            <button type="submit">Sign up</button>
            <span className='stuck'>
                <span className='no-account' onClick={takeToLoginPage}>Have an account already?</span>
            </span>
        </form>
    )
}

export default Signup;