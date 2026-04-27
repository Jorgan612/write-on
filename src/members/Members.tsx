import { MembersProps } from '../interfaces/interfaces';
import { userIcons, userIconColor } from '../assets/icons/userIcons/userIcons';
import { FaRegUserCircle } from 'react-icons/fa';
import './Members.scss';

function Members({users}: MembersProps) {

    return (
        <div className="members-list">
            <h3>Members</h3>
            {users.map((user) => {
                const iconData = userIcons.find(icon => icon.id === user.userIcon.id);
                const PreviewIcon = iconData?.icon || FaRegUserCircle;
                const previewColor = user.userIcon?.color || '#94a3b8';
                return (
                    <div className='member-card'>
                        <div className='user-icon-name'>
                            <PreviewIcon className='icon' style={{color: previewColor}} />
                            <label>{user.username}</label>
                        </div>

                    </div>
                )
            })}
        </div>
    )
}

export default Members;