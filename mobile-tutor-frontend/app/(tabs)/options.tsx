import { StyleSheet } from 'react-native';
import { useContext } from 'react';
import RepetitionOptions from '@/pages/options/RepetitionOptions';
import { Text, View } from '@/components/general/Themed';
import { UserContext } from '@/providers/UserContext';
import { normalizeRepetitionModel } from '@/providers/RepetitionContext.ts';

export default function TabRepetitionOptionScreen() {
    const { repetitionModel, setRepetitionModel } = useContext(UserContext);
    normalizeRepetitionModel(repetitionModel, setRepetitionModel);
    return (
      <View style={styles.container}>
        <RepetitionOptions repetitionModel={repetitionModel} setRepetitionModel={setRepetitionModel} />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#cccccc',
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
