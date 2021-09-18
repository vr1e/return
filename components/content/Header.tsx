interface Props {
	name: string;
	title: string;
}

export default function Header({ name, title }: Props): JSX.Element {
	return (
		<header>
			<h1>{name}</h1>
			<h2>{title}</h2>
		</header>
	);
}
