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

function Warmup() {
    const [userInput, setUserInput] = useState<string>("");
    const [currentTool, setCurrentTool] = useState<string>("write");
    const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
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
    },
    {
        id: 3,
        prompt: '',
        completed: 1,
        discarded: 0,
        excerpt: "This is an example of a free writing exercise in which the user does not use a prompt, but instead, uses the writing space textarea to just free write whatever comes to mind."
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

    const updatePrompt =  () => {
        console.log('Updated!')
        // will need to update existing prompt if prompt generated and save is clicked
        //or
        // create a new prompt with empty string prompt property if user decides to free write.
        // also need to 
    }

    const handleUpdatePrompt = (e: ChangeEvent<HTMLTextAreaElement>) => {
        // capture user input
        setUserInput(e.target.value);
        console.log('handleUpdatePrompt', userInput)
    }

    const getRandomPrompt =() => {

        if (promptList.length === 0) {
            throw new Error("Oops! You don't have any prompts. Add prompts in order to use this feature.")
        }

        const index = Math.floor(Math.random() * promptList.length);
        
        const randomPrompt = promptList[index]!;

        setSelectedPrompt(randomPrompt);

        console.log('test')

        // add logic to select a random prompt from the prompt list.
        // Once obtained, display prompt in button position with an icon to cancel if prompt does not spark joy.
        // When save is clicked, this prompt obj should be updated within the prompt list.
        // If no prompt selected and save is clicked, entry should be saved as a new entry with empty string prompt
    }

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
                <p>Welcome to the writing space. Happy writing!</p>
                <div className='random-container'>
                    {!selectedPrompt && <button onClick={getRandomPrompt}>Reveal Prompt</button>}
                    {selectedPrompt && <div className='random-prompt'>{selectedPrompt.prompt}</div>}
                </div>
                <div className='writing-space'>
                    <textarea placeholder="Start writing to begin a free write exercise, or click Reveal Prompt to write a prompt response." id="prompt" name="prompt" value={userInput} onChange={handleUpdatePrompt} maxLength={1500}></textarea>
                    <button onClick={updatePrompt}>Save</button>
                </div>
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