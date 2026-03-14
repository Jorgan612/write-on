import { useState, ChangeEvent, useEffect } from 'react';
import './warmup.scss';
import { prompts as InitialPrompts, excerpts } from '../datasets/prompts';
import { IconType } from "react-icons";
import { FaPenFancy, FaClipboardCheck, FaClipboardList, FaNotesMedical, FaTrashAlt } from "react-icons/fa";

interface Prompt {
    id: number;
    prompt: string;
    completed: number;
    discarded: number;
}
interface Tool {
    icon: IconType;
    id: string;
    toolTip: string;
}

const tools: Tool[] = [
    {icon: FaPenFancy, id: 'write', toolTip: 'Writing Space'},
    {icon: FaNotesMedical, id: 'add', toolTip: 'Add Prompt'},
    {icon: FaClipboardList, id: 'incomplete', toolTip: 'Prompt List'},
    {icon: FaClipboardCheck, id: 'complete', toolTip: 'Completed Prompts'},
    {icon: FaTrashAlt, id: 'discard', toolTip: 'Discarded Prompts'},
];

function Warmup() {
    const [userInput, setUserInput] = useState<string>("");
    const [currentTool, setCurrentTool] = useState<string>("write");
    const [selectedPrompt, setSelectedPrompt] = useState<string>("");
    const [promptList, setPromptList] = useState<Prompt[]>(() => {
        const saved = localStorage.getItem("user_prompts");
        return saved ? JSON.parse(saved) : InitialPrompts;
    });
    const [discardList, setDiscardList] = useState<Prompt[]>(() => {
        const discarded = localStorage.getItem("user_discards");
        return discarded ? JSON.parse(discarded) : [];
    });

    useEffect(() => {
        localStorage.setItem("user_prompts", JSON.stringify(promptList));
        localStorage.setItem("user_discards", JSON.stringify(discardList));
    }, [promptList, discardList]);
    
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
        };

        setPromptList([...promptList, newPrompt]);

        setUserInput("");
    };

    const discardPrompt = (prompt: Prompt) => {
        setDiscardList([...discardList, prompt]);
        setPromptList(promptList.filter(p => p.id !== prompt.id));
    };

    const selectTool = (tool: any) => {
        setCurrentTool(tool.id);
    };

    return (
        <div className="warm-up-container">
            <div className='Toolbar-container'>
                {tools.map((tool: Tool) => {
                    const IconComponent = tool.icon;
                    return (
                        <div key={tool.id} className={`tool ${tool.id === currentTool ? 'selected': 'tool'}`} title={tool.toolTip}>
                            <IconComponent className='icon' id={tool.id} onClick={() => selectTool(tool)} />
                        </div>
                    )
                })}
            </div>
            <div className={`writing-view ${currentTool === 'write' ? 'show-view' : 'hide-view'}`}>
                WRITING SPACE
            </div>
            <div className={`add-view ${currentTool === 'add' ? 'show-view' : 'hide-view'}`}>
                <label className='add-prompt-label'>
                    New Prompt
                </label>
                <textarea placeholder="Type out a new prompt here then click Add!" id="prompt" name="prompt" value={userInput} onChange={handleNewPrompt}></textarea>
                <button onClick={addNewPrompt}>Add</button>
            </div>
            <div className={`incomplete-view ${currentTool === 'incomplete' ? 'show-view' : 'hide-view'}`}>
                <ul>
                    {promptList.map((p: Prompt) => (
                        <div key={p.id}>
                            <button onClick={() => discardPrompt(p)}>X</button>
                            <li>{p.prompt}</li>
                        </div>
                    ))}
                </ul>

            </div>
            <div className={`complete-view ${currentTool === 'complete' ? 'show-view' : 'hide-view'}`}>
                COMPLETED PROMPTS
            </div>
            <div className={`discard-view ${currentTool === 'discard' ? 'show-view' : 'hide-view'}`}>
                <p>Discards</p>
                <ul>
                    {discardList.map((p: Prompt) => (
                        <li key={p.id}>{p.prompt}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Warmup;