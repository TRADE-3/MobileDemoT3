import React, { useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Outfit_700Bold } from '@expo-google-fonts/outfit';
import RootNavigator from './src/navigation/RootNavigator';
import { DemoProvider } from './src/context/DemoContext';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Outfit_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <StatusBar style="light" backgroundColor="#1a1f3a" />
      <DemoProvider>
        <RootNavigator />
      </DemoProvider>
    </SafeAreaProvider>
  );
}
