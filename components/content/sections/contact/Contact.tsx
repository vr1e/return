import { Fragment } from 'react';
import { IContact } from '../../../../interfaces';
import Title from '../../../ui/title/Title';

interface Props {
	contact: IContact;
}

export default function Contact({ contact }: Props): JSX.Element {
	const list = Object.entries(contact.content.data);
	return (
		<>
			<Title title={contact.title} type={contact.type} />
			<section>
				<dl>
					{list.map((item, idx) => (
						<Fragment key={idx}>
							<dt>{item[0]}</dt>
							<dd>{item[1]}</dd>
						</Fragment>
					))}
				</dl>
			</section>
		</>
	);
}
