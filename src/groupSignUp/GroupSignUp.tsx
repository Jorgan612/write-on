import './GroupSignUp.scss';
import { useState } from 'react';
import { format } from 'date-fns';
import { userIcons } from '../assets/icons/userIcons/userIcons';
import { UpcomingMeeting, Excerpt } from '../interfaces/interfaces';
import { FaRegUserCircle,
    FaRegHandPaper,
    FaEdit,
    FaPlusCircle,
    FaRegCalendarAlt,
    FaRegCheckCircle,
    FaRegTimesCircle,
} from 'react-icons/fa';

interface GroupSignUpProps {
    selectedExcerpt: Excerpt | null;
    setSelectedExcerpt: React.Dispatch<React.SetStateAction<Excerpt | null>>;
    editing: boolean;
    setEditing: React.Dispatch<React.SetStateAction<boolean>>;
    meetings: UpcomingMeeting[];
    onSignUp: (meetingDate:string) => void;
}

function GroupSignUp({selectedExcerpt, setSelectedExcerpt, editing, setEditing, meetings, onSignUp}: GroupSignUpProps) {
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [activeExcerpt, setActiveExcerpt] = useState<{
        links: {
            id: string;
            linkName: string;
            linkURL: string
        }[];
        description: string;
    } | null>(null);

    
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
            {meetings.map((meeting: any) => {
                return (
                    <div className='column' key={meeting.meetingDate}>
                        <h3>{`${meeting.meetingDate.split('-')[1]?.charAt(0) === '0' ? format(meeting.meetingDate.split('-')[1]?.charAt(1)!, 'LLLL') : meeting.meetingDate.split('-')[1]} ${meeting.meetingDate.split('-')[2]?.charAt(0) === '0' ? meeting.meetingDate.split('-')[2]?.charAt(1) : meeting.meetingDate.split('-')[2]}`}</h3>
                        <div className='options-header'>
                            <div className='option' title='Sign Up'>
                                <FaRegHandPaper className='icon' onClick={() => {onSignUp(meeting.meetingDate)}} />
                            </div>
                            <div className='option' title='Add Event'>
                                <FaPlusCircle className='icon' />
                            </div>
                            <div className='option' title='Edit Date'>
                                <FaRegCalendarAlt className='icon' />
                            </div>
                        </div>
                        <div className='sign-up-list'>
                            {meeting.excerpts.map((excerpt: any) => {
                                const iconData = userIcons.find(icon => icon.id === excerpt.userIcon.id);
                                const PreviewIcon = iconData?.icon || FaRegUserCircle;
                                const previewColor = excerpt.userIcon?.color || '#94a3b8';
                                return (
                                    <div className={`user-card ${editing && selectedExcerpt?.id === excerpt.id ? 'selected' : ''}`} key={excerpt.id}>
                                        <div className='user-icon-name'>
                                            <div>
                                                <PreviewIcon className='icon' style={{color: previewColor}} />
                                            </div>
                                            <label>{excerpt.username}</label>
                                        </div>
                                        {/*Read only view*/}
                                        <div className={`card-details ${!editing || selectedExcerpt?.id !== excerpt.id || (selectedDate !== meeting.meetingDate && selectedExcerpt?.id === excerpt.id) ? 'show' : 'hide'}`}>
                                            <h4>Excerpt Details</h4>
                                            <button className='edit-button' disabled={editing}>
                                                <FaEdit className={` icon ${editing ? 'disable' : ''}`} title={`${editing ? 'Save or cancel current edit before editing a different card' : 'Edit Card'}`} onClick={() => {EditCardDetails(excerpt, meeting.meetingDate)}} />

                                            </button>
                                            <div className='links-container'>
                                                {excerpt.links.map((link: any) => {
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
                                        <div className={`edit-card-details ${editing && selectedExcerpt?.id === excerpt.id && meeting.excerpts.includes(excerpt) && selectedDate === meeting.meetingDate ? 'show' : 'hide'}`}>
                                            <div className='links-container'>
                                                {activeExcerpt?.links.map((link, index) => (
                                                    <div className='link' key={link.id}>
                                                        <h4 className={`${editing && selectedExcerpt?.id === excerpt.id && meeting.excerpts.includes(excerpt) && selectedDate === meeting.meetingDate ? 'show' : 'hide'}`}>
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