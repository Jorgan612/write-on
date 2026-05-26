import { useState } from 'react';
import './ForgotPassword.scss';

function ForgotPassword() {
    const [inputEmail, setInputEmail] = useState<string>('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailFormatted = emailRegex.test(inputEmail);
    const isFormValid = isEmailFormatted;
    let emailSent = false;

    const sendPasswordResetEmail = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isFormValid) return;

        try {
            const response = await fetch('http://localhost:5000/users/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: inputEmail }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message || 'Password Reset email sent. Check your email for reset link.');
                emailSent = true;
            }

        } catch (err) {
            console.error('Error:', err);
            alert('Something went wrong while attempting to send the reset email. Please try again later.');
        }
    };

    return (
    <form className="forgot-password-page" onSubmit={sendPasswordResetEmail}>
        <h1>Write On</h1>
        <h2>Forgot Password</h2>
        <div>
            <label htmlFor="email">Please provide the email address for your account.<span>*</span></label>
            <input required type="email" id="email" placeholder="Email" autoComplete="email" value={inputEmail} onChange={(e) => setInputEmail(e.target.value)}/>
        </div>
        <button type="submit" disabled={!isFormValid} title={isFormValid ? '' : 'Enter a valid email address'}>Send Reset Email</button>
    </form>
    )
}

export default ForgotPassword;