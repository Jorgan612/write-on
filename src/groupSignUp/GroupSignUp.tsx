import './GroupSignUp.scss';
import { userIcons } from '../assets/icons/userIcons/userIcons';
import { FaRegUserCircle, FaRegHandPaper, FaEdit, FaPlusCircle, FaRegCalendarAlt, FaRegCheckCircle } from 'react-icons/fa';
import { format } from 'date-fns';
import { MembersProps, User } from '../interfaces/interfaces';
import { user1, user2 } from '../datasets/datasets';
import { useState } from 'react';

function GroupSignUp({users, selectedMember, setSelectedMember}: MembersProps) {
    const [editing, setEditing] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<string>('');

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

    const EditCardDetails = (user: User, date: string) => {
        setEditing(true);
        setSelectedMember(user);
        setSelectedDate(date);
    };

    const saveCardDetails = (user: User) => {
        setEditing(false);
        setSelectedMember(null);
        setSelectedDate('');
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
                                    <div className='user-card' key={user.id}>
                                        <div className='user-icon-name'>
                                            <div>
                                                <PreviewIcon className='icon' style={{color: previewColor}} />
                                            </div>
                                            <label>{user.username}</label>
                                        </div>
                                        {/*Read only view*/}
                                        <div className={`card-details ${!editing || selectedMember?.id !== user.id || (selectedDate !== date.date && selectedMember?.id === user.id) ? 'show' : 'hide'}`}>
                                            <FaEdit className='edit-icon icon' title='Edit card' onClick={() => {EditCardDetails(user, date.date)}} />
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
                                                <div className='link'>
                                                    <label>Document Name:</label>
                                                    <input />
                                                    <label>Link:</label>
                                                    <input />
                                                </div>
                                                <FaPlusCircle className='add-link' title='Add Link' />
                                            </div>
                                            <label>Description:</label>
                                            <textarea placeholder=''></textarea>
                                            <FaRegCheckCircle className='save-icon icon' title='Save' onClick={() => saveCardDetails(user)}/>
                                        </div>
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