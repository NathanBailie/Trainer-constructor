import './app.scss';
import TrainersList from '../TrainersList';
import ItemList from '../ItemList';
import TrainerForm from '../TrainerForm';
import uuid from 'react-uuid';
import { useState, useEffect } from 'react';

const App = () => {
	const allData = [
		{
			name: 'Числительные', description: 'Тренажер для повторения числительных на английском языке', id: uuid(), active: true,
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
			name: 'Цвета', description: 'Тренажер для повторения различных цветов на английском языке', id: uuid(), active: false,
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
	const [activeTrainer, setActiveTrainer] = useState([]);
	const [edit, setEdit] = useState(false);
	const amountOfTrainers = data.length;
	useEffect(() => {
		const actTrainer = data.filter(item => item.active);
		setActiveTrainer(actTrainer);
	}, [data]);

	function onCreateItem(question, answer) {
		return { question: question, answer: answer, id: uuid() };
	};

	function onToggleProperty(id, prop) {
		let newData = data.map(item => {
			if (item.id === id) {
				return { ...item, [prop]: true };
			}
			return { ...item, [prop]: false };
		});
		setData(newData);
	};

	function onRemoveTrainer(id) {
		const newData = data.filter(item => item.id !== id);
		setData(newData);
	};

	function onRemoveItem(trainerId, itemId) {
		const oldTrainer = data.filter(trainer => trainer.id === trainerId);
		const [{ items }] = oldTrainer;
		const oldTrainerIndex = data.findIndex(trainer => trainer.id === oldTrainer[0].id);
		const newItems = items.filter(item => item.id !== itemId);
		const newTrainer = { ...oldTrainer[0], ['items']: newItems };
		const newData = [...data.slice(0, oldTrainerIndex), newTrainer, ...data.slice(oldTrainerIndex) + 1];
		setData(newData);
	};


	return (
		<div className="app">
			<div className="container">
				<div className="app__wraper">
					<TrainerForm
						activeTrainer={activeTrainer}
						onRemoveItem={onRemoveItem} />
					{/* <TrainersList
						data={data}
						onToggleProperty={onToggleProperty}
						onRemoveTrainer={onRemoveTrainer}
						amountOfTrainers={amountOfTrainers} />
					<ItemList
						activeTrainer={activeTrainer} /> */}
				</div>
			</div>
		</div>
	);
};

export default App;