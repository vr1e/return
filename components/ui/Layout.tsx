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
			</Head>
			<header></header>
			{children}
		</div>
	);
}
