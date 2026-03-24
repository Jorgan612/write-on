import { useState, ChangeEvent, useEffect } from 'react';
import { Prompt, Icon } from '../interfaces/interfaces';
import Card  from '../card/Card';
import './warmup.scss';
import { 
    FaPenFancy, 
    FaClipboardCheck, 
    FaClipboardList, 
    FaNotesMedical, 
    FaTrashAlt, 
    FaCopy, 
    FaFileExcel, 
    FaFileExport, 
    FaFileSignature,
    FaBackspace,
    FaFeather
} from "react-icons/fa";


const tools: Icon[] = [
    {icon: FaPenFancy, id: 'write', toolTip: 'Writing Space'},
    {icon: FaNotesMedical, id: 'add', toolTip: 'Add Prompt'},
    {icon: FaClipboardList, id: 'incomplete', toolTip: 'Prompt List'},
    {icon: FaClipboardCheck, id: 'complete', toolTip: 'Completed Prompts'},
    {icon: FaTrashAlt, id: 'discard', toolTip: 'Discarded Prompts'},
];

const options: Icon[] = [
    {icon: FaFeather, id: 'select', toolTip: 'Select Prompt'},
    {icon: FaFileSignature, id: 'edit', toolTip: 'Edit'},
    {icon: FaCopy, id: 'copy', toolTip: 'Copy'},
    {icon: FaFileExport, id: 'move', toolTip: 'Move'},
    {icon: FaFileExcel, id: 'delete', toolTip: 'Delete'},
];

