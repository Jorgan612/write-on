import warmup from '../warm-up/Warmup';
import './Card.scss';
import { Prompt, Icon } from '../interfaces/interfaces';

interface CardProps {
    p: Prompt;         
    options: Icon[];   
    discardPrompt: (prompt: Prompt) => void;
    currentTool: string;
}

function Card({p, options, discardPrompt, currentTool}: CardProps) {
    return (
        <li className="list-item">
            <div className='options-container'>
                {options.map((option: Icon) => {
                    const IconComponent = option.icon;
                    return (
                        <div key={option.id} className='option' title={option.toolTip}>
                            <IconComponent className='icon' id={option.id} />
                        </div>
                    )
                })}
                {/* <button onClick={() => discardPrompt(p)} title='Move to Discard List'>
                    X
                </button> */}
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