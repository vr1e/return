import { Fragment } from 'react';
import styles from './Aside.module.scss';

export default function Aside({ asideSections }): JSX.Element {
	// console.log(asideSections);

	function returnProperType(content) {
		if (!content) return;
		if (content.type === 'text') {
			return <p>{content.data}</p>;
		}

		if (content.type === 'titlelist') {
			const list = Object.entries(content.data);
			return (
				<dl>
					{list.map((item, idx) => (
						<Fragment key={idx}>
							<dt>{item[0]}</dt>
							<dd>{item[1]}</dd>
						</Fragment>
					))}
				</dl>
			);
		}

		if (content.type === 'list') {
			return content.data.map((item, idx) => (
				<Fragment key={idx}>
					<span>{item} | </span>
				</Fragment>
			));
		}
	}

	return (
		<aside>
			{asideSections.map(section => (
				<section key={section.id}>
					<div className={styles.title}>
						<img
							className={styles.icon}
							src={`${section.title.toLowerCase()}.svg`}
							alt={section.title}
							title={section.title}
						/>
						<h3>{section.title}</h3>
						<span className={styles.line_decoration}></span>
					</div>
					<div className={styles.aside_content}>
						{returnProperType(section.content)}
					</div>
				</section>
			))}
		</aside>
	);
}
