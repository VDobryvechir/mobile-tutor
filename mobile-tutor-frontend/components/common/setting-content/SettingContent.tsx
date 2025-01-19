import { useState, useEffect } from 'react';
import { getLanguageOfStudy, setLanguageOfStudy, getActiveLanguagesAsArray, setActiveLanguagesAsArray } from '../../../providers/StorageUtils';
import { useTranslate }  from '../../../i18n/translate';
import LanguageMultiset from '../language-multiset/LanguageMultiset';
import LanguageChooser from '../language-chooser/LanguageChooser';
import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/general/Themed';
import UserContext from '@/providers/UserContext';
import { useContext } from 'react';

const SettingContent = () => {
    const [studyLanguage, setStudyLanguage] = useState<string>("");
    const [activeLanguages, setActiveLanguages] = useState<string[]>([]);
    const { locale, setLocale } = useContext(UserContext);
    const t = useTranslate();
    useEffect(() => {
        const loadParams = async () => {
            const actives = await getActiveLanguagesAsArray();
            setActiveLanguages(actives);
            const lng = await getLanguageOfStudy();
            setStudyLanguage(lng);
        };
        loadParams();
    }, []);

    const setLanguageAdvanced = (lng: string) => {
        setLanguageOfStudy(lng);
        setStudyLanguage(lng);
    };
    const setActiveLanguagesAdvanced = (langs: string[]) => {
        setActiveLanguagesAsArray(langs);
        setActiveLanguages(langs);
    };
    const setLocaleAdvanced = (lng: string) => {
        if (lng === 'nn' || lng === 'uk' || lng === 'de' || lng === 'pl' || lng === 'en' || lng === 'nb') {
            setLocale(lng);
        }
    };
    if (!studyLanguage) {
        return <></>;
    }
    return (
        <>
            <View style={styles.block}>
                <View style={styles.label}>
                    <Text>{t("Language of study")}</Text>
                </View>
                <LanguageChooser language={studyLanguage} labelTitle="" selectorLabel=""
                    setLanguage={setLanguageAdvanced}
                />
            </View>
            <View style={styles.block}>
                <View style={styles.label}>
                    <Text>{t("Language")}</Text>
                </View>
                <LanguageChooser language={locale} labelTitle="" selectorLabel=""
                    setLanguage={setLocaleAdvanced}
                />
            </View>
            <View>
                <View style={styles.label}>
                    <Text>{t("Active languages")}</Text>
                </View>
                <LanguageMultiset languages={activeLanguages} setLanguages={setActiveLanguagesAdvanced} />
            </View>
        </>
 
    );
};

const styles = StyleSheet.create({
    label: {
        padding: 5,
        fontSize: 14,
        maxWidth: 300,
    },
    block: {
        padding: 5,
        maxWidth: 300,
        textAlign: "center",
    },
});

export default SettingContent;