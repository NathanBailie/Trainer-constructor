import './itemList.scss';
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
	let count = 0;
	let examples = [];
	while (count < 10) {
		count++;
		examples.push(items[count]);
	};
	const res = examples.map(example => {
		const { question, answer, id } = example;
		return (
			<div className="itemList__item" key={id}>
				<span className='itemList__question'>{question}?</span>
				<span className='itemList__answer'> - {answer}</span>
			</div>
		);
	});

	return (
		<div className="itemList">
			<h3>Description</h3>
			<p>{description}</p>
			<h4>Some examples:</h4>
			{res}
		</div>
	);
};

export default ItemList;