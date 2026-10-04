import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';

type buttonProps = {
    label: string,
    onPress?: () => void,
    align?: any,
    disabled?: boolean
}

const Button: React.FC<buttonProps> = ({ label, onPress, align, disabled }) => {
    return (
        <TouchableOpacity disabled={disabled} style={{ ...styles.btn, opacity: disabled ? 0.7 : 1, alignSelf: align || "flex-start" }} onPress={onPress}>
            <Text style={styles.btnText}>{label}</Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    btn: {
        backgroundColor: '#24D39A',
        width: 120,
        alignSelf: 'center',
        marginTop: 20,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
    },

    btnText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
})