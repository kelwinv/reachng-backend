/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^Application/(.*)$": "<rootDir>/src/Application/$1",
    "^Domains/(.*)$": "<rootDir>/src/Domains/$1",
    "^Infra/(.*)$": "<rootDir>/src/Infra/$1",
    "^test/(.*)$": "<rootDir>/test/$1",
  },
};
