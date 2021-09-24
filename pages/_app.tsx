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
				<meta property='og:image' content='/document.png' />
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
				<footer>
					<small>
						All icons are courtesy of the wonderful people at{' '}
						<a
							href='https://icons8.com/'
							target='_blank'
							rel='noreferrer'
							title='icons8.com'>
							icons8
						</a>
					</small>
				</footer>
			</div>
		</>
	);
}
