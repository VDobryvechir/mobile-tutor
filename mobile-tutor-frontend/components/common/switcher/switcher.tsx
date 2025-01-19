import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

interface Props {
    checked: boolean;
    onChange: (value: boolean) => void;
    children: React.ReactNode;
}

export function Switcher({checked, onChange, children}:Props) {
    return (
        <TouchableOpacity onPress={()=>onChange(!checked) }>
            <View style={checked ? styles.checked : styles.unchecked}>
                {children}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    checked: {
        color: "white",
        backgroundColor: "blue",
        borderColor: "#000080",
        borderRadius: 5,
        borderWidth: 1,
        padding: 5,
    },
    unchecked: {
        color: "#777777",
        backgroundColor: "white",
        borderColor: "#000080",
        borderRadius: 5,
        borderWidth: 1,
        padding: 5,
    },
});
