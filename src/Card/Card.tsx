import warmup from '../warm-up/Warmup';
import './Card.scss';
import { Prompt, Icon } from '../interfaces/interfaces';

interface CardProps {
    p: Prompt;         
    options: Icon[];   
    discardPrompt: (prompt: Prompt) => void;
}

function Card({p, options, discardPrompt}: CardProps) {
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
                {p.prompt}
            </div>
            <div className={p.completed ? `exerpt-text` : 'hide-view'}>

            </div>
        </li>  
    )
}

export default Card;