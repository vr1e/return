import Lists from '../../ui/Lists';
import Tooltip from '../../ui/Tooltip';

interface Props {
	technologies: string[];
}

export default function Technologies({ technologies }: Props): JSX.Element {
	// if (!technologies) return null;

	return (
		<div className='technologies'>
			<h6>Technologies:</h6>
			<span className='technologies-icons-list'>
				{technologies.map((technology, idx) => (
					<Tooltip content={technology}>
						<img
							className='tech-icons'
							key={idx}
							src={`./tech/${technology.replace(/ /g, '_')}.svg`}
							alt={technology}
							title={technology}
							width='25px'
							height='25px'
						/>
					</Tooltip>
				))}
			</span>
			<div className='technologies-list'>
				<Lists data={technologies} />
			</div>
		</div>
	);
}
