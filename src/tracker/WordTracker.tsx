import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import dayjs from 'dayjs';
import { Entry } from '../interfaces/interfaces';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';
import './WordTracker.scss';


interface WordTrackerProps {
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
  combinedEntries: Record<string, number>;
}


function WordTracker({setEntries, combinedEntries}: WordTrackerProps) {
  const [newWords, setNewWords] = useState<number>(0);
  let currentDay = dayjs().format('YYYY-MM-DD');

  useEffect(() => {
    setInitialEntry();
  }, []);


  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewWords(Number(e.target.value));
  };

  const increment = () => {
    setNewWords(prev => prev + 1);
  }

  const decrement = () => {
    setNewWords(prev => (prev > 0 ? prev - 1 : 0));
  }

  const updateWordCount = (e: FormEvent) => {
    e.preventDefault();
    updateDailyTotal(newWords);
    setNewWords(0);
  };

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
  };

  const setInitialEntry = () => {
    const firstEntry = {
      id: Date.now(),
      total: 0,
      date: dayjs().format('YYYY-MM-DD'),
      year: dayjs().year(),
      month: dayjs().month(),
      day: dayjs().date(),
      time: new Date(Date.now()).toTimeString()
    };

    setEntries((prevEntries: Entry[]) => [...prevEntries, firstEntry]);
  };

  return (
    <section className='word-tracker-container'>
      <label>Update today's word count</label>
      <form onSubmit={updateWordCount}>
        <input placeholder='####' type='number' value={newWords} onChange={handleInputChange}/>
        <div className="custom-buttons">
          <button type="button" onClick={increment} className="spin-btn">
            <FaCaretUp />
          </button>
          <button type="button" onClick={decrement} className="spin-btn">
            <FaCaretDown />
          </button>
        </div>
        <button type='submit'>+ Add</button>
      </form>
      <p>Today's total: {combinedEntries[currentDay]}</p>
    </section>
  )

}

export default WordTracker;