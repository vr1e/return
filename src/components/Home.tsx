import returnLogo from '../assets/return.png';

export default function Home() {
	return (
		<div className='text'>
			<h1>Return</h1>
			<img src={returnLogo} alt='Return' width='312' height='73' />
			<p>Hacking the web since 2017.</p>
		</div>
	);
}
