import './trainersList.scss';
import play from './play.png';
import edit from './edit.png';
import remove from './remove.png';

const TrainersList = ({ data, onToggleProperty, onRemoveItem }) => {
	const trnList = data.map(item => {
		const { name, id } = item;
		let nameClasses;
		if (item.active) {
			nameClasses = 'trainersList__name trainersList__name_active';
		} else {
			nameClasses = 'trainersList__name';
		}
		return (
			<div
				key={name}
				className="trainersList__trainer">
				<h2
					className={nameClasses}
					onClick={() => onToggleProperty(id, 'active')}
				>{name}</h2>
				<img
					src={play}
					alt="play"
					className='trainersList__start'
					title={'start this trainer'} />
				<img
					src={edit}
					alt="play"
					className='trainersList__edit'
					title={'edit this trainer'} />
				<img
					src={remove}
					alt="play"
					className='trainersList__remove'
					title={'remove this trainer'}
					onClick={() => onRemoveItem(id)} />
			</div>
		);
	});


	// function onCreateTrainerList(data) {
	// 	const trn = [];
	// 	for (let trainer of data) {
	// 		trn.push({ name: trainer['name'], id: trainer['id'] });
	// 	};
	// 	return trn;
	// }

	return (
		<div className='trainersList'>
			{trnList}
		</div>
	);
};

export default TrainersList;