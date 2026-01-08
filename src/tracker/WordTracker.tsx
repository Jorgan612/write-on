import { useState, FormEvent, ChangeEvent } from 'react';
import './WordTracker.scss';

function WordTracker() {
  const [newWords, setNewWords] = useState<string>('');
  let [total, setTotal] = useState<number>(0);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewWords(e.target.value);
  }

  const updateWordCount = (e: FormEvent) => {
    e.preventDefault();
    setTotal(prev => prev + Number(newWords));
    setNewWords('');
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