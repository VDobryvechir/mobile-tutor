import { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { UserContext } from '@/providers/UserContext';
import { useTranslate } from '@/i18n/translate';
import { Text, View } from '@/components/general/Themed';
import { ButtonMenu, ItemType } from '@/components/common/button-menu/ButtonMenu';
import { getBooksForResource, getBookForResource } from '@/providers/TestMode';
import { Resource } from "@/models/Resource";

export default function BooksScreen() {
    const { resource, book, setBook, setChapter } = useContext(UserContext);
    const t = useTranslate();
    const handleBookChange = (item?: ItemType) => {
        if (typeof item === 'object' && item && item.code!==book) {
            setBook(item.code);
            setChapter('');
        }
    };
    const quickTranslate = (item: ItemType) => {
        if (typeof item !== 'object' || !item) {
            return '';
        }
        return item.translate && item.translate[t('~')] || item.name || ''; 
    };
  return (
    <View style={styles.container}>
          <ButtonMenu
              selected={getBookForResource(resource, book) as ItemType}
              onChange={handleBookChange}
              items={getBooksForResource(resource)}
              layout='table'
              idField='code'
              tr={quickTranslate}
          /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
    padding: 5,
  },
});
