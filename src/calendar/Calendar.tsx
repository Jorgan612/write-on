import { useEffect } from 'react';
import './Calendar.scss';
import {getDay, getMonth, getDaysInMonth, eachMonthOfInterval, startOfMonth, startOfYear, endOfYear, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format} from 'date-fns';


function Calendar() {
    const today = new Date();

    const monthsInYear = eachMonthOfInterval({
        start: startOfYear(today),
        end: endOfYear(today)
    }).map(monthDate => {
     return {
        monthName: format(monthDate, 'MMMM'),
        daysInMonth: getDaysInMonth(monthDate),
        startDayOfWeek: getDay(startOfMonth(monthDate)), 
        year: format(monthDate, 'yyyy')
        };
    });

    // console.log('TEST', monthsInYear);

    // useEffect(() => {
        
    // }, [])

    return (
        <div className="calendar-container">

        </div>
    )

}


export default Calendar;