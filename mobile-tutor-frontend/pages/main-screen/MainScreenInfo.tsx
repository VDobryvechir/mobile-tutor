import React, { useContext } from 'react';
import { Link, Stack } from 'expo-router';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

import { ExternalLink } from '@/components/general/ExternalLink';
import { MonoText } from '@/components/general/StyledText';
import { UserContext } from '@/providers/UserContext';
import { useTranslate } from '@/i18n/translate';

import Colors from '@/constants/Colors';
import PrimaryButton from '../../components/common/primary-button/PrimaryButton';
import DoubleButton from '../../components/common/double-button/DoubleButton';
import { getResourceByCode, getBookForResource } from '@/providers/TestMode';
import TripleButton from '../../components/common/triple-button/TripleButton';
interface Props {

}
export default function MainScreenInfo({ }: Props) {
    const { resource, book, chapter } = useContext(UserContext);
    const t = useTranslate();
    const quickTranslate = (item: any) => {
        if (typeof item !== 'object' || !item) {
            return '';
        }
        return item.translate && item.translate[t('~')] || item.name || '';
    };
    if (!resource) {
        return (
            <Link href="/resources" >
                <PrimaryButton text={t('Choose resource')} />
            </Link>
        );
    }
    const resourceWhole = getResourceByCode(resource);
    const resourceName = quickTranslate(resourceWhole);
    if (!book) {
        return (
            <DoubleButton
                textLeft={resourceName}
                textRight={t('Choose book')}
                linkLeft="/resources"
                linkRight="/books"
                activeLeft="passive"
                activeRight="active"
            />
        );
    }
    const bookWhole = getBookForResource(resource, book);
    const bookName = quickTranslate(bookWhole);

    return (
        <View style={styles.bookChapterBlock}>
            <TripleButton
                textLeft={resourceName}
                textMiddle={bookName}
                textRight={chapter || t('Choose chapter')}
                linkLeft="/resources"
                linkMiddle="/books"
                linkRight="/chapters"
                activeLeft="passive"
                activeMiddle="passive"
                activeRight="active"
            />
        </View>
  );
}

const styles = StyleSheet.create({
    bookChapterBlock: {
        borderRadius: 7,
        alignItems: 'center',
        paddingHorizontal: 7,
        paddingVertical: 3,
        display: 'flex',
        height: 20,
        flexDirection: 'row',
  },
  bookBlock: {
    paddingHorizontal: 4,
  },
  chapterBlock: {
    paddingHorizontal: 4,
  },
});
