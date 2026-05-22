import { Redirect, type Href } from 'expo-router';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { useAppEntry } from '@/hooks/useAppEntry';
import { tokens } from '@/theme';

export default function Index() {
  const { route, isReady } = useAppEntry();

  if (!isReady || !route) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={tokens.colors.primary[500]} />
      </View>
    );
  }

  return <Redirect href={route as Href} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
