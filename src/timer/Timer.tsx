import './Timer.scss';


function Timer() {
    let isStarted = false;

    return (
        <div className="timer-container">
            <button>{!isStarted ? 'Start' : 'Pause'}</button>
            <p className='timer-text'>00:00</p>
            <button>Stop</button>

        </div>
    )
}



export default Timer;