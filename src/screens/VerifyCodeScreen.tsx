import type { User } from 'common-strategy';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { VerifyCodeForm } from '../components/VerifyCodeForm';
import { useSnackbar } from '../components/snackbar/SnackbarProvider';
import { useAuth } from '../hooks/useAuth';
import type { AuthStackParamList } from '../navigation/RootNavigator';
import { useTheme } from '../theme';

type Props = NativeStackScreenProps<AuthStackParamList, 'VerifyCode'>;

export function VerifyCodeScreen({ navigation, route }: Props) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { completeSignIn, resetAuthFlow } = useAuth();
  const { showSnackbar } = useSnackbar();
  const initialEmail = route.params?.email ?? '';

  const handleSuccess = (user: User) => {
    completeSignIn(user);
    showSnackbar('Signed in successfully', { variant: 'success' });
  };

  const handleBack = () => {
    resetAuthFlow();
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.title}>Check your inbox</Text>
          <Text style={styles.subtitle}>
            Enter the 6-digit code we sent to <Text style={styles.bold}>{initialEmail}</Text>.
          </Text>
        </View>
        <VerifyCodeForm onSuccess={handleSuccess} initialEmail={initialEmail} />
        <Text style={styles.backLink} onPress={handleBack}>
          Use a different email
        </Text>
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
    bold: {
      fontWeight: '600',
      color: theme.colors.textPrimary,
    },
    backLink: {
      marginTop: theme.spacing.lg,
      color: theme.colors.accent,
      fontWeight: '600',
    },
  });
}
