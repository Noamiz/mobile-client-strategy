import { Ionicons } from '@expo/vector-icons';
import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '../components/layout/AppHeader';
import { IconButton } from '../components/layout/IconButton';
import { useTheme } from '../theme';

export function LiveScreen() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <AppHeader
          title="Live Sessions"
          subtitle="Coming soon"
          actions={
            <>
              <IconButton onPress={() => {}}>
                <Ionicons name="refresh" size={18} color={theme.colors.textPrimary} />
              </IconButton>
            </>
          }
        />
        <View style={styles.placeholder}>
          <Text style={styles.placeholderTitle}>Real-time view coming soon</Text>
          <Text style={styles.placeholderBody}>
            Live session playback, real-time alerts, and broadcast tools will appear here.
          </Text>
          <Pressable style={styles.placeholderCta}>
            <Text style={styles.placeholderCtaText}>Notify me</Text>
          </Pressable>
        </View>
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
    },
    placeholder: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.lg,
    },
    placeholderTitle: {
      color: theme.colors.textPrimary,
      fontSize: theme.typography.title2.fontSize,
      fontWeight: theme.typography.title2.fontWeight,
      textAlign: 'center',
    },
    placeholderBody: {
      marginTop: theme.spacing.sm,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      fontSize: theme.typography.body.fontSize,
    },
    placeholderCta: {
      marginTop: theme.spacing.lg,
      borderRadius: theme.radius.pill,
      paddingHorizontal: theme.spacing.xl,
      paddingVertical: theme.spacing.sm,
      backgroundColor: theme.colors.accent,
    },
    placeholderCtaText: {
      color: theme.colors.surface,
      fontWeight: '600',
    },
  });
}


