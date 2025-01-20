import { useState } from 'react';
import './form.scss';

const Form = ({newGoal}) => {

    const timeframes = ['Day', 'Week', 'Year'];

    const [inputValue, setInputValue] = useState('');
    const [selectedTimeframe, setSelectedTimeframe] = useState('');

    const updateGoalDetails = (e) => {
        setInputValue(e.target.value);
    }

    const selectTimeframe = (timeframe) => {
        setSelectedTimeframe(timeframe);
    }


    return (
        <div className='form-container'>
            {newGoal.type === 'count' && <div className='section'>
                <label>
                    What is your word count goal?
                </label>
                <input type="text" placeholder='######' value={inputValue} onChange={updateGoalDetails}/>
                {inputValue && <p>You're goal is to write {inputValue} words. Nice!</p>}
            </div>}

            {newGoal.type === 'deadline' && <div className='section'>
                <label>
                    What is your Deadline?
                </label>
                <input type="text" placeholder='######' value={inputValue} onChange={updateGoalDetails}/>
                {inputValue && <p>You have selected {inputValue} as your deadline date.</p>}
            </div>}

            {newGoal.type === 'frequency' && <div className='section'>
                <label>
                    How many sessions to you want to have?
                </label>
                <input type="text" placeholder='######' value={inputValue} onChange={updateGoalDetails}/>

                <label>
                    What is the timeframe these sessions should occur within?
                </label>
                <div className='timeframe-container'>
                    {timeframes.map((time) => {
                       return <p className={selectedTimeframe === time ? 'selected-time' : ''} onClick={() => selectTimeframe(time)} key={time}>{time}</p>
                    })}
                </div>
                {selectedTimeframe && <p>You want to have {inputValue} session(s) per {selectedTimeframe}</p>}
            </div>}
        </div>
    )

}


export default Form;