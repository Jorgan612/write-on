import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronRight, FaRegUserCircle } from 'react-icons/fa';
import ActiveGoals from '../goals/ActiveGoals';
import GroupSignUp from '../groupSignUp/GroupSignUp';
import Members from '../members/Members';
import { GroupData, Excerpts, User, UserProps, UsersList } from '../interfaces/interfaces';
import { userIcons } from '../assets/icons/userIcons/userIcons';
import './Dashboard.scss';
import '../App.scss';


type DashProps = UserProps & {
    combinedEntries: Record<string, number>;
}

function Dashboard({currentUser, setCurrentUser, combinedEntries}: DashProps) {
    const [activeDash, setActiveDash] = useState<string>('personal');
    const [selectedMember, setSelectedMember] = useState<User | null>(null);
    const [groupInfo, setGroupInfo] = useState<GroupData | null>(null);
    const [membersList, setMembersList] = useState<UsersList>([]);
    const [groupExcerpts, setGroupExcerpts] = useState<Excerpts>([]);

    const navigate =  useNavigate();

    useEffect(() => {
        getGroupInfo();
    }, []);

    useEffect(() => {
        if (groupInfo?.groupId) {
            fetchGroupMembers();
            fetchGroupExcerpts();
        }
    }, [groupInfo?.groupId]);

    const getGroupInfo = async () => {
        if (currentUser?.groups.length) {
            try {
                const response = await fetch(`http://localhost:5000/groups/group/${currentUser.groups[0]}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json'},
                })

                const data = await response.json();

                if (response.ok) {
                    setGroupInfo(data);
                } else {
                    alert(data.message || 'Something went wrong.');
                }

            } catch (error) {
                console.error('Error retrieving group data.', error);
            }
        }
    };

    const fetchGroupMembers = async () => {

        if (!groupInfo?.groupId) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/users/${groupInfo?.groupId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) throw new Error('Network response is not ok.');

            const data: User[] = await response.json();

            setMembersList(data);

        } catch (error) {
            console.error('Could not fetch users:', error);
        }
    };

    const fetchGroupExcerpts = async () => {
        if (!groupInfo?.groupId) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/groups/group/${groupInfo?.groupId}/excerpts`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) throw new Error('Network response is not ok.');

            const data: Excerpts = await response.json();

                if (response.ok) {
                    setGroupExcerpts(data);
                    console.log('response.ok', groupExcerpts)
                } else {
                    alert('Something went wrong.');
                }

            console.log('groupExcerpts', groupExcerpts)

        } catch (error) {
            console.error('Could not fetch excerpts:', error);
        }

    };

    const navigateToCreateGroup = () => {
        navigate('/create-group');
    };

    return (
        <div className='dashboard-contents'>
            <div className='header-container'>
                <div className='dash-header'>
                    <button className={`personal ${activeDash === 'personal' ? 'top' : 'bottom'}`} onClick={() => setActiveDash('personal')}>
                        Personal {activeDash === 'personal' ? <FaChevronRight className='dashboard-swap-icon'/> : ''}
                    </button>
                    <button className={`group ${activeDash === 'group' ? 'top' : 'bottom'}`} onClick={() => setActiveDash('group')}>
                        Group {activeDash === 'group' ? <FaChevronRight className='dashboard-swap-icon'/> : ''}
                    </button>
                </div>
                <button className={activeDash === 'group' && currentUser.groups?.length ? 'show' : 'hide'} onClick={navigateToCreateGroup}>
                    Create Group
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


            {activeDash === 'group' && currentUser.groups?.length ? 
                <div className={`group-dash ${activeDash === 'group' ? 'show' : 'hide'}`}>
                    <GroupSignUp currentUser={currentUser} selectedMember={selectedMember} setSelectedMember={setSelectedMember} groupInfo={groupInfo} excerpts={groupExcerpts}/>
                    <Members members={membersList || null} />
                </div> : 
                <div className={`group-dash no-group ${activeDash === 'group' ? 'show' : 'hide'}`}>
                    <h3>Don't have a group?</h3>
                    <button className={activeDash === 'group' ? 'show' : 'hide'} title='Create Group' onClick={navigateToCreateGroup}>
                        Create Group
                    </button>
                </div>
            }
        </div>
    );
}

export default Dashboard;