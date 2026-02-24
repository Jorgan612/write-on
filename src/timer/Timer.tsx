import { useState, useEffect } from 'react';
import './Timer.scss';


function Timer() {
    const [time, setTime]  = useState();
    const [timerStarted, setTimerStarted] = useState<boolean>(false);

    useEffect(() => {
        console.log('useEffect')

    }, [timerStarted])

    const startTimer = () => {
        setTimerStarted(true);
        console.log('timer started!')
        console.log('timerStarted', timerStarted)
    }

    return (
        <div className="timer-container">
            <button onClick={startTimer}>{true ? 'Start' : 'Pause'}</button>
            <p className='timer-text'>00:00</p>
            <button>Stop</button>

        </div>
    )
}



export default Timer;