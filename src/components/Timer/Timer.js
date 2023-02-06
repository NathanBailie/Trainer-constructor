import './timer.scss';
import { useState, useEffect, useRef } from 'react';


const Timer = ({ allSeconds, setProcess }) => {
	let min = Math.floor(allSeconds / 60);
	let ses = allSeconds - Math.floor(allSeconds / 60) * 60;
	const [minutes, setMinutes] = useState(min);
	const [seconds, setSeconds] = useState(ses);
	const timerID = useRef();

	useEffect(() => {
		timerID.current = setInterval(() => tick(), 1000)
	}, []);

	useEffect(() => {
		if (minutes === 0 && seconds === 0) {
			clearInterval(timerID.current);
			setProcess('finished');
		} else if (minutes !== 0 && seconds === 0) {
			setSeconds(59);
			setMinutes((m) => m - 1)
		};
	}, [seconds]);

	function tick() {
		setSeconds((s) => s - 1)
	};

	return (
		<div className="timer">
			<p>{`${minutes} : ${seconds}`}</p>
		</div>
	);
};

export default Timer;