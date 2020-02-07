import React from 'react';
import ReactDOM from 'react-dom';
import Particles from 'react-particles-js';
import Return from './return.png';
import particleConfig from './particleConfig';
import './index.scss';

const App = () => {
	return (
		<>
			<Particles params={particleConfig} />
			<div className='text'>
				<h1>Return</h1>
				<img src={Return} alt='Return' />
				<p>Hacking the web since 2017.</p>
			</div>
		</>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
