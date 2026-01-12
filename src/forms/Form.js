import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './form.scss';

const Form = ({submitGoal, goalName, formValue, setFormValue}) => {

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm({
        goal: {
            name: goalName,
            id: Math.random(1, 100),
            value: null,
            current: null,
            type: ''
        }
    })

    const onSubmit = data => submitGoal(data);

    const timeframes = ['Day', 'Week', 'Year'];

    // const [testGoal, setTestGoal] = useState(null);

    const [inputValue, setInputValue] = useState([]);
    const [selectedTimeframe, setSelectedTimeframe] = useState('');

    useEffect(() => {
            // console.log('goalName', goalName)
            // setTestGoal(onSubmit)
            // console.log('setTestGoal', testGoal)
            // setFormValue(onSubmit);
    
        }, [onSubmit]);

    const updateGoalDetails = (e) => {
        // inputValue is currently being updated based on react-hook-form stuff and updateGoalDetails is not doing anything but keeping it for now
        setInputValue(e.target.value);
    }

    const selectTimeframe = (timeframe) => {
        setSelectedTimeframe(timeframe);
    }


    return (
        <div className='form-container'>
            {goalName === 'Word Count' && <form className='section'>
                <label>
                    What is your word count goal?
                </label>
                <input {...register("formValue", {required: true})} aria-invalid={errors ? "true" : "false"}/>
                {!errors.inputValue && <p>ERROR</p>}
                {inputValue && <p>You're goal is to write {inputValue} words. Excellent!</p>}
            </form>}

            {goalName === 'Deadline' && <div className='section'>
                <label>
                    What is your Deadline?
                </label>
                <input type="text" placeholder='######' value={inputValue} onChange={updateGoalDetails}/>
                {inputValue && <p>You have selected {inputValue} as your deadline date.</p>}
            </div>}

            {goalName === 'Frequency' && <div className='section'>
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

            {true && <button className='add-goal-button' onClick={handleSubmit(onSubmit)}>Add Goal</button>}
        </div>
    )
}


export default Form;