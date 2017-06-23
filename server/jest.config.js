module.exports = {
	modulePaths: [
		'<rootDir>/test/',
		'<rootDir>/server/',
		'<rootDir>/client/',
	],
	rootDir: './../',
	testEnvironment: 'node',
	testMatch: [ '**/server/**/test/*.js?(x)' ],
	timers: 'fake',
	setupTestFrameworkScriptFile: '<rootDir>/test/setup-test-framework.js',
	verbose: true,
};