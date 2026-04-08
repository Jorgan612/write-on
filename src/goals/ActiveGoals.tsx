import '../goals/activeGoals.scss';
import { FaCheckCircle, FaNotesMedical, FaClipboardList, FaClipboardCheck, FaFileSignature, FaFileExcel } from "react-icons/fa";
import {userGoals, goalOptions} from '../datasets/datasets';
import { useState, useEffect } from 'react';
import { Goal, Icon } from '../interfaces/interfaces';
import MenuDropdown from '../dropdown/MenuDropdown';
import Form from '../forms/Form';

const tools: Icon[] = [
    {icon: FaNotesMedical, id: 'add', toolTip: 'Add Goal'},
    {icon: FaClipboardList, id: 'incomplete', toolTip: 'Goal List'},
    {icon: FaClipboardCheck, id: 'complete', toolTip: 'Completed Goals'},
    // {icon: FaTrashAlt, id: 'discard', toolTip: 'Discarded Goals'},
];

const options: Icon[] = [
    {icon: FaFileSignature, id: 'edit', toolTip: 'Edit'},
    {icon: FaFileExcel, id: 'delete', toolTip: 'Delete'},
];

function ActiveGoals() {
    const [currentTool, setCurrentTool] = useState<string>("add");


    const [formOpened, setFormOpened] = useState(false);
    const [formComplete, setFormComplete] = useState(false);
    const [newGoal, setNewGoal] = useState('')

    const [goals, setGoals] = useState<Goal[]>(() => {
        const goal = localStorage.getItem('user_goal');
        return goal ? JSON.parse(goal) : [];
      });

    useEffect(() => { 
        localStorage.setItem("user_goal", JSON.stringify(goals));

    }, [newGoal, goals]);

    const selectTool = (tool: any) => {
        setCurrentTool(tool.id);
    };


    const openNewGoalForm = () => {
        setFormOpened( prev => !prev );
        if (formOpened && formComplete) {
            console.log('formOpened && formComplete')
            // If the menu is true meaning, the form is open AND form is complete (will need to add logic once inputs added and/or also disable Add Goal button to avoid edge case) then addGoal() to user's goal list
            addGoal();
        }
    }

    const addGoal = () => {
        console.log('added goal!')
    }

    return (
        <div className="active-goals-container">
            <div className='Toolbar-container'>
                {tools.map((tool: Icon) => {
                    const IconComponent = tool.icon;
                    return (
                        <div key={tool.id} className={`tool ${tool.id === currentTool ? 'selected' : 'tool'}`} title={tool.toolTip} onClick={() => selectTool(tool)}>
                            <IconComponent className='icon' id={tool.id} />
                        </div>
                    )
                })}
            </div>
            
            <div className={`add-view ${formOpened ? 'show' : 'hide'}`}> 
                    
                { formOpened && <MenuDropdown options={goalOptions} newGoal={setNewGoal} goal={newGoal} /> }

                { newGoal && <Form newGoal={newGoal} /> }
            </div>
            {/* <div className='footer-container'>
                <button className='new-goal-button' onClick={openNewGoalForm}>{ !formOpened ? 'New Goal' : 'Add Goal'}</button>
            </div> */}

            <div className={`goals-list-view ${currentTool === 'incomplete' ? 'show' : 'hide'}`}>
                {userGoals.map((goal) => (
                    <div className='item' key={goal.id}>
                        <FaCheckCircle />
                        <div>{ goal.name } : {goal.value}</div>
                    </div>
                ))}
            </div>
            

            <div className={`completed-goals-view ${currentTool === 'completed'? 'show' : 'hide'}`}>

            </div>

            
        </div>
    );
}

export default ActiveGoals;
    // { formOpened && <div className='add-view'> 
            
    //     { formOpened && <MenuDropdown options={goalOptions} newGoal={setNewGoal} goal={newGoal} /> }

    //     { newGoal && <Form newGoal={newGoal} /> }
    // </div> }