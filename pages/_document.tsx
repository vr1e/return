import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang='en'>
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
						content='This is my short bio in node.js/react'
					/>
					<link rel='icon' href='/favicon.ico' />
					<link
						href='https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap'
						rel='stylesheet'
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
