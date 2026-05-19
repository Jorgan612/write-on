import { MembersProps, User } from '../interfaces/interfaces';
import { userIcons } from '../assets/icons/userIcons/userIcons';
import { FaRegUserCircle, FaPlusCircle, FaCheckCircle } from 'react-icons/fa';
import './Members.scss';

function Members({users, selectedMember, setSelectedMember}: MembersProps) {

    const showDetails = (user: User) => {
        console.log('showDetails!', user)
        setSelectedMember(user);
    };

    const saveUserDetailsUpdate = (user: User) => {
        setSelectedMember(null);
        console.log("Save logic/details collapse here!")
    }
    

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
                                <div className='links-container'>
                                    <div className='link'>
                                        <label>Document Name:</label>
                                        <input />
                                        <label>Link:</label>
                                        <input />
                                    </div>
                                    <FaPlusCircle className='add-link' />
                                </div>
                                <label>Description:</label>
                                <textarea placeholder='TEST'></textarea>
                                <FaCheckCircle className='save-check' onClick={() => {saveUserDetailsUpdate(user)}} />
                            </div>

                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Members;