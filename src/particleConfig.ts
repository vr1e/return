const options = {
	background: {
		color: '#000'
	},
	particles: {
		move: {
			direction: 'none',
			enable: true,
			outModes: {
				default: 'out'
			},
			random: true,
			speed: 0.1,
			straight: false
		},
		opacity: {
			animation: {
				enable: true,
				speed: 1,
				sync: false
			},
			value: { min: 0, max: 1 }
		},
		size: {
			value: { min: 1, max: 3 }
		}
	}
};

export default options;