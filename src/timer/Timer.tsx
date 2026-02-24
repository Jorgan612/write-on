import './Timer.scss';


function Timer() {
    let isStarted = false;

    return (
        <div className="timer-container">
            <p className='timer-text'>00:00</p>
            <div>
                <button>{!isStarted ? 'Start' : 'Pause'}</button>
                <button>Stop</button>
            </div>
        </div>
    )
}



export default Timer;