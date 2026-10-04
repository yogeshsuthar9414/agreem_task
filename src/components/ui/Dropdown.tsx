import { ChevronDown } from 'lucide-react-native';
import React, { useState } from 'react'
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

interface DropdownItem {
    label: string;
    value: string;
}

interface DropdownProps {
    data: DropdownItem[];
    value?: { value: string, label: string };
    placeholder?: string;
    onChange: (value: { value: string, label: string }) => void;
}


const Dropdown = ({
    data,
    value,
    placeholder = 'Select option',
    onChange,
}: DropdownProps) => {

    const { colors } = useTheme();
    const [visible, setVisible] = useState(false);

    // Temporary selection
    const [tempValue, setTempValue] = useState<{ value: string, label: string } | null>(value || null);

    const openDropdown = () => {
        setTempValue(value || null);
        setVisible(true);
    };

    const handleCancel = () => {
        setTempValue(value || null);
        setVisible(false);
    };

    const handleDone = () => {
        if (tempValue) {
            onChange(tempValue);
        }

        setVisible(false);
    };

    return (
        <>
            <TouchableOpacity style={[styles.inputField, { backgroundColor: colors.inputBg, borderColor: colors.borderMuted, }]} onPress={openDropdown} activeOpacity={0.8}>
                <Text style={[styles.countryPrefixText, { color: colors.textPrimary, }]}>{value?.value}</Text>
                <Text style={[styles.fieldValueText, { color: colors.textPrimary, }]}>{value?.label || ""}</Text>
                <ChevronDown size={16} color={colors.textSecondary} />
            </TouchableOpacity>

            {/* Bottom Sheet */}
            <Modal
                visible={visible}
                transparent
                animationType="slide"
                onRequestClose={handleCancel}
            >
                <View style={styles.overlay}>

                    <Pressable
                        style={styles.backdrop}
                        onPress={handleCancel}
                    />

                    <View style={[styles.bottomSheet, { backgroundColor: colors.surface }]}>

                        {/* Drag indicator */}
                        <View style={[styles.dragIndicator, { backgroundColor: colors.border, }]} />

                        {/* Header */}
                        <View style={styles.header}>
                            <Text style={[styles.title, { color: colors.textPrimary }]}>
                                Select Option
                            </Text>

                            <Pressable onPress={handleCancel}>
                                <Text style={[styles.close, { color: colors.textSecondary, }]}>
                                    ✕
                                </Text>
                            </Pressable>
                        </View>

                        {/* List */}
                        <FlatList
                            data={data}
                            keyExtractor={item => item.value}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => {
                                const isSelected =
                                    tempValue?.value === item.value;

                                return (
                                    <Pressable
                                        style={[
                                            styles.listItem,
                                            { backgroundColor: isSelected ? colors.surfaceSecondary : "" }
                                        ]}
                                        onPress={() =>
                                            setTempValue(item)
                                        }
                                    >
                                        <Text
                                            style={[
                                                styles.itemText,
                                                isSelected &&
                                                styles.selectedText,
                                                { color: isSelected ? colors.primaryLight : colors.textSecondary }
                                            ]}
                                        >
                                            {item.label}
                                        </Text>

                                        {/* Selected check */}
                                        {isSelected && (
                                            <Text style={styles.check}>
                                                ✓
                                            </Text>
                                        )}
                                    </Pressable>
                                );
                            }}
                        />

                        {/* Buttons */}
                        <View style={styles.buttons}>

                            <Pressable
                                style={[
                                    styles.button,
                                    { backgroundColor: colors.surfaceSecondary, borderColor: colors.borderMuted, }
                                ]}
                                onPress={handleCancel}
                            >
                                <Text style={[styles.cancelText, { color: colors.textSecondary }]}>
                                    Cancel
                                </Text>
                            </Pressable>

                            <Pressable
                                style={[
                                    styles.button,
                                    styles.doneButton,
                                ]}
                                onPress={handleDone}
                            >
                                <Text style={styles.doneText}>
                                    Done
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
}

export default Dropdown

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.45)',
        justifyContent: 'flex-end',
    },

    backdrop: {
        flex: 1,
    },

    bottomSheet: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,

        maxHeight: '70%',

        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 25,
    },

    dragIndicator: {
        width: 40,
        height: 4,
        alignSelf: 'center',
        marginBottom: 15,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        marginBottom: 15,
    },

    title: {
        fontSize: 20,
        fontWeight: '600',
    },

    close: {
        fontSize: 20,
    },

    listItem: {
        minHeight: 52,

        borderRadius: 10,

        paddingHorizontal: 15,

        marginBottom: 6,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemText: {
        fontSize: 16,
    },

    selectedText: {
        fontWeight: '600',
    },

    check: {
        fontSize: 20,
        color: '#2563EB',
        fontWeight: 'bold',
    },

    buttons: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 15,
    },

    button: {
        flex: 1,
        height: 50,

        borderRadius: 10,

        alignItems: 'center',
        justifyContent: 'center',
    },
    doneButton: {
        backgroundColor: '#2563EB',
    },
    cancelText: {
        fontSize: 16,
        fontWeight: '600',
    },
    doneText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    inputField: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 42,
    },
    inputFieldIcon: {
        marginRight: 8,
    },
    fieldValueText: {
        flex: 1,
        fontSize: 13,
        fontWeight: '500',
    },
    countryPrefixBox: {
        marginRight: 8,
    },
    countryPrefixText: {
        fontSize: 12,
        fontWeight: '700',
        marginRight: 8
    },
})