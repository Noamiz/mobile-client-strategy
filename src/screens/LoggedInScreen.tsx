import type { User } from 'common-strategy';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  user: User;
  onReset: () => void;
};

export function LoggedInScreen({ user, onReset }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>You are logged in 🎉</Text>
      <Text style={styles.subtitle}>
        Signed in as <Text style={styles.email}>{user.email}</Text>
      </Text>
      <Text style={styles.helper}>
        This is a placeholder screen. Future releases will load the actual product experience
        after authentication.
      </Text>
      <Text style={styles.action} onPress={onReset}>
        Sign in with a different account
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 16,
    alignItems: 'flex-start',
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
  email: {
    fontWeight: '600',
    color: '#111827',
  },
  helper: {
    fontSize: 14,
    color: '#6b7280',
  },
  action: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#2563eb',
  },
});

