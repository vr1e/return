import Head from 'next/head';
import ActionBar from '../components/ui/action-bar/ActionBar';
import '../styles/globals.scss';

export default function NvApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Nikola Vrhovac | Front-end developer</title>
				<meta
					property='og:title'
					content='Nikola Vrhovac | Front-end developer'
					key='title'
				/>
				<meta charSet='utf-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<meta name='title' content='Nikola Vrhovac | Front-end developer' />
				<meta
					name='description'
					content='My short bio developed in nextjs/react'
				/>
			</Head>
			<div className='body'>
				<ActionBar />
				<Component {...pageProps} />
			</div>
		</>
	);
}
