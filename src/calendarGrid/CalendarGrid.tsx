import { useState,useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { getDay,
    getMonth,
    getDaysInMonth,
    eachMonthOfInterval,
    startOfMonth,
    startOfYear,
    endOfYear,
    format,
    subMonths,
    addMonths 
} from 'date-fns';


interface MonthInfo {
    monthName: string;
    monthNumber: number;
    daysInMonth: number;
    startDayOfWeek: number;
    year: string;
}

interface CalendarGridProps {
    renderDayCube: (dateKey: string, dayNumber: number, isFuture: boolean) => React.ReactNode;
    children?: React.ReactNode;
}

function CalendarGrid({ renderDayCube, children }: CalendarGridProps) {
    const [viewDate, setViewDate] = useState(new Date());
    const [months, setMonths] = useState<MonthInfo[] | null>(null);

    const currentMonth = format(viewDate, 'MMMM');
    const currentYear = format(viewDate, 'yyyy');
    const currentMonthData = months?.find(month => month.monthName === currentMonth);

    useEffect(() => {
        const monthsInYear = eachMonthOfInterval({
            start: startOfYear(viewDate),
            end: endOfYear(viewDate)
        }).map(monthDate => ({
            monthName: format(monthDate, 'MMMM'),
            monthNumber: getMonth(monthDate),
            daysInMonth: getDaysInMonth(monthDate),
            startDayOfWeek: getDay(startOfMonth(monthDate)),
            year: format(monthDate, 'yyyy')
        }));
        setMonths(monthsInYear);
    },[viewDate]);

    const changeMonth = (direction: 'previous' | 'next') => {
        setViewDate(prev => direction === 'previous' ? subMonths(prev, 1) : addMonths(prev, 1));
    };

    const renderDays = () => {
        const days = [];
        const todayKey = format(new Date(), 'yyyy-MM-dd');

        if (!currentMonthData) {
            return null;
        }

        for (let i = 0; i < currentMonthData.startDayOfWeek; i++) {
            days.push(<div key={`empty-${i}`} className="default-cube empty"></div>)
        }

        for (let d = 1; d <= currentMonthData.daysInMonth; d++) {
            const monthStr = String(currentMonthData.monthNumber + 1).padStart(2, '0');
            const dayStr = String(d).padStart(2, '0');
            const dateKey = `${currentYear}-${monthStr}-${dayStr}`;
            const isFuture = dateKey > todayKey;

            days.push(renderDayCube(dateKey, d, isFuture));
        }

        return days;
    }

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <FaChevronLeft className="previous" onClick={() => changeMonth('previous')} />
                <span className="month">{currentMonth}</span>
                <span className="year">{currentYear}</span>
                <FaChevronRight className="next" onClick={() => changeMonth('next')} />
            </div>
            <div className="grid-container">
                <div className="weekdays-row">
                   <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span> 
                </div>
                <div className="days-grid">{renderDays()}</div>
            </div>
            {children}
        </div>
    );
}

export default CalendarGrid;