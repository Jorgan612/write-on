import { useState, ChangeEvent, useEffect } from 'react';
import './warmup.scss';
import { prompts as InitialPrompts, excerpts } from '../datasets/prompts';

interface Prompt {
    id: number;
    prompt: string;
    completed: number;
    discarded: number;
}

function Warmup() {
    const [userInput, setUserInput] = useState<string>("");
    const [promptList, setPromptList] = useState<Prompt[]>(() => {
        const saved = localStorage.getItem("user_prompts");
        return saved ? JSON.parse(saved) : InitialPrompts
    });

    useEffect(() => {
        localStorage.setItem("user_prompts", JSON.stringify(promptList));
    }, [promptList]);
    
    const handleNewPrompt = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setUserInput(e.target.value);
    };
    
    const addNewPrompt = () => {

        if (!userInput.trim()) {
            return;
        }

        let newPrompt = {
            id: Date.now(),
            prompt: userInput,
            completed: 0,
            discarded: 0
        }

        setPromptList([...promptList, newPrompt]);

        setUserInput("");
    }

    return (
        <div className="warm-up-container">
            <label className='add-prompt-label'>
                Type out a new prompt then click Add!
            </label>
            <textarea id="prompt" name="prompt" value={userInput} onChange={handleNewPrompt}></textarea>
            <button onClick={addNewPrompt}>Add</button>
            <ul>
                {promptList.map((p: any) => (
                    <li key={p.id}>{p.prompt}</li>
                ))}
            </ul>
        </div>
    );
}

export default Warmup;