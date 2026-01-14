import { useEffect } from 'react';
import './Calendar.scss';
import {getDay, getMonth, getYear, getDaysInMonth, eachMonthOfInterval, startOfMonth, startOfYear, endOfYear, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format} from 'date-fns';


function Calendar() {
    const today = new Date();
    const month = format(today, 'MMMM')
    const year = getYear(today)
    const arrowLeft = '<'
    const arrowRight = '>'

    console.log('year', year)


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

    console.log('months', monthsInYear);

    // useEffect(() => {
        
    // }, [])

    return (
        <div className="calendar-container">
            <div>
                <span>{month}</span>
                <span>{year}</span>
                <span>{arrowLeft}</span>
                <span>{arrowRight}</span>
            </div>

        </div>
    )

}


export default Calendar;