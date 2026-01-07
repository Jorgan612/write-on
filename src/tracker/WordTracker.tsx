import { useState } from 'react';
import './WordTracker.scss';

function WordTracker() {
  const [newWords, setNewWords] = useState(0);

  const addWords = () => {
    console.log('setNewWords', newWords);
  }

  return (
    <section className='word-tracker-container'> 
      <label>Update Word Count</label>
      <input  />
      <button>Add</button>
      <p>Congrats! You've added {newWords} words to your WIP!</p>
    </section>
  )

}

export default WordTracker;