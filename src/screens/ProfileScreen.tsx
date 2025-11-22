import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MobileAiAssistantSheet } from '../components/ai/MobileAiAssistantSheet';
import { AppHeader } from '../components/layout/AppHeader';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../theme';

export function ProfileScreen() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { user, resetAuthFlow } = useAuth();
  const [assistantOpen, setAssistantOpen] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <AppHeader title="Profile" subtitle="Account & preferences" />

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Signed in as</Text>
          <Text style={styles.cardValue}>{user?.email ?? 'user@example.com'}</Text>
        </View>

        <Text style={styles.sectionLabel}>Assist & settings</Text>

        <Pressable
          style={({ pressed }) => [styles.row, pressed ? styles.rowPressed : null]}
          onPress={() => setAssistantOpen(true)}
        >
          <View>
            <Text style={styles.rowTitle}>AI Assistant</Text>
            <Text style={styles.rowSubtitle}>Get quick guidance inside a bottom sheet</Text>
          </View>
          <Ionicons name="sparkles" size={18} color={theme.colors.accent} />
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.row, pressed ? styles.rowPressed : null]}
          onPress={resetAuthFlow}
        >
          <View>
            <Text style={styles.rowTitle}>Sign out</Text>
            <Text style={styles.rowSubtitle}>Return to the verification flow</Text>
          </View>
          <Ionicons name="log-out-outline" size={18} color={theme.colors.textSecondary} />
        </Pressable>
      </View>

      <MobileAiAssistantSheet visible={assistantOpen} onClose={() => setAssistantOpen(false)} />
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
    },
    card: {
      marginTop: theme.spacing.lg,
      padding: theme.spacing.lg,
      borderRadius: theme.radius.md,
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      ...theme.elevation.card,
    },
    cardLabel: {
      color: theme.colors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      fontSize: theme.typography.caption.fontSize,
    },
    cardValue: {
      marginTop: theme.spacing.xs,
      color: theme.colors.textPrimary,
      fontSize: theme.typography.body.fontSize,
      fontWeight: '600',
    },
    sectionLabel: {
      marginTop: theme.spacing.xl,
      marginBottom: theme.spacing.sm,
      color: theme.colors.textSecondary,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    row: {
      paddingVertical: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    rowPressed: {
      opacity: 0.7,
    },
    rowTitle: {
      color: theme.colors.textPrimary,
      fontSize: theme.typography.body.fontSize,
      fontWeight: '600',
    },
    rowSubtitle: {
      marginTop: theme.spacing.xs / 2,
      color: theme.colors.textSecondary,
      fontSize: theme.typography.caption.fontSize,
    },
  });
}


