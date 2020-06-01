import React from 'react';
import Return from '../return.png';

function Home() {
	return (
		<div className='text'>
			<h1>Return</h1>
			<img src={Return} alt='Return' width='312' height='73' />
			<p>Hacking the web since 2017.</p>
		</div>
	);
}

export default Home;
