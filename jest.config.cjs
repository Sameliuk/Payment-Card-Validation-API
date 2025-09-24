/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  roots: ["<rootDir>/tests", "<rootDir>/src"],
  transform: {
    "^.+\\.ts$": ["ts-jest", { useESM: true }],
  },
  globals: {
    "ts-jest": { useESM: true },
  },
  moduleNameMapper: {
    "^(.*)\\.js$": "$1",
  },
};
