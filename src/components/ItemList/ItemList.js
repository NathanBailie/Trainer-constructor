import './itemList.scss';
import ghost from '../../images/ghost.gif';
import Spinner from '../Spinner';


const ItemList = ({ activeTrainer }) => {
	if (activeTrainer.length === 0) {
		return (
			<div className="chose">
				<h2>
					Please, choose any trainer
				</h2>
				<Spinner />
			</div>
		);
	};

	const [{ description, items }] = activeTrainer;
	let res;
	if (items.length > 0) {
		let count = 0;
		let examples = [];
		if (items.length >= 10) {
			while (count < 10) {
				examples.push(items[count]);
				count++;
			};
		} else {
			while (count < items.length) {
				examples.push(items[count]);
				count++;
			};
		};
		res = examples.map(example => {
			const { question, answer, id } = example;
			return (
				<div className="itemList__item" key={id}>
					<span className='itemList__question'>{question}</span>
					<span className='itemList__answer'>{answer}</span>
				</div>
			);
		});

		return (
			<div className="itemList">
				<h3>Description</h3>
				<p className='itemList__description'>{description}</p>
				<h4>Some examples</h4>
				<div className="itemList__header">
					<span>Question</span>
					<span>Answer</span>
				</div>
				{res}
			</div>
		);
	} else {
		return (
			<div className="itemList">
				<h2 className='itemList__empty'>There are not any questions in this trainer!</h2>
				<img src={ghost} alt="ghost" className='itemList__ghost' />
			</div>
		);
	};
};

export default ItemList;