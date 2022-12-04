import './trainerForm.scss';
import remove from './remove.png';
import { useState } from 'react';

const TrainerForm = ({ activeTrainer, onRemoveItem, onToggleItemProp, onChangevalue }) => {
	const [nameValue, setNameValue] = useState('');
	const [descrValue, setDescrValue] = useState('');
	const [questionValue, setQuestionvalue] = useState('');
	const [answerValue, setAnswerValue] = useState('');

	if (activeTrainer.length > 0) {
		const [{ name, description, id, items, nameEdit, descrEdit }] = activeTrainer;
		const amountOfItems = items.length;
		const result = items.map((item, index) => {
			const { question, answer, questionEdit, answerEdit } = item;
			return (
				<div className="trainerForm__item" key={item.id}>
					<span className="trainerForm__numb">{index + 1}</span>
					{!questionEdit ?
						<span
							className="trainerForm__ques"
							onClick={() => {
								onToggleItemProp(id, 'questionEdit', item.id,);
								setQuestionvalue(question)
							}}
						>{question}</span>
						:
						<input
							value={questionValue}
							onChange={(e) => setQuestionvalue(e.target.value)}
							onBlur={() => onChangevalue(id, 'question', questionValue, 'questionEdit', item.id)}
							className="trainerForm__questionInput" />
					}
					{!answerEdit ?
						<span
							className="trainerForm__answ"
							onClick={() => {
								onToggleItemProp(id, 'answerEdit', item.id,);
								setAnswerValue(answer)
							}}
						>{answer}</span>
						:
						<input
							value={answerValue}
							onChange={(e) => setAnswerValue(e.target.value)}
							onBlur={() => onChangevalue(id, 'answer', answerValue, 'answerEdit', item.id)}
							className="trainerForm__answerInput"
						/>
					}
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
				<h2 className='trainerForm__title'>Edit page</h2>
				<h3 className='trainerForm__subtitle'>Just hover your mouse on the element your want to edit. You will see the underline. Then just click on the element</h3>
				{!nameEdit ?
					<h2
						className='trainerForm__name'
						title="The name of the trainer"
						onClick={() => {
							onToggleItemProp(id, 'nameEdit');
							setNameValue(name)
						}}
					>{name}</h2>
					:
					<input
						value={nameValue}
						onChange={(e) => setNameValue(e.target.value)}
						onBlur={() => onChangevalue(id, 'name', nameValue, 'nameEdit')}
						className="trainerForm__nameInput"
					/>
				}
				{!descrEdit ?
					<h4
						className='trainerForm__description'
						title="The description of the trainer"
						onClick={() => {
							onToggleItemProp(id, 'descrEdit');
							setDescrValue(description)
						}}
					>{description}</h4>
					:
					<textarea
						value={descrValue}
						onChange={(e) => setDescrValue(e.target.value)}
						onBlur={() => onChangevalue(id, 'description', descrValue, 'descrEdit')}
						className="trainerForm__descrArea"
					/>
				}



				<p className="trainerForm__questAmount">(Amount of questions - <span>{amountOfItems}</span>)</p>

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