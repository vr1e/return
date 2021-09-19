import { Fragment } from 'react';

interface Props {
	content: [string, any][];
}

export default function Contact({ content }: Props): JSX.Element {
	return (
		<dl>
			{content.map((item, idx) => (
				<Fragment key={idx}>
					<dt>{item[0]}</dt>
					<dd>{item[1]}</dd>
				</Fragment>
			))}
		</dl>
	);
}
