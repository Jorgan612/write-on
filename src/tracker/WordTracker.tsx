import { useState, FormEvent, ChangeEvent } from 'react';
import dayjs from 'dayjs';
import { CombinedEntry, Entry } from '../interfaces/interfaces';
import './WordTracker.scss';


interface WordTrackerProps {
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
  combinedEntries: Record<string, number>;
}


function WordTracker({setEntries, combinedEntries}: WordTrackerProps) {
  const [newWords, setNewWords] = useState<number>(0);
  let currentDay = dayjs().format('YYYY-MM-DD');


  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewWords(Number(e.target.value));
  }

  const updateWordCount = (e: FormEvent) => {
    e.preventDefault();
    updateDailyTotal(newWords);
    setNewWords(0);
  }

  const updateDailyTotal = (newWords: number) => {
    const newEntry = {
      id: Date.now(),
      total: newWords,
      date: dayjs().format('YYYY-MM-DD'),
      year: dayjs().year(),
      month: dayjs().month(),
      day: dayjs().date(),
      time: new Date(Date.now()).toTimeString()
    };
    
    setEntries((prevEntries: Entry[]) => [...prevEntries, newEntry]);
  }

  return (
    <section className='word-tracker-container'>
      <label>Update today's word count</label>
      <form onSubmit={updateWordCount}>
        <input placeholder='####' type='number' value={newWords} onChange={handleInputChange}/>
        <button type='submit'>+ Add</button>
      </form>
      <p>Today's total: {combinedEntries[currentDay]}</p>
    </section>
  )

}

export default WordTracker;