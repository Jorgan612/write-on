import { useEffect } from 'react';
import { Entry } from '../interfaces/interfaces';
import './Calendar.scss';
import {getDay, getMonth, getYear, getDaysInMonth, eachMonthOfInterval, startOfMonth, startOfYear, endOfYear, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format} from 'date-fns';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
/* 
    [ ] Figure out how to render calendar grid so that...
        -- The grid remains with an even amount of columns regardless of what day
        the first day of the month falls on
        -- The number denoting the day of the week shows on each day cube in the grid
        -- Color indicating word count for each day changes based on how much was written
        -- 
    [ ] Style grid (grid size, base color values, layout, etc.)
    [ ] Previous and Next buttons besides the month and year to allow  a user to switch between months
    [ ] All months are accurate and reflect 2026
    [ ] Select a date to see more details (in a tooltip? details = word count total that day for now) 
    [ ]  
    [ ]  
    [ ]  
*/

interface CalendarProps {
    entries: Entry[];
}

function Calendar({entries}: CalendarProps) {
    const today = new Date();
    const month = format(today, 'MMMM')
    const year = getYear(today)


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
        <div className='calendar-container'>
            <div className='calendar-header'>
                <span>{month}</span>
                <span>{year}</span>
                <FaChevronLeft className="previous" />
                <FaChevronRight className="next" />
            </div>
            <div className='grid-container'>
            </div>

        </div>
    )

}


export default Calendar;