var lettersMatrix: { [key: string]: string } = {
	B: 'Б',
	V: 'В',
	G: 'Г',
	D: 'Д',
	Đ: 'Ђ',
	Ž: 'Ж',
	Z: 'З',
	I: 'И',
	L: 'Л',
	N: 'Н',
	P: 'П',
	R: 'Р',
	S: 'С',
	Ć: 'Ћ',
	U: 'У',
	F: 'Ф',
	H: 'Х',
	C: 'Ц',
	Č: 'Ч',
	Š: 'Ш',
	b: 'б',
	v: 'в',
	g: 'г',
	d: 'д',
	đ: 'ђ',
	ž: 'ж',
	z: 'з',
	i: 'и',
	k: 'к',
	l: 'л',
	m: 'м',
	n: 'н',
	p: 'п',
	r: 'р',
	s: 'с',
	t: 'т',
	ć: 'ћ',
	u: 'у',
	f: 'ф',
	h: 'х',
	c: 'ц',
	č: 'ч',
	š: 'ш'
};

export default (word: string) =>
	word
		.split('')
		.map(char => lettersMatrix[char] || char)
		.join('')
		.replace(/дж/g, 'џ')
		.replace(/Дж/g, 'Џ')
		.replace(/лj/g, 'љ')
		.replace(/Лj/g, 'Љ')
		.replace(/Нj/g, 'Њ')
		.replace(/нj/g, 'њ');
