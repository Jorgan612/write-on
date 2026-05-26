import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../interfaces/interfaces';
import { FaPenFancy, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import './Login.scss';

interface LoginProps {
    setSignedIn: (val: boolean) => void;
    setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
}

function Login({ setCurrentUser, setSignedIn }: LoginProps) {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [email, setEmail] = useState('');
    const [ password, setPassword] = useState('');

    const navigate = useNavigate();
    
    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ email, password  })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem("user_info", JSON.stringify(data.user));
                setCurrentUser(data.user);
                setSignedIn(true);
                navigate('/dashboard');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Login error: ', error);
        }

    };

    const returnToLandingPage = () => {
        navigate('/');
    };
    
    const takeToSignupPage = () => {
        navigate('/signup');
    };

    const takeToForgotPasswordPage = () => {
        navigate('/forgot-password');
    }

    const toggleVisibility = () => {
        setIsVisible(prev  => !prev);
    };
    
    return (
        <form className='login-form' onSubmit={handleLoginSubmit}>
            <div className='app-title'>
                <h1 onClick={returnToLandingPage}>Write On <FaPenFancy /></h1>
            </div>
            <div className='email'>
                <label htmlFor='email'>Email:</label>
                <div>
                    <input name='email' type="email" id='email' autoComplete='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
            </div>
            <div className='password'>
                <label htmlFor='password'>Password:</label>
                <div>
                    <input name='password' type={isVisible ? 'text' : 'password'} id='password' autoComplete='current-password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <span className='visibility-icon' onClick={toggleVisibility}>
                        {isVisible ? <FaRegEye className='icon'/> : <FaRegEyeSlash className='icon' />}
                    </span>
                </div>
            </div>
            <button type="submit">Log in</button>
            <span className='stuck'>
                <span className='forgot-password' onClick={takeToForgotPasswordPage}>Forgot password?</span>
                <span className='no-account' onClick={takeToSignupPage}>Don't have an account?</span>
            </span>
        </form>
    );
}

export default Login;