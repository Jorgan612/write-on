import { User, MembersProps } from '../interfaces/interfaces';
import { userIcons } from '../assets/icons/userIcons/userIcons';
import { FaRegUserCircle, FaPlusCircle, FaCheckCircle } from 'react-icons/fa';
import './Members.scss';
import { useState } from 'react';

function Members({users}: Pick<MembersProps, 'users'>) {
    const [selectedMember, setSelectedMember] = useState<User | null>(null);

    const showDetails = (user: User) => {
        setSelectedMember(user);
    };

    return (
        <div className="members-list">
            <h3>Members</h3>
            {users.map((user) => {
                const iconData = userIcons.find(icon => icon.id === user.userIcon?.id);
                const PreviewIcon = iconData?.icon || FaRegUserCircle;
                const previewColor = user.userIcon?.color || '#94a3b8';
                return (
                    <div className={`member-card ${user.id === selectedMember?.id ? 'selected' : ''}`} key={user.id} onClick={() => {showDetails(user)}}>
                        <div className='user-icon-name'>
                            <div>
                                <PreviewIcon className='icon' style={{color: previewColor}} />
                            </div>
                            <label>{user.username}</label>
                        </div>
                        <div className={`card-details ${selectedMember?.id === user.id ? 'is-visible'  : ''}`}>
                            <div className='details-inner'>
                                <div className='pronouns'>({user.pronouns})</div>
                                <div className='bio'>{user.bio}</div>
                                <div className='website'>
                                    <label className='website-label'>Website</label>
                                    <a className='website-link' href={user.website.url}>{user.website.name}</a>
                                </div>
                                <label className='socials-label'>Socials</label>
                                {user.socials.map((social) => {
                                    return (
                                        <a className='socials-link' href={social.url}>@{social.handle}</a>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Members;