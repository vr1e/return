import PrintBtn from '../PrintBtn';

interface Props {}

export default function ActionBar({}: Props): JSX.Element {
	return (
		<div className='action-bar'>
			<PrintBtn />
		</div>
	);
}
