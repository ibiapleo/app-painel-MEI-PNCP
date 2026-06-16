import { useMemo, useState } from "react";
import { StyleSheet, Switch, Text, View, Alert } from 'react-native';
import { useRouter } from "expo-router";

import SettingsMenuButton from "@/components/SettingsMenuButton/SettingsMenuButton";
import LogOutModal from "@/components/LogOutModal/LogOutModal";
import PrivacyPolicyModal from "@/components/PrivacyPolicyModal/PrivacyPolicyModal";
import EditProfileModal from "@/components/EditProfileModal/EditProfileModal";

import { useTheme } from '@/hooks/useTheme';
import { useAuthStore } from '@/stores/auth/useAuthStore';
import { useThemeStore } from '@/stores/theme/useThemeStore';

export default function SettingsScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [privacyModalVisible, setPrivacyModalVisible] = useState(false);
  const [editProfileModalVisible, setEditProfileModalVisible] = useState(false);
  const [appearanceExpanded, setAppearanceExpanded] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const isLoading = useAuthStore((state) => state.isLoading);
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

  const handleSaveProfile = async (data: {
    name: string;
    cnpj: string;
    interested_state_siglas: string[];
  }) => {
    try {
      await updateProfile(data);
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possível atualizar o perfil. Tente novamente.'
      );
      console.error('Erro ao atualizar perfil:', error);
    }
  };

  const getInterestedStatesSiglas = () => {
    if (user?.interested_state_siglas && Array.isArray(user.interested_state_siglas)) {
      return user.interested_state_siglas;
    }
    if (user?.interested_states && Array.isArray(user.interested_states)) {
      return user.interested_states.map((state) => state.sigla);
    }
    return [];
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
          title="Editar Perfil"
          onPress={() => setEditProfileModalVisible(true)}
        />
        <View style={styles.line} />

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

        <SettingsMenuButton 
          title="Privacidade e Segurança" 
          onPress={() => setPrivacyModalVisible(true)}
        />
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

        <PrivacyPolicyModal
          visible={privacyModalVisible}
          onClose={() => setPrivacyModalVisible(false)}
        />

        <EditProfileModal
          visible={editProfileModalVisible}
          onClose={() => setEditProfileModalVisible(false)}
          onSave={handleSaveProfile}
          initialData={{
            name: user?.name,
            cnpj: user?.cnpj || '',
            interested_state_siglas: getInterestedStatesSiglas(),
          }}
          isLoading={isLoading}
        />
      </View>
    </View>
  );
}
