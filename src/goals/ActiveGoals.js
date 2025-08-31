import '../goals/activeGoals.scss';
import {userGoals, goalOptions} from '../datasets/datasets';
import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import MenuDropdown from '../dropdown/MenuDropdown';
import Form from '../forms/Form';

function ActiveGoals() {
    const [formOpened, setFormOpened] = useState(false);
    const [formComplete, setFormComplete] = useState(false);
    const [formValue, setFormValue] = useState('null');
    const [goalName, setGoalName] = useState('');
    const [newGoal, setNewGoal] = useState({
        name: "",
        id: Math.random(1, 100),
        value: null,
        current: null,
        type: ''
    })

    const [goals, setGoals] = useState(() => {
        const savedGoals = localStorage.getItem('goals');
        const initialValue = JSON.parse(savedGoals);
        return initialValue || '';
      });

    useEffect(() => {
        // console.log('newGoal', newGoal)
        console.log('goalName', goalName)
        setNewGoal(prevNewGoal => ({
            ...prevNewGoal,
            name: goalName,
            value: formValue.formValue
        }))
        console.log('NEWGOAL', newGoal)
    }, [goalName, formValue]);


    const openNewGoalForm = () => {
        setFormOpened( prev => !prev );
        // handleSubmit(onSubmit);
        // line 26 onSubmit is logging IF you call handleSubmit on the button to submit form, but it is an empty obj. Figure out how to hook up input value.

        
        // console.log('test?', onSubmit)
        if (formOpened && formComplete) {
            console.log('formOpened && formComplete')
            // If the menu is true meaning, the form is open AND form is complete (will need to add logic once inputs added and/or also disable Add Goal button to avoid edge case) then addGoal() to user's goal list
            submitGoal();
        }
    }

    const submitGoal = (goal) => {
        console.log('submitGoal', goal)
        setFormValue(goal)
        console.log('formValue', formValue)
    }

    return (
        <div className="active-goals-container">
            <div className='goal-header'>Current Goals:</div>
            <div className='list'>
                <div className='goals-list-container'>
                    {userGoals.map((goal) => (
                        <div className='item' key={goal.id}>
                            <svg className='icon' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#7FA1C3"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                            <div>{ goal.name } : {goal.value}</div>
                        </div>
                    ))}
                </div>
                { formOpened && <div className='add-goal-container'>
                        
                    { formOpened && <MenuDropdown options={goalOptions} setGoalName={setGoalName} goalName={goalName} /> }

                    { goalName && <Form submitGoal={submitGoal} goalName={goalName} formValue={formValue} setFormValue={setFormValue} /> } 
                </div> }
            </div>
            <div className='footer-container'>
                <button className={!formOpened ? 'new-goal-button' : 'hidden'} onClick={openNewGoalForm}>New Goal</button>
            </div>
        </div>
    );
}

export default ActiveGoals;