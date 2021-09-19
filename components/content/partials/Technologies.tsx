import Lists from '../../ui/Lists';

interface Props {
	technologies?: string[];
}

export default function Technologies({ technologies }: Props): JSX.Element {
	if (!technologies) return null;

	return (
		<div className='technologies'>
			<h6>Technologies:</h6>
			<Lists data={technologies} />
		</div>
	);
}
