import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import './Profile.scss';
import { FaRegUserCircle, FaUsers, FaEdit, FaUpload, FaExternalLinkAlt } from 'react-icons/fa';
import { User, UserIcon, UserSelection } from '../interfaces/interfaces';
import { userIcons, userIconColor } from '../assets/icons/userIcons/userIcons';

interface ProfileProps {
    currentUser: User;
    setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
}

function Profile({ currentUser, setCurrentUser }: ProfileProps) {
    const [editing, setEditing] = useState<boolean>(false);
    const [formData, setFormData] = useState<User>(currentUser);
    const [oldUserData, setOldUserData] = useState<User>(currentUser);
    const [updateProfileIcon, setUpdateProfileIcon] = useState<boolean>(false);
    const [selectedIcon, setSelectedIcon] = useState<string>('');
    const [updatedUserIcon, setUpdatedUserIcon] = useState<UserSelection | null>(null);
    const currentIconId = editing? formData.userIcon?.id : currentUser.userIcon?.id;
    const iconData = userIcons.find(icon => icon.id === currentIconId);
    const PreviewIcon = iconData?.icon || FaRegUserCircle;
    const previewColor = formData.userIcon?.color || '#94a3b8';

    const activateEditing = () => {
        setFormData(currentUser);
        setUpdatedUserIcon(currentUser.userIcon);
        setEditing(true);
    };

    const cancelEdit = () => {
        setFormData((prev) => ({
            ...prev,
            userIcon: oldUserData.userIcon
        }))

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

    const handleIconChange = (icon: UserIcon, color: any | null, btnID: string) => {
        
        if (btnID === 'icon') {
            setSelectedIcon(icon.id);
            return;
        }

        if (btnID === 'color') {
            setUpdatedUserIcon({
                id: icon.id,
                color: color.hexcode
            }) 
        }
        
        setSelectedIcon('');
    };

    const saveIconSelection = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!updatedUserIcon) {
            return;
        }

        setFormData(prev => ({
            ...prev, 
            userIcon: updatedUserIcon
        }));

        setUpdateProfileIcon(false);
    };

    const updateUserProfile = (e: FormEvent) => {
        e.preventDefault();
        setCurrentUser(formData);
        setOldUserData(formData);
        setEditing(false);
    };

    const updateUserProfileIcon = () => {
        setUpdateProfileIcon(!updateProfileIcon);
    };

    const cancelIconSelection = () => {
        setUpdatedUserIcon(null);
        setUpdateProfileIcon(false);
        setSelectedIcon('');
    };

    return (
        <div className="profile-container">
            {/* --- Read-Only View --- */}
            <div className={`display-details ${editing ? 'hide' : 'show'}`}>
                <div className='top'>
                    <div className='image-container'>
                        <PreviewIcon className="user-img" style={{color: previewColor}} />
                    </div>
                    <div className="user-identity">
                        <div className="user-name">
                            {currentUser.name}
                            <span>
                                <FaEdit className="icon" onClick={activateEditing} />
                            </span>
                    </div>
                    <div className="user-pronouns">({currentUser.pronouns})</div>
                </div>

                </div>
                <div className="user-bio">{currentUser.bio}</div>
                <div className="user-join-date">
                    <span>Joined</span> {currentUser.joined}
                </div>
                <div className="user-website">
                    <span>Website</span>
                    <a href={currentUser.website?.url} target="_blank" rel="noopener noreferrer">
                        {currentUser.website?.name}
                        <span className='external-link'>
                            <FaExternalLinkAlt />
                        </span>
                    </a>
                </div>
                <div className="user-socials">
                    <span>
                        <FaUsers /> Socials
                    </span>
                    {currentUser.socials?.map((social) => (
                        <div key={social.id}>
                            <a href={social?.url} target="_blank" rel="noopener noreferrer">
                                @{social?.handle}
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
                    <div className={`${updateProfileIcon ? 'hide' : 'show'}`}>
                        <div className='top'>
                            <div className="image-container">
                                <PreviewIcon className="user-img" style={{color: previewColor}} />
                                <div className="upload-overlay" onClick={updateUserProfileIcon}>
                                    <FaEdit className="upload-icon" />
                                </div>
                            </div>

                            <div className="user-identity">
                                <span>Username</span>
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
                                value={formData.website?.url} 
                                onChange={handleWebsiteChange} 
                            />
                            <span>Site Name:</span>
                            <input 
                                name="name" 
                                value={formData.website?.name} 
                                onChange={handleWebsiteChange} 
                            />
                        </div>

                        <span>
                            <FaUsers /> Socials
                        </span>
                        <div className="user-socials">
                            {formData.socials?.map((social, index) => (
                                <div className="update-socials" key={social.id}>
                                    <div>
                                        <span>Handle:</span>
                                        <input 
                                            value={social.handle} 
                                            onChange={(e) => handleSocialChange(index, 'handle', e.target.value)} 
                                            />
                                    </div>
                                    <div>
                                        <span>URL:</span>
                                        <input 
                                            value={social.url} 
                                            onChange={(e) => handleSocialChange(index, 'url', e.target.value)} 
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="form-actions">
                            <button type="submit">Save</button>
                            <button type="button" onClick={cancelEdit}>Cancel</button>
                        </div>
                    </div>

                    {/* Profile Icon Selection Container */}
                    <div className={`select-profile-icon ${updateProfileIcon ? 'show' : 'hide'}`}>
                        <div className='icon-grid-scroll'>
                            {userIcons.map((icon: UserIcon) => {
                                const IconComponent = icon.icon;
                                return (
                                    <div key={icon.id} className='icon-selection-wrapper'>
                                        <div id='icon' className='user-icon' onClick={() => handleIconChange(icon, null, 'icon')}>
                                            <IconComponent className='icon' id={icon.id} style={{color: updatedUserIcon?.id === icon.id ? updatedUserIcon!.color : 'inherit'}}  />
                                        </div>
                                        <div className={`select-profile-icon-color ${selectedIcon === icon.id ? 'show' : 'hide'}`}>
                                            {userIconColor.map((color) => (
                                                <div id='color' className='color' key={color.id} style={{backgroundColor: color.hexcode}} onClick={() => handleIconChange(icon, color, 'color')}></div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            })}
                            <div className={`select-profile-icon-buttons ${updateProfileIcon ? 'show' : 'hide'}`}>
                                <button type='button' className={`${ !updatedUserIcon?.color ? 'disabled' : ''}`} onClick={saveIconSelection} title={`${ !updatedUserIcon?.color ? 'Select an icon and color to Save': 'Save'}`} disabled={ updatedUserIcon ===  null ? true : false}>Save</button>
                                <button type="button" onClick={cancelIconSelection} title='Cancel'>Cancel</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Profile;