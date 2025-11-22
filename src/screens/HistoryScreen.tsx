import { useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '../components/layout/AppHeader';
import { useTheme } from '../theme';

const DATA = [
  { id: '1', title: 'Live Ops Pulse', detail: 'Completed • 42 mins • SLA 97%' },
  { id: '2', title: 'Gateway diagnostics', detail: 'Completed • 18 mins • SLA 99%' },
  { id: '3', title: 'Customer sync', detail: 'Completed • 25 mins • SLA 95%' },
];

export function HistoryScreen() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <AppHeader title="History" subtitle="Recent sessions & recaps" />
        <FlatList
          data={DATA}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <View style={styles.listMarker} />
              <View style={styles.listText}>
                <Text style={styles.listTitle}>{item.title}</Text>
                <Text style={styles.listDetail}>{item.detail}</Text>
              </View>
            </View>
          )}
        />
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
    },
    listContent: {
      paddingHorizontal: theme.spacing.lg,
      paddingBottom: theme.spacing.xxl,
    },
    listItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing.md,
    },
    listMarker: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: theme.colors.accent,
      marginRight: theme.spacing.md,
    },
    listText: {
      flex: 1,
    },
    listTitle: {
      color: theme.colors.textPrimary,
      fontSize: theme.typography.body.fontSize,
      fontWeight: '600',
    },
    listDetail: {
      marginTop: theme.spacing.xs / 2,
      color: theme.colors.textSecondary,
      fontSize: theme.typography.caption.fontSize,
    },
    separator: {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
  });
}


