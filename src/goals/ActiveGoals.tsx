import '../goals/activeGoals.scss';
import { FaEdit } from "react-icons/fa";
import { User, UserProps } from '../interfaces/interfaces';
import {userGoals, goalOptions} from '../datasets/datasets';
import { useState, useEffect } from 'react';
import { Goal, Icon } from '../interfaces/interfaces';
import MenuDropdown from '../dropdown/MenuDropdown';
import Form from '../forms/Form';

function ActiveGoals({currentUser, setCurrentUser}: UserProps) {
    const [formOpened, setFormOpened] = useState(false);
    const [formComplete, setFormComplete] = useState(false);
    const [newGoal, setNewGoal] = useState('');

    const [overall, setOverall] = useState<Goal>(() => {
        const overall = localStorage.getItem('user_overall');
        return overall ? JSON.parse(overall) : {};
      });

    const [weekly, setWeekly] = useState<Goal>(() => {
    const weekly = localStorage.getItem('user_weekly');
    return weekly ? JSON.parse(weekly)  : {};
    });

    const [frequency, setFrequency] = useState<Goal>(() => {
        const frequency = localStorage.getItem('user_frequency');
        return frequency ? JSON.parse(frequency) : {};
    });

    useEffect(() => { 
        localStorage.setItem("user_overall", JSON.stringify(overall));
        localStorage.setItem("user_weekly", JSON.stringify(weekly));
        localStorage.setItem("user_frequency", JSON.stringify(frequency));
    }, [overall, weekly, frequency]);

    const openNewGoalForm = () => {
        setFormOpened( prev => !prev );
        if (formOpened && formComplete) {
            addGoal();
        }
    };

    const addGoal = () => {
        console.log('added goal!')
    };

    return (
        <div className="goals-container">
            {currentUser.goals.map((goal) => (
                <div className='goal' key={goal.id}>
                    <p className='goal-title'>{goal.name}</p>
                    <div>
                        <span className='goal-value'>{goal.current}</span>
                        <span> / </span>
                        <span className='goal-total'>{goal.total}</span>
                        <span>{goal.type}</span>
                        <span className='edit-icon'><FaEdit  /></span>
                    </div>
                </div>
            ))}



{/* 
            <div className='goal'>
                <p className='goal-title'>Weekly Sessions</p>
                <div>
                    <span className='goal-value'>1</span>
                    <span> / </span>
                    <span className='goal-total'>3</span>
                    <span>day(s)</span>
                    <span className='edit-icon'><FaEdit  /></span>
                </div>
            </div>
            <div className='goal'>
                <p className='goal-title'>Overall Word Count</p>
                <div>
                    <span className='goal-value'>60,000</span>
                    <span> / </span>
                    <span className='goal-total'>100,000</span>
                    <span> word(s)</span>
                    <span className='edit-icon'><FaEdit  /></span>
                </div>
            </div> */}

        </div>
    );
}

export default ActiveGoals;