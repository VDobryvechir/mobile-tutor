import { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { UserContext } from '@/providers/UserContext';
import { useTranslate } from '@/i18n/translate';
import { Text, View } from '@/components/general/Themed';
import { ButtonMenu, ItemType } from '@/components/common/button-menu/ButtonMenu';
import { getBookForResource } from '@/providers/TestMode';
import { Resource } from "@/models/Resource";

export default function ChaptersScreen() {
    const { resource, book, chapter, setChapter } = useContext(UserContext);
    const t = useTranslate();
    const handleChapterChange = (item?: ItemType) => {
        if (typeof item === 'string' && item && item!==chapter) {
            console.log('selected chapter', item);
            setChapter(item);
        }
    };
    const quickTranslate = (item: ItemType): string => {
        if (typeof item !== 'string') {
            return '';
        }
        return item as string; 
    };
    const chaptAmnt = (getBookForResource(resource, book) || {}).chapters || 0;;
    const chaptList = Array.from({ length: chaptAmnt }, (_, index) => `${index + 1}`);
    console.log('chapters', chaptList);
  return (
    <View style={styles.container}>
          <ButtonMenu
              selected={chapter as ItemType}
              onChange={handleChapterChange}
              items={chaptList}
              layout='table'
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
