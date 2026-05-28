import { useState } from 'react';
import { FaChevronRight, FaRegUserCircle } from 'react-icons/fa';
import ActiveGoals from '../goals/ActiveGoals';
import GroupSignUp from '../groupSignUp/GroupSignUp';
import Members from '../members/Members';
import { User, UserProps } from '../interfaces/interfaces';
import { userIcons } from '../assets/icons/userIcons/userIcons';
import './Dashboard.scss';
import '../App.scss';

type DashProps = UserProps & {users: User[]};

function Dashboard({currentUser, setCurrentUser, combinedEntries, users}: DashProps) {
    const [activeDash, setActiveDash] = useState<string>('personal');
    const [selectedMember, setSelectedMember] = useState<User | null>(null);

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
                        {currentUser.milestones?.length ? 
                            currentUser.milestones.map((milestone) => {
                                const iconData = userIcons.find(icon => icon.id === milestone.userIcon.id);
                                const PreviewIcon = iconData?.icon || FaRegUserCircle;
                                const previewColor = milestone.userIcon?.color || '#94a3b8';
                                return (
                                    <div className='list-item' key={milestone.id}>
                                        <div>
                                            <PreviewIcon className='icon' style={{color: previewColor}}/>
                                        </div>
                                        <div className='details'>
                                            <div className='name'>{milestone.name}</div>
                                            <div className='description'>{milestone.description}</div>
                                        </div>
                                    </div>
                                )
                            }) :
                            <div> You haven't reached any milestones yet.</div>
                        }
                    </div>
                    <div className='achievements-list'>
                        <p>Achievements</p>
                        {currentUser.achievements?.length ? 
                            currentUser.achievements.map((achievement) => {
                                const iconData = userIcons.find(icon => icon.id === achievement.userIcon.id);
                                const PreviewIcon = iconData?.icon || FaRegUserCircle;
                                const previewColor = achievement.userIcon?.color || '#94a3b8';
                                return (
                                    <div className='list-item' key={achievement.id}>
                                        <div>
                                            <PreviewIcon className='icon' style={{color: previewColor}}/>
                                        </div>
                                        <div className='details'>
                                            <div className='name'>{achievement.name}</div>
                                            <div className='description'>{achievement.description}</div>
                                        </div>
                                    </div>
                                )
                            }) : 
                            <div> You haven't unlocked any achievements yet.</div>
                        }
                    </div>
                </div>
            </div>


            <div className={`group-dash ${activeDash === 'group' ? 'show' : 'hide'}`}>
                <GroupSignUp users={users} selectedMember={selectedMember} setSelectedMember={setSelectedMember}/>
                <Members users={users} selectedMember={selectedMember} setSelectedMember={setSelectedMember} />
            </div>
        </div>
    );
}

export default Dashboard;