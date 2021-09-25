import { getFireData } from '../utils/get-data';
import { ICv } from '../interfaces';

interface Props {
	cv: any;
}

export default function json({ cv }: Props): JSX.Element {

	return <div className='content json'>{cv}</div>;
}

export async function getStaticProps() {
	const data: ICv = await getFireData();
	// console.log(data);

	const jsonData = {
		name: {
			first_name: data.basic_info.first_name,
			last_name: data.basic_info.last_name,
		},
		title: data.basic_info.title,
		linkedin: data.basic_info.linkedin,
		github: data.basic_info.github,
		profile: data.profile.content,
		contact: {
			address: data.contact.content.data.address,
			email: data.contact.content.data.e_mail,
			phone: data.contact.content.data.phone,
		},
	};

	return {
		props: {
			cv: JSON.stringify(jsonData),
		},
	};
}
