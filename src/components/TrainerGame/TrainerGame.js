import './trainerGame.scss';
import { useState, useEffect } from 'react';

const TrainerGame = ({ activeTrainer }) => {
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

	// useEffect(() => {
	// 	// createData();
	// }, [activeTrainer, question]);

	function onCreateItems() {
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
			<div className="trainerGame">
				<p>Just type the correct answer and press enter to go to the next question</p>
				<button
					className='trainerGame__enter'
					onClick={() => {
						setProcess('playing');
						onCreateItems()
					}}
				>Start</button>
			</div>
		)
	}
	if (process === 'playing') {
		return (
			<div className="trainerGame">
				<p className="trainerGame__amount">{(`Question ${counter} of ${length}`)}</p>
				<p className="trainerGame__question">{question}</p>
				<input
					// onKeyDown={ev => ev.key === 'Enter' => { onChangeQuestion(items, randomKeys, length); setAnswer('') }}
					onKeyDown={(e) => { e.key === 'Enter' && onChangeQuestion(items, randomKeys, length) }}
					value={answer}
					className="trainerGame__answer"
					placeholder='type your answer'
					onChange={(e) => setAnswer(e.target.value)} />
				<button
					onClick={() => onChangeQuestion(items, randomKeys, length)}
					className='trainerGame__enter'>Enter</button>
			</div>
		);
	}
	if (process === 'finished') {
		return (
			<div className="trainerGame">
				<p className='trainerGame__mistakes'>Mistakes = {mistakes}</p>

				<button
					className='trainerGame__enter'
					onClick={() => {
						setProcess('playing');
						onCreateItems()
					}}
				>Start</button>
			</div>
		)
	}
};

export default TrainerGame;