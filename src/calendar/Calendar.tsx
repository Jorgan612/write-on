import { useEffect, useState } from 'react';
import { Entry } from '../interfaces/interfaces';
import './Calendar.scss';
import {
    getDay,
    getMonth,
    getDaysInMonth,
    eachMonthOfInterval,
    startOfMonth, startOfYear,
    endOfYear,
    format,
    subMonths,
    addMonths
} from 'date-fns';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface CalendarProps {
    entries: Entry[];
}

interface monthInfo {
    monthName: string;
    monthNumber: number;
    daysInMonth: number;
    startDayOfWeek: number;
    year: string;
}

function Calendar({entries}: CalendarProps) {
    const [viewDate, setViewDate] = useState(new Date());
    const [months, setmonths ] = useState<monthInfo[] | null>(null);
    const currentMonth = format(viewDate, 'MMMM');
    const currentMonthData = months?.find(m => m.monthName === currentMonth);
    const currentYear = format(viewDate, 'yyyy');

    useEffect(() => {
        if (!months) {
            retrieveMonths();
        }
        
    }, []);

    const changeMonth = (direction: 'previous' | 'next') => {
        setViewDate( prevDate => {
            return direction === 'previous'
            ? subMonths(prevDate, 1)
            : addMonths(prevDate, 1);
        })
        console.log('months', months)
    }

    const retrieveMonths = () => {
        const monthsInYear = eachMonthOfInterval({
            start: startOfYear(viewDate),
            end: endOfYear(viewDate)
        }).map(monthDate => {
        return {
            monthName: format(monthDate, 'MMMM'),
            monthNumber: getMonth(monthDate),
            daysInMonth: getDaysInMonth(monthDate),
            startDayOfWeek: getDay(startOfMonth(monthDate)), 
            year: format(monthDate, 'yyyy')
            };
        });

        setmonths(monthsInYear);
    }

    const renderDays = () => {
        const days = [];

        if (!currentMonthData) {
            return null;
        }

        console.log('currentMonthData', currentMonthData)

        for (let i = 0; i < currentMonthData.startDayOfWeek; i++) {
            days.push(<div key={`empty-${i}`} className='day-cube empty'></div>);
        }

        for (let d = 1; d <= currentMonthData.daysInMonth; d++) {
            days.push(
                <div key={d} className='day-cube'>
                    <span className='day-number'>{d}</span>
                </div>
            )
        }

        return days;
    }

    return (
        <div className='calendar-container'>
            <div className='calendar-header'>
                <FaChevronLeft className="previous" onClick={() => {changeMonth('previous')}} />
                <span className='month'>{currentMonth}</span>
                <span>{currentYear}</span>
                <FaChevronRight className="next" onClick={() => {changeMonth('next')}} />
            </div>
            <div className='grid-container'>
                <div className='weekdays-row'>
                    <span>S</span><span>M</span><span>T</span><span>W</span>
                    <span>T</span><span>F</span><span>S</span>
                </div>
                <div className='days-grid'>
                    {renderDays()}
                </div>
            </div>

        </div>
    )

}


export default Calendar;