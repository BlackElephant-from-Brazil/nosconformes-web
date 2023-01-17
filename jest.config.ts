import { Config } from 'jest'
import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'

const config: Config = {
	preset: 'ts-jest/presets/js-with-ts',
	testEnvironment: 'jsdom',
	coverageReporters: [
		'text-summary',
		'lcov'
	],
	coverageDirectory: 'coverage',
	collectCoverage: true,
	collectCoverageFrom: [
		'<rootDir>/src/modules/*',
		'<rootDir>/src/hooks/*',
		'<rootDir>/src/components/*',
	],
	clearMocks: true,
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' }),
	testMatch: [
		'<rootDir>/src/__tests__/*'
	]
}

export default config