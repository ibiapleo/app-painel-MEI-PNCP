import { useMemo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';

import { useTheme } from '@/hooks/useTheme';

interface LogOutModalProps {
  visible: boolean;
  onCancel: () => void;
  onLogOut: () => void;
}

export default function LogOutModal({ visible, onCancel, onLogOut }: LogOutModalProps) {
  const theme = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        overlay: {
          flex: 1,
          backgroundColor: 'rgba(58, 61, 64, 0.6)',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 24,
        },
        card: {
          backgroundColor: theme.colors.background.surface,
          borderRadius: 28,
          paddingVertical: 32,
          paddingHorizontal: 24,
          width: '100%',
          maxWidth: 340,
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 5,
        },
        title: {
          fontSize: 22,
          fontWeight: '700',
          color: theme.colors.text.primary,
          textAlign: 'center',
          marginBottom: 10,
        },
        description: {
          fontSize: 15,
          lineHeight: 22,
          fontWeight: '400',
          color: theme.colors.text.secondary,
          textAlign: 'center',
          marginBottom: 28,
        },
        buttonContainer: {
          flexDirection: 'row',
          width: '100%',
        },
        cancelButton: {
          flex: 1,
          height: 48,
          borderWidth: 1.5,
          borderColor: theme.colors.primary.main,
          borderRadius: 16,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 8,
        },
        cancelButtonText: {
          color: theme.colors.primary.main,
          fontSize: 16,
          fontWeight: '600',
        },
        logoutButton: {
          flex: 1,
          height: 48,
          backgroundColor: theme.colors.primary.main,
          borderRadius: 16,
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 8,
        },
        logoutButtonText: {
          color: theme.colors.text.onPrimary,
          fontSize: 16,
          fontWeight: '600',
        },
      }),
    [theme],
  );

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Sair</Text>

          <Text style={styles.description}>
            Você tem certeza que deseja sair? Você terá que fazer login novamente para usar o app.
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutButton} onPress={onLogOut}>
              <Text style={styles.logoutButtonText}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
