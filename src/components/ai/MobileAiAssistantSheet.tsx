// E2E-XS v1: mobile AI assistant stub in a bottom sheet. Local echo only today
// but ready for a real backend once available.
import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { BottomSheet } from '../BottomSheet';
import { useTheme } from '../../theme';

type Message = {
  id: string;
  role: 'assistant' | 'user';
  text: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
};

export function MobileAiAssistantSheet({ visible, onClose }: Props) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Hi! I can summarize live sessions, explain alerts, or guide you toward the right action.',
    },
  ]);
  const [draft, setDraft] = useState('');

  const handleSend = () => {
    const trimmed = draft.trim();
    if (!trimmed) {
      return;
    }

    const newMessage: Message = { id: buildId(), role: 'user', text: trimmed };
    setMessages((current) => [...current, newMessage, buildAssistantEcho(trimmed)]);
    setDraft('');
  };

  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={24}
      >
        <Text style={styles.title}>AI Assistant</Text>
        <Text style={styles.subtitle}>Ask about performance, live sessions, or upcoming plans.</Text>

        <ScrollView style={styles.messages} contentContainerStyle={styles.messagesContent}>
          {messages.map((message, index) => (
            <View
              key={message.id}
              style={[
                styles.messageBubble,
                message.role === 'user' ? styles.userBubble : styles.assistantBubble,
                index < messages.length - 1 ? styles.messageSpacing : null,
              ]}
            >
              {message.role === 'assistant' ? (
                <View style={styles.messageLabelRow}>
                  <Ionicons name="sparkles-outline" size={16} color={theme.colors.textSecondary} />
                  <Text style={styles.messageLabel}>Assistant</Text>
                </View>
              ) : null}
              <Text style={styles.messageText}>{message.text}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputRow}>
          <TextInput
            value={draft}
            onChangeText={setDraft}
            placeholder="Type a question"
            style={styles.input}
            multiline
            maxLength={400}
            accessibilityLabel="AI assistant input"
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Send"
            onPress={handleSend}
            style={({ pressed }) => [
              styles.sendButton,
              { opacity: pressed || !draft.trim() ? 0.8 : 1 },
            ]}
          >
            <Ionicons name="send" size={20} color={theme.colors.surface} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </BottomSheet>
  );
}

function buildAssistantEcho(text: string): Message {
  return {
    id: buildId(),
    role: 'assistant',
    text: `Got it — "${text}". I will route that to the strategy playbook. (Stub response)`,
  };
}

function buildId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function createStyles(theme: ReturnType<typeof useTheme>) {
  return StyleSheet.create({
    title: {
      fontSize: theme.typography.title2.fontSize,
      fontWeight: theme.typography.title2.fontWeight,
      color: theme.colors.textPrimary,
    },
    subtitle: {
      marginTop: theme.spacing.xs,
      color: theme.colors.textSecondary,
      fontSize: theme.typography.body.fontSize,
    },
    messages: {
      maxHeight: 280,
      marginTop: theme.spacing.lg,
    },
    messagesContent: {
      paddingBottom: theme.spacing.lg,
    },
    messageBubble: {
      borderRadius: theme.radius.md,
      padding: theme.spacing.md,
    },
    messageSpacing: {
      marginBottom: theme.spacing.sm,
    },
    userBubble: {
      alignSelf: 'flex-end',
      backgroundColor: theme.colors.surfaceAlt,
    },
    assistantBubble: {
      alignSelf: 'flex-start',
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    messageText: {
      color: theme.colors.textPrimary,
      fontSize: theme.typography.body.fontSize,
    },
    messageLabelRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.xs,
    },
    messageLabel: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.caption.fontSize,
      marginLeft: theme.spacing.xs,
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      marginTop: theme.spacing.md,
    },
    input: {
      flex: 1,
      minHeight: 48,
      maxHeight: 120,
      borderRadius: theme.radius.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      backgroundColor: theme.colors.surface,
      fontSize: theme.typography.body.fontSize,
      color: theme.colors.textPrimary,
    },
    sendButton: {
      width: 48,
      height: 48,
      borderRadius: theme.radius.md,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.accent,
      marginLeft: theme.spacing.sm,
    },
  });
}


