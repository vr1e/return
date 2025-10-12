import { useEffect, useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Engine } from '@tsparticles/engine';
import particleConfig from './config/particles';
import { analytics } from './services/analytics';
import { INSIGHTS_PROJECT_ID } from './config/env';
import Home from './components/Home';
import Transliterate from './components/Transliterate';

import './index.css';

function App() {
	const [init, setInit] = useState(false);

	useEffect(() => {
		void initParticlesEngine(async (engine: Engine) => {
			// you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
			// this loads the tsparticles package bundle, it's the easiest method for getting everything ready
			// starting from v2 you can add only the features you need reducing the bundle size
			await loadSlim(engine);
		}).then(() => {
			setInit(true);
		});
	}, []);

	useEffect(() => {
		// Initialize analytics (disabled in development mode)
		analytics.init(INSIGHTS_PROJECT_ID, import.meta.env.DEV);

		// Enable automatic page view tracking
		analytics.trackPages();
	}, []);

	return (
		<BrowserRouter>
			<a href='#main-content' className='skip-link'>
				Skip to main content
			</a>
			{init && <Particles id='tsparticles' options={particleConfig} />}
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
