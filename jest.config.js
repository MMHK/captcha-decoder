/**
 * @type {import('jest').Config}
 */
const config = {
    testEnvironment: "node",
    setupFiles: ['<rootDir>/jest.setup.js'],
    transform: {
        "^.+\\.mjs$": "babel-jest"
    },
    extensionsToTreatAsEsm: ['.ts', '.tsx', '.jsx'],
    "testMatch": [
        "./**/*.test.mjs"
    ],
}

module.exports = config;
