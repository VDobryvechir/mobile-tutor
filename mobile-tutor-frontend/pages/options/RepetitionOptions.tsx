import React, {useState} from 'react';
import { StyleSheet } from 'react-native';

import { ExternalLink } from './ExternalLink';
import { MonoText } from './StyledText';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

import Colors from '@/constants/Colors';

export default function OptionsPage({ path }: { path: string }) {
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
        if (!obj) {
            return "";
        }
        return (repetitionModel.options as any)[key];
    };
    return (
        <View style={styles.repetitionForm}
            <GeneralForm source={repetitionModel} setter={setRepetitionOption} getter={getRepetitionOption} fields={RepetitionOptionDefinition } />
        </View>
    );
}

const styles = StyleSheet.create({
  repetitionForm: {
    alignItems: 'center',
  }
});
