// import Tooltip from '../ui/Tooltip';
import { IBasicInfo } from '../../interfaces';
import styles from './Header.module.scss';

interface Props {
	basicInfo: IBasicInfo;
}

export default function Header({ basicInfo }: Props): JSX.Element {
	const { first_name, last_name, title, github, linkedin } = basicInfo;
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
			<div className='social'>
				<a
					className='social-icons'
					href={linkedin}
					target='_blank'
					rel='noreferrer'
					title='linkedin'>
					<img
						src='./social/linkedin.svg'
						alt='linkedin'
						width='25px'
						height='25px'
					/>
				</a>
				<a
					className='social-icons'
					href={github}
					target='_blank'
					rel='noreferrer'
					title='github'>
					<img
						src='./social/github.svg'
						alt='github'
						width='25px'
						height='25px'
					/>
				</a>
			</div>
		</header>
	);
}
