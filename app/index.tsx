import { Redirect, type Href } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { getOnboardingDone, getSignUpDone } from '@/services/localAuth';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { tokens } from '@/theme';

type EntryRoutes = "/(onboarding)" | "/(signup)/step1" | "/(tabs)";

export default function Index() {
  const [route, setRoute] = useState<EntryRoutes | null>(null);
  useEffect(() => {
    async function initialization() {
      const onboardingDone = await getOnboardingDone();
      const registrationDone = await getSignUpDone();

      if (!onboardingDone) {
        setRoute("/(onboarding)");
        return;
      }

      if (!registrationDone) {
        setRoute("/(signup)/step1");
        return;
      }

      setRoute("/(tabs)");
      return;
    }

    initialization();
  }, []);

  if (!route) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={tokens.colors.primary[500]}/>
      </View>
    );
  }

  return <Redirect href={route as Href} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});