import { useState, useEffect, ChangeEvent } from 'react';
import './Profile.scss'
import { FaRegUserCircle, FaUsers, FaEdit, FaUpload } from 'react-icons/fa';
import { User } from '../interfaces/interfaces';

interface ProfileProps {
    currentUser: User;
    setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
}


function Profile({currentUser, setCurrentUser}: ProfileProps) {
    const [editing, setEditing] = useState<boolean>(false);
    const [newUserName, setNewUserName] = useState<string>('');
    const [newPronouns, setNewPronouns] = useState<string>('');
    const [newBio, setNewBio] = useState<string>('');

    const [newWebsite, setNewWebsite] = useState<object>({});
    const [newSocial, setNewSocial] = useState<object>({});

    // combine two hooks into one for new web or social objects?
    const [newWebUrl, setNewWebUrl] = useState<string>('');
    const [newWebName, setNewWebName] = useState<string>('');
    const [newHandle, setNewHandle] = useState<string>('');
    const [newSocialUrl, setNewSocialUrl] = useState<string>('');

    /*
    [ ] Store updated information and then replace current information with new info
    [ ] Continued style of profile page - inputs need to have default input styling possiblye update App.scss with global input styling (bg-color, :focus styling, etc) 
    */

    useEffect(() => {
        getUserDetails();
        console.log('currentUser useEffect', currentUser)
    }, [editing, currentUser]);

    const getUserDetails = () => {
        setNewUserName(currentUser.name);
        console.log('getUserDetails newUserName', newUserName)
    }


    const activeEditing = () => {
        setEditing(true);
    };

    const cancelEdit = () => {
        setEditing(false);
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement> = ) => {
        e.preventDefault();
        // console.log('e.target', e.target.id)
        if (e.target.id === 'userName') {
            console.log('IF')
            setNewUserName(e.target.value);
        }

        if (e.target.id === 'pronouns') {
            setNewPronouns(e.target.value);
        }

        if (e.target.id === 'bio') {
            // issue between HTMLInputElement and HTMLTextAreaElement with type matching in parameters can we use a single funciton to update all inputs? Research
        }

        if (e.target.value === 'handle' || e.target.value === 'socialUrl') {
            if (e.target.value === 'handle') {
                setNewHandle(e.target.value);
            } else {
                setNewSocialUrl(e.target.value);
            }
            // console.log('newSocialUrl', newSocialUrl, 'newHandle', newHandle)
        }

        // console.log('newUserName', newUserName)

    }

    const updateUserProfile = (e: any) => { //change the any type to correct event type
        e.preventDefault();

        const updatedUser = {
            ...currentUser,
            name: newUserName,
            pronouns: newPronouns,
            bio: newBio,
        //     website: {
        //         name: newWebName,
        //         url: newWebUrl
        //     },
            // socials: [{
            //     id: ,
            //     handle: string,
            //     url: string
            // }]
        }

        console.log('updatedUser', updatedUser)

        setCurrentUser(updatedUser);
        console.log('currentUser', currentUser)
        
    }

    return (
        <div className="profile-container">
            <div className={`display-details ${editing ? 'hide' : 'show'}`}>
                <FaRegUserCircle className='user-img' />
                <div className='user-identity'>
                    <div className='user-name'>
                        {currentUser.name}
                        <span>
                            <FaEdit className='icon' onClick={activeEditing} />
                        </span>
                    </div>
                    <div className='user-pronouns'>
                        {currentUser.pronouns}
                    </div>
                </div>
                <div className='user-bio'>
                    {currentUser.bio}
                </div>
                <div className='user-join-date'>
                    <span>Joined</span>
                    {currentUser.joined}
                </div>
                <div className='user-website'>
                    <span>Website</span>
                    <a href={currentUser.website.url} target='_blank' rel='noopener noreferrer'>{currentUser.website.name}</a>
                </div>
                <div className='user-socials'>
                    <span>
                        <FaUsers />
                        Socials
                    </span>
                    {currentUser.socials.map((social) => (
                        <div key={social.id}>
                            <a href={social.url} target='_blank' rel='noopener noreferrer'>
                            {social.handle}
                            </a>
                        </div>
                    ))}
                </div>
            </div>


            <div className={`update-details ${!editing ? 'hide' : 'show'}`}>
                <form>
                    <div className='img-container'>
                        <FaRegUserCircle className='user-img' /> 
                        <span>
                            <FaUpload className='upload-icon' />
                        </span>
                    </div>
                    <div className='user-identity'>
                        <span>Name</span>
                        <div className='user-name'>
                            <input id='userName' placeholder={currentUser.name} onChange={handleInputChange} />
                        </div>
                        <span>Pronouns</span>
                        <div className='user-pronouns'>
                            <input id='pronouns' placeholder={currentUser.pronouns} onChange={handleInputChange} />
                        </div>
                    </div>
                    <span>Bio</span>
                    <div className='user-bio'>
                        <textarea id='bio'value={currentUser.bio} onChange={handleInputChange} rows={4} maxLength={250} />
                    </div>
                    <span>Website</span>
                    <div className='user-website'>
                        <span>URL</span>
                        <input id='webUrl' value={currentUser.website.url}/>
                        <span>Website Name</span>
                        <input id='webName' value={currentUser.website.name} />
                    </div>
                    <span>
                        <FaUsers />
                        Socials
                    </span>
                    <div className='user-socials'>
                        {currentUser.socials.map((social) => (
                            <div className='update-socials' key={social.id}>
                                <span>Handle</span>
                                <input id='handle' value={social.handle}/>
                                <span>URL</span>
                                <input id='socialUrl' value={social.url}/>
                            </div>
                        ))}
                    </div>
                    <button onClick={updateUserProfile}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                </form>

            </div>

        </div>
    );
}

export default Profile