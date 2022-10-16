import { useCallback } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import './index.scss';
import particleConfig from './particleConfig';

import Home from './components/Home';
import Transliterate from './components/Transliterate';

function App() {
	const particlesInit = useCallback(async engine => {
		// console.log(engine);
		// you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
		// this loads the tsparticles package bundle, it's the easiest method for getting everything ready
		// starting from v2 you can add only the features you need reducing the bundle size
		await loadFull(engine);
	}, []);

	return (
		<BrowserRouter>
			<Particles
				id='tsparticles'
				options={particleConfig}
				init={particlesInit}
			/>
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
			<Routes>
				<Route path='/cyrillicconvert' element={<Transliterate />} />
				<Route path='/' element={<Home />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
