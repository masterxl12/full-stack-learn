import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './core/history_record/hooks/usehooks/index.css';

function useMove(initialClassName) {
    const [className, setClassName] = useState(initialClassName);
    const [state, setState] = useState('');
    function start() {
        setState('bigger');
    }
    useEffect(() => {
        if (state === 'bigger') {
            setClassName(`${initialClassName} ${initialClassName}-bigger`);
        }
    }, [state, initialClassName]);
    return [className, start];
}

function App() {
    const [className, start] = useMove('circle');
    return (
        <div>
            <button onClick={start}>start</button>
            <div className={className}></div>
        </div>
    )
}
ReactDOM.render(<App />, document.getElementById('root'));