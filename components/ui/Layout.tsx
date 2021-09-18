import React, { ReactNode } from 'react';
// import Link from 'next/link';
import Head from 'next/head';

type Props = {
	children?: ReactNode;
	title?: string;
};

export default function Layout({ children, title = 'This is my CV' }: Props) {
	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta charSet='utf-8' />
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>
			<header></header>
			{children}
			<footer></footer>
		</div>
	);
}
