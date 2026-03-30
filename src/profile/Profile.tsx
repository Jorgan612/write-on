import { useState, ChangeEvent, FormEvent } from 'react';
import './Profile.scss';
import { FaRegUserCircle, FaUsers, FaEdit, FaUpload } from 'react-icons/fa';
import { User } from '../interfaces/interfaces';

interface ProfileProps {
    currentUser: User;
    setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
}

function Profile({ currentUser, setCurrentUser }: ProfileProps) {
    const [editing, setEditing] = useState<boolean>(false);
    const [formData, setFormData] = useState<User>(currentUser);


    const activeEditing = () => {
        setFormData(currentUser);
        setEditing(true);
    };

    const cancelEdit = () => {
        setEditing(false);
    };


    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleWebsiteChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            website: {
                ...prev.website,
                [name]: value,
            },
        }));
    };

    const handleSocialChange = (index: number, field: 'handle' | 'url', value: string) => {
    setFormData((prev) => ({
        ...prev,
        socials: prev.socials.map((social, i) => 
            i === index ? { ...social, [field]: value } : social
        )}));
    };

    const updateUserProfile = (e: FormEvent) => {
        e.preventDefault();
        setCurrentUser(formData);
        setEditing(false);
        console.log('User Updated:', formData);
    };

    return (
        <div className="profile-container">
            {/* --- Read-Only View --- */}
            <div className={`display-details ${editing ? 'hide' : 'show'}`}>
                <div className='image-container'>
                    <FaRegUserCircle className="user-img" />
                </div>
                <div className="user-identity">
                    <div className="user-name">
                        {currentUser.name}
                        <span>
                            <FaEdit className="icon" onClick={activeEditing} />
                        </span>
                    </div>
                    <div className="user-pronouns">{currentUser.pronouns}</div>
                </div>
                <div className="user-bio">{currentUser.bio}</div>
                <div className="user-join-date">
                    <span>Joined</span> {currentUser.joined}
                </div>
                <div className="user-website">
                    <span>Website</span>
                    <a href={currentUser.website.url} target="_blank" rel="noopener noreferrer">
                        {currentUser.website.name}
                    </a>
                </div>
                <div className="user-socials">
                    <span>
                        <FaUsers /> Socials
                    </span>
                    {currentUser.socials.map((social) => (
                        <div key={social.id}>
                            <a href={social.url} target="_blank" rel="noopener noreferrer">
                                {social.handle}
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- Edit Mode View --- */}
            <div className={`update-details ${!editing ? 'hide' : 'show'}`}>
                <form onSubmit={updateUserProfile}>
                    <div className="image-container">
                        <FaRegUserCircle className="user-img" />
                        <div className="upload-overlay">
                            <FaUpload className="upload-icon" />
                        </div>
                    </div>

                    <div className="user-identity">
                        <span>Name</span>
                        <div className="user-name">
                            <input 
                                id="name" 
                                value={formData.name} 
                                onChange={handleInputChange} 
                            />
                        </div>
                        <span>Pronouns</span>
                        <div className="user-pronouns">
                            <input 
                                id="pronouns" 
                                value={formData.pronouns} 
                                onChange={handleInputChange} 
                            />
                        </div>
                    </div>

                    <span>Bio</span>
                    <div className="user-bio">
                        <textarea 
                            id="bio" 
                            value={formData.bio} 
                            onChange={handleInputChange} 
                            rows={4} 
                            maxLength={250} 
                        />
                    </div>

                    <span>Website</span>
                    <div className="user-website">
                        <span>URL:</span>
                        <input 
                            name="url" 
                            value={formData.website.url} 
                            onChange={handleWebsiteChange} 
                        />
                        <span>Name:</span>
                        <input 
                            name="name" 
                            value={formData.website.name} 
                            onChange={handleWebsiteChange} 
                        />
                    </div>

                    <span>
                        <FaUsers /> Socials
                    </span>
                    <div className="user-socials">
                        {formData.socials.map((social, index) => (
                            <div className="update-socials" key={social.id}>
                                <span>Handle:</span>
                                <input 
                                    value={social.handle} 
                                    onChange={(e) => handleSocialChange(index, 'handle', e.target.value)} 
                                />
                                <span>URL:</span>
                                <input 
                                    value={social.url} 
                                    onChange={(e) => handleSocialChange(index, 'url', e.target.value)} 
                                />
                            </div>
                        ))}
                    </div>

                    <div className="form-actions">
                        <button type="submit">Save</button>
                        <button type="button" onClick={cancelEdit}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Profile;