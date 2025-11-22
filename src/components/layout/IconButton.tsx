import type { PropsWithChildren } from 'react';
import { Pressable, type PressableProps, StyleSheet } from 'react-native';
import { useMemo } from 'react';

import { useTheme } from '../../theme';

type IconButtonProps = PropsWithChildren<PressableProps>;

export function IconButton({ children, ...pressableProps }: IconButtonProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Pressable
      accessibilityRole="button"
      style={({ pressed }) => [styles.button, pressed ? styles.pressed : null]}
      hitSlop={8}
      {...pressableProps}
    >
      {children}
    </Pressable>
  );
}

function createStyles(theme: ReturnType<typeof useTheme>) {
  return StyleSheet.create({
    button: {
      width: 40,
      height: 40,
      borderRadius: theme.radius.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.surface,
      marginLeft: theme.spacing.xs,
    },
    pressed: {
      opacity: 0.7,
    },
  });
}