function Warmup() {
    const [userInput, setUserInput] = useState<string>("");
    const [currentTool, setCurrentTool] = useState<string>("write");
    const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
    const [showMsg, setShowMsg] = useState<boolean>(false);
    const [editing, setEditing] = useState<boolean>(false);
    const [promptList, setPromptList] = useState<Prompt[]>(() => {
        const saved = localStorage.getItem("user_prompts");
        return saved ? JSON.parse(saved) : [];
    });
    const [discardList, setDiscardList] = useState<Prompt[]>(() => {
        const discarded = localStorage.getItem("user_discards");
        return discarded ? JSON.parse(discarded) : [];
    });
    const [completedList, setCompletedList] = useState<Prompt[]>(() =>  {
        const completed = localStorage.getItem("user_completed");
        return completed ? JSON.parse(completed) : [];
    });

    

    useEffect(() => {
        localStorage.setItem("user_prompts", JSON.stringify(promptList));
        localStorage.setItem("user_discards", JSON.stringify(discardList));
        localStorage.setItem("user_completed", JSON.stringify(completedList));
    }, [promptList, discardList, completedList]);
    
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

        setPromptList(prevList => [newPrompt, ...prevList]);

        setUserInput("");
        setShowMsg(true);

        setTimeout(() => {
            setShowMsg(false);
        }, 1000);

    };

    const movePrompt = (prompt: Prompt) => {
        if (currentTool === 'discard') {
            setPromptList(prevList => [prompt, ...prevList]);
            setDiscardList(prevList =>  prevList.filter(p => p.id !== prompt.id));
        } else {
            setDiscardList(prevList => [prompt, ...prevList]);
            setPromptList(prevList =>  prevList.filter(p => p.id !== prompt.id));
        }
    };

    const deletePrompt = (prompt: Prompt) => {
        if (currentTool === 'incomplete') {
            setPromptList(prevList => prevList.filter(p => p.id !== prompt.id));
        } 
        
        if (currentTool === 'discard') {
            setDiscardList(prevList => prevList.filter(p => p.id !== prompt.id));
        }
        
        if (currentTool === 'complete') {
            setCompletedList(prevList => prevList.filter(p => p.id !== prompt.id));
        }
    };

    const editPrompt = (prompt: Prompt) => {
        setUserInput(prompt.prompt);
        setEditing(true);
        setSelectedPrompt(prompt);
    };

    const selectPrompt = (prompt: Prompt) => {
        setSelectedPrompt(prompt);
        setCurrentTool('write');
    };

    const selectTool = (tool: any) => {
        setCurrentTool(tool.id);
    };

    const savePrompt =  () => {
        if (selectedPrompt && !editing) {
            const updatedPrompt = {
                ...selectedPrompt,
                completed: 1,
                excerpt: userInput
            };

            setCompletedList(prevList => [updatedPrompt, ...prevList]);
            setPromptList(prevList => prevList.filter((prompt) => prompt.id !== selectedPrompt.id));
        } else if (editing) {
            if (currentTool === 'incomplete') {
                setPromptList(prevList => prevList.map(p => p.id === selectedPrompt?.id ? {...p, prompt: userInput} : p));
                setEditing(false);
            };
            
        
            if (currentTool === 'discard') {
                setDiscardList(prevList => prevList.map(p => p.id === selectedPrompt?.id ? {...p, prompt: userInput} : p));
                setEditing(false);
            };

        } else {
            if (userInput) {
                let newPrompt = {
                    id: Date.now(),
                    prompt: '',
                    completed: 1,
                    discarded: 0,
                    excerpt: userInput
                };

                setCompletedList([newPrompt, ...completedList]);
            }
        }
        setUserInput('');
        setSelectedPrompt(null);
    };

    const cancelAction = () => {
        setSelectedPrompt(null);
        setUserInput('');

        if (editing) {
            setEditing(false);
        }
    };

    const handleSavePrompt = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setUserInput(e.target.value);
    };

    const getRandomPrompt =() => {

        if (promptList.length === 0) {
            throw new Error("Oops! You don't have any prompts. Add prompts in order to use this feature.");
        }

        const index = Math.floor(Math.random() * promptList.length);
        
        const randomPrompt = promptList[index]!;

        setSelectedPrompt(randomPrompt);
    };

    return (
        <div className="warm-up-container">
            <div className='Toolbar-container'>
                {tools.map((tool: Icon) => {
                    const IconComponent = tool.icon;
                    return (
                        <div key={tool.id} className={`tool ${tool.id === currentTool ? 'selected' : 'tool'}`} title={tool.toolTip}>
                            <IconComponent className='icon' id={tool.id} onClick={() => selectTool(tool)} />
                        </div>
                    )
                })}
            </div>
            <div className={`writing-view ${currentTool === 'write' ? 'show-view' : 'hide-view'}`}>
                <div className={`random-container ${selectedPrompt ? 'has-prompt' : ''}`}>
                    {!selectedPrompt ? (
                        <button onClick={getRandomPrompt}>Reveal Prompt</button>
                    ) : (
                        <div className={`random-prompt ${selectedPrompt.prompt.length > 1000 ? 'random-prompt-long' : 'random-prompt'}`}>
                        <div className={`back-icon ${selectedPrompt ? 'show-msg' : 'hide-msg'}`}>
                            <FaBackspace className='icon back' onClick={cancelAction}  title='Cancel' />
                        </div>
                            {selectedPrompt.prompt}
                        </div>
                    )}
                </div>
                <div className='writing-space'>
                    <textarea placeholder="Happy writing!" id="prompt" name="prompt" value={userInput} onChange={handleSavePrompt} ></textarea>
                    <div>
                        <button onClick={savePrompt} disabled={!userInput ? true : false} title={!userInput ? 'Write something to save' : 'Save'}>Save</button>
                        <button onClick={cancelAction} disabled={!userInput ? true : false} title={userInput ? 'Cancel' : ''}>Cancel</button>
                    </div>
                </div>
            </div>
            <div className={`add-view ${currentTool === 'add' ? 'show-view' : 'hide-view'}`}>
                <p className={`message ${showMsg ? 'show-msg': 'hide-msg'}`}>
                    Prompt added!
                </p>
                <textarea placeholder="Write a new prompt here, then click Add!" id="prompt" name="prompt" value={userInput} onChange={handleNewPrompt} maxLength={1500}></textarea>
                <div>
                    <button onClick={addNewPrompt} disabled={!userInput ? true : false} title={!userInput ? 'Write a prompt to add' : 'Add'}>+ Add</button>
                    <button onClick={cancelAction} disabled={!userInput ? true : false} title={userInput ? 'Cancel' : ''}>Cancel</button>
                </div>
            </div>
            <div className={`incomplete-view ${currentTool === 'incomplete' ? 'show-view' : 'hide-view'}`}>
                <ul className='list-container'>
                    {promptList.map((p: Prompt) => (
                        <Card key={p.id} p={p} options={options} movePrompt={movePrompt} deletePrompt={deletePrompt} selectPrompt={selectPrompt} editPrompt={editPrompt} currentTool={currentTool}/>
                    ))}
                </ul>
            </div>
            <div className={`complete-view ${currentTool === 'complete' ? 'show-view' : 'hide-view'}`}>
                <ul className='list-container'>
                    {completedList.map((p:Prompt) => (
                        <Card key={p.id} p={p} options={options} movePrompt={movePrompt} deletePrompt={deletePrompt} selectPrompt={selectPrompt} editPrompt={editPrompt} currentTool={currentTool} />
                    ))}
                </ul>
            </div>
            <div className={`discard-view ${currentTool === 'discard' ? 'show-view' : 'hide-view'}`}>
                <ul className='list-container'>
                    {discardList.map((p: Prompt) => (
                        <Card key={p.id} p={p} options={options} movePrompt={movePrompt} deletePrompt={deletePrompt} selectPrompt={selectPrompt} editPrompt={editPrompt} currentTool={currentTool} />
                    ))}
                </ul>
            </div>
            <div className={`editing-view ${editing ? 'show-view' : 'hide-view'}`}>
                <label>Editing Prompt</label>
                <textarea value={userInput} onChange={handleSavePrompt}>
                </textarea>
                    <div>
                        <button onClick={savePrompt} disabled={!userInput ? true : false} title='Save'>Save</button>
                        <button onClick={cancelAction} title='Cancel'>Cancel</button>
                    </div>
            </div>
        </div>
    );
};

export default Warmup;