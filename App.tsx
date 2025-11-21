import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { useAuth } from './src/hooks/useAuth';
import { LoggedInScreen } from './src/screens/LoggedInScreen';
import { SendCodeScreen } from './src/screens/SendCodeScreen';
import { VerifyCodeScreen } from './src/screens/VerifyCodeScreen';

export default function App() {
  const { view, user, goToSendCode, goToVerifyCode, onLoggedIn } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        automaticallyAdjustKeyboardInsets
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          {view === 'sendCode' ? <SendCodeScreen onSuccess={goToVerifyCode} /> : null}
          {view === 'verifyCode' ? (
            <VerifyCodeScreen onSuccess={onLoggedIn} onBack={goToSendCode} />
          ) : null}
          {view === 'loggedIn' && user ? (
            <LoggedInScreen user={user} onReset={goToSendCode} />
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
  },
});
