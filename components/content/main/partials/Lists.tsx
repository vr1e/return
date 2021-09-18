interface Props {
	data: any;
}

export default function Lists({ data }: Props): JSX.Element {
	console.log(data);
	return data.map((elm, idx) => <span key={idx}>{elm}</span>);
}
