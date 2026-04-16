import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPenFancy, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import './Login.scss';

function Login({ setSignedIn }: { setSignedIn: (val: boolean) => void }) {
    const [isVisible, setIsVisible] = useState(false);

    const navigate = useNavigate();
    
    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Need check password logic
        // Need to figure out how to keep password secure on user object? Research
        // Need to include form validation - username & pw REQUIRED - error handling to indicate login issues (ex: missing username or password, incorrect username/password)
        // feature to allow a user to save username and password for future logins? (prefill username/pw into inputs so user just has to click Log In without manually entering them again? LocalStorage? How is this done?)
        // once password is verified only then will setSignedIn be true and user will be able to access main app.
        


        setSignedIn(true);
        navigate('/dashboard');
    };

    const toggleVisibility = () => {
        setIsVisible(prev  => !prev);
    }
    
    return (
        <form className='login-form' onSubmit={handleLoginSubmit}>
            <div className='app-title'>
                <h1>Write On <FaPenFancy /></h1>
            </div>
            <div className='username'>
                <input type="text" placeholder="Username" />
            </div>
            <div className='password'>
                <input type="text" placeholder="Password" />
                <span className='visibility-icon' onClick={toggleVisibility}>
                    {isVisible ? <FaRegEye className='icon'/> : <FaRegEyeSlash className='icon' />}
                </span>
            </div>
            <span className='stuck'>
                <span className='forgot-password'>Forgot password?</span>
                <span className='no-account'>Don't have an account?</span>
            </span>
            <button type="submit">Log In</button>
        </form>
    );
}

export default Login;