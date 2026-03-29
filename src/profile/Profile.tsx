import { useState, useEffect, ChangeEvent } from 'react';
import './Profile.scss'
import { FaRegUserCircle, FaUsers, FaEdit, FaUpload } from 'react-icons/fa';
import { User } from '../interfaces/interfaces';

interface ProfileProps {
    currentUser: User
}


function Profile({currentUser}: ProfileProps) {
    const [editing, setEditing] = useState<boolean>(false);
    // const [userName, setUserName] = useState<string>(currentUser);

    /*
    [ ] set update-details container contents up to be inputs to update user information
    [ ] Store updated information and then replace current information with new info
    [ ] Continued style of profile page - inputs need to have default input styling possiblye update App.scss with global input styling (bg-color, :focus styling, etc) 
    */

    useEffect(() => {
        console.log('currentUser', currentUser)
    }, [editing]);


    const activeEditing = () => {
        setEditing(true);
    };

    const cancelEdit = () => {
        setEditing(false);
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement> ) => {
        console.log('e.target', e.target.id)

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
                    {currentUser.socials.map((user) => (
                        <div>
                            <a href={user.url} target='_blank' rel='noopener noreferrer'>
                            {user.handle}
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
                            <input id='userName' value={currentUser.name} onChange={handleInputChange} />
                        </div>
                        <span>Pronouns</span>
                        <div className='user-pronouns'>
                            <input id='pronouns' value={currentUser.pronouns} />
                        </div>
                    </div>
                    <span>Bio</span>
                    <div className='user-bio'>
                        <textarea id='bio'value={currentUser.bio} rows={4} maxLength={250} />
                    </div>
                    <span>Website</span>
                    <div className='user-website'>
                        <span>URL</span>
                        <input id='url' value={currentUser.website.url}/>
                        <span>Website Name</span>
                        <input id='webName' value={currentUser.website.name} />
                    </div>
                    <span>
                        <FaUsers />
                        Socials
                    </span>
                    <div className='user-socials'>
                        {currentUser.socials.map((user) => (
                            <div className='update-socials'>
                                <span>Handle</span>
                                <input value={user.handle}/>
                                <span>URL</span>
                                <input value={user.url}/>
                            </div>
                        ))}
                    </div>
                    <button>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                </form>

            </div>

        </div>
    );
}

export default Profile