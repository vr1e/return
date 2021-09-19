interface Props {
	content: {
		data: string;
	};
}

export default function Profile({ content }: Props): JSX.Element {
	return <p className='profile'>{content}</p>;
}
