import { useState, FormEvent, ChangeEvent } from 'react';
import dayjs from 'dayjs';

import './WordTracker.scss';

function WordTracker({setEntries}) {
  const [newWords, setNewWords] = useState<string>('');
  let [total, setTotal] = useState<number>(0);
  // const [entry, setEntry] = useState<object>({id: 0, total: 0, date: null});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewWords(e.target.value);
  }

  const updateWordCount = (e: FormEvent) => {
    e.preventDefault();
    updateDailyTotal(newWords)
    setNewWords('');
  }

  const updateDailyTotal = (newWords: string) => {
    const wordCount = Number(newWords);

    const newEntry = {
      id: Date.now(),
      total: wordCount,
      date: dayjs().format('YYYY-MM-DD')
    }
    
    setTotal(prev => prev + wordCount);

    setEntries((prevEntries: any) => [...prevEntries, newEntry]);
  }

  return (
    <section className='word-tracker-container'>
      <label>Update Word Count</label>
      <form onSubmit={updateWordCount}>
        <input placeholder='####' type='number' value={newWords} onChange={handleInputChange}/>
        <button type='submit'>Add</button>
      </form>
      <p>Today's total: {total}</p>
    </section>
  )

}

export default WordTracker;