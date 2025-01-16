import { useState } from 'react';
import './form.scss';

const Form = ({goalName}) => {

    const [inputValue, setInputValue] = useState(null);
    // put limits on number value input? no more than 6 digits?

    // figure out a way to select a specific form based on goal type?
    // ex: word count will JUST be total words
    // ex: deadline will need to be a DATE selection
    // ex: frequency will be a number of sessions WITH ability to specify timeframe to achieve? 5 sessions a day/week/year

    const updateGoalDetails = (e) => {
        e.preventDefault();
        console.log('e', e.target.value)
    }


    return (
        <div className='form-container'>
            <div className='section'>
                <label>
                    What is your word count goal?
                </label>
                <input placeholder='######' value={inputValue} onChange={updateGoalDetails}/>
            </div>
        </div>
    )

}


export default Form;