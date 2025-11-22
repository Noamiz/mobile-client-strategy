import { useEffect, useMemo, useState } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '../../theme';

export type SnackbarVariant = 'info' | 'success' | 'error';

type SnackbarProps = {
  visible: boolean;
  message: string;
  variant: SnackbarVariant;
};

export function Snackbar({ visible, message, variant }: SnackbarProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [translateY] = useState(() => new Animated.Value(80));
  const [opacity] = useState(() => new Animated.Value(0));
  const [shouldRender, setShouldRender] = useState(visible);

  useEffect(() => {
    let frame: number | null = null;

    if (visible) {
      frame = requestAnimationFrame(() => {
        setShouldRender(true);
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
      });
    } else if (shouldRender) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 80,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        if (finished) {
          setShouldRender(false);
        }
      });
    }
    return () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, [opacity, shouldRender, translateY, visible]);

  if (!shouldRender) {
    return null;
  }

  const backgroundColor = getVariantBackground(theme, variant);

  return (
    <Animated.View
      accessibilityLiveRegion="polite"
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          opacity,
          bottom: insets.bottom + theme.spacing.lg,
          backgroundColor,
        },
      ]}
    >
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
}

function getVariantBackground(theme: ReturnType<typeof useTheme>, variant: SnackbarVariant) {
  switch (variant) {
    case 'success':
      return theme.colors.success;
    case 'error':
      return theme.colors.error;
    case 'info':
    default:
      return theme.colors.accent;
  }
}

function createStyles(theme: ReturnType<typeof useTheme>) {
  return StyleSheet.create({
    container: {
      position: 'absolute',
      left: theme.spacing.lg,
      right: theme.spacing.lg,
      borderRadius: theme.radius.md,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.lg,
      ...theme.elevation.raised,
    },
    message: {
      color: '#ffffff',
      fontSize: theme.typography.label.fontSize,
      fontWeight: theme.typography.label.fontWeight,
    },
  });
}


