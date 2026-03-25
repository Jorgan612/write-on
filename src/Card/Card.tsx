import './Card.scss';
import { Prompt, Icon } from '../interfaces/interfaces';
import { FaChevronLeft } from "react-icons/fa";

interface CardProps {
    p: Prompt;
    options: Icon[];
    selectOption: (id: string, prompt: Prompt) => void;
    currentTool: string;
    selectedCard: Prompt | null;
    selectCard: (prompt: Prompt) => void;
    closeCard: (e: React.MouseEvent) => void;
}

function Card({p, options, selectOption, currentTool, selectedCard, selectCard, closeCard}: CardProps) {

    return (
        <li className={`list-item ${selectedCard?.id === p.id ? 'selected-item' : ''}`} onClick={() => selectCard(p)}>
            <div className={`options-container ${selectedCard?.id === p.id ? 'is-visible'  : 'is-hidden'}`}>
                {options.map((option: Icon) => {
                    const IconComponent = option.icon;
                    return (
                        <div key={option.id} className='option' title={ (option.id !== 'move') ? option.toolTip : currentTool === 'incomplete' ? 'Move to Discard' : currentTool === 'discard' ? 'Move to Prompt List' : ''} onClick={() => selectOption(option.id, p)}>
                            <IconComponent className={`icon ${currentTool === 'complete' && (option.id === 'move' || option.id === 'select' || option.id === 'edit')  ? 'hide-option': ''}`} id={option.id} />
                        </div>
                    )
                })}
            </div>
            <div className='prompt-text'>
                <label> {(p.prompt && currentTool === 'complete') && 'Prompt'} </label>
                <p>
                    {p.prompt}
                </p>
                <div className={p.completed && currentTool === 'complete' ? `exerpt-text` : 'hide-view'}>
                    <label> {p.prompt ? 'Prompt Response' : 'Free Write'} </label>
                    <p>
                        {p.excerpt}
                    </p>
                </div>
                <div className={`close ${selectedCard?.id === p.id ? 'is-visible' : 'is-hidden'}`} onClick={closeCard}>
                    <FaChevronLeft />
                </div>
            </div>
        </li>
    )
}

export default Card;