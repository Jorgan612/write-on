import { FaRegTimesCircle, FaPlusCircle } from 'react-icons/fa';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CalendarGrid from '../calendarGrid/CalendarGrid';
import './CreateGroup.scss';


function CreateGroup() {
    
    const [selectedDates, setSelectedDates] = useState<{id: number, date: string}[]>([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        
    }, [selectedDates]);
    
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

    const removeDate = () => {
        console.log('Date removed!');
    };

    const navigateToDashboard = () => {
        setSelectedDates([]);
        navigate('/dashboard');
    };

    return (
        <div className='create-group-page'>
            <h1>Create Group</h1>
            <p className='sub-text'> Enter your group name, select meeting dates, and invite members to create a group.</p>
            <div className='group-name'>
                <label>Group Name:</label>
                <input />
            </div>
            <div className='date-selection'>
                <div className='group-calendar'>
                    {/* <p>Select a few or all future meeting dates on the calendar below.</p> */}
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
                    { selectedDates.length ?
                        < ul className='group-dates'>
                            {selectedDates.map((date)=> {
                            return (
                                    <li key={date.id}>
                                        <p>{format(date.date, 'LLLL dd yyyy')}</p>
                                        <FaRegTimesCircle className='icon' onClick={removeDate}/>
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
                <div className='group-invites'>
                    <p>Enter the email(s) of the people you wish to invite.</p>
                    <div className='invite-input'>
                        <label>Email:</label>
                        <input />
                        <FaPlusCircle className='icon' title='Send' />
                    </div>
                </div>
            </div>
            <div className='button-container'>
                <button>Create</button>
                <button onClick={navigateToDashboard}>Cancel</button>
            </div>
        </div>
    )
}

export default CreateGroup;