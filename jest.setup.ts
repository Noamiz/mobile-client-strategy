import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';
jest.mock('react-native/Libraries/Animated/NativeAnimatedModule');

const originalWarn = console.warn;

console.warn = (...args: unknown[]) => {
  const message = typeof args[0] === 'string' ? args[0] : '';
  if (message.includes('SafeAreaView has been deprecated')) {
    return;
  }

  originalWarn(...(args as Parameters<typeof console.warn>));
};

jest.mock('react-native-safe-area-context', () => {
  const SafeAreaContext = jest.requireActual('react-native-safe-area-context');

  return {
    ...SafeAreaContext,
    SafeAreaProvider: ({ children }: any) => children,
    SafeAreaView: ({ children }: any) => children,
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  };
});

jest.mock('react-native-screens', () => {
  const actual = jest.requireActual('react-native-screens');
  return {
    ...actual,
    enableScreens: jest.fn(),
  };
});


