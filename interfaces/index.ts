// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type AsideContent = {
	type: string;
	data: string | string[] | { address: string; e_mail: string; phone: string };
};

export type MainContent = {
	id: string;
	company: string;
	additional_info: string;
	time_start: string;
	time_end: string;
	job_title: string;
	responsibilities: string[];
	technologies: string[];
	type: string;
	data: string;
};

export type SectionInterface = {
	id: string;
	title: string;
	category: string;
	type: string;
	content: AsideContent[] | MainContent[];
};

export type BasicInfo = {
	id: string;
	first_name: string;
	last_name: string;
	title: string;
};
