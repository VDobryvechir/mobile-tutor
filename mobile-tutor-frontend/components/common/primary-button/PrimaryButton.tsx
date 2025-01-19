import { StyleSheet, View, Text } from 'react-native';

interface Props {
    text: string;
}
export default function PrimaryButton({text }: Props) {
    return (
        <View style={styles.button}>
            <Text>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 50,
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 20,
        display: 'flex',
        height: 20,
        flexDirection: 'row',
        backgroundColor: '#339DFF',
        color: '#fff',
        fontSize: 16,
        lineHeight: 38,
    },
});
