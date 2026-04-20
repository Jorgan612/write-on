import './Signup.scss';
import { useNavigate } from 'react-router-dom';
import { FaPenFancy, FaRegEye, FaRegEyeSlash, FaPlusCircle, FaRegUserCircle, FaTimesCircle } from 'react-icons/fa';
import { User } from '../interfaces/interfaces';
import { useState, ChangeEvent, ChangeEventHandler } from 'react';

const userObj = {
    id: Date.now(),
    name: '',
    username: '',
    email: '',
    password: '',
    pronouns: '',
    bio: '',
    joined: '',
    userIcon: {icon: FaRegUserCircle, id: 'default', color: '#94a3b8'},
    website: {
        name: '',
        url: '',
    },
    socials: [{
        id: Date.now(),
        handle: '',
        url: ''
    }],
    goals: [{
        name: 'Weekly Word Count',
        id: '1',
        total: 0,
        current: 0,
        type: 'word(s)'
        },
        {
        name: 'Weekly Session Frequency ',
        id: '2',
        total: 0,
        current: 0,
        type: 'day(s)'
        },
        {
        name: 'Overall Word Count',
        id: '3',
        total: 0,
        current: 0,
        type: 'word(s)'
        }],
    entries: [],
};

function Signup({ setSignedIn }: { setSignedIn: (val: boolean) => void }) {
    const navigate = useNavigate();

    const [newUser, setNewUser] = useState<User>(userObj);
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false);
    const [confirmEmail, setConfirmEmail] = useState<string>();
    const [confirmPassword, setConfirmPassword] = useState<string>();
    const [confirmationTouched, setConfirmationTouched] = useState({
        email: false,
        password: false
    })
    const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
    const emailMismatch = confirmationTouched.email && confirmEmail !== newUser.email;
    const passwordMismatch = confirmationTouched.password && confirmPassword !== newUser.password;

    const isFormValid = newUser.email.length > 0 &&
        newUser.password.length > 0  &&
        confirmEmail === newUser.email &&
        confirmPassword === newUser.password;

    const returnToLandingPage = () => {
        navigate('/');
    };

    const takeToLoginPage = () => {
        navigate('/login');
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setNewUser((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handlePasswordConfirmation = () => {
        if (confirmPassword !== newUser.password) {
            setPasswordsMatch(false);
        } else {
            setPasswordsMatch(true);
        }
    }

    const handleSocialChange = (index: number, field: 'handle' | 'url', value: string) => {
        setNewUser((prev) => ({
            ...prev,
            socials: prev.socials.map((social, i) => 
                i === index ? { ...social, [field]: value } : social
        )}));
    };

    const handleGoalChange = (index: number, value: string) => {
        setNewUser((prev) => ({
            ...prev,
            goals: prev.goals.map((goal, i) => 
                i === index ? { ...goal, total: Number(value) } : goal
        )}));
    };

    const handleWebsiteChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({
            ...prev,
            website: {
                ...prev.website,
                [name]: value,
            },
        }));
    };

    const handlesSignupSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!isFormValid) return;
        // Figure out logic to create a new user and where a list of all users will be
        // verify email and password fields match
        // separately update userObj with separate handleInput functions
        // dynamic handleInput function for optional details (besides website/socials/goals?)
        // user icon remains default until updated from user profile.
        // need to pass setCurrentUser to this component.
        // 
        console.log('newUser test submit', newUser)

        // uncomment when logic is completed!
        // setSignedIn(true);
        // navigate('/dashboard');
    };

    const addSocialInputs = () => {
        const newSocial = {
            id: Date.now(),
            handle: '',
            url: ''
        };

        setNewUser((prevUser) => {
            return {
                ...prevUser,
                socials: [...prevUser.socials, newSocial]
            }
        });
    };

    const removeSocialInputs = (id: number) => {
        setNewUser((prev) => ({
            ...prev,
            socials: prev.socials.filter((social) => {
                return social.id !== id;
            }
        )}));
    };

    return (
        <form className='signup-form' onSubmit={handlesSignupSubmit}>
            <div className='app-title'>
                <h1 onClick={returnToLandingPage}>Write On <FaPenFancy /></h1>
            </div>
            <div className='email'>
                <label htmlFor='email'><span className='asterisk'>*</span>Email:</label>
                <div>
                    <input required type="text" id='email' value={newUser?.email} onChange={handleInputChange} />
                </div>
                <label htmlFor='confirm-email'><span className='asterisk'>*</span>Confirm Email:</label>
                <div>
                    <input required type="text" id='confirm-email' onChange={(e) => setConfirmEmail(e.target.value)} />
                </div>

            </div>
            <div className='username'>
                <label htmlFor='username'><span className='asterisk'>*</span>Username:</label>
                <div>
                    <input required type="text" id='username' value={newUser?.username} onChange={handleInputChange} />
                </div>
            </div>
            <div className='password'>
                <label htmlFor='password'><span className='asterisk'>*</span>Password:</label>
                <div>
                    <input required type={isPasswordVisible ? 'text' : 'password'} id='password' 
                        value={newUser?.password}
                        onChange={handleInputChange}
                        onBlur={() => setConfirmationTouched(prev  => ({...prev, password: true}))} />
                    <span className='visibility-icon' onClick={() => setIsPasswordVisible(prev => !prev)}>
                        {isPasswordVisible ? <FaRegEye className='icon'/> : <FaRegEyeSlash className='icon' />}
                    </span>
                </div>
                <label htmlFor='confirm-password'><span className='asterisk'>*</span>Confirm Password:</label>
                <div>
                    <input required className={!passwordsMatch ? 'input-error' : ''} type={isConfirmPasswordVisible ? 'text' : 'password'} id='confirm-password' 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onBlur={() => setConfirmationTouched(prev => ({...prev, password: true}))} />
                    <span className='visibility-icon' onClick={() => setIsConfirmPasswordVisible(prev => !prev)}>
                        {isConfirmPasswordVisible ? <FaRegEye className='icon'/> : <FaRegEyeSlash className='icon' />}
                    </span>
                </div>
                {!passwordMismatch && (
                    <p className='error-text'>Passwords do not match. Re-enter your password.</p>
                )}
            </div>

            <span className='msg1'>Optional Details</span>
            <span className='goal-msg'>(These will show on your user profile.)</span>
            <div className='pronouns'>
                <label htmlFor='pronouns'>Pronouns:</label>
                <div>
                    <input type="text" id='pronouns' value={newUser?.pronouns} onChange={handleInputChange} />
                </div>
            </div>
            <div className='bio'>
                <label htmlFor='bio'>Bio:</label>
                <div className='textarea-container'>
                    <textarea id='bio' maxLength={250} value={newUser?.bio} onChange={handleInputChange}></textarea>
                </div>
            </div>
            <p>Personal Website</p>
            <div className='website'>
                <label htmlFor='website-name'>Website name:</label>
                <div>
                    <input type="text" id='website-name' name='name' value={newUser?.website.name} onChange={handleWebsiteChange} />
                </div>
                <label htmlFor='website-url'>Website URL:</label>
                <div>
                    <input type="text" id='website-url' name='url' value={newUser?.website.url} onChange={handleWebsiteChange} />
                </div>
            </div>
            <p>Socials</p>
            {newUser?.socials?.map((social, index) => (
                <div className='socials' key={social.id}>
                    <div className='close-icon'>
                        <FaTimesCircle className='icon' onClick={() => removeSocialInputs(social.id)}/>
                    </div>
                    <label htmlFor='social-handle'>Handle:</label>
                    <div>
                        <input type="text" id='social-handle' value={social.handle}
                            onChange={(e) => handleSocialChange(index, 'handle', e.target.value)} />
                    </div>
                    <label htmlFor='social-url'>Social URL:</label>
                    <div>
                        <input type="text" id='social-url' value={social.url}
                            onChange={(e) => handleSocialChange(index, 'url', e.target.value)}/>
                    </div>
                </div>
            ))}
            <div className='add-social'>
                <FaPlusCircle className='icon' title='Add another social' onClick={addSocialInputs} />
            </div>
            <span className='msg1'>Let's set some goals...</span>
            <span className='goal-msg'>(Your goals are only visible to you and can be updated from your personal dashboard at any time.)</span>
            <div className='goals'>
                <label htmlFor='weekly-wc'>Weekly Word Count:</label>
                <div>
                    <input type="text" id='weekly-wc' placeholder="How many words do you aim to write each week?" onChange={(e) => handleGoalChange(0, e.target.value)} />
                </div>
                <label htmlFor='weekly-session'>Weekly Session Frequency:</label>
                <div>
                    <input type="text" id='weekly-session' placeholder="How many days a week will you write?" onChange={(e) => handleGoalChange(1, e.target.value)} />
                </div>
                <label htmlFor='overall'>Overall Word Count:</label>
                <div>
                    <input type="text" id='overall' placeholder="What is your target word count?" onChange={(e) => handleGoalChange(2, e.target.value)} />
                </div>
            </div>
            <button type="submit" disabled={!isFormValid} title={isFormValid ? 'Sign up' : 'Complete form to sign up'}>Sign up</button>
            <span className='stuck'>
                <span className='no-account' onClick={takeToLoginPage}>Have an account already?</span>
            </span>
        </form>
    )
}

export default Signup;