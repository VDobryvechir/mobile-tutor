import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import MainScreenInfo from '@/pages/main-screen/MainScreenInfo';
import { Text, View } from '@/components/general/Themed';
import SettingContent from '@/components/common/setting-content/SettingContent';
export default function SettingsScreen() {
  return (
      <View style={styles.container}>
           <SettingContent /> 
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
