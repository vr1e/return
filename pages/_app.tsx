import Head from 'next/head';
import Layout from '../components/ui/Layout';
import '../styles/globals.scss';

export default function NvApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<meta charSet='utf-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<meta name='description' content='Nikola Vrhovac demo CV' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	);
}
