import '../goals/activeGoals.scss';
import userGoals from '../datasets/datasets';
import checkIcon from '../assets/icons/check_circle.svg';

function ActiveGoals() {
    return (
        <div className="active-goals-container">
            <div className='goal-header'>Current Goals:</div>
            <div className='list'>
                <div className='goals-list-container'>
                    {userGoals.map((goal) => (
                        <div className='item'>
                            <svg className='icon' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#7FA1C3"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                            <div>{ goal.name } : {goal.value}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='footer-container'>
                <div className='new-goal-button'>New Goal</div>
            </div>
        </div>
    );
}

export default ActiveGoals;