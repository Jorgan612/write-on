import '../goals/activeGoals.scss';
import { ChangeEvent } from 'react';
import { isSunday, nextSaturday, isSameWeek, isThisWeek, startOfWeek, endOfWeek, getWeek } from 'date-fns';
import dayjs from 'dayjs';
import { FaEdit } from "react-icons/fa";
import { User, UserProps } from '../interfaces/interfaces';
import { useState, useEffect } from 'react';
import { Goal, Icon } from '../interfaces/interfaces';
import MenuDropdown from '../dropdown/MenuDropdown';
import Form from '../forms/Form';

function ActiveGoals({currentUser, setCurrentUser, combinedEntries}: UserProps) {
    const currentDay = dayjs().format('YYYY-MM-DD').split('-');
    const currentWeek = getWeek(new Date(Number(currentDay[0]), Number(currentDay[1]), Number(currentDay[2])))
    const isCurrentWeek = isThisWeek(new Date(Number(currentDay[0]), (Number(currentDay[1]) - 1), Number(currentDay[2])))

    const [weeklyTotal, setWeeklyTotal] =  useState<number | ''>(currentUser.goals[0]?.total || '');
    const [frequencyTotal, setFrequencyTotal] =  useState<number | ''>(currentUser.goals[1]?.total || '');
    const [overallTotal, setOverallTotal] =  useState<number | ''>(currentUser.goals[2]?.total || '');

    const [weekRange, setWeekRange] = useState<[]>([]);
    // console.log('at 0', currentDay[0])
    // console.log('at 1', (Number(currentDay[1]) - 1))
    // console.log('at 2', currentDay[2])

    console.log('currentWeek', currentWeek)
    console.log('isCurrentWeek', isCurrentWeek)

    const defaultGoals = [{
        name: 'Weekly Word Count',
        id: '1',
        total: 0,
        current: 0,
        type: 'word(s)'
      },
      {
        name: 'Weekly Session Frequency ',
        id: '2',
        total: 0,
        current: 0,
        type: 'day(s)'
      },
      {
        name: 'Overall Word Count',
        id: '3',
        total: 0,
        current: 0,
        type: 'word(s)'
      }];

    
    useEffect(() => {
        console.log('currentDay', currentDay)

        if (!currentUser.goals || currentUser.goals.length === 0) {
            setCurrentUser(prev => ({
                ...prev,
                goals: defaultGoals
            }));
            return;
        }

        setWeeklyTotal(currentUser.goals[0]?.total ?? '');
        setFrequencyTotal(currentUser.goals[1]?.total ?? '');
        setOverallTotal(currentUser.goals[2]?.total ?? '');
        
    }, [currentUser]);

    const handleInputChange = (id: string, e: ChangeEvent<HTMLInputElement>) => {
        let newTotal = Number(e.target.value)

        setCurrentUser((prevUser) => {
            if (!prevUser || !prevUser.goals) return prevUser;
            return {
            ...prevUser,
            goals: prevUser.goals.map((goal) =>
                goal.id === id ? {...goal, total: newTotal} : goal
            ),
        }});

        if (id === '1') {
            setWeeklyTotal(newTotal);
        }

        if (id === '2') {
            setFrequencyTotal(newTotal);
        }

        if (id === '3') {
            setOverallTotal(newTotal);
        }
    };

    // weekly word count:
    //what about just using getWeek and checking current date against isSameweek? while iterating over combinedEntries?
    // save dates in combinedEntries (based on isThisWeek boolean to a new array to get total word count for week?


    return (
        <div className="goals-container">
            {!currentUser || !currentUser.goals ? (
                <p>Loading goals...</p>
            ) : (
                defaultGoals.map((goal) => (
                    <div className='goal' key={goal.id}>
                        <p className='goal-title'>{goal.name}</p>
                        <div>
                            <span className='goal-value'>{goal.current || '0'}</span>
                            <span> / </span>
                            <input 
                                className='goal-total' 
                                id={goal.id} 
                                type='number' 
                                value={
                                    goal.id === '1' ? weeklyTotal : 
                                    goal.id === '2' ? frequencyTotal : 
                                    goal.id === '3' ? overallTotal : ''
                                } 
                                onChange={(e) => handleInputChange(goal.id, e)}
                            />
                            <span>{goal.type}</span>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default ActiveGoals;