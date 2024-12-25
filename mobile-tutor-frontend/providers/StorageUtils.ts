import { ChapterModel } from '../models/ChapterModel';
import { RepetitionModel } from '../models/RepetitionModel';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getLanguageOfStudy() { 
    return (await AsyncStorage.getItem('lang')) || 'nb';
}
export async function setLanguageOfStudy(lng: string) {
    await AsyncStorage.setItem('lang', lng);
}

export async function getActiveLanguagesAsArray(): string[]  {
    const s = ((await AsyncStorage.getItem('activeLanguages')) || "").split(",");
    const langs = s.length && s[0] ? s : ['nb', 'en', 'uk', 'de', 'pl'];
    return langs;
}

export async function getActiveLanguagesAsMap(): { [key: string]: boolean } {
    const res: { [key: string]: boolean } = {};
    const langs = await getActiveLanguagesAsArray();
    langs.forEach((lng) => res[lng] = true);
    return res;
}

export async function setActiveLanguagesAsArray(langs: string[]) {
    const languages = (langs || []).join(",");
    await AsyncStorage.setItem('activeLanguages', languages);
}

export async function convertChapterModelToRepetitionModel(chapterModel: ChapterModel, audioPositions: number[]): Partial<RepetitionModel> {
    const lng = await getLanguageOfStudy();
    const pos = chapterModel.targetLanguages.findIndex((item: string) => item === lng);
    if (pos < 0) {
        throw Error("No language support");
    }
    const targetLines = chapterModel.targetLines.slice();
    targetLines.splice(pos, 1);
    const targetLanguages = chapterModel.targetLanguages.slice();
    targetLanguages.splice(pos, 1);
    const audioSource: string = chapterModel.audioSource && chapterModel.audioSource[lng] || "";
    const shortLines = chapterModel.shortLines?.slice() || [];
    const longLines = chapterModel.longLines?.slice() || [];
    const shortSource = shortLines[pos] || [];
    const longSource = longLines[pos] || [];
    if (pos < shortLines.length) {
        shortLines.slice(pos, 1);
    }
    if (pos < longLines.length) {
        longLines.slice(pos, 1);
    }
    const model: Partial<RepetitionModel> = {
        sourceLanguage: lng,
        sourceLines: chapterModel.targetLines[pos],
        targetLanguages: targetLanguages,
        targetLines: targetLines,
        audioPositions: audioPositions || [],
        audioSource: audioSource,
        shortLines: shortLines,
        longLines: longLines,
        shortSource: shortSource,
        longSource: longSource,
    };
    return model;
};

export function getFilteredStringList(list: string[], filter?: { [key: string]: boolean }): string[]  {
    if (!filter) {
        return list;
    }
    return list.filter((item) => filter[item]);
}
