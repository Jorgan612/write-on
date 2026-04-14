import '../goals/activeGoals.scss';
import { ChangeEvent } from 'react';
import { isThisWeek } from 'date-fns';
import { UserProps } from '../interfaces/interfaces';
import { useState, useEffect } from 'react';
import MenuDropdown from '../dropdown/MenuDropdown';
import Form from '../forms/Form';

function ActiveGoals({currentUser, setCurrentUser, combinedEntries}: UserProps) {

    const [weeklyTotal, setWeeklyTotal] =  useState<number | ''>(currentUser.goals[0]?.total || '');
    const [frequencyTotal, setFrequencyTotal] =  useState<number | ''>(currentUser.goals[1]?.total || '');
    const [overallTotal, setOverallTotal] =  useState<number | ''>(currentUser.goals[2]?.total || '');

    const [currentWeekly, setCurrentWeekly] = useState<number | 0 >(0);
    const [currentFrequency, setCurrentFrequency] = useState<number | 0 >(0);
    const [currentOverall, setCurrentOverall] = useState<number | 0 >(0);

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

        determineCurrentValues();
        
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

    const determineCurrentValues = () => {
        calculateWeeklyWordCount();
        calculateWeeklyFrequency();
        calculateOverallWordCount();
    };

    const calculateWeeklyWordCount = () => {
        const totalDays = Object.keys(combinedEntries);

        let totalWords = totalDays.reduce((acc: number, day: string) => {
            let currentDay = day.split('-');
            const isCurrentWeek = isThisWeek(new Date(Number(currentDay[0]), (Number(currentDay[1]) - 1), Number(currentDay[2])), { weekStartsOn: 1 });

            if (isCurrentWeek) {
                acc += combinedEntries[day]!;
            } else {
                acc += 0;
            }
            return acc;
        }, 0);

        setCurrentWeekly(totalWords);
    };

    const calculateWeeklyFrequency = () => {
        const dayKeys = Object.keys(combinedEntries);

        let totalDays = dayKeys.reduce((acc: number, day: string) => {
            let currentDay = day.split('-');
            const isCurrentWeek = isThisWeek(new Date(Number(currentDay[0]), (Number(currentDay[1]) - 1), Number(currentDay[2])), { weekStartsOn: 1 });

            if (isCurrentWeek && combinedEntries[day] !== 0) {
                acc += 1;
            } else {
                acc += 0;
            }
            return acc;
        }, 0);

        setCurrentFrequency(totalDays);
    };
    
    const calculateOverallWordCount = () => {
        const dayKeys = Object.keys(combinedEntries);
        let totalOverallWords = dayKeys.reduce((acc, day) => {
            if (combinedEntries[day]) {
                acc += combinedEntries[day]!;
            } else {
                acc += 0;
            }
            return acc;
        }, 0);

        setCurrentOverall(totalOverallWords);
    };

    return (
        <div className="goals-container">
            {!currentUser || !currentUser.goals ? (
                <p>Loading goals...</p>
            ) : (
                defaultGoals.map((goal) => (
                    <div className='goal' key={goal.id}>
                        <p className='goal-title'>{goal.name}</p>
                        <div>
                            <span className='goal-value'>{
                                goal.id === '1' ? currentWeekly : 
                                goal.id === '2' ? currentFrequency : 
                                goal.id === '3' ? currentOverall : '0'
                            }</span>
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