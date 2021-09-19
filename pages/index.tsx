import Header from '../components/content/Header';
import Contact from '../components/content/sections/contact/Contact';
import Education from '../components/content/sections/education/Education';
import Experience from '../components/content/sections/experience/Experience';
import Hobbies from '../components/content/sections/hobbies/Hobbies';
import Interests from '../components/content/sections/interests/Interests';
import Profile from '../components/content/sections/profile/Profile';
import Projects from '../components/content/sections/projects/Projects';
import {
	IBasicInfo,
	IProfile,
	IContact,
	IInterests,
	IHobbies,
	IExperience,
	IProjects,
	IEducation,
} from '../interfaces';
import { getFireData } from '../utils/get-data';

interface Props {
	basicInfo: IBasicInfo;
	profile: IProfile;
	contact: IContact;
	interests: IInterests;
	hobbies: IHobbies;
	experience: IExperience;
	projects: IProjects;
	education: IEducation;
}

export default function IndexPage(props: Props): JSX.Element {
	const {
		basicInfo,
		profile,
		contact,
		interests,
		hobbies,
		experience,
		projects,
		education,
	} = props;

	// console.log(education);

	return (
		<div className='content'>
			<div className='left-bar'>
				<Header basicInfo={basicInfo} />
				<aside>
					<Profile profile={profile} />
					<Contact contact={contact} />
					<Interests interests={interests} />
					<Hobbies hobbies={hobbies} />
				</aside>
			</div>
			<main className='main-content'>
				<Experience experience={experience} />
				<Projects projects={projects} />
				<Education education={education} />
			</main>
		</div>
	);
}

export async function getStaticProps() {
	const data = await getFireData();
	// console.log(data);

	return {
		props: {
			basicInfo: data.basic_info,
			profile: data.profile,
			contact: data.contact,
			interests: data.interests,
			hobbies: data.hobbies,
			experience: data.experience,
			projects: data.projects,
			education: data.education,
		},
	};
}
