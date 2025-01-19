import {useState} from 'react';
import { GeneralFormField, GeneralGeneratedOptions, GeneralFieldOption } from './GeneralFormModel';
import {useTranslate} from '@/i18n/translate';
import LanguageChooser from '../language-chooser/LanguageChooser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, View, TextInput, Text } from 'react-native';

interface Props {
    source: any;
    setter: (obj: any, key: string, val: any) => void;
    getter: (obj: any, key: string) => any;
    fields: GeneralFormField[];
};
const GeneralForm = ({ source, setter, getter, fields }: Props) => {
    const translate = useTranslate();
    const initValues: { [key:string]: string } = {};
    fields.forEach((item: GeneralFormField) => {
        initValues[item.field] = "" + getter(source, item.field); 
    });
    const [tmpValue, setTmpValue] = useState(initValues); 
    console.log('tmpValue', tmpValue, source);
    const getInputByKind = (item: GeneralFormField) => {
        const oversetter = (value: any) => {
            setter(source, item.field, value);
            if (item.storageForDefault) {
                const storageKey = item.storageKey || item.field;
                const storageValue = "" + value;
                if (item.storageForDefault !== "none") {
                    AsyncStorage.setItem(storageKey, storageValue);
                } 
            }
        };
        const setNumberKind = (val: string) => {
            setTmpValue({
                ...tmpValue,
                [item.field]: val,
            });
            const intVal = item.kind === "int" ? parseInt(val) : parseFloat(val);
            if (!isNaN(intVal) && (item.minValue === undefined || intVal >= item.minValue) && (item.maxValue === undefined || intVal <= item.maxValue)) {
                oversetter(intVal);
            }
        }
        const handleSelectorNumberChange = (val: string) => {
            if (!val) {
                return;
            }
            const selNumber = parseInt(val);
            if (!isNaN(selNumber)) {
                oversetter(selNumber);
            }
        };
        const getIntValue = (expression: string): number => {
            let n = parseInt(expression);
            if (!isNaN(n)) {
                return n;
            }
            let v = getter(source, expression);
            if (typeof v === "number") {
                return v;
            }
            if (typeof v === "string") {
                n = parseInt(v);
            }
            return n;
        }
        const generateRowOfValues = (option: GeneralGeneratedOptions): string[] | null => {
            const start = getIntValue(option.valueStart);
            let end = getIntValue(option.valueFinish);
            if (isNaN(start) || isNaN(end) || start > end) {
                return null;
            }
            const res: string[] = [];
            if (typeof option.maxFinish === "number") {
                if (end > option.maxFinish) {
                    end = option.maxFinish;
                    if (start > end) {
                        return null;
                    }
                }
            }
            for (let i = start; i <= end; i++) {
                res.push("" + i);
            }
            return res;
        }
        const getMenuItem = (vl: string, txt: string | JSX.Element) => {
            return (
                <Picker.Item label={txt} value={vl} key={vl} />
            );
        };
        const selOptions:JSX.Element[] = [];

        const fillSelOptions = (option: GeneralFieldOption) => {
            selOptions.push(getMenuItem(option.value, translate(option.name)));
        };
        const generateOptions = (option: GeneralGeneratedOptions, selOptions: JSX.Element[]) => {
            const orders = generateRowOfValues(option);
            if (!orders) {
                return;
            }
            const name = option.name;
            orders.forEach((vl: string) => {
                const txt = translate(name, { n: vl });
                selOptions.push(getMenuItem(vl, txt));
            })
        };
        if (item.options) {
            item.options.forEach(fillSelOptions);
        }
        if (item.generatedOptions) {
            item.generatedOptions.forEach((option) => generateOptions(option, selOptions))
        }

        switch (item.kind) {
            case "int":
            case "number":
                return (
                    <TextInput
                        style={styles.input}
                        value={tmpValue[item.field]}
                        onChangeText={setNumberKind}
                    />
                );
            case "selectorNumber":
                return (
                   <Picker
                       selectedValue={"" + getter(source, item.field)}
                       style={styles.picker}
                       onValueChange={handleSelectorNumberChange}
                   >
                            {selOptions}
                  </Picker>
                );
            case "string":
                return (
                    <TextInput
                        style={styles.input}
                        value={getter(source, item.field)}
                        onChangeText={oversetter}
                    />
                );
            case "language":
                return (
                    <LanguageChooser
                        labelTitle="Language"
                        selectorLabel="Language"
                        language={getter(source, item.field)}
                        setLanguage={oversetter}
                    />
                );
        }
        return <></>
    };
    return (
        <View style={styles.generalForm}>
            {fields.map((item,index) => (
                <View key={index}>
                    <Text style={styles.fieldLabel}>
                        {item.name && translate(item.name) || ""}
                    </Text>
                    <View>
                        {getInputByKind(item)}
                    </View>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
  generalForm: {
  },
  fieldLabel: {
  },
    input: {
        backgroundColor: '#fff',
  },
  picker: {
  },  
});


export default GeneralForm;
