import './GroupSignUp.scss';
import { format } from 'date-fns';
import { userIcons } from '../assets/icons/userIcons/userIcons';
import { UpcomingMeeting, Excerpt, User } from '../interfaces/interfaces';
import { FaRegUserCircle,
    FaRegHandPaper,
    FaEdit,
    FaPlusCircle,
    FaRegCalendarAlt,
    FaRegCheckCircle,
    FaRegTimesCircle,
    FaRegTrashAlt
} from 'react-icons/fa';

interface GroupSignUpProps {
    currentUser: User;
    editing: boolean;
    setEditing: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
    selectedDate: string;
    meetings: UpcomingMeeting[];
    onSignUp: (meetingDate:string) => void;
    activeExcerpt: Excerpt | null;
    setActiveExcerpt: React.Dispatch<React.SetStateAction<Excerpt | null>>;
    onSave: (updateExcerpt: Excerpt) => Promise<void>;
    deleteExcerpt: (updateExcerpt: Excerpt) => Promise<void>;
}

function GroupSignUp({currentUser, editing, setEditing, setSelectedDate, selectedDate, meetings, onSignUp, activeExcerpt, setActiveExcerpt, onSave, deleteExcerpt}: GroupSignUpProps) {
    
    const EditCardDetails = (excerpt: Excerpt, date: string) => {
        setEditing(true);
        setSelectedDate(date);
        
        setActiveExcerpt({ ...excerpt });
    };

    const saveCardDetails = async () => {
        if (!activeExcerpt) return;

        await onSave(activeExcerpt);

        setEditing(false);
        setSelectedDate('');
        setActiveExcerpt(null);
    };
    
    const cancelEdit = (excerpt: Excerpt) => {
        setEditing(false);
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
                                    <div className={`user-card ${editing && activeExcerpt?.id === excerpt.id ? 'selected' : ''}`} key={excerpt.id}>
                                        <div className='user-icon-name'>
                                            <div>
                                                <PreviewIcon className='icon' style={{color: previewColor}} />
                                            </div>
                                            <p>{excerpt.username}</p>
                                            <button className={`edit-button ${currentUser.id !== excerpt.userID ? 'hide' : 'show'}`} disabled={editing}>
                                                <FaEdit className={`icon ${editing ? 'disable' : ''}`} title={`${editing ? 'Save or cancel current edit before editing a different card' : 'Edit Card'}`} onClick={() => {EditCardDetails(excerpt, meeting.meetingDate)}} />
                                            </button>
                                        </div>
                                        {/*Read only view*/}
                                        <div className={`card-details ${!editing || activeExcerpt?.id !== excerpt.id || (selectedDate !== meeting.meetingDate && activeExcerpt?.id === excerpt.id) ? 'show' : 'hide'} ${(!excerpt.links[0].linkName || !excerpt.description ? 'empty': '')}`}>
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
                                        <div className={`edit-card-details ${editing && activeExcerpt?.id === excerpt.id && meeting.excerpts.includes(excerpt) && selectedDate === meeting.meetingDate ? 'show' : 'hide'}`}>
                                            <div className='links-container'>
                                                {activeExcerpt?.links.map((link, index) => (
                                                    <div className='link' key={link.id}>
                                                        <h4 className={`${editing && activeExcerpt?.id === excerpt.id && meeting.excerpts.includes(excerpt) && selectedDate === meeting.meetingDate ? 'show' : 'hide'}`}>
                                                            Link {index + 1} of 5
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
                                                <FaRegCheckCircle className='save-icon icon' title='Save Excerpt' onClick={saveCardDetails}/>
                                                <FaRegTimesCircle className='cancel-icon icon' title='Cancel Edit' onClick={() => {cancelEdit(excerpt)}} />
                                                <FaRegTrashAlt className='delete-icon icon' title='Delete Excerpt' onClick={() => {deleteExcerpt(excerpt)}} />
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