import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomSheet } from '../components/BottomSheet';
import { MobileAiAssistantSheet } from '../components/ai/MobileAiAssistantSheet';
import { AppHeader } from '../components/layout/AppHeader';
import { IconButton } from '../components/layout/IconButton';
import { useTheme } from '../theme';

export function HomeScreen() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <AppHeader
          title="Home"
          subtitle="E2E Experience overview"
          actions={
            <>
              <IconButton onPress={() => setFiltersOpen(true)}>
                <Ionicons name="options-outline" size={18} color={theme.colors.textPrimary} />
              </IconButton>
            </>
          }
        />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Next session</Text>
            <Text style={styles.cardTitle}>Live Ops Pulse</Text>
            <Text style={styles.cardBody}>Starts in 32 mins • Keep an eye on Gateway metrics</Text>
            <View style={styles.cardAction}>
              <Text style={styles.cardActionText}>View details</Text>
              <Ionicons name="chevron-forward" size={16} color={theme.colors.accent} />
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>Highlights</Text>
            <View style={styles.highlightRow}>
              <View style={styles.highlight}>
                <Text style={styles.highlightValue}>4</Text>
                <Text style={styles.highlightCaption}>Active alerts</Text>
              </View>
              <View style={styles.highlight}>
                <Text style={styles.highlightValue}>98%</Text>
                <Text style={styles.highlightCaption}>SLA met</Text>
              </View>
              <View style={styles.highlight}>
                <Text style={styles.highlightValue}>2</Text>
                <Text style={styles.highlightCaption}>Sessions today</Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>Quick actions</Text>
            <View style={styles.quickActions}>
              {['Start session', 'Share summary', 'Notify team'].map((action) => (
                <View style={styles.quickActionBadge} key={action}>
                  <Text style={styles.quickActionText}>{action}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        <Pressable
          style={({ pressed }) => [styles.fab, pressed ? styles.fabPressed : null]}
          onPress={() => setAssistantOpen(true)}
          accessibilityRole="button"
          accessibilityLabel="Open AI Assistant"
        >
          <Ionicons name="sparkles" size={20} color="#ffffff" />
          <Text style={styles.fabLabel}>Ask AI</Text>
        </Pressable>
      </View>

      <BottomSheet visible={filtersOpen} onClose={() => setFiltersOpen(false)}>
        <Text style={styles.sheetTitle}>Filter dashboard</Text>
        <Text style={styles.sheetSubtitle}>Choose which product area you want to focus on.</Text>
        <View style={styles.sheetTags}>
          {['All', 'Gateway', 'Sessions', 'History'].map((tag) => (
            <Pressable key={tag} style={styles.sheetTag} onPress={() => setFiltersOpen(false)}>
              <Text style={styles.sheetTagText}>{tag}</Text>
            </Pressable>
          ))}
        </View>
      </BottomSheet>

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
    },
    scrollContent: {
      paddingHorizontal: theme.spacing.lg,
      paddingBottom: theme.spacing.xxl * 2,
    },
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.lg,
      padding: theme.spacing.lg,
      borderWidth: 1,
      borderColor: theme.colors.border,
      ...theme.elevation.card,
      marginBottom: theme.spacing.lg,
    },
    cardLabel: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.caption.fontSize,
      fontWeight: '500',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    cardTitle: {
      marginTop: theme.spacing.xs,
      color: theme.colors.textPrimary,
      fontSize: theme.typography.title2.fontSize,
      fontWeight: theme.typography.title2.fontWeight,
    },
    cardBody: {
      marginTop: theme.spacing.xs,
      color: theme.colors.textSecondary,
      fontSize: theme.typography.body.fontSize,
    },
    cardAction: {
      marginTop: theme.spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
    },
    cardActionText: {
      color: theme.colors.accent,
      fontSize: theme.typography.label.fontSize,
      fontWeight: theme.typography.label.fontWeight,
      marginRight: theme.spacing.xs,
    },
    highlightRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: theme.spacing.md,
    },
    highlight: {
      flex: 1,
      paddingVertical: theme.spacing.sm,
    },
    highlightValue: {
      color: theme.colors.textPrimary,
      fontSize: 24,
      fontWeight: '700',
    },
    highlightCaption: {
      color: theme.colors.textSecondary,
      marginTop: theme.spacing.xs / 2,
    },
    quickActions: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: theme.spacing.md,
    },
    quickActionBadge: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.radius.pill,
      borderWidth: 1,
      borderColor: theme.colors.border,
      marginRight: theme.spacing.sm,
      marginBottom: theme.spacing.sm,
      backgroundColor: theme.colors.surfaceAlt,
    },
    quickActionText: {
      color: theme.colors.textPrimary,
      fontWeight: '600',
    },
    fab: {
      position: 'absolute',
      right: theme.spacing.xl,
      bottom: theme.spacing.xl,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.radius.pill,
      backgroundColor: theme.colors.accent,
      ...theme.elevation.raised,
    },
    fabPressed: {
      opacity: 0.85,
    },
    fabLabel: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
      marginLeft: theme.spacing.xs,
    },
    sheetTitle: {
      fontSize: theme.typography.title2.fontSize,
      fontWeight: theme.typography.title2.fontWeight,
      color: theme.colors.textPrimary,
    },
    sheetSubtitle: {
      marginTop: theme.spacing.xs,
      color: theme.colors.textSecondary,
    },
    sheetTags: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: theme.spacing.md,
    },
    sheetTag: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.radius.pill,
      borderWidth: 1,
      borderColor: theme.colors.border,
      marginRight: theme.spacing.sm,
      marginBottom: theme.spacing.sm,
      backgroundColor: theme.colors.surfaceAlt,
    },
    sheetTagText: {
      color: theme.colors.textPrimary,
      fontWeight: '600',
    },
  });
}


