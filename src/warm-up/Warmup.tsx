import './warmup.scss'
import { prompts, excerpts } from '../datasets/prompts';

function Warmup() {
    console.log('prompts', prompts)
    console.log('excerpts', excerpts)
    return (
        <div className="warm-up-container">
            <label className='add-prompt-label'>
                Type out a new prompt then click Add!
            </label>
            <textarea></textarea>
        </div>
    );
}

export default Warmup;