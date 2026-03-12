import { useState, ChangeEvent } from 'react';
import './warmup.scss';
import { prompts, excerpts } from '../datasets/prompts';

function Warmup() {
    const [userInput, setUserInput] = useState<string>("");
    
    const handleNewPrompt = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setUserInput(e.target.value);
    }
    
    const addNewPrompt = (() => {
        let newPrompt = {
            id: Date.now(),
            prompt: userInput,
            completed: 0,
            discarded: 0
        }

        prompts.push(newPrompt);
        setUserInput("");
    })

    return (
        <div className="warm-up-container">
            <label className='add-prompt-label'>
                Type out a new prompt then click Add!
            </label>
            <textarea id="prompt" name="prompt" value={userInput} onChange={handleNewPrompt}></textarea>
            <button onClick={addNewPrompt}>Add</button>
        </div>
    );
}

export default Warmup;