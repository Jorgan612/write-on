import { useState, FormEvent, ChangeEvent } from 'react';
import './Calendar.scss';
import { Entry } from '../interfaces/interfaces';
import CalendarGrid from '../calendarGrid/CalendarGrid';
interface CalendarProps {
    combinedEntries: Record<string, number>;
    setEntries: (updateFn: (prev: Entry[]) => Entry[]) => void;
}

function Calendar({combinedEntries, setEntries}: CalendarProps) {
    const [updateDate, setUpdateDate] = useState(false);
    const [selectedUpdateDate, setSelectedUpdateDate] = useState<string>('');
    const [updatedWordCount, setUpdatedWordCount] = useState<number>(0);

    const handleUpdatedWordCount = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdatedWordCount(Number(e.target.value));
    };

    const updatePreviousDate = (e: FormEvent) => {
        e.preventDefault();

        if (!selectedUpdateDate || !selectedUpdateDate.includes('-')) {
            closeUpdateDateBox();
            return;
        }

        const [y, m, d] = selectedUpdateDate.split('-');

        const overwrittenEntry = {
            id: Date.now(),
            total: updatedWordCount,
            date: selectedUpdateDate,
            year: parseInt(y ?? ''),
            month: parseInt(m ?? '') - 1,
            day: parseInt(d ?? ''),
            time: new Date().toTimeString()
        }

        setEntries(prevEntries => {
            const filtered = prevEntries.filter(entry => entry.date !== selectedUpdateDate);
            return [...filtered, overwrittenEntry];
        });

        setUpdateDate(false);
        setSelectedUpdateDate('');
        setUpdatedWordCount(0);
    };

    const openDateUpdateBox = (dateKey: string) => {
        setUpdateDate(true);
        setSelectedUpdateDate(dateKey);
    };

    const closeUpdateDateBox = () => {
        setUpdateDate(false);
        setSelectedUpdateDate('');
        setUpdatedWordCount(0);
    };

    return (
        <CalendarGrid 
            renderDayCube={(dateKey, d, isFuture) => (
                <div key={d} 
                    id={dateKey} 
                    className={`default-cube ${isFuture ? 'future' : ''} ${!combinedEntries[dateKey] ? '' : 
                        combinedEntries[dateKey] > 1000 ? 'words1' : 
                        combinedEntries[dateKey] > 400 ? 'words2' : 'words3'} ${dateKey === selectedUpdateDate ? 'selected' : ''}`}
                    title={isFuture ? "Cannot edit future dates" : `${combinedEntries[dateKey] ?? 0} words`} 
                    onClick={() => !isFuture && openDateUpdateBox(dateKey)}>
                    <span className='day-number'>{d}</span>
                </div>
            )}
        >
            <div className={`update-date-container ${updateDate ? 'is-visible' : 'is-hidden'}`}>
                <form onSubmit={updatePreviousDate}>
                    <p>Add a new total for <span>{selectedUpdateDate ? selectedUpdateDate : ''}</span></p>
                    <input placeholder='####' type='number' value={updatedWordCount} onChange={handleUpdatedWordCount}/>
                    <p className='caution-msg'>Update will replace the current word count for the selected day.</p>
                    <div>
                        <button type='submit'>Update</button>
                        <button type='button' onClick={closeUpdateDateBox}>Cancel</button>
                    </div>
                </form>
            </div>
        </CalendarGrid>
    );
}

export default Calendar;