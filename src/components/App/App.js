import './app.scss';
import TrainersList from '../TrainersList';
import ItemList from '../ItemList';
import TrainerForm from '../TrainerForm';
import TrainerGame from '../TrainerGame';
import uuid from 'react-uuid';
import { useState, useEffect } from 'react';


const App = () => {
	const allData = [
		{
			name: 'Числительные', description: 'Тренажер для повторения числительных на английском языке', id: uuid(), nameEdit: false, descrEdit: false, active: true,
			items: [
				onCreateItem('ноль', 'zero'),
				onCreateItem('один', 'one'),
				onCreateItem('два', 'two'),
				onCreateItem('три', 'three'),
				onCreateItem('четыре', 'four'),
				onCreateItem('пять', 'five'),
				onCreateItem('шесть', 'six'),
				onCreateItem('семь', 'seven'),
				onCreateItem('восемь', 'eight'),
				onCreateItem('девять', 'nine'),
				onCreateItem('десять', 'ten')
			],
		},
		{
			name: 'Цвета', description: 'Тренажер для повторения различных цветов на английском языке', id: uuid(), nameEdit: false, descrEdit: false, active: false,
			items: [
				onCreateItem('красный', 'red'),
				onCreateItem('зеленый', 'green'),
				onCreateItem('синий', 'blue'),
				onCreateItem('желтый', 'yellow'),
				onCreateItem('оранжевый', 'orange'),
				onCreateItem('черный', 'black'),
				onCreateItem('белый', 'white'),
				onCreateItem('серый', 'grey'),
				onCreateItem('фиолетовый', 'violet'),
				onCreateItem('розовый', 'pink'),
				onCreateItem('золотой', 'gold'),
				onCreateItem('серебристый', 'silver'),
				onCreateItem('бежевый', 'beige'),
				onCreateItem('индиго', 'indigo'),
			],
		},
	];

	const [data, setData] = useState(allData);
	const [activeTrainer, setActiveTrainer] = useState(data.filter(item => item.active));
	const [edit, setEdit] = useState(false);
	const [play, setPlay] = useState(false);
	const amountOfTrainers = data.length;

	useEffect(() => {
		const actTrainer = data.filter(item => item.active);
		setActiveTrainer(actTrainer);
	}, [data]);

	function onCreateItem(question, answer) {
		return { question: question, answer: answer, id: uuid(), questionEdit: false, answerEdit: false };
	};

	function onToggleProperty(id, prop, callback, additional) {
		let newData = data.map(item => {
			if (item.id === id) {
				return { ...item, [prop]: true };
			}
			return { ...item, [prop]: false };
		});
		setData(newData);
		if (additional !== 'play') {
			return callback;
		} else if (additional === 'play') {
			const item = data.filter(item => item.id === id);
			const [{ items }] = item;
			if (items.length > 0) {
				return callback(true);
			};
		};
	};

	function onAddNewTrainer() {
		const newTrainer = {
			name: 'Your new trainer', description: 'description', id: uuid(), nameEdit: false, descrEdit: false, active: false,
			items: [],
		};
		const newData = [...data, newTrainer];
		setData(newData);
	};

	function onRemoveTrainer(id) {
		const newData = data.filter(item => item.id !== id);
		setData(newData);
	};

	function onRemoveItem(trainerId, itemId) {
		const oldTrainer = data.filter(trainer => trainer.id === trainerId);
		const oldTrainerIndex = data.findIndex(trainer => trainer.id === oldTrainer[0].id);
		const [{ items }] = oldTrainer;
		const newItems = items.filter(item => item.id !== itemId);
		const newTrainer = { ...oldTrainer[0], ['items']: newItems };
		const newData = [...data.slice(0, oldTrainerIndex), newTrainer, ...data.slice(oldTrainerIndex + 1)];
		setData(newData);
	};

	function onToggleItemProp(trainerId, prop, secondProp, itemId) {
		const oldTrainer = data.filter(trainer => trainer.id === trainerId);
		const oldTrainerIndex = data.findIndex(trainer => trainer.id === oldTrainer[0].id);
		let newTrainer;

		if (prop === 'questionEdit' || prop === 'answerEdit') {
			const [{ items }] = oldTrainer;
			const newItems = items.map(item => {
				if (item.id === itemId) {
					return { ...item, [prop]: true, [secondProp]: false };
				}
				return { ...item, [prop]: false, [secondProp]: false };
			});
			newTrainer = { ...oldTrainer[0], ['items']: newItems };
		};
		if (prop === 'nameEdit' || prop === 'descrEdit') {
			newTrainer = { ...oldTrainer[0], [prop]: true, [secondProp]: false };
		};
		const newData = [...data.slice(0, oldTrainerIndex), newTrainer, ...data.slice(oldTrainerIndex + 1)];
		setData(newData);
	};

	function onChangevalue(trainerId, prop, propValue, valueEdit, itemId) {
		const oldTrainer = data.filter(trainer => trainer.id === trainerId);
		const oldTrainerIndex = data.findIndex(trainer => trainer.id === oldTrainer[0].id);
		let newTrainer;
		if (prop === 'question' || prop === 'answer') {
			const [{ items }] = oldTrainer;
			const newItems = items.map(item => {
				if (item.id === itemId) {
					return { ...item, [prop]: propValue, [valueEdit]: false };
				}
				return item;
			});
			newTrainer = { ...oldTrainer[0], ['items']: newItems };
		};
		if (prop === 'name' || prop === 'description') {
			newTrainer = { ...oldTrainer[0], [prop]: propValue, [valueEdit]: false };
		};
		const newData = [...data.slice(0, oldTrainerIndex), newTrainer, ...data.slice(oldTrainerIndex + 1)];
		setData(newData);
	};

	function onAddNewItem(activeTrainer) {
		const oldTrainerIndex = data.findIndex(trainer => trainer.id === activeTrainer[0].id);
		const [{ items }] = activeTrainer;
		const newItems = [...items, onCreateItem('-/-', '-/-')];
		const newTrainer = { ...activeTrainer[0], ['items']: newItems };
		const newData = [...data.slice(0, oldTrainerIndex), newTrainer, ...data.slice(oldTrainerIndex + 1)];
		setData(newData);
	};


	return (
		<div className="app">
			<div className="container">
				<div className="app__wraper">

					{(edit && !play) &&
						<TrainerForm
							activeTrainer={activeTrainer}
							onRemoveItem={onRemoveItem}
							onToggleItemProp={onToggleItemProp}
							onChangevalue={onChangevalue}
							onAddNewItem={onAddNewItem}
							setEdit={setEdit}
						/>}
					{(!edit && !play) &&
						<>
							<TrainersList
								data={data}
								onToggleProperty={onToggleProperty}
								onRemoveTrainer={onRemoveTrainer}
								amountOfTrainers={amountOfTrainers}
								setEdit={setEdit}
								onAddNewTrainer={onAddNewTrainer}
								setPlay={setPlay}
								activeTrainer={activeTrainer}
							/>
							<ItemList
								activeTrainer={activeTrainer} />
						</>
					}
					{(!edit && play) &&
						<TrainerGame
							activeTrainer={activeTrainer}
							setPlay={setPlay} />}

				</div>
			</div>
		</div>
	);
};

export default App;