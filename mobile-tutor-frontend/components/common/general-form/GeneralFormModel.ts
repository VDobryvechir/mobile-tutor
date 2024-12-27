import AsyncStorage from '@react-native-async-storage/async-storage';

export type StorageTypes = 'local' | 'session';
export interface GeneralFieldOption {
    name: string;
    value: string;
    isDefault?: boolean;
};
export interface GeneralGeneratedOptions {
    name: string;
    valueStart: string;
    valueFinish: string;
    maxFinish?: number;
};
export interface GeneralFormField {
    name: string;
    field: string;
    kind: string;
    options?: GeneralFieldOption[];
    generatedOptions?: GeneralGeneratedOptions[];
    defValue?: string;
    minValue?: number;
    maxValue?: number;
    labelTitle?: string;
    selectorLabel?: string;
    storageForDefault?: StorageTypes;
    storageKey?: string; 
};

export function isNumericKind(name: string): boolean {
    return name === "int" || name === "number" || name === "selectorNumber";
};
export async function generateGeneralFormDefaults(object: any, definitions: GeneralFormField[], setter?: (obj: any, key: string, val: any) => void): Promise<any> {
    if (!definitions) {
        return object;
    }
    for(let item:GeneralFormField of definitions) {
        let val: any = item.defValue;
        if (item.storageForDefault) {
            let storageKey = item.storageKey || item.field;
            let possibleValue = item.storageForDefault != "none" ? await AsyncStorage.getItem(storageKey) : null;
            if (possibleValue !== null) {
                val = possibleValue;
            }
        }
        const tp = item.kind;
        if (isNumericKind(tp)) {
            val = val && parseFloat(val) || 0;
        } else {
            val = val || "";
        }
        if (setter) {
            setter(object, item.field, val);
        } else {
            object[item.field] = val;
        }
    }
    return object;
}