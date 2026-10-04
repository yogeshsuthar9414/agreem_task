import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../../theme/color'
import { radius } from '../../theme/radius'
import { typography } from '../../theme/typography'


interface textInputProps {
    name?: string,
    onChange?: any,
    value: string,
    maxLength?: number,
    id?: string,
    placeholder?: string,
    onChangeText?: any,
    Icon?: any,
    label: string,
    secureTextEntry?: boolean,
    autoFocus?: boolean,
    required?: boolean,
}

const TextField = ({ name,
    onChange,
    value,
    maxLength,
    id,
    placeholder,
    onChangeText,
    Icon,
    label,
    secureTextEntry,
    autoFocus,
    required
}: textInputProps) => {

    const [focusedInput, setFocusedInput] = useState<string | null>(null);

    const handleFocus = (inputName?: string) => {
        setFocusedInput(inputName || "");
    };

    const handleBlur = () => {
        setFocusedInput(null);
    };

    return (
        <>
            {label && <Text style={styles.label}>
                {label}
                {required && <Text style={styles.required}> *</Text>}
            </Text>}

            <View style={[styles.inputContainer, focusedInput === name && styles.inputFocus]}>
                {Icon && <Icon size={25} color={colors.gray900} />}

                <TextInput
                    id={id}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry}
                    maxLength={maxLength}
                    autoFocus={autoFocus}
                    value={value}
                    onChangeText={onChangeText}
                    onChange={onChange}
                    onFocus={() => handleFocus(name)}
                    onBlur={handleBlur}
                    style={styles.inputField}
                    placeholderTextColor={colors.gray500}
                />
            </View>
        </>
    )
}

export default TextField

const styles = StyleSheet.create({
    inputContainer: {
        padding: 8,
        paddingHorizontal: 12,
        borderRadius: radius.sm,
        borderWidth: 1,
        // borderColor: colors.gray500,
        display: "flex",
        flexDirection: "row",
        color: colors.gray900,
    },
    inputFocus: {
        borderColor: "rgb(${colors.primaryColor})",
    },
    inputField: {
        fontSize: typography.caption,
        width: "100%",
        color: colors.gray900,
    },
    label: {
        fontSize: typography.small,
        color: colors.gray900,
        marginBottom: 7
    },
    required: {
        color: 'red',
    },
})