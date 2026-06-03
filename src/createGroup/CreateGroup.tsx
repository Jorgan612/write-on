import { FaRegUserCircle,
    FaRegHandPaper,
    FaEdit,
    FaPlusCircle,
    FaRegCalendarAlt,
    FaRegCheckCircle,
    FaRegTimesCircle,
} from 'react-icons/fa';
import { format } from 'date-fns';
import './CreateGroup.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function CreateGroup() {

    const [selectedDates, setSelectedDates] = useState([{id: 1, date: '2026-06-02'}]);
    const navigate = useNavigate();

    useEffect(() => {

    }, [selectedDates]);

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
                    {/* The calendar to schedule meeting dates goes here */}
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