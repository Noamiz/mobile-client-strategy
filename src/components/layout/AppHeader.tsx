import { type ReactNode, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../../theme';

type Props = {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
};

export function AppHeader({ title, subtitle, actions }: Props) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <View style={styles.textGroup}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {actions ? <View style={styles.actions}>{actions}</View> : null}
    </View>
  );
}

function createStyles(theme: ReturnType<typeof useTheme>) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing.lg,
      paddingBottom: theme.spacing.sm,
    },
    textGroup: {
      flex: 1,
      paddingRight: theme.spacing.sm,
    },
    title: {
      color: theme.colors.textPrimary,
      fontSize: theme.typography.title2.fontSize,
      fontWeight: theme.typography.title2.fontWeight,
    },
    subtitle: {
      marginTop: theme.spacing.xs,
      color: theme.colors.textSecondary,
      fontSize: theme.typography.body.fontSize,
    },
    actions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
}


