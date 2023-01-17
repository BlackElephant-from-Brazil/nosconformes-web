module.exports = {
	presets: [
		['@babel/preset-env', { targets: { node: 'current' } }],
		'@babel/preset-typescript',
	],
	plugins: [
		['module-resolver', {
			alias: {
				'modules': './src/modules',
				'hooks': './src/hooks',
				'components': './src/components',
				'assets': './src/assets',
			}
		}],
	]
}