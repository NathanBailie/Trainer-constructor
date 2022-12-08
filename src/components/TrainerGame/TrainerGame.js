import './trainerGame.scss';
import close from './close.png';
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
	const onKeyDown = e => {
		if (e.code === 'Enter') console.log('enter was pressed');
	}
	const closeButton = (<button
		className='trainerGame__close'
		title="Go back to the main page"
		onClick={() => setPlay(false)}
	>
		<img src={close} alt="close" />
	</button>)

	useEffect(() => {
		// createData();
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
	}

	function getRandom(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function onChangeQuestion(items, randomKeys, length) {
		if (counter === length - 1) {
			console.log('finished')
			setProcess('finished');
			return;
		}
		if (items[randomKeys[counter]]['answer'] !== answer) {
			setMistakes((m) => m + 1);
			return;
		} else {
			setCounter(counter + 1);
			setQuestion(items[randomKeys[counter + 1]]['question']);
			setAnswer('');
		}
	}

	if (process === 'waiting') {
		return (
			<div className="trainerGame trainerGame_waiting">
				<p className="trainerGame__description">Just type your answer in the input and press 'Enter' key on your keyboard or Enter button on the screen to continue</p>
				<button
					className='trainerGame__enter trainerGame__enter_waiting'
					onClick={() => {
						setProcess('playing');
						onCreateItems();
					}}
				>
					<div>
						<span>Start</span>
						<span>&#10144;</span>
					</div>
				</button>
				{closeButton}
			</div>
		)
	}
	if (process === 'playing') {
		return (
			<div className="trainerGame trainerGame_playing">
				<p className="trainerGame__amount">{(`Question ${counter} of ${length}`)}</p>
				<p className="trainerGame__question">{question}</p>
				<input
					onKeyDown={(e) => { e.key === 'Enter' && onChangeQuestion(items, randomKeys, length) }}
					value={answer}
					className="trainerGame__answer"
					placeholder='type your answer'
					onChange={(e) => setAnswer(e.target.value)} />
				<button
					onClick={() => onChangeQuestion(items, randomKeys, length)}
					className='trainerGame__enter'>Enter</button>
				{closeButton}
			</div>
		);
	}
	if (process === 'finished') {
		return (
			<div className="trainerGame trainerGame_finished">
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
		)
	}
};

export default TrainerGame;