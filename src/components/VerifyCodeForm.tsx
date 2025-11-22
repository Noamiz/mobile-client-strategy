import { useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { ErrorCode, User } from 'common-strategy';

import { verifyCode } from '../api/authClient';
import { useTheme } from '../theme';

type Props = {
  onSuccess: (user: User) => void;
  initialEmail?: string;
};

export function VerifyCodeForm({ onSuccess, initialEmail = '' }: Props) {
  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const handleSubmit = async () => {
    if (!email.trim()) {
      setErrorMessage('Enter the email address that received the code.');
      return;
    }

    if (!code.trim()) {
      setErrorMessage('Enter both your email and the 6-digit code.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const result = await verifyCode({
        email: email.trim().toLowerCase(),
        code: code.trim(),
      });

      if (result.ok) {
        onSuccess(result.data.user);
        return;
      }

      setErrorMessage(getErrorMessage(result.error.code, result.error.message));
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Unable to verify the code. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email address</Text>
      <TextInput
        accessibilityLabel="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        placeholder="you@example.com"
        value={email}
        style={styles.input}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Verification code</Text>
      <TextInput
        accessibilityLabel="Verification code"
        keyboardType="number-pad"
        placeholder="123456"
        maxLength={6}
        value={code}
        style={styles.input}
        onChangeText={setCode}
      />

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <Pressable
        accessibilityRole="button"
        onPress={handleSubmit}
        style={({ pressed }) => [
          styles.button,
          loading ? styles.buttonDisabled : null,
          pressed ? styles.buttonPressed : null,
        ]}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.buttonLabel}>Verify & Continue</Text>
        )}
      </Pressable>
    </View>
  );
}

function getErrorMessage(code: ErrorCode, fallback: string) {
  switch (code) {
    case 'UNAUTHORIZED':
      return 'The code you entered is invalid or expired.';
    case 'TOO_MANY_REQUESTS':
      return 'Too many attempts. Please request a new code in a moment.';
    case 'VALIDATION_ERROR':
      return fallback;
    default:
      return 'Something went wrong. Please try again.';
  }
}

function createStyles(theme: ReturnType<typeof useTheme>) {
  return StyleSheet.create({
    container: {
      width: '100%',
    },
    label: {
      fontSize: theme.typography.label.fontSize,
      fontWeight: theme.typography.label.fontWeight,
      color: theme.colors.textPrimary,
      marginBottom: theme.spacing.xs,
      marginTop: theme.spacing.sm,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.radius.md,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm + 2,
      fontSize: theme.typography.body.fontSize,
      color: theme.colors.textPrimary,
      backgroundColor: theme.colors.surface,
    },
    errorText: {
      marginTop: theme.spacing.xs,
      color: theme.colors.error,
      fontSize: theme.typography.caption.fontSize,
    },
    button: {
      marginTop: theme.spacing.lg,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.accent,
      paddingVertical: theme.spacing.md,
      borderRadius: theme.radius.md,
      ...theme.elevation.raised,
    },
    buttonDisabled: {
      opacity: 0.6,
    },
    buttonPressed: {
      opacity: 0.85,
    },
    buttonLabel: {
      color: '#ffffff',
      fontSize: theme.typography.label.fontSize,
      fontWeight: theme.typography.label.fontWeight,
    },
  });
}

