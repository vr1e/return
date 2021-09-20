// import Tooltip from '../ui/Tooltip';
import { IBasicInfo } from '../../interfaces';
import styles from './Header.module.scss';

interface Props {
	basicInfo: IBasicInfo;
}

export default function Header({ basicInfo }: Props): JSX.Element {
	const { first_name, last_name, title } = basicInfo;
	return (
		<header className='header'>
			<img
				src='https://s.gravatar.com/avatar/240025a4b8ba8c72b633be906218007c?s=200'
				alt='My Image'
				className={styles.image}
			/>
			<h1>
				{/* <Tooltip content={'🌴'}></Tooltip> */}
				{first_name} <div className={styles.strong}>{last_name}</div>
			</h1>
			<h2>{title}</h2>
		</header>
	);
}
