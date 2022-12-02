import './app.scss';
import TrainersList from '../TrainersList';
import ItemList from '../ItemList';

import uuid from 'react-uuid';
import { useState, useEffect } from 'react';

const App = () => {
	const allData = [
		{
			name: 'Числительные', id: uuid(), active: true,
			items: [
				onCreateItem('ноль', 'zero'),
				onCreateItem('один', 'one'),
				onCreateItem('три', 'three'),
				onCreateItem('четыре', 'four'),
				onCreateItem('пять', 'five'),
				onCreateItem('девять', 'nine'),
				onCreateItem('десять', 'ten')
			],
		},
		{
			name: 'Цвета', id: uuid(), active: false,
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
	const activeTrainer = data.filter(item => item.active);

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

	function onRemoveItem(id) {
		const newData = data.filter(item => item.id !== id);
		setData(newData);
	};


	return (
		<div className="app">
			<div className="container">
				<div className="app__wraper">
					<TrainersList
						data={data}
						onToggleProperty={onToggleProperty}
						onRemoveItem={onRemoveItem} />
					<ItemList
						activeTrainer={activeTrainer} />
				</div>
			</div>
		</div>
	);
};

export default App;