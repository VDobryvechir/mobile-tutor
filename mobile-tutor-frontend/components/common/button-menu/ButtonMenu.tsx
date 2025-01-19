import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Switcher } from '../switcher/switcher';

export type ItemType = Record<string,any> | string;

interface Props {
    selected?: ItemType;
    onChange: (item: ItemType) => any;
    items: ItemType[];
    t?: (s: string) => string;
    tr?: (item: ItemType) => string;
    idField?: string;
    nameField?: string;
    layout?: 'table' | 'row' | 'column';
}

export function ButtonMenu({ selected, onChange, items, t, tr, idField = 'id', nameField = 'name', layout = 'table' }: Props) {
    const [selectedItem, setSelectedItem] = useState < ItemType | undefined>(selected);
    const equalItems = (it1?:ItemType, it2?:ItemType): boolean =>{
       return !!(it1 && it2 && (it1===it2 || typeof it1!=='string' && typeof it2!=='string' && it1[idField]===it2[idField] && it1[idField]!==undefined)); 
    };
    const makeSelection=(chosen:boolean,item: ItemType)=>{
        if (chosen && item) {
            setSelectedItem(item);
            onChange(item);
        }
    };
    return (
       <View style={styles[layout]}>
          {items.map((item:ItemType, index: number)=>(
              <Switcher checked={equalItems(item, selectedItem)} onChange={(chosen) => makeSelection(chosen, item)} key={index }>
                  <Text style={ styles.txt}>
                      {tr && tr(item) || t && t(typeof item === 'string' ? item : item[nameField]) || (typeof item === 'string' ? item : item[nameField])}
                  </Text>
              </Switcher>
          ))}
       </View>
    );
}
const styles = StyleSheet.create({
    table: {
       display: 'flex',
       flexDirection: 'row',
       flexWrap: 'wrap',
        padding: 10,
        columnGap: 5,
        rowGap: 8,
    },
    column: {
       display: 'flex',
       flexDirection: 'column',
        padding: 10,
       gap: 10,
    },
    row: {
       display: 'flex',
       flexDirection: 'row',
       padding: 10,
    },
    txt: {
        color: 'inherit',
        backgroundColor: 'inherit',
    }
});
