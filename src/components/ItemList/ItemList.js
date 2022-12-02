import './itemList.scss';

const ItemList = ({ activeTrainer }) => {
	const [{ items }] = activeTrainer;
	const res = items.map(item => {
		const { question, answer, id } = item;
		return (
			<div className="itemList__item" key={id}>
				<span className='itemList__question'>{question}?</span>
				<span className='itemList__answer'> - {answer}</span>
			</div>
		);
	});


	return (
		<div className="itemList">
			{res}
		</div>
	);
};

export default ItemList;