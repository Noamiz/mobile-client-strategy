import type { User } from 'common-strategy';
import { StyleSheet, Text, View } from 'react-native';

import { VerifyCodeForm } from '../components/VerifyCodeForm';

type Props = {
  onSuccess: (user: User) => void;
  onBack?: () => void;
};

export function VerifyCodeScreen({ onSuccess, onBack }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify your code</Text>
      <Text style={styles.subtitle}>
        Check your inbox for the 6-digit code. Enter it below to finish signing in.
      </Text>
      <VerifyCodeForm onSuccess={onSuccess} />
      {onBack ? (
        <Text style={styles.backLink} onPress={onBack}>
          Use a different email
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    fontSize: 16,
    color: '#475467',
  },
  backLink: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '600',
  },
});
