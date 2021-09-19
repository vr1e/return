interface Props {
	data?: any;
	separator?: string;
}

export default function Lists({ data, separator }: Props): JSX.Element {
	console.log(data);

	if (!data) {
		return null;
	}

	return data.map((elm, idx) => (
		<span key={idx} className='list-item'>{`${separator} ${elm}`}</span>
	));
}
