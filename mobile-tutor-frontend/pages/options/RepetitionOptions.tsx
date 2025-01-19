import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { RepetitionProps, RepetitionOptionDefinition } from '@/providers/RepetitionContext';
import GeneralForm from '@/components/common/general-form/GeneralForm';

export default function RepetitionOptions({ repetitionModel, setRepetitionModel }: RepetitionProps) {
    if (!repetitionModel?.options) {
        return <></>;
    }
    const setRepetitionOption = (obj: any, key: string, val: any) => {
        if (!obj) {
            return;
        }
        const options = {
            ...repetitionModel.options,
            [key]: val,
        };
        setRepetitionModel({
            ...repetitionModel,
            options,
        });
    };
    const getRepetitionOption = (obj: any, key: string): any => {
        console.log('repetitionGet', repetitionModel, obj, key);
        if (!obj) {
            return "";
        }
        return (repetitionModel.options as any)[key];
    };
    return (
        <View style={styles.repetitionForm}>
            <GeneralForm source={repetitionModel} setter={setRepetitionOption} getter={getRepetitionOption} fields={RepetitionOptionDefinition } />
        </View>
    );
}

const styles = StyleSheet.create({
  repetitionForm: {
    alignItems: 'center',
  }
});
