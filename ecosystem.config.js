module.exports = {
	apps: [
		{
			name: 'crystal-api',
			script: 'dist/main.js',
			autorestart: true,
			watch: false,
			env: {
				NODE_ENV: 'production',
			},
		},
	],
};
