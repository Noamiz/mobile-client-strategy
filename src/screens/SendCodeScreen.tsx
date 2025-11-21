import { StyleSheet, Text, View } from 'react-native';

import { SendCodeForm } from '../components/SendCodeForm';

type Props = {
  onSuccess: () => void;
};

export function SendCodeScreen({ onSuccess }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.subtitle}>
        Enter your email address and we will send you a 6-digit login code.
      </Text>
      <SendCodeForm onSuccess={onSuccess} />
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
});

