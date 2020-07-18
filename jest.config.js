module.exports = {
    verbose: true,
    testEnvironment: 'node',
    testRegex: '((\\.|/)(test|spec))\\.js$',
    testPathIgnorePatterns: ['node_modules', 'public'],
    coveragePathIgnorePatterns: ['/node_modules/'],
}
