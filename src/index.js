import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Particles from 'react-particles-js';
import particleConfig from './particleConfig';
import './index.scss';

import Home from './components/Home';
import Transliterate from './components/Transliterate';

const App = () => {
	return (
		<BrowserRouter>
			<Particles params={particleConfig} />
			{/* <Route path='/cyrillicconvert' render={Transliterate} />
			<Route path='/' render={Home} exact /> */}

			{/* <Transliterate></Transliterate> */}
			<ul className='nav'>
				<li className='nav-item'>
					<Link to='/' className='nav-link'>
						Home
					</Link>
				</li>
				<li className='nav-item'>
					<Link to='/cyrillicconvert' className='nav-link'>
						Cyr&lt;&gt;Latin
					</Link>
				</li>
			</ul>
			<Switch>
				<Route path='/cyrillicconvert'>
					<Transliterate />
				</Route>
				<Route path='/'>
					<Home />
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
