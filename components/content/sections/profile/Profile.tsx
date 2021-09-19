import { IProfile } from '../../../../interfaces';
import Title from '../../../ui/title/Title';

interface Props {
	profile: IProfile;
}

export default function Profile({ profile }: Props): JSX.Element {
	// console.log(profile);
	return (
		<>
			<Title title={profile.title} type={profile.type} />
			<section>
				<p className={profile.type}>{profile.content.data}</p>
			</section>
		</>
	);
}
