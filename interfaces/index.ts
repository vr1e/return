// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type IBasicInfo = {
	id: string;
	first_name: string;
	last_name: string;
	title: string;
	github: string,
	linkedin: string;
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
	description?: string;
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

export type ICv = {
	basic_info: IBasicInfo;
	contact: IContact;
	education: IEducation;
	experience: IExperience;
	hobbies: IHobbies;
	interests: IInterests;
	profile: IProfile;
	projects: IProjects;
};