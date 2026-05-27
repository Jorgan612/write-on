import { FormEvent, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import './ResetPassword.scss';

function ResetPassword() {
    const [inputPassword, setInputPassword] = useState<string>('');
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');

    const submitNewPassword = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/users/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({ 
                    token: token,
                    newPassword: inputPassword 
                }),
            });

            const data = await response.json();

            if  (response.ok) {
                alert(data.message || 'Password reset successfully! You may now log into your account using the new password.');
                navigate('/login');
            }

        } catch (err) {
            console.error('Error resetting password:', err);
            alert('Something went wrong while resetting your password. Please try again.');
        }
    };


    return(
        <form className="reset-password-page" onSubmit={submitNewPassword}>
            <h1>Write On</h1>
            <h2>Password Reset</h2>
            <div>
                <label htmlFor="password">Please enter a new password for your account.<span>*</span></label>
                <input required type={isVisible ? 'text' : 'password'} id="password" placeholder="password" autoComplete="password" value={inputPassword} onChange={(e) => setInputPassword(e.target.value)}/>
                <span className='visibility-icon' 
                    onClick={() => setIsVisible(prev => !prev)}>
                    {isVisible ? <FaRegEye className='icon'/> : <FaRegEyeSlash className='icon' />}
                </span>
            </div>
            <button type="submit" disabled={!inputPassword} title={inputPassword ? '' : 'Enter a new password'}>Reset</button>
        </form>
    )
}

export default ResetPassword;