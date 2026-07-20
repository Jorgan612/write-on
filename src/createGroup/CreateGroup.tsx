import { FaRegTimesCircle, FaPlusCircle, FaRegTrashAlt } from 'react-icons/fa';
import { format } from 'date-fns';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CalendarGrid from '../calendarGrid/CalendarGrid';
import { validateEmail } from '../utils/Validation';
import { GroupProps, User } from '../interfaces/interfaces';
import './CreateGroup.scss';

interface CreateGroupProps {
    currentUser: User;
}

function CreateGroup({currentUser}: CreateGroupProps) {
    const [selectedDates, setSelectedDates] = useState<{id: number, date: string}[]>([]);
    const [emails, setEmails] = useState<{id: string, email: string}[]>([]);
    const [inputEmail, setInputEmail] = useState<string>('');
    const [inputGroupName, setInputGroupName] = useState<string>('');
    const [errorMsg, setErrorMsg] = useState<string>('');
    const isValid = validateEmail(inputEmail);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    
    const toggleDateSelection = (dateKey: string, isFuture: boolean) => {
        if (!isFuture) {
            return;
        }
        
        setSelectedDates(prev => {
            const exists = prev.some(d => d.date === dateKey);
            if (exists) {
                return prev.filter(d => d.date !== dateKey);
            } else {
                return [...prev, { id: Date.now(), date: dateKey }];
            }
        });
    };

    const removeDate = (date: string) => {
        setSelectedDates(prev => {
            return prev.filter(d => d.date !== date);
        });
    };

    const addEmail = () => {
        const isDuplicate = emails.some((email) => {
            return email.email.toLowerCase().trim() === inputEmail.toLowerCase().trim();
        });

        if (isDuplicate) {
            setErrorMsg('This email has already been added to the invite list.');
            return;
        } else {
            const newEmail = {
                id: crypto.randomUUID(),
                email: inputEmail.toLowerCase().trim()
            };
    
            setEmails(prev => {
                return [...prev, newEmail];
            });
            setErrorMsg('');
        }

        setInputEmail('');
    };

    const removeEmail = (emailId: string) => {
        setEmails(prev => {
            return prev.filter(e => e.id !== emailId);
        });
    };

    const clearDateList = () => {
        setSelectedDates([]);
    };

    const createGroup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!inputGroupName) {
            return;
        }

        const newGroup: GroupProps = {
            groupId: Date.now().toString(),
            name: inputGroupName.trim(),
            ownerID: currentUser.id,
            creationDate: new Date().toISOString(),
            meetings: selectedDates.map(d => d.date),
            invites: emails.map(e => e.email),
            members: []
        };

        try {
            const response = await fetch('http://localhost:5000/groups', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
                body: JSON.stringify(newGroup),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message || 'Group Created successfully.');
                navigate('/dashboard');
            } else {
                alert(data.message || 'Something went wrong while attempting to create your group. Please try again.');
            }
        } catch (err) {
            console.error('Create group error:', err);
            alert('An error occured while creating your group.');
        }
    };

    const navigateToDashboard = () => {
        setSelectedDates([]);
        setEmails([]);
        setInputEmail('');
        setInputGroupName('');
        navigate('/dashboard');
    };

    return (
        <form className='create-group-page' onSubmit={createGroup}>
            <h1>Create Group</h1>
            <p className='sub-text'> Enter your group name, select meeting dates, and invite members to create a group.</p>
            <div className='group-name'>
                <label htmlFor='groupName'>Group Name<span className='highlight-required'>*</span></label>
                <input required id='groupName' value={inputGroupName} onChange={(e) => {setInputGroupName(e.target.value)}} />
            </div>
            <div className='date-selection'>
                <div className='group-calendar'>
                    <CalendarGrid 
                        renderDayCube={(dateKey, d, isFuture) => {
                            const isSelected = selectedDates.some(selectedDate => selectedDate.date === dateKey);
                            return (
                                <div key={d}
                                    className={`default-cube ${isFuture || (dateKey === format(new Date(), 'yyyy-MM-dd')) ? 'past' : 'future'} ${isSelected || (isSelected && dateKey === format(new Date(), 'yyyy-MM-dd')) ? 'day-selected' : ''}`}
                                    onClick={() => toggleDateSelection(dateKey, isFuture)}
                                    title={!isFuture && (dateKey !== format(new Date(), 'yyyy-MM-dd')) ? 'Cannot schedule past dates' : ''}>
                                    <span className='day-number'>{d}</span>
                                </div>
                            );
                        }}
                    />
                    <div className='content-right'>
                        {selectedDates.length ? <div className='clear-dates'>
                            <FaRegTrashAlt className='icon' title='Clear All' onClick={clearDateList} />
                        </div> : <div className='clear-dates'></div>}
                        { selectedDates.length ?
                            < ul className='group-dates'>
                                {selectedDates.map((date)=> {
                                return (
                                        <li key={date.id}>
                                            <p>{format(new Date(`${date.date}T00:00:00`), 'LLLL dd yyyy')}</p>
                                            <FaRegTimesCircle className='icon' onClick={() => removeDate(date.date)}/>
                                        </li>
                                    )
                                })}
                            </ ul> :
                            <div className='group-dates'>
                                <p className='text'>
                                    No dates selected yet...
                                </p>
                            </div>
                        }
                    </div>
                </div>
                <div className='group-invites'>
                    <p>Enter the email(s) of the people you wish to invite.</p>
                    <div className='invite-input'>
                        <label htmlFor='inputEmail'>Email:</label>
                        <div>
                            <input id='inputEmail'
                            value={inputEmail}
                            onChange={(e) => {setInputEmail(e.target.value)}}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    addEmail();
                                }
                            }}/>
                            <FaPlusCircle className={`icon ${!isValid ? 'disable' : ''}`} title={isValid ? 'Add' : 'Invalid Email'} onClick={addEmail} />
                        </div>
                    </div>
                    {errorMsg ? <p className='error-msg'>{errorMsg}</p> : ''}
                    <ul className='invite-list'>
                        {emails.map((email) => {
                            return (
                                <div key={email.id}>
                                    <li className='email' title={email.email}>
                                        <p>
                                            {email.email}
                                        </p>
                                    </li>
                                    <FaRegTimesCircle className='icon' title='Remove' onClick={() => removeEmail(email.id)}/>
                                </div>
                            )
                        })}
                    </ul>
                </div>
            </div>
            <div className='button-container'>
                <button className={!inputGroupName ? 'disable' : ''} title={!inputGroupName ? 'Your group must have a unique name.' : 'Create'} disabled={!inputGroupName} type='submit'>Create</button>
                <button onClick={navigateToDashboard} title='Cancel'>Cancel</button>
            </div>
        </form>
    )
}

export default CreateGroup;