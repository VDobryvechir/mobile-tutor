import translate from '../../../i18n/translate.tsx';

interface Props {
    language: string;
    labelTitle: string;
    selectorLabel: string;
    setLanguage: (lang: string) => void;
};

const LanguageChooser = ({ language, labelTitle, selectorLabel, setLanguage }: Props) => {
    return (
      <Picker
        selectedValue={language}
        style={styles.picker}
        onValueChange={(itemValue) => setLanguage(itemValue)}
      >
                <Picker.Item value="en" label="English" />
                <Picker.Item value="de" label="Deutsch" />
                <Picker.Item value="nn" label="Nynorsk" />
                <Picker.Item value="nb" label="Bokmål" />
                <Picker.Item value="uk" label="Українська" />
                <Picker.Item value="it" label="Italiano" />
                <Picker.Item value="es" label="Español" />
                <Picker.Item value="fr" label="Français" />
                <Picker.Item value="gr" label="ελληνικά" />
                <Picker.Item value="ru" label="Русский" />
                <Picker.Item value="pl" label="Polski" />
                <Picker.Item value="da" label="Dansk" />
                <Picker.Item value="sv" label="Svenska" />
                <Picker.Item value="bg" label="Български" />
                <Picker.Item value="pt" label="Portuguesa" />
                <Picker.Item value="cz" label="český" />
      </Picker>
    );
};

const styles = StyleSheet.create({
  picker: {
  },
});

export default LanguageChooser;
