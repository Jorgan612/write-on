import { useEffect, useState, FormEvent, ChangeEvent } from 'react';
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
    combinedEntries: Record<string, number>;
}

interface monthInfo {
    monthName: string;
    monthNumber: number;
    daysInMonth: number;
    startDayOfWeek: number;
    year: string;
}

function Calendar({combinedEntries}: CalendarProps) {
    const [viewDate, setViewDate] = useState(new Date());
    const [months, setmonths ] = useState<monthInfo[] | null>(null);
    const [updateDate, setUpdateDate] = useState(false);
    const [selectedUpdateDate, setSelectedUpdateDate] = useState<string>('');
    const [updatedWordCount, setUpdatedWordCount] = useState<number>(0);
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

        for (let i = 0; i < currentMonthData.startDayOfWeek; i++) {
            days.push(<div key={`empty-${i}`} className='default-cube empty'></div>);
        }

        for (let d = 1; d <= currentMonthData.daysInMonth; d++) {
            const monthStr = String(currentMonthData.monthNumber + 1).padStart(2, '0'); 
            const dayStr = String(d).padStart(2, '0');
            const dateKey = `${currentYear}-${monthStr}-${dayStr}`;
            days.push(
                <div key={d} id={dateKey} className={!combinedEntries[dateKey] ? 'default-cube' : combinedEntries[dateKey] > 1000 ? 'default-cube words1' : combinedEntries[dateKey] > 400  ? 'default-cube words2' : combinedEntries[dateKey] > 1 ? 'default-cube words3' : 'default-cube'}
                title={`${combinedEntries[dateKey] ?? 0} words`} onClick={() => toggleDateUpdateBox(dateKey)}>
                    <span className='day-number'>{d}</span>
                </div>
            )
        }

        return days;
    }

    const handleUpdatedWordCount = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdatedWordCount(Number(e.target.value));
    }

    const updatePreviousDate = (e: FormEvent) => {
        e.preventDefault();
        toggleDateUpdateBox('');
        combinedEntries[selectedUpdateDate] = updatedWordCount;
    }

    const toggleDateUpdateBox = (dateKey: string) => {
        setUpdateDate(prevupdateDate => ! prevupdateDate);
        setSelectedUpdateDate(dateKey);
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
            <div className={updateDate ? 'update-date-container' : 'hidden'}>
                <form onSubmit={updatePreviousDate}>
                <p>Add a new total for {selectedUpdateDate}</p>
                    <input placeholder='####' type='number' value={updatedWordCount} onChange={handleUpdatedWordCount}/>
                    <p className='caution-msg'>Updating will replace the current word count value for the selected day.</p>
                    <button type='submit'>Update</button>
                </form>

            </div>

        </div>
    )

}


export default Calendar;