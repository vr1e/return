import styles from './Header.module.scss';

interface Props {
	basicInfo: {
		first_name: string;
		last_name: string;
		title: string;
	};
}

export default function Header({ basicInfo }: Props): JSX.Element {
	const { first_name, last_name, title } = basicInfo;
	return (
		<header>
			<img
				src='https://s.gravatar.com/avatar/240025a4b8ba8c72b633be906218007c?s=200'
				alt='My Image'
				className={styles.image}
			/>
			<h1>
				{first_name} <div>{last_name}</div>
			</h1>
			<h2>{title}</h2>
		</header>
	);
}
