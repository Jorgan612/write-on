import { useState, ChangeEvent, useEffect } from 'react';
import { Prompt, Icon } from '../interfaces/interfaces';
import Card  from '../card/Card';
import './warmup.scss';
import { prompts as InitialPrompts, excerpts } from '../datasets/prompts';
import { 
    FaPenFancy, 
    FaClipboardCheck, 
    FaClipboardList, 
    FaNotesMedical, 
    FaTrashAlt, 
    FaFileDownload, 
    FaFileExcel, 
    FaFileExport, 
    FaFileSignature 
} from "react-icons/fa";


const tools: Icon[] = [
    {icon: FaPenFancy, id: 'write', toolTip: 'Writing Space'},
    {icon: FaNotesMedical, id: 'add', toolTip: 'Add Prompt'},
    {icon: FaClipboardList, id: 'incomplete', toolTip: 'Prompt List'},
    {icon: FaClipboardCheck, id: 'complete', toolTip: 'Completed Prompts'},
    {icon: FaTrashAlt, id: 'discard', toolTip: 'Discarded Prompts'},
];

const options: Icon[] = [
    {icon: FaFileDownload, id: 'download', toolTip: 'Download'},
    {icon: FaFileExcel, id: 'delete', toolTip: 'Delete Permanently'},
    {icon: FaFileExport, id: 'MOVE', toolTip: 'Move'},
    {icon: FaFileSignature, id: 'edit', toolTip: 'Edit'},
];
// Need a new component for item cards - pass options that that so that the item card component can be reused for each view's list.

function Warmup() {
    const [userInput, setUserInput] = useState<string>("");
    const [currentTool, setCurrentTool] = useState<string>("write");
    const [selectedPrompt, setSelectedPrompt] = useState<string>("");
    const [showMsg, setShowMsg] = useState<boolean>(false);
    const [promptList, setPromptList] = useState<Prompt[]>(() => {
        const saved = localStorage.getItem("user_prompts");
        return saved ? JSON.parse(saved) : InitialPrompts;
    });
    const [discardList, setDiscardList] = useState<Prompt[]>(() => {
        const discarded = localStorage.getItem("user_discards");
        return discarded ? JSON.parse(discarded) : [];
    });

    const [completedList, setCompletedList] = useState<Prompt[]>([{
        id: 1,
        prompt: 'Childhood memory from the perspective of some else who was present',
        completed: 1,
        discarded: 0,
        excerpt: 'This is an example of a completed writing prompt excerpt! This is an example of a completed writing prompt excerpt! This is an example of a completed writing prompt excerpt! This is an example of a completed writing prompt excerpt!This is an example of a completed writing prompt excerpt!This is an example of a completed writing prompt excerpt!This is an example of a completed writing prompt excerpt!This is an example of a completed writing prompt excerpt!This is an example of a completed writing prompt excerpt!This is an example of a completed writing prompt excerpt!This is an example of a completed writing prompt excerpt!This is an example of a completed writing prompt excerpt!This is an example of a completed writing prompt excerpt!This is an example of a completed writing prompt excerpt! This is an example of a completed writing prompt excerpt! This is an example of a completed writing prompt excerpt! This is an example of a completed writing prompt excerpt! This is an example of a completed writing prompt excerpt!This is an example of a completed writing prompt excerpt!This is an example of a completed writing prompt excerpt!This is an example of a completed writing prompt excerpt!This is an example of a completed writing prompt excerpt!This is an example of a completed writing prompt excerpt! This is an example of a completed writing prompt excerpt!This is an example of a completed writing prompt excerpt!This is an example of a completed writing prompt excerpt! This is an example of a completed writing prompt excerpt! '
    },
    {
        id: 2,
        prompt: 'You’re possessed by a demon, you quick realize he’s never done this before',
        completed: 1,
        discarded: 0,
        excerpt: "This is a reallyshort excerpt to test styling and see what it looks like without a wall of text written."
    }]);

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
            discarded: 0,
            excerpt: ''
        };

        console.log('test how input shows with line breaks?', newPrompt)

        setPromptList([...promptList, newPrompt]);

        setUserInput("");
        setShowMsg(true);

        setTimeout(() => {
            setShowMsg(false);
        }, 1000);

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
                {tools.map((tool: Icon) => {
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
                <p className={`message ${showMsg ? 'show-msg': 'hide-msg'}`}>
                    Prompt added!
                </p>
                <label className='add-prompt-label'>
                    New Prompt
                </label>
                <textarea placeholder="Write a new prompt here, then click Add!" id="prompt" name="prompt" value={userInput} onChange={handleNewPrompt} maxLength={1500}></textarea>
                <button onClick={addNewPrompt}>+ Add</button>
            </div>
            <div className={`incomplete-view ${currentTool === 'incomplete' ? 'show-view' : 'hide-view'}`}>
                <ul className='list-container'>
                    {promptList.map((p: Prompt) => (
                        <Card key={p.id} p={p} options={options} discardPrompt={discardPrompt} currentTool={currentTool}/>
                    ))}
                </ul>
            </div>
            <div className={`complete-view ${currentTool === 'complete' ? 'show-view' : 'hide-view'}`}>
                <ul className='list-container'>
                    {completedList.map((p:Prompt) => (
                        <Card key={p.id} p={p} options={options} discardPrompt={discardPrompt} currentTool={currentTool} />
                    ))}
                </ul>
            </div>
            <div className={`discard-view ${currentTool === 'discard' ? 'show-view' : 'hide-view'}`}>
                <ul className='list-container'>
                    {discardList.map((p: Prompt) => (
                        <Card key={p.id} p={p} options={options} discardPrompt={discardPrompt} currentTool={currentTool} />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Warmup;