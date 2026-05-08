import './GroupSignUp.scss';
import { userIcons } from '../assets/icons/userIcons/userIcons';
import { FaRegUserCircle, FaRegHandPaper, FaEdit, FaPlusCircle } from 'react-icons/fa';
import { User } from '../interfaces/interfaces';
import { user1, user2 } from '../datasets/datasets';

type SignUpProps = {users: User[]};

function GroupSignUp({users}: SignUpProps) {
    const dates = [
        {
            id: '1',
            date: '2026-05-07',
            signups: [user1, user2]
        },
        {
            id: '2',
            date: '2026-05-08',
            signups: []
        },
        {
            id: '3',
            date: '2026-05-09',
            signups: [user2]
        },
        {
            id: '4',
            date: '2026-05-010',
            signups: []
        }
    ];

    // need to add userIcon - basically look like members list cards without dropdown?


    return (
        <div className='sign-up'>
            {dates.map((date) => {
                return (
                    <div className='column'>
                        <h3>{date.date}</h3>
                        <div className='options-header'>
                            <div className='option' title='Sign Up'>
                                <FaRegHandPaper className='icon' />
                            </div>
                            <div className='option' title='Add Event'>
                                <FaPlusCircle className='icon' />
                            </div>
                            <div className='option' title='Edit Date'>
                                <FaEdit className='icon' />
                            </div>

                        </div>
                        <div className='sign-up-list'>
                            {date.signups.map((user) => {
                                const iconData = userIcons.find(icon => icon.id === user.userIcon.id);
                                const PreviewIcon = iconData?.icon || FaRegUserCircle;
                                const previewColor = user.userIcon?.color || '#94a3b8';
                                return (
                                    <div className='user-card'>
                                        <p>{user.username}</p>
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                )
            })}
        </div>
    )
}

export default GroupSignUp;