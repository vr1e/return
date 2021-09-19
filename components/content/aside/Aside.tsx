import { SectionInterface } from '../../../interfaces';
import Title from '../../ui/title/Title';
import Contact from '../partials/Contact';
import Hobbies from '../partials/Hobbies';
import Profile from '../partials/Profile';
import styles from './Aside.module.scss';

interface Props {
	asideSections: SectionInterface[];
}

export default function Aside({ asideSections }: Props): JSX.Element {
	// console.log(asideSections);

	function returnProperType(content) {
		if (!content) return;

		if (content.type === 'text') {
			return <Profile content={content.data} />;
		}

		if (content.type === 'titlelist') {
			const list = Object.entries(content.data);
			return <Contact content={list} />;
		}

		if (content.type === 'list') {
			return <Hobbies content={content.data} />;
		}
	}

	return (
		<aside>
			{asideSections.map(section => (
				<section key={section.id}>
					<Title title={section.title} />
					<div className={styles.aside_content}>
						{returnProperType(section.content)}
					</div>
				</section>
			))}
		</aside>
	);
}
