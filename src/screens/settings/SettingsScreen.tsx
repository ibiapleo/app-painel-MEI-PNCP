import { useMemo, useState } from "react";
import { StyleSheet, Switch, Text, View } from 'react-native';
import { useRouter } from "expo-router";

import SettingsMenuButton from "@/components/SettingsMenuButton/SettingsMenuButton";
import LogOutModal from "@/components/LogOutModal/LogOutModal";

import { useTheme } from '@/hooks/useTheme';
import { useAuthStore } from '@/stores/auth/useAuthStore';
import { useThemeStore } from '@/stores/theme/useThemeStore';

export default function SettingsScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [appearanceExpanded, setAppearanceExpanded] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const themeMode = useThemeStore((state) => state.mode);
  const toggleMode = useThemeStore((state) => state.toggleMode);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: theme.colors.background.screen,
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
          color: theme.colors.text.primary,
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
          color: theme.colors.text.primary,
        },
        userText: {
          fontSize: 14,
          color: theme.colors.text.secondary,
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
          backgroundColor: theme.colors.border.default,
        },
        dropdown: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 12,
        },
        dropdownLabel: {
          fontSize: 15,
          color: theme.colors.text.secondary,
        },
      }),
    [theme],
  );

  const handleLogOut = async () => {
    setModalVisible(false);
    await logout();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <Text style={styles.headerText}>Perfil</Text>
      </View>

      <View style={styles.userContainer}>
        <Text style={styles.userTitle}>{user?.name}</Text>
        {user?.company_name && <Text style={styles.userText}>{user.company_name}</Text>}
        {user?.cnpj && <Text style={styles.userText}>{user.cnpj}</Text>}
        <Text style={styles.userText}>{user?.email}</Text>
      </View>

      <View style={styles.menuContainer}>
        <SettingsMenuButton
          title="Notificações"
          onPress={() => router.push('/notifications')}
        />
        <View style={styles.line} />

        <SettingsMenuButton
          title="Aparência"
          expanded={appearanceExpanded}
          onPress={() => setAppearanceExpanded((prev) => !prev)}
        />
        {appearanceExpanded && (
          <View style={styles.dropdown}>
            <Text style={styles.dropdownLabel}>Modo escuro</Text>
            <Switch
              value={themeMode === 'dark'}
              onValueChange={toggleMode}
              trackColor={{
                false: theme.colors.border.default,
                true: theme.colors.primary.main,
              }}
              thumbColor="#FFFFFF"
            />
          </View>
        )}
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
