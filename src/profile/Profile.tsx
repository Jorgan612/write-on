import { useState, ChangeEvent, FormEvent } from 'react';
import './Profile.scss';
import { FaRegUserCircle, FaUsers, FaEdit, FaUpload, FaExternalLinkAlt } from 'react-icons/fa';
import { User, UserIcon } from '../interfaces/interfaces';
import { userIcons, userIconColor } from '../assets/icons/userIcons/userIcons';

interface ProfileProps {
    currentUser: User;
    setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
}

function Profile({ currentUser, setCurrentUser }: ProfileProps) {
    const [editing, setEditing] = useState<boolean>(false);
    const [formData, setFormData] = useState<User>(currentUser);
    const [updateProfileIcon, setUpdateProfileIcon] = useState<boolean>(false);
    const [colorSelected, setColorSelected] = useState<boolean>(false);
    const [selectedIcon, setSelectedIcon] = useState<string>('');
    const [selectIconColor, setSelectIconColor] =useState<{}>('');

    const ProfileIcon = currentUser.userIcon.icon || FaRegUserCircle;


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

    const handleIconChange = (icon: UserIcon, color: any | null) => {
        if (!selectedIcon) {
            setSelectedIcon(icon.id);
            setColorSelected(true);
        }

        if (color) {
            setSelectIconColor(color);
            
            const newIcon = {
            icon: icon.icon,
            id: icon.id,
            color: color.hexcode
            };

            setFormData(prev => ({
                ...prev, 
                userIcon: newIcon
            }));
        }
    };

    const updateUserProfile = (e: FormEvent) => {
        e.preventDefault();
        setCurrentUser(formData);
        setEditing(false);
        console.log('User Updated:', formData);
    };

    const updateUserProfileIcon = () => {
        setUpdateProfileIcon(!updateProfileIcon);
    }

    // const selectUserIcon = (icon: UserIcon) => {
    //     setSelectedIcon(icon.id);
    //     console.log('icon', icon)
    // }

    // const selectUserIconColor = (color: object) => {
    //     console.log('color', color)
    //     setSelectIconColor(color)
    // }

    const cancelIconSelection = () => {
        setSelectedIcon('');
        setUpdateProfileIcon(false);
        console.log('CANCEL')
    }

    return (
        <div className="profile-container">
            {/* --- Read-Only View --- */}
            <div className={`display-details ${editing ? 'hide' : 'show'}`}>
                <div className='top'>
                    <div className='image-container'>
                        <ProfileIcon className="user-img" />
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

                </div>
                <div className="user-bio">{currentUser.bio}</div>
                <div className="user-join-date">
                    <span>Joined</span> {currentUser.joined}
                </div>
                <div className="user-website">
                    <span>Website</span>
                    <a href={currentUser.website.url} target="_blank" rel="noopener noreferrer">
                        {currentUser.website.name}
                        <span className='external-link'>
                            <FaExternalLinkAlt />
                        </span>
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
                                <span className='external-link'>
                                    <FaExternalLinkAlt />
                                </span>
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- Edit Mode View --- */}
            <div className={`update-details ${!editing ? 'hide' : 'show'}`}>
                <form onSubmit={updateUserProfile}>
                    <div className='top'>
                        <div className="image-container">
                            <FaRegUserCircle className="user-img" />
                            <div className="upload-overlay" onClick={updateUserProfileIcon}>
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

                    {/* Profile Icon Selection Container */}
                    <div className={`select-profile-icon ${updateProfileIcon ? 'show' : 'hide'}`}>
                        {userIcons.map((icon: UserIcon) => {
                            const IconComponent = icon.icon;
                            return (
                                <div key={icon.id} className={`user-icon ${icon.id === selectedIcon ? 'selected' : 'icon'}`} onClick={() => handleIconChange(icon, null)}>
                                    <IconComponent className='icon' id={icon.id} />
                                    <div className={`select-profile-icon-color ${updateProfileIcon && selectedIcon === icon.id ? 'show' : 'hide'}`}>
                                        {userIconColor.map((color) => (
                                            <div className='color' key={color.id} style={{backgroundColor: color.hexcode}} onClick={() => handleIconChange(icon, color)}></div>
                                        ))}

                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </form>

                <div className={`select-profile-icon-buttons ${updateProfileIcon ? 'show' : 'hide'}`}>
                    <button>Save</button>
                    <button type="button" onClick={cancelIconSelection}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default Profile;