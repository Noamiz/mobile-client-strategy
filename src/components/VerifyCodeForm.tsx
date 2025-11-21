import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { ErrorCode, User } from 'common-strategy';

import { verifyCode } from '../api/authClient';

type Props = {
  onSuccess: (user: User) => void;
};

export function VerifyCodeForm({ onSuccess }: Props) {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!email.trim() || !code.trim()) {
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
        style={[styles.button, loading ? styles.buttonDisabled : null]}
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

const styles = StyleSheet.create({
  container: {
    gap: 12,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f1f1f',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d0d5dd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    fontSize: 16,
  },
  errorText: {
    color: '#b42318',
    fontSize: 14,
  },
  button: {
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonLabel: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

