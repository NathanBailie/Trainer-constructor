import './timer.scss';
import { useState, useEffect } from 'react';

const Timer = () => {
	const allseconds = 2;
	let min = Math.floor(allseconds / 60);
	let ses = allseconds - Math.floor(allseconds / 60) * 60;
	const [minutes, setMinutes] = useState(min);
	const [seconds, setSeconds] = useState(ses);
	const [finish, setFinish] = useState();


	useEffect(() => {
		const timerID = setInterval(() => timer(), 1000);
		return () => clearInterval(timerID);
	}, []);

	const timer = () => {

	}




	return (
		<div className="timer">
			<p>{`${minutes} : ${seconds}`}</p>
		</div>
	);
};

export default Timer;