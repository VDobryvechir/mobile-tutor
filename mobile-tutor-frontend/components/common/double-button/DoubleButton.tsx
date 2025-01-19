import { StyleSheet, View, Text } from 'react-native';
import { Link } from 'expo-router';
interface Props {
    textLeft: string;
    textRight: string;
    linkLeft: any;
    linkRight: any;
    activeLeft: 'passive' | 'active';
    activeRight: 'passive' | 'active';
}
export default function DoubleButton({textLeft, textRight, linkLeft, linkRight, activeLeft, activeRight }: Props) {
    return (
        <View style={styles.buttons}>
            <Link href={linkLeft} style={[styles[activeLeft], styles.leftPart, styles.innerPart]}>
                <Text>{textLeft}</Text>
            </Link>
            <Link href={linkRight} style={[styles[activeRight], styles.rightPart, styles.innerPart]}>
                <Text>{textRight}</Text>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    buttons: {
        borderRadius: 50,
        alignItems: 'center',
        padding: 0,
        display: 'flex',
        height: 20,
        flexDirection: 'row',
        fontSize: 20,
        lineHeight: 38,
    },
    passive: {
        backgroundColor: '#FFFFFF',
        color: '#333',
    },
    active: {
        backgroundColor: '#339DFF',
        color: '#fff',
    },
    leftPart: {
        borderBottomLeftRadius: 50,
        borderTopLeftRadius: 50,
        borderColor: '#333',
        borderRightColor: '#ddd',
        borderWidth: 2,
    },
    rightPart: {
        borderBottomRightRadius: 50,
        borderTopRightRadius: 50,
        borderColor: '#333',
        borderLeftColor: '#ddd',
        borderWidth: 2,
    },
    innerPart: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        minWidth: 120,
        textAlign: 'center',
    }
});
