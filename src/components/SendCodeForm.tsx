import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { sendCode } from '../api/authClient';

type Props = {
  onSuccess: () => void;
};

export function SendCodeForm({ onSuccess }: Props) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!email.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const result = await sendCode({ email: email.trim().toLowerCase() });

      if (result.ok) {
        onSuccess();
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

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <Pressable
        accessibilityRole="button"
        onPress={handleSubmit}
        style={[styles.button, loading ? styles.buttonDisabled : null]}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.buttonLabel}>Send Code</Text>}
      </Pressable>
    </View>
  );
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

