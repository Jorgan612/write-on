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
        if (inputHours || inputMinutes || inputSeconds) {
            setTimer(formatTime(secondsLeft));
        }

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
        setShowInputs(false);
        setInputHours(0);
        setInputMinutes(0);
        setInputSeconds(0);
        setSecondsLeft(0);
        setTimer("00:00:00");        
    };
    
    const showTimerInputs = () => {
        setShowInputs(true);

        if (showInputs) {
            clearTimerInputs();
        }
    };

    return (
        <div className="timer-container">
            <div className="timer-icon" >
                {!showInputs ? <FaStopwatch onClick={showTimerInputs} /> : <FaTimes onClick={clearTimerInputs} />}
            </div>
            <div className={`timer-details ${showInputs ? 'is-visible' : 'is-hidden'}`}>
                <div className="input-group">
                    <input type="number" placeholder="HH" value={inputHours === 0 ? '' : inputHours} onChange={(e) => {
                        const value = parseInt(e.target.value);
                        setInputHours(isNaN(value) ? 0 : value);
                    }} />
                    <span>:</span>
                    <input type="number" placeholder="MM" value={inputMinutes === 0 ? '' : inputMinutes} onChange={(e) => {
                        const value = parseInt(e.target.value);
                        setInputMinutes(isNaN(value) ? 0 : value);
                    }} />
                    <span>:</span>
                    <input type="number" placeholder="SS" value={inputSeconds === 0 ? '' : inputSeconds} onChange={(e) => {
                        const value = parseInt(e.target.value);
                        setInputSeconds(isNaN(value) ? 0 : value);
                    }} />
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