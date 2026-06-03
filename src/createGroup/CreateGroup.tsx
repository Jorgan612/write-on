import { FaRegUserCircle,
    FaRegHandPaper,
    FaEdit,
    FaPlusCircle,
    FaRegCalendarAlt,
    FaRegCheckCircle,
    FaRegTimesCircle,
} from 'react-icons/fa';
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
        if (!isFuture) return;

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
            <div className='group-name'>
                <label>Group Name:</label>
                <input />
            </div>
            <div className='date-selection'>
                <div className='group-calendar'>
                    <p>Select a few or all future meeting dates on the calendar below.</p>
                    <CalendarGrid 
                        renderDayCube={(dateKey, d, isFuture) => {
                            const isSelected = selectedDates.some(sd => sd.date === dateKey);
                            return (
                                <div key={d}
                                    className={`default-cube ${isFuture ? 'future' : 'past'} ${isSelected ? 'meeting-selected' : ''}`}
                                    onClick={() => toggleDateSelection(dateKey, isFuture)}>
                                    <span className='day-number'>{d}</span>
                                </div>
                            );
                        }}
                    />
                </div>
                { selectedDates.length ?
                    < ul className='group-dates'>
                        <p>Selected meeting dates.</p>
                        {selectedDates.map((date)=> {
                           return (
                                <li key={date.id}>
                                    <p>{format(date.date, 'LLLL dd yyyy')}</p>
                                    <FaRegTimesCircle className='icon' onClick={removeDate}/>
                                </li>
                            )
                        })}
                    </ ul> :
                    <div className='group-dates'>No dates selected yet...</div>
                }
            </div>
            <div className='button-container'>
                <button>Create</button>
                <button onClick={navigateToDashboard}>Cancel</button>
            </div>
        </div>
    )
}

export default CreateGroup;