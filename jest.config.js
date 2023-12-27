module.exports = {
    preset: 'ts-jest', // This preset configures Jest to use ts-jest for TypeScript files
    testEnvironment: 'node', // Sets the testing environment to node
    transform: {
      '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript files with ts-jest
    },
    testRegex: '/tests/.*\\.(test|spec)?\\.(ts|tsx)$', // Regex to find test files
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // File extensions Jest will look for
  };
  