import Lists from '../../ui/Lists';

interface Props {
	responsibilities: string[];
}

export default function Responsibilities({
	responsibilities,
}: Props): JSX.Element {
	// if (!responsibilities) return null;

	return (
		<div className='responsibilities'>
			<h6>Responsibilities:</h6>
			<Lists data={responsibilities} separator={'-'} />
		</div>
	);
}
