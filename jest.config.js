module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/'],
  transformIgnorePatterns: [
    'node_modules/(?!(?:common-strategy|react-native|@react-native|expo(?:-.*)?|@expo|@react-native-community)/)',
  ],
};

