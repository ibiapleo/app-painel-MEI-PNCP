import { StyleSheet, Text, View } from 'react-native';

import SettingsMenuButton from "@/components/SettingsMenuButton/SettingsMenuButton";
import LogOutModal from "@/components/LogOutModal/LogOutModal";

import { tokens } from '@/theme';

export default function SettingsScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogOut = () => {
    console.log('Usuário deslogado');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <Text style={styles.headerText}>Configurações</Text>
      </View>

      <View style={styles.userContainer}>
        <Text style={styles.userTitle}>João Marcolindo</Text>
        <Text style={styles.userText}>Lindos ltda.</Text>
        <Text style={styles.userText}>XX.XXX.XXX/0001-XX</Text>
        <Text style={styles.userText}>joaomarcolindo@gmail.com</Text>
      </View>

      <View style={styles.menuContainer}>
        <SettingsMenuButton title="Notificações" />
        <View style={styles.line} />

        <SettingsMenuButton title="Aparência" />
        <View style={styles.line} />

        <SettingsMenuButton title="Linguagem" />
        <View style={styles.line} />

        <SettingsMenuButton title="Privacidade e Segurança" />
        <View style={styles.line} />

        <SettingsMenuButton
          title="Sair"
          onPress={() => setModalVisible(true)}
        />

        <LogOutModal
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          onLogOut={handleLogOut}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  header: {
    width: '100%',
    height: 124,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 700,
    color: tokens.colors.text.primary,
  },
  userContainer: {
    width: '100%',
    flexDirection: 'column',
    gap: 5,
    paddingHorizontal: 24,
  },
  userTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: tokens.colors.text.primary,
  },
  userText: {
    fontSize: 14,
    color: tokens.colors.text.secondary,
  },
  menuContainer: {
    width: '100%',
    flexDirection: 'column',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 24,
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: tokens.colors.neutral["300"]
  },
});
