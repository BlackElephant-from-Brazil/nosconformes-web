module.exports = {
	preset: 'ts-jest/presets/js-with-ts',
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		'^axios$': require.resolve('axios'),
		'axios': 'axios/dist/node/axios.cjs'
	},
}