import './GroupSignUp.scss';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { userIcons } from '../assets/icons/userIcons/userIcons';
import { User, Excerpts, Excerpt, GroupData, GroupProps } from '../interfaces/interfaces';
import { user1, user2 } from '../datasets/datasets';
import { FaRegUserCircle,
    FaRegHandPaper,
    FaEdit,
    FaPlusCircle,
    FaRegCalendarAlt,
    FaRegCheckCircle,
    FaRegTimesCircle,
} from 'react-icons/fa';

interface GroupSignUpProps {
    currentUser: User;
    selectedExcerpt: Excerpt | null;
    setSelectedExcerpt: React.Dispatch<React.SetStateAction<Excerpt | null>>;
    groupInfo: GroupProps | null;
    excerpts: Excerpts;
}

function GroupSignUp({currentUser, selectedExcerpt, setSelectedExcerpt, groupInfo, excerpts}: GroupSignUpProps) {
    const [editing, setEditing] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [upcomingMeetings, setUpcomingMeetings] = useState<string[]>([]);
    const [activeExcerpt, setActiveExcerpt] = useState<{
        links: {
            id: string;
            linkName: string;
            linkURL: string
        }[];
        description: string;
    } | null>(null);

    useEffect(() => {
        getUpcomingMeetings();
    }, []);

    const getUpcomingMeetings = () => {
        const todayKey = format(new Date(), 'yyyy-MM-dd');
        const sortedMeetings = groupInfo?.meetings.sort();
        
        const upcoming = sortedMeetings?.reduce((acc: string[], meeting) => {
            const isFuture = meeting >= todayKey;
            if (isFuture && acc.length < 4) {
                acc.push(meeting);
            }

            return acc;
        }, []);

        setUpcomingMeetings(upcoming || []);
    }

    const EditCardDetails = (excerpt: Excerpt, date: string) => {
        setEditing(true);
        setSelectedExcerpt(excerpt);
        setSelectedDate(date);

        setActiveExcerpt({
            links: [...excerpt.links],
            description: excerpt.description
        });
    };

    const saveCardDetails = (excerpt: Excerpt) => {
        // save user card details for this date
        setEditing(false);
        setSelectedExcerpt(null);
        setSelectedDate('');
    };

    const cancelEdit = (excerpt: Excerpt) => {
        //DO NOT save changes. Revert to previous user card details.
        setEditing(false);
        setSelectedExcerpt(null);
        setSelectedDate('');
        setActiveExcerpt(null);
    };

    const addLink = () => {
        if (!activeExcerpt) {
            return;
        }

        if (activeExcerpt.links.length >= 5) {
            alert('Unable to add more links.');
            return;
        }

        const newLink = {
            id: Date.now().toString(),
            linkName: '',
            linkURL: ''
        };

        setActiveExcerpt((prev) => {
            if (!prev) {
                return null;
            }

            return {
                ...prev,
                links: [...prev.links, newLink]
            };
        });
    };

    const removeLink = (id: string) => {
        setActiveExcerpt((prev) => {
            if (!prev) {
                return null;
            }

            const filteredLinks = prev.links.filter(link => link.id !== id);

            return {
                ...prev,
                links: filteredLinks
            };
        });
    };

    return (
        <div className='sign-up'>
            {upcomingMeetings.map((date: any) => {
                return (
                    <div className='column' key={date}>
                        <h3>{`${date.split('-')[1]?.charAt(0) === '0' ? format(date.split('-')[1]?.charAt(1)!, 'LLLL') : date.split('-')[1]} ${date.split('-')[2]?.charAt(0) === '0' ? date.split('-')[2]?.charAt(1) : date.split('-')[2]}`}</h3>
                        <div className='options-header'>
                            <div className='option' title='Sign Up'>
                                <FaRegHandPaper className='icon' />
                            </div>
                            <div className='option' title='Add Event'>
                                <FaPlusCircle className='icon' />
                            </div>
                            <div className='option' title='Edit Date'>
                                <FaRegCalendarAlt className='icon' />
                            </div>
                        </div>
                        <div className='sign-up-list'>
                            {excerpts.map((excerpt) => {
                                const iconData = userIcons.find(icon => icon.id === excerpt.userIcon.id);
                                const PreviewIcon = iconData?.icon || FaRegUserCircle;
                                const previewColor = excerpt.userIcon?.color || '#94a3b8';
                                return (
                                    <div className={`user-card ${editing && selectedExcerpt?.id === excerpt.id && excerpts.includes(excerpt) && selectedDate === date.date ? 'selected' : ''}`} key={excerpt.id}>
                                        <div className='user-icon-name'>
                                            <div>
                                                <PreviewIcon className='icon' style={{color: previewColor}} />
                                            </div>
                                            <label>{excerpt.username}</label>
                                        </div>
                                        {/*Read only view*/}
                                        <div className={`card-details ${!editing || selectedExcerpt?.id !== excerpt.id || (selectedDate !== date.date && selectedExcerpt?.id === excerpt.id) ? 'show' : 'hide'}`}>
                                            <h4>Excerpt Details</h4>
                                            <button className='edit-button' disabled={editing}>
                                                <FaEdit className={` icon ${editing ? 'disable' : ''}`} title={`${editing ? 'Save or cancel current edit before editing a different card' : 'Edit Card'}`} onClick={() => {EditCardDetails(excerpt, date.date)}} />

                                            </button>
                                            <div className='links-container'>
                                                {excerpt.links.map((link) => {
                                                    return (
                                                        <div className='link' key={link.id}>
                                                            <a href={link.linkURL} target='_blank' rel='noopener noreferrer'>{link.linkName}</a>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            <div className='descrition-container'>
                                                <div className='description'>{excerpt.description}</div>
                                            </div>
                                        </div>
                                        {/*Edit view*/}
                                        <div className={`edit-card-details ${editing && selectedExcerpt?.id === excerpt.id && excerpts.includes(excerpt) && selectedDate === date.date ? 'show' : 'hide'}`}>
                                            <div className='links-container'>
                                                {activeExcerpt?.links.map((link, index) => (
                                                    <div className='link' key={link.id}>
                                                        <h4 className={`${editing && selectedExcerpt?.id === excerpt.id && excerpts.includes(excerpt) && selectedDate === date.date ? 'show' : 'hide'}`}>
                                                            Link {index + 1}/5
                                                            <span>
                                                                <FaRegTimesCircle className='remove-icon icon' title='Remove' onClick={() => {removeLink(link.id)}} />
                                                            </span>
                                                        </h4>
                                                        <label>Document Name:</label>
                                                        <input
                                                        value={link.linkName}
                                                        onChange={(e) => {
                                                            const updatedLinks = [...activeExcerpt.links];
                                                            updatedLinks[index]!.linkName = e.target.value;
                                                            setActiveExcerpt({...activeExcerpt, links: updatedLinks});
                                                        }} />
                                                        <label>Link:</label>
                                                        <input
                                                        value={link.linkURL}
                                                        onChange={(e) => {
                                                            const updatedLinks = [...activeExcerpt.links];
                                                            updatedLinks[index]!.linkURL = e.target.value;
                                                            setActiveExcerpt({...activeExcerpt, links: updatedLinks});
                                                        }} />
                                                    </div>
                                                ))}
                                                <FaPlusCircle className='add-link' title='Add Link' onClick={addLink} />
                                            </div>
                                            <label>Description:</label>
                                            <textarea
                                                value={activeExcerpt?.description || ''}
                                                onChange={(e) => setActiveExcerpt(prev => prev ? {...prev, description: e.target.value} : null)}
                                            />
                                            <div className='button-container'>
                                                <FaRegCheckCircle className='save-icon icon' title='Save' onClick={() => saveCardDetails(excerpt)}/>
                                                <FaRegTimesCircle className='cancel-icon icon' title='Cancel' onClick={() => {cancelEdit(excerpt)}} />
                                            </div>
                                        </div>
                                    </div>
                                )})}
                        </div>
                    </div>
                )})}
        </div>
    )
}

export default GroupSignUp;