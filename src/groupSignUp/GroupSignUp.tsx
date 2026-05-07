import './GroupSignUp.scss';
import { user1, user2 } from '../datasets/datasets';

function GroupSignUp() {
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
                            <div className='option'></div>
                            <div className='option'></div>
                            <div className='option'></div>

                        </div>
                        <div className='sign-up-list'>
                            {date.signups.map((user) => {
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