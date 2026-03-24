import './Card.scss';
import { Prompt, Icon } from '../interfaces/interfaces';

interface CardProps {
    p: Prompt;         
    options: Icon[];   
    movePrompt: (prompt: Prompt) => void;
    currentTool: string;
}

function Card({p, options, movePrompt, currentTool}: CardProps) {

    const selectOption = (id: string, prompt: Prompt) =>  {
        switch (id) {
            case 'download':
                break;
            case 'delete':
                break;
            case 'move':
                    movePrompt(prompt);
                break;
            case 'edit':
                break;
        }
    }

    return (
        <li className="list-item">
            <div className='options-container'>
                {options.map((option: Icon) => {
                    const IconComponent = option.icon;
                    return (
                        <div key={option.id} className='option' title={currentTool === 'incomplete' ? 'Move to Discard' : currentTool === 'discard' ? 'Move to Prompt List' : option.toolTip} onClick={() => selectOption(option.id, p)}>
                            <IconComponent className={`icon ${currentTool === 'complete' && option.id === 'move' ? 'hide-option': ''}`} id={option.id} />
                        </div>
                    )
                })}
            </div>
            <div className='prompt-text'>
                <label> {p.prompt && 'Prompt'} </label>
                <p>
                    {p.prompt}
                </p>
                <div className={p.completed && currentTool === 'complete' ? `exerpt-text` : 'hide-view'}>
                    <label> {p.prompt ? 'Prompt Response' : 'Free Write'} </label>
                    <p>
                        {p.excerpt}
                    </p>
                </div>
            </div>
        </li>  
    )
}

export default Card;