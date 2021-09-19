// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

// export type AsideContent = {
// 	type: string;
// 	data: string | string[] | { address: string; e_mail: string; phone: string };
// };

// export type MainContent = {
// 	id: string;
// 	company: string;
// 	additional_info: string;
// 	time_start: string;
// 	time_end: string;
// 	job_title: string;
// 	responsibilities: string[];
// 	technologies: string[];
// 	type: string;
// 	data: string;
// };

// export type SectionInterface = {
// 	id: string;
// 	title: string;
// 	category: string;
// 	type: string;
// 	content: AsideContent[] | MainContent[];
// };

// export type BasicInfo = {
// 	id: string;
// 	first_name: string;
// 	last_name: string;
// 	title: string;
// };

// ____________________________ ///

export type IBasicInfo = {
	id: string;
	first_name: string;
	last_name: string;
	title: string;
};

export type IProfile = {
	id: string;
	category: string;
	title: string;
	type: string;
	content: {
		data: string;
		type: string;
	};
};

export type IContact = {
	id: string;
	category: string;
	title: string;
	type: string;
	content: {
		data: {
			address: string;
			e_mail: string;
			phone: string;
		};
		type: string;
	};
};

export type IInterests = {
	id: string;
	category: string;
	title: string;
	type: string;
	content: {
		data: string[];
		type: string;
	};
};

export type IHobbies = {
	id: string;
	category: string;
	title: string;
	type: string;
	content: {
		data: string[];
		type: string;
	};
};

export type IArticle = {
	id: string;
	company: string;
	additional_info?: string;
	job_title: string;
	responsibilities: string[];
	technologies: string[];
	time_start: string;
	time_end: string;
};

export type IExperience = {
	id: string;
	category: string;
	title: string;
	type: string;
	content: IArticle[];
};

export type IProject = {
	id: string;
	technologies: string[];
	title: string;
	url: string;
	year: string;
};

export type IProjects = {
	id: string;
	category: string;
	title: string;
	type: string;
	content: IProject[];
};

export type ISchool = {
	id: string;
	title: string;
	description: string;
	specialization?: string;
	name?: string;
	url: string;
	time_end: string;
	time_start: string;
};

export type IEducation = {
	id: string;
	category: string;
	title: string;
	type: string;
	content: ISchool[];
};
