import './trainerGame.scss';
import close from '../../images/cancel.png';
import unchecked from '../../images/unchecked.png';
import checked from '../../images/checked.png';
import Timer from '../Timer';
import { useState, useEffect } from 'react';


const TrainerGame = ({ activeTrainer, setPlay }) => {
	const [question, setQuestion] = useState('');
	const [answer, setAnswer] = useState('');
	const [randomKeys, setRandomKeys] = useState([]);
	const [counter, setCounter] = useState(0);
	const [items, setItems] = useState([]);
	const [length, setLength] = useState(0);
	const [process, setProcess] = useState('waiting');
	const [mistakes, setMistakes] = useState(0);
	const [mistake, setMistake] = useState(false);
	const [boxChecked, setboxChecked] = useState(true);
	const [secPerQuest, setSecPerQuest] = useState(10);
	const [allSeconds, setAllSeconds] = useState(300);
	const [secondMistake, setSecondMistake] = useState(false);
	const [timeLeft, setTimeLeft] = useState(false);

	const closeButton = (<button
		className='trainerGame__close'
		title="Go back to the main page"
		onClick={() => setPlay(false)}
	>
		<img src={close} alt="close" />
	</button>);

	let answerInputClasses;
	if (mistake) {
		answerInputClasses = 'trainerGame__answer trainerGame__answer_mistake';
	} else {
		answerInputClasses = 'trainerGame__answer';
	};

	let settingClasses;
	if (boxChecked) {
		settingClasses = 'trainerGame__setting trainerGame__setting_active';
	} else {
		settingClasses = 'trainerGame__setting';
	};

	let secondInputClasses;
	let warningMessageClasses;
	if (secondMistake) {
		secondInputClasses = 'trainerGame__secondInput trainerGame__secondInput_active';
		warningMessageClasses = 'trainerGame__warning trainerGame__warning_active';
	} else {
		secondInputClasses = 'trainerGame__secondInput ';
		warningMessageClasses = 'trainerGame__warning';
	};

	useEffect(() => {
		onCreateItems();
		return () => {
			setProcess('waiting');
			setCounter(0);
			setAnswer('');
			setMistakes(0);
		}
	}, []);

	function onCreateItems() {
		setCounter(0);
		const [{ items }] = activeTrainer;
		setItems(items);
		setLength(items.length);
		const set = new Set([]);
		while ([...set].length < items.length) {
			set.add(getRandom(0, items.length - 1));
		};
		const rndKeys = [...set];
		setRandomKeys(rndKeys);
		setQuestion(items[rndKeys[counter]]['question']);
	};

	function getRandom(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	function onChangeQuestion(items, randomKeys, length) {
		if (counter === length - 1) {
			setProcess('finished');
			return;
		};
		if (items[randomKeys[counter]]['answer'] !== answer) {
			setMistakes((m) => m + 1);
			setMistake(true);
			return;
		} else {
			setCounter(counter + 1);
			setQuestion(items[randomKeys[counter + 1]]['question']);
			setAnswer('');
			setMistake(false);
		};
	};

	function onValidateTime(seconds) {
		if (/^\d+$/.test(seconds) && boxChecked || !boxChecked) {
			setProcess('playing');
			onCreateItems();
			setSecondMistake(false);
			setAllSeconds(secPerQuest * length);
			console.log(length)
		} else {
			setSecondMistake(true);
			return;
		};
	};

	if (process === 'waiting') {
		return (
			<div className="trainerGame trainerGame_waiting">
				<p className="trainerGame__description">Just type your answer in the input and press 'Enter' key on your keyboard or Enter button on the screen to continue</p>
				<div className="trainerGame__timerSetting">
					<div className="trainerGame__checkbox">
						<span
							onClick={() => setboxChecked((c) => !c)}
						>Timer</span>
						<img
							src={boxChecked ? checked : unchecked}
							onClick={() => setboxChecked((c) => !c)}
							alt="unchecked" />
					</div>
					<div className={settingClasses}>
						<span>sec / per question -</span>
						<input
							className={secondInputClasses}
							value={secPerQuest}
							placeholder="sec"
							onChange={(e) => setSecPerQuest(Number(e.target.value))} />
					</div>
					<p className={warningMessageClasses}>please, type the correct number</p>
				</div>
				<button
					className='trainerGame__enter trainerGame__enter_waiting'
					onClick={() => {
						onValidateTime(secPerQuest);
					}}>
					<div>
						<span
						>Start</span>
						<span>&#10144;</span>
					</div>
				</button>
				{closeButton}
			</div>
		);
	};

	if (process === 'playing') {
		return (
			<div className="trainerGame trainerGame_playing">
				<p className="trainerGame__amount">{(`Question ${counter} of ${length}`)}</p>
				{boxChecked &&
					<div className="trainerGame__timerWraper">
						<Timer
							allSeconds={allSeconds}
							setProcess={setProcess} />
					</div>
				}
				<p className="trainerGame__question">{question}</p>
				<input
					onKeyDown={(e) => { e.key === 'Enter' && onChangeQuestion(items, randomKeys, length) }}
					value={answer}
					className={answerInputClasses}
					placeholder='type your answer'
					onChange={(e) => setAnswer(e.target.value)} />
				<button
					onClick={() => onChangeQuestion(items, randomKeys, length)}
					className='trainerGame__enter'>Enter</button>
				{closeButton}
			</div>
		);
	};

	if (process === 'finished') {
		return (
			<div className="trainerGame trainerGame_finished">
				{timeLeft &&
					<h2>Time is over!</h2>
				}
				<p className='trainerGame__mistakes'>Mistakes = <span>{mistakes}</span>
				</p>
				<button
					className='trainerGame__enter trainerGame__enter_finished'
					onClick={() => {
						setProcess('waiting');
						onCreateItems();
						setAnswer('');
						setMistakes(0);
					}}
				>Restart</button>
				{closeButton}
			</div>
		);
	};
};

export default TrainerGame;