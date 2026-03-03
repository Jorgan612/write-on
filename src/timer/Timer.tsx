import { useState, useEffect, useRef } from 'react';
import { FaStopwatch } from 'react-icons/fa';
import './Timer.scss';

const Timer = () => {
    const [timer, setTimer] = useState("00:00:00");
    const [secondsLeft, setSecondsLeft] = useState(0);
    const [isPaused, setIsPaused] = useState(true);
    const [inputHours, setInputHours] = useState(0);
    const [inputMinutes, setInputMinutes] = useState(0);
    const [inputSeconds, setInputSeconds] = useState(0);

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

    return (
        <div className="timer-container">
            <div className="timer-icon">
                <FaStopwatch />
            </div>
            <div className="input-group">
                <input type="number" placeholder="HH" onChange={(e) => setInputHours(parseInt(e.target.value) || 0)} />
                <input type="number" placeholder="MM" onChange={(e) => setInputMinutes(parseInt(e.target.value) || 0)} />
                <input type="number" placeholder="SS" onChange={(e) => setInputSeconds(parseInt(e.target.value) || 0)} />
            </div>

            <p className='timer-text'>{timer}</p>
            
            <div className="controls">
                <button onClick={handleStartStop}>{isPaused ? 'Start' : 'Stop'}</button>
                <button onClick={onReset}>Reset</button>
            </div>
        </div>
    );
};

export default Timer;