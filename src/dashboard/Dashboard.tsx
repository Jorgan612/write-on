import { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import ActiveGoals from '../goals/ActiveGoals';
import Members from '../members/Members';
import { UserProps, MembersProps } from '../interfaces/interfaces';
import './Dashboard.scss';
import '../App.scss';

type DashProps = UserProps & MembersProps;

function Dashboard({currentUser, setCurrentUser, combinedEntries, users}: DashProps) {
    const [activeDash, setActiveDash] = useState<string>('personal');

    return (
        <div className='dashboard-contents'>
            <div className='dash-header'>
                <button className={`personal ${activeDash === 'personal' ? 'top' : 'bottom'}`} onClick={() => setActiveDash('personal')}>
                    Personal {activeDash === 'personal' ? <FaChevronRight className='dashboard-swap-icon'/> : ''}
                    </button>
                <button className={`group ${activeDash === 'group' ? 'top' : 'bottom'}`} onClick={() => setActiveDash('group')}>
                    Group {activeDash === 'group' ? <FaChevronRight className='dashboard-swap-icon'/> : ''}
                    </button>
            </div>

            <div className={`user-dash ${activeDash === 'personal' ? 'show' : 'hide'}`}>
                <div className='goals-list'>
                    <ActiveGoals currentUser={currentUser} setCurrentUser={setCurrentUser} combinedEntries={combinedEntries} />
                    <p>Note: Weekly goals reset on Monday.</p>
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
                <Members users={users} />
            </div>
        </div>
    );
}

export default Dashboard;