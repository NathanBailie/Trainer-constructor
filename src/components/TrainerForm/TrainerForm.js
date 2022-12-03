import './trainerForm.scss';
import remove from './remove.png'

const TrainerForm = ({ activeTrainer, onRemoveItem }) => {
	if (activeTrainer.length > 0) {
		const [{ name, description, id, items }] = activeTrainer;
		const result = items.map((item, index) => {
			const { question, answer } = item;
			return (
				<div className="trainerForm__item" key={item.id}>
					<span className="trainerForm__numb">{index + 1}</span>
					<span className="trainerForm__ques">{question}</span>
					<span className="trainerForm__answ">{answer}</span>
					<span className="trainerForm__remove">
						<img
							src={remove}
							alt="remove"
							title='Remove this question'
							onClick={() => onRemoveItem(id, item.id)} />
					</span>
				</div>
			);
		});

		return (
			<div className="trainerForm">
				<h2>On this page your can edit your trainer</h2>
				<p className='trainerForm__name'>Name:
					<span>{name}</span>
				</p>
				<p className='trainerForm__description'>Description:
					<span>{description}</span>
				</p>
				<div className="trainerForm__head">
					<span className="trainerForm__number">#</span>
					<span className="trainerForm__question">Question</span>
					<span className="trainerForm__answer">Answer</span>
					<span className="trainerForm__actions">Actions
					</span>
				</div>
				{result}
			</div>
		);
	};
};

export default TrainerForm;