import { useTranslate } from '@/i18n/translate';
import { StyleSheet, Text } from 'react-native';
import { ALL_LOCALES } from '../../../i18n/locales.ts';
import { View } from '@/components/general/Themed';

import { Switcher } from '../switcher/switcher.tsx';
interface Props {
    label?: string;
    languages: string[];
    setLanguages: (lang: string[]) => void;
};

export default function LanguageMultiset({ languages, setLanguages, label }: Props) {
    const t = useTranslate();
    const turnOn = (locale: string) => {
        const pos = (languages || []).findIndex((item)=> item===locale);
        if (pos >= 0) {
            return;
        }
        setLanguages(languages.concat([locale]));
    };
    const turnOff = (locale: string) => {
        const pos = (languages || []).findIndex((item) => item === locale);
        if (pos < 0) {
            return;
        }
        setLanguages(languages.slice(0, pos).concat(languages.slice(pos + 1)));
    };
    const turnOffOn = (state: boolean, locale: string) => {
        state ? turnOn(locale) : turnOff(locale);
    };
    const isLangUsed: {[key:string]: boolean} = {};
    (languages || []).forEach((lng) => isLangUsed[lng] = true);
    const langList = ALL_LOCALES.map((locale: string) => {
        const swch = isLangUsed[locale] || false;
        return (
            <View style={styles.item} key={locale } >
                <Switcher checked={swch} onChange={(checked) => turnOffOn(checked, locale)} key={locale} >
                    <Text style={styles.text }>{t(locale)}</Text>
                </Switcher>
            </View>
        );
    });
    return (
        <View>
            <Text>{label && t(label)}</Text>
            <View style={styles.list}>
                {langList}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    list: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 7,
    },
    item: {
        margin: 5,
        width: 150,
    },
    text: {
        color: 'inherit',
    }
});
