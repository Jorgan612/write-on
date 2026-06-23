import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronRight, FaRegUserCircle } from 'react-icons/fa';
import { format } from 'date-fns';
import ActiveGoals from '../goals/ActiveGoals';
import GroupSignUp from '../groupSignUp/GroupSignUp';
import Members from '../members/Members';
import { GroupProps, Excerpts, Excerpt, User, UpcomingMeeting, UserProps, UsersList } from '../interfaces/interfaces';
import { userIcons } from '../assets/icons/userIcons/userIcons';
import './Dashboard.scss';
import '../App.scss';


type DashProps = UserProps & {
    combinedEntries: Record<string, number>;
}

function Dashboard({currentUser, setCurrentUser, combinedEntries}: DashProps) {
    const [activeDash, setActiveDash] = useState<string>('personal');
    const [selectedExcerpt, setSelectedExcerpt] = useState<Excerpt | null>(null);
    const [groupInfo, setGroupInfo] = useState<GroupProps | null>(null);
    const [membersList, setMembersList] = useState<UsersList>([]);
    const [groupExcerpts, setGroupExcerpts] = useState<Excerpts>([]);
    const [editing, setEditing] = useState<boolean>(false);
    const upcomingMeetings: UpcomingMeeting[] = useMemo(() => {
        if (!groupInfo?.meetings) {
            return [];
        }

        const todayKey = format(new Date(), 'yyyy-MM-dd');
        const sortedMeetings = [...groupInfo.meetings].sort();
        const upcomingDates = sortedMeetings.filter((date) => {
            return date >= todayKey;
        }).slice(0, 4);

        return upcomingDates.map((meetingDate) => {
            const filteredExcerpts = groupExcerpts.filter((excerpt) => {
                return excerpt.meetingDate === meetingDate;
            });

            return {
                meetingDate,
                groupId: groupInfo.groupId,
                excerpts: filteredExcerpts,
            };
        });
    }, [groupInfo?.meetings, groupExcerpts]);

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
                } else {
                    alert('Something went wrong.');
                }

        } catch (error) {
            console.error('Could not fetch excerpts:', error);
        }

    };

    const onSignUp = (meetingDate: string) => {
        if (!groupInfo?.groupId) {
            return;
        }

        const existingExcerpt = groupExcerpts.find((excerpt) => {
            return excerpt.userID === currentUser.id && excerpt.meetingDate === meetingDate;
        });
        
        if (existingExcerpt) {
            setSelectedExcerpt(existingExcerpt);
            setEditing(true);
            return;
        }
        
        const newExcerpt: Excerpt = {
            id: Date.now(),
            groupId: groupInfo.groupId,
            meetingDate: meetingDate,
            userID: currentUser.id,
            username: currentUser.username,
            userIcon: currentUser.userIcon,
            links: [],
            description: '',
            createdAt: Date.now().toString()
        }
        
        setGroupExcerpts((prevExcerpts) => [...prevExcerpts, newExcerpt]);
        setSelectedExcerpt(newExcerpt);
        setEditing(true);
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
                    <GroupSignUp selectedExcerpt={selectedExcerpt} setSelectedExcerpt={setSelectedExcerpt} editing={editing} setEditing={setEditing} meetings={upcomingMeetings} onSignUp={onSignUp}/>
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