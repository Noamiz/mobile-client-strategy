import { useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { sendCode } from '../api/authClient';
import { useTheme } from '../theme';

type Props = {
  onSuccess: (email: string) => void;
};

export function SendCodeForm({ onSuccess }: Props) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const handleSubmit = async () => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    if (!isValidEmail(normalizedEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const result = await sendCode({ email: normalizedEmail });

      if (result.ok) {
        onSuccess(normalizedEmail);
        return;
      }

      setErrorMessage(result.error.message);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Unable to send the code. Please try again.',
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
      <Text style={styles.helper}>We will send a one-time 6-digit code to this email.</Text>

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
          <Text style={styles.buttonLabel}>Send Code</Text>
        )}
      </Pressable>
    </View>
  );
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
    helper: {
      marginTop: theme.spacing.xs,
      color: theme.colors.textSecondary,
      fontSize: theme.typography.caption.fontSize,
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
      opacity: 0.8,
    },
    buttonLabel: {
      color: '#ffffff',
      fontSize: theme.typography.label.fontSize,
      fontWeight: theme.typography.label.fontWeight,
    },
  });
}

function isValidEmail(candidate: string) {
  return /\S+@\S+\.\S+/.test(candidate);
}

