// E2E-XS v1: shared bottom sheet primitive used for filters, the AI assistant,
// and other mobile-rich modals.
import type { PropsWithChildren } from 'react';
import {
  Animated,
  Easing,
  Modal,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { useEffect, useMemo, useState } from 'react';

import { useTheme } from '../theme';

// TODO (UX polish): consider adding drag-to-dismiss gestures to match modern mobile sheets.

type BottomSheetProps = PropsWithChildren<{
  visible: boolean;
  onClose: () => void;
}>;

export function BottomSheet({ visible, onClose, children }: BottomSheetProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { height } = useWindowDimensions();
  const [translateY] = useState(() => new Animated.Value(1));
  const [mountSheet, setMountSheet] = useState(visible);

  useEffect(() => {
    let frame: number | null = null;

    if (visible) {
      frame = requestAnimationFrame(() => {
        setMountSheet(true);
        Animated.timing(translateY, {
          toValue: 0,
          duration: 260,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }).start();
      });
    } else {
      Animated.timing(translateY, {
        toValue: 1,
        duration: 220,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          setMountSheet(false);
        }
      });
    }
    return () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, [translateY, visible]);

  if (!mountSheet) {
    return null;
  }

  const translateYValue = translateY.interpolate({
    inputRange: [0, 1],
    outputRange: [0, height * 0.4],
  });

  return (
    <Modal visible={visible || mountSheet} transparent animationType="none" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} testID="bottom-sheet-backdrop" />
      <Animated.View style={[styles.sheet, { transform: [{ translateY: translateYValue }] }]}>
        <View style={styles.handle} />
        {children}
      </Animated.View>
    </Modal>
  );
}

function createStyles(theme: ReturnType<typeof useTheme>) {
  return StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: theme.colors.overlay,
    },
    sheet: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      paddingHorizontal: theme.spacing.lg,
      paddingTop: theme.spacing.md,
      paddingBottom: theme.spacing.xl,
      backgroundColor: theme.colors.surface,
      borderTopLeftRadius: theme.radius.lg,
      borderTopRightRadius: theme.radius.lg,
      ...theme.elevation.sheet,
    },
    handle: {
      alignSelf: 'center',
      width: 48,
      height: 5,
      borderRadius: theme.radius.pill,
      backgroundColor: theme.colors.border,
      marginBottom: theme.spacing.md,
    },
  });
}


