import './trainersList.scss';
import play from './icons/play.png';
import edit from './icons/edit.png';
import remove from './icons/remove.png';
import add from './icons/add.png';

const TrainersList = ({ data, onToggleProperty, onRemoveTrainer, amountOfTrainers, onChangeEdit, onAddNewTrainer, setPlay }) => {
	const trnList = data.map(item => {
		const { name, id } = item;
		let nameClasses;
		let trainerClasses;
		if (item.active) {
			nameClasses = 'trainersList__name trainersList__name_active';
			trainerClasses = 'trainersList__trainer trainersList__trainer_active';
		} else {
			nameClasses = 'trainersList__name';
			trainerClasses = 'trainersList__trainer';
		}

		return (
			<div
				key={name}
				className={trainerClasses}
			>
				<h2
					className={nameClasses}
					onClick={() => onToggleProperty(id, 'active')}
				>{name}</h2>
				<img
					src={play}
					alt="play"
					className='trainersList__start'
					title={'Start training'}
					onClick={() => { onToggleProperty(id, 'active'); setPlay(true) }} />
				<img
					src={edit}
					alt="play"
					className='trainersList__edit'
					title={'Edit this trainer'}
					onClick={() => onChangeEdit(onToggleProperty(id, 'active'))}
				/>
				<img
					src={remove}
					alt="play"
					className='trainersList__remove'
					title={'Remove this trainer'}
					onClick={() => onRemoveTrainer(id)} />
			</div>
		);
	});


	return (
		<div className='trainersList'>
			<div className="trainersList__title">
				<button
					onClick={() => onAddNewTrainer()}>
					<div>
						<span>Add new trainer</span>
						<img src={add} alt="add" />
					</div>
				</button>
				<h3>Amount of trainers:
					<span> {amountOfTrainers}</span>
				</h3>
			</div>
			{trnList}
		</div>
	);
};

export default TrainersList;