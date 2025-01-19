import { StyleSheet } from 'react-native';

import MainScreenInfo from '@/pages/main-screen/MainScreenInfo';
import { Text, View } from '@/components/general/Themed';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
          <MainScreenInfo />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 18,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
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
