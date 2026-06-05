import { StyleSheet, Text, Modal, View } from "react-native";
import { tokens } from "@/theme";

import Button from "@/components/Button/Button";
import React from "react";

interface LogOutModalProps {
  visible: boolean;
  onCancel: () => void;
  onLogOut: () => void;
}

export default function LogOutModal({ visible, onCancel, onLogOut }: LogOutModalProps) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancel}
      >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Log Out</Text>

          <Text style={styles.message}>
            Você tem certeza que deseja sair? Você terá que fazer login novamente para usar o app.
          </Text>

          <View style={styles.buttonsContainer}>
            <Button variant="outlined" size="md" title="Cancelar" onPress={onCancel}/>
            <Button size="md" title="Log Out" onPress={onLogOut}/>
          </View>
        </View>
      </View>
  </Modal>
);
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#F5F6FA',
    borderRadius: 24,
    padding: 24,
    width: '85%',
    maxWidth: 340,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: tokens.colors.text.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    color: tokens.colors.text.secondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});