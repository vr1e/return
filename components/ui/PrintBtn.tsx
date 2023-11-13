interface Props {}

export default function PrintBtn({}: Props) {
	function print() {
		window.print();
	}

	return (
		<button className='btn print' onClick={print}>
			<img src='/print.png' alt='Print Button' title='Print page' />
		</button>
	);
}
