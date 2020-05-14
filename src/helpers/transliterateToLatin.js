var a = {
	Б: 'B',
	В: 'V',
	Г: 'G',
	Д: 'D',
	Ђ: 'Đ',
	Ж: 'Ž',
	З: 'Z',
	И: 'I',
	Л: 'L',
	Љ: 'Lj',
	Н: 'N',
	Њ: 'Nj',
	П: 'P',
	Р: 'R',
	С: 'S',
	Ћ: 'Ć',
	У: 'U',
	Ф: 'F',
	Х: 'H',
	Ц: 'C',
	Ч: 'Č',
	Џ: 'Dž',
	Ш: 'Š',
	б: 'b',
	в: 'v',
	г: 'g',
	д: 'd',
	ђ: 'đ',
	ж: 'ž',
	з: 'z',
	и: 'i',
	к: 'k',
	л: 'l',
	љ: 'lj',
	м: 'm',
	н: 'n',
	њ: 'nj',
	п: 'p',
	р: 'r',
	с: 's',
	т: 't',
	ћ: 'ć',
	у: 'u',
	ф: 'f',
	х: 'h',
	ц: 'c',
	ч: 'č',
	џ: 'dž',
	ш: 'š'
};

export default word =>
	word
		.split('')
		.map(char => a[char] || char)
		.join('');
