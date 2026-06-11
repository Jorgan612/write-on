import './GroupSignUp.scss';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { userIcons } from '../assets/icons/userIcons/userIcons';
import { MembersProps, User, Excerpt } from '../interfaces/interfaces';
import { user1, user2 } from '../datasets/datasets';
import { FaRegUserCircle,
    FaRegHandPaper,
    FaEdit,
    FaPlusCircle,
    FaRegCalendarAlt,
    FaRegCheckCircle,
    FaRegTimesCircle,
} from 'react-icons/fa';

function GroupSignUp({currentUser, selectedMember, setSelectedMember}: MembersProps) {
    const [editing, setEditing] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [activeExcerpt, setActiveExcerpt] = useState<{
        links: {
            id: string;
            linkName: string;
            linkURL: string
        }[];
        description: string;
    } | null>(null);

    useEffect(() => {
        if (currentUser) {
            getGroupInfo();
        }
    }, [])

    const dates = [
        {
            id: '1',
            date: '2026-05-06',
            signups: [user1, user2]
        },
        {
            id: '2',
            date: '2026-05-013',
            signups: []
        },
        {
            id: '3',
            date: '2026-05-20',
            signups: [user2]
        },
        {
            id: '4',
            date: '2026-05-27',
            signups: []
        }
    ];

    const dummyExcerpt = {
        id: '1',
        links: [
            {
                id: '123',
                linkName: 'Chapter 1',
                linkURL: 'https://docs.google.com'
            },
            {
                id: '321',
                linkName: 'Chapter 2',
                linkURL: 'https://docs.google.com'
            },
        ],
        description: "Here are chapters 1 & 2. Any feedback is appreciated! Thank you!"
    }

    const getGroupInfo = () => {

    }

    const EditCardDetails = (user: User, date: string) => {
        setEditing(true);
        setSelectedMember(user);
        setSelectedDate(date);

        setActiveExcerpt({
            links: [...dummyExcerpt.links],
            description: dummyExcerpt.description
        });
    };

    const saveCardDetails = (user: User) => {
        // save user card details for this date
        setEditing(false);
        setSelectedMember(null);
        setSelectedDate('');
    };

    const cancelEdit = (user: User) => {
        //DO NOT save changes. Revert to previous user card details.
        setEditing(false);
        setSelectedMember(null);
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
            {dates.map((date) => {
                return (
                    <div className='column' key={date.id}>
                        <h3>{`${date.date.split('-')[1]?.charAt(0) === '0' ? format(date.date.split('-')[1]?.charAt(1)!, 'LLLL') : date.date.split('-')[1]} ${date.date.split('-')[2]?.charAt(0) === '0' ? date.date.split('-')[2]?.charAt(1) :date.date.split('-')[2]}`}</h3>
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
                            {date.signups.map((user) => {
                                const iconData = userIcons.find(icon => icon.id === user.userIcon.id);
                                const PreviewIcon = iconData?.icon || FaRegUserCircle;
                                const previewColor = user.userIcon?.color || '#94a3b8';
                                return (
                                    <div className={`user-card ${editing && selectedMember?.id === user.id && date.signups.includes(user) && selectedDate === date.date ? 'selected' : ''}`} key={user.id}>
                                        <div className='user-icon-name'>
                                            <div>
                                                <PreviewIcon className='icon' style={{color: previewColor}} />
                                            </div>
                                            <label>{user.username}</label>
                                        </div>
                                        {/*Read only view*/}
                                        <div className={`card-details ${!editing || selectedMember?.id !== user.id || (selectedDate !== date.date && selectedMember?.id === user.id) ? 'show' : 'hide'}`}>
                                            <h4>Excerpt Details</h4>
                                            <button className='edit-button' disabled={editing}>
                                                <FaEdit className={` icon ${editing ? 'disable' : ''}`} title={`${editing ? 'Save or cancel current edit before editing a different card' : 'Edit Card'}`} onClick={() => {EditCardDetails(user, date.date)}} />

                                            </button>
                                            <div className='links-container'>
                                                {dummyExcerpt.links.map((link) => {
                                                    return (
                                                        <div className='link' key={link.id}>
                                                            <a href={link.linkURL} target='_blank' rel='noopener noreferrer'>{link.linkName}</a>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            <div className='descrition-container'>
                                                <div className='description'>{dummyExcerpt.description}</div>
                                            </div>
                                        </div>
                                        {/*Edit view*/}
                                        <div className={`edit-card-details ${editing && selectedMember?.id === user.id && date.signups.includes(user) && selectedDate === date.date ? 'show' : 'hide'}`}>
                                            <div className='links-container'>
                                                {activeExcerpt?.links.map((link, index) => (
                                                    <div className='link' key={link.id}>
                                                        <h4 className={`${editing && selectedMember?.id === user.id && date.signups.includes(user) && selectedDate === date.date ? 'show' : 'hide'}`}>
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
                                                <FaRegCheckCircle className='save-icon icon' title='Save' onClick={() => saveCardDetails(user)}/>
                                                <FaRegTimesCircle className='cancel-icon icon' title='Cancel' onClick={() => {cancelEdit(user)}} />
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