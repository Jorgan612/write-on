import { useState, FormEvent, ChangeEvent } from 'react';
import dayjs from 'dayjs';
import { Entry } from '../interfaces/interfaces';
import './WordTracker.scss';


interface WordTrackerProps {
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
}


function WordTracker({setEntries}: WordTrackerProps) {
  const [newWords, setNewWords] = useState<string>('');
  let [total, setTotal] = useState<number>(0);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewWords(e.target.value);
  }

  const updateWordCount = (e: FormEvent) => {
    e.preventDefault();
    updateDailyTotal(Number(newWords));
    setNewWords('');
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
    }
    
    setTotal(prev => prev + newWords);
    setEntries((prevEntries: Entry[]) => [...prevEntries, newEntry]);
  }

  return (
    <section className='word-tracker-container'>
      <label>Update today's word count</label>
      <form onSubmit={updateWordCount}>
        <input placeholder='####' type='number' value={newWords} onChange={handleInputChange}/>
        <button type='submit'>+ Add</button>
      </form>
      <p>Today's total: {total}</p>
    </section>
  )

}

export default WordTracker;