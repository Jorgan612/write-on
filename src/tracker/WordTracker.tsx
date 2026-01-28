import { useState, FormEvent, ChangeEvent } from 'react';
import dayjs from 'dayjs';
import { Entry } from '../interfaces/interfaces';
import './WordTracker.scss';


interface WordTrackerProps {
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
  setCombinedEntries: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}


function WordTracker({setEntries}: WordTrackerProps) {
  const [newWords, setNewWords] = useState<string>('');
  let [total, setTotal] = useState<number>(0);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewWords(e.target.value);
  }

  const updateWordCount = (e: FormEvent) => {
    e.preventDefault();
    updateDailyTotal(newWords);
    setNewWords('');
  }

  const updateDailyTotal = (newWords: string) => {
    const wordCount = Number(newWords);

    const newEntry = {
      id: Date.now(),
      total: wordCount,
      date: dayjs().format('YYYY-MM-DD'),
      year: dayjs().year(),
      month: dayjs().month(),
      day: dayjs().date(),
      time: new Date(Date.now()).toTimeString()
    }
    
    setTotal(prev => prev + wordCount);
    setEntries((prevEntries: Entry[]) => [...prevEntries, newEntry]);
  }

  return (
    <section className='word-tracker-container'>
      <label>Update Word Count</label>
      <form onSubmit={updateWordCount}>
        <input placeholder='####' type='number' value={newWords} onChange={handleInputChange}/>
        <button type='submit'>+</button>
      </form>
      <p>Today's total: {total}</p>
    </section>
  )

}

export default WordTracker;