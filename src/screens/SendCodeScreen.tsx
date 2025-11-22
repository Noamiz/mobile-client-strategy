import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SendCodeForm } from '../components/SendCodeForm';
import { useSnackbar } from '../components/snackbar/SnackbarProvider';
import { useAuth } from '../hooks/useAuth';
import type { AuthStackParamList } from '../navigation/RootNavigator';
import { useTheme } from '../theme';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'SendCode'>;

export function SendCodeScreen() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation = useNavigation<NavigationProp>();
  const { showSnackbar } = useSnackbar();
  const { startEmailVerification } = useAuth();

  const handleSuccess = (email: string) => {
    startEmailVerification(email);
    showSnackbar('Verification code sent');
    navigation.navigate('VerifyCode', { email });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.title}>Let’s sign you in</Text>
          <Text style={styles.subtitle}>
            Enter your email and we will send a one-time verification code.
          </Text>
        </View>
        <SendCodeForm onSuccess={handleSuccess} />
      </View>
    </SafeAreaView>
  );
}

function createStyles(theme: ReturnType<typeof useTheme>) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    container: {
      flex: 1,
      paddingHorizontal: theme.spacing.lg,
      paddingTop: theme.spacing.xl,
    },
    hero: {
      marginBottom: theme.spacing.xl,
    },
    title: {
      fontSize: theme.typography.title1.fontSize,
      fontWeight: theme.typography.title1.fontWeight,
      color: theme.colors.textPrimary,
    },
    subtitle: {
      marginTop: theme.spacing.sm,
      color: theme.colors.textSecondary,
      fontSize: theme.typography.body.fontSize,
    },
  });
}


