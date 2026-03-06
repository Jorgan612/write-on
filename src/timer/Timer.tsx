import { useState, useEffect, useRef } from 'react';
import { FaStopwatch, FaTimes, FaPlayCircle, FaPauseCircle, FaUndo } from 'react-icons/fa';
import './Timer.scss';

const Timer = () => {
    const [timer, setTimer] = useState<string>("00:00:00");
    const [secondsLeft, setSecondsLeft] = useState<number>(0);
    const [isPaused, setIsPaused] = useState<boolean>(true);
    const [inputHours, setInputHours] = useState<number>(0);
    const [inputMinutes, setInputMinutes] = useState<number>(0);
    const [inputSeconds, setInputSeconds] = useState<number>(0);

    const [showInputs, setShowInputs] = useState<boolean>(false);

    const Ref = useRef<ReturnType<typeof setInterval> | null>(null);
    
    const formatTime = (totalSeconds: number) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        return (
            (hours > 9 ? hours : "0" + hours) + ":" +
            (minutes > 9 ? minutes : "0" + minutes) + ":" +
            (seconds > 9 ? seconds : "0" + seconds)
        );
    };
    
    useEffect(() => {
        if (!isPaused && secondsLeft > 0) {
            Ref.current = setInterval(() => {
                setSecondsLeft((prev) => prev - 1);
            }, 1000);
        } else if (secondsLeft === 0) {
            setIsPaused(true);
            if (Ref.current) clearInterval(Ref.current);
        }
        
        return () => {
            if (Ref.current) clearInterval(Ref.current);
        };
    }, [isPaused, secondsLeft]);

    useEffect(() => {
        setTimer(formatTime(secondsLeft));
    }, [secondsLeft]);

    const handleStartStop = () => {
        if (isPaused) {
            if (secondsLeft === 0) {
                const total = (inputHours * 3600) + (inputMinutes * 60) + inputSeconds;
                setSecondsLeft(total);
            }
            setIsPaused(false);
        } else {
            setIsPaused(true);
        }
    };

    const onReset = () => {
        setIsPaused(true);
        setSecondsLeft(0);
        setTimer("00:00:00");
    };

    const clearTimerInputs = () => {
        console.log('CLEAR!', Ref.current)
        // logic to clear timer inputs and text go here
        
    }

    const showTimerInputs = () => {
        setShowInputs((prev) => !prev);

        if (showInputs) {
            clearTimerInputs();
        }
    }

    return (
        <div className="timer-container">
            <div className="timer-icon" onClick={showTimerInputs} >
                {!showInputs ? <FaStopwatch /> : <FaTimes />}
            </div>
            <div className={`timer-details ${showInputs ? 'is-visible' : 'is-hidden'}`}>
                <div className="input-group">
                    <input type="number" placeholder="HH" onChange={(e) => setInputHours(parseInt(e.target.value) || 0)} />
                    <span>:</span>
                    <input type="number" placeholder="MM" onChange={(e) => setInputMinutes(parseInt(e.target.value) || 0)} />
                    <span>:</span>
                    <input type="number" placeholder="SS" onChange={(e) => setInputSeconds(parseInt(e.target.value) || 0)} />
                </div>

                <p className='timer-text'>{timer}</p>
                
                <div className="controls">
                    <div className='timer-icon' onClick={handleStartStop}>
                        {isPaused ? <FaPlayCircle /> : <FaPauseCircle />}
                    </div>
                    <div className='timer-icon' onClick={onReset}>
                        <FaUndo  />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Timer;