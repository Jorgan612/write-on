import { useState } from 'react';
import './Dashboard.scss';
import '../App.scss';

function Dashboard() {
    const [activeDash, setActiveDash] = useState<string>('personal');

    return (
        <div className='dashboard-contents'>
            <div className='dash-header'>
                <button className={`personal ${activeDash === 'personal' ? 'top' : 'bottom'}`} onClick={() => setActiveDash('personal')}>Personal</button>
                <button className={`group ${activeDash === 'group' ? 'top' : 'bottom'}`} onClick={() => setActiveDash('group')}>Group</button>
            </div>

            <div className={`user-dash ${activeDash === 'personal' ? 'show' : 'hide'}`}>
                <div className='goals-list'>
                    <p>Goals</p>
                </div>
                <div className='bottom-lists'>
                    <div className='milestones-list'>
                        <p>Milestones</p>
                    </div>
                    <div className='achievements-list'>
                        <p>Achievements</p>
                    </div>
                </div>
            </div>


            <div className={`group-dash ${activeDash === 'group' ? 'show' : 'hide'}`}>
                <div className='sign-up'>
                    <p>Sign up to share</p>
                </div>
                <div className='members-list'>
                    <p>Members</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;