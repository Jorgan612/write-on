import { useState } from 'react';
import './form.scss';

const Form = ({goalName}) => {

    const timeframe = ['Day', 'Week', 'Year'];

    const [inputValue, setInputValue] = useState('');
    // put limits on number value input? no more than 6 digits?

    // figure out a way to select a specific form based on goal type?
    // ex: word count will JUST be total words
    // ex: deadline will need to be a DATE selection
    // ex: frequency will be a number of sessions WITH ability to specify timeframe to achieve? 5 sessions a day/week/year

    const updateGoalDetails = (e) => {
        setInputValue(e.target.value);
    }


    return (
        <div className='form-container'>
            {goalName === 'count' && <div className='section'>
                <label>
                    What is your word count goal?
                </label>
                <input type="text" placeholder='######' value={inputValue} onChange={updateGoalDetails}/>
                <p>{inputValue}</p>
            </div>}

            {goalName === 'deadline' && <div className='section'>
                <label>
                    What is your Deadline?
                </label>
                <input type="text" placeholder='######' value={inputValue} onChange={updateGoalDetails}/>
                <p>{inputValue}</p>
            </div>}

            {goalName === 'frequency' && <div className='section'>
                <label>
                    How many sessions to you want to have?
                </label>
                <input type="text" placeholder='######' value={inputValue} onChange={updateGoalDetails}/>

                <label>
                    What is the timeframe these sessions should occur within?
                </label>
                <div className='timeframe-container'>
                    <p>{inputValue > 1 ? 'Days': 'Day'}</p>
                    <p>{inputValue > 1 ? 'Weeks': 'Week'}</p>
                    <p>{inputValue > 1 ? 'Years': 'Year'}</p>
                </div>
            </div>}
        </div>
    )

}


export default Form;