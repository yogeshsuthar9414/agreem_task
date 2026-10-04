import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs';
import DateTimePicker from 'react-native-ui-datepicker';
import { Calendar } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeProvider';

interface datepickerProps {
    date: Dayjs,
    setDate: React.Dispatch<React.SetStateAction<Dayjs>>,
    mode?: "single"
}

const Datepicker: React.FC<datepickerProps> = ({ date, setDate, mode }) => {

    const { colors } = useTheme();
    const [showPicker, setShowPicker] = useState(false);

    const handleDateChange = ({ date: selectedDate }: { date?: any }) => {
        if (selectedDate) {
            setDate(dayjs(selectedDate));
        }
    };

    const handleDone = () => {
        setShowPicker(false);
    };


    return (
        <View>

            <TouchableOpacity style={[styles.inputField, { backgroundColor: colors.inputBg, borderColor: colors.borderMuted, }]} onPress={() => setShowPicker(true)} activeOpacity={0.8}>
                <Calendar size={16} color={colors.textSecondary} style={styles.inputFieldIcon} />
                <Text style={[styles.fieldValueText, { color: colors.textPrimary, }]}>{date.format('DD/MM/YYYY')}</Text>
            </TouchableOpacity>

            {/* Bottom Sheet */}
            <Modal
                visible={showPicker}
                transparent
                animationType="slide"
                onRequestClose={() => setShowPicker(false)}
            >
                <View style={styles.overlay}>

                    <Pressable
                        style={styles.overlayTouchable}
                        onPress={() => setShowPicker(false)}
                    />

                    <View style={[styles.bottomSheet, { backgroundColor: colors.surface }]}>

                        {/* Header */}
                        <View style={styles.header}>
                            <Text style={[styles.title, { color: colors.textPrimary, }]}>
                                Select Date
                            </Text>

                            <Pressable onPress={() => setShowPicker(false)}>
                                <Text style={[styles.close, { color: colors.textSecondary, }]}>✕</Text>
                            </Pressable>
                        </View>

                        {/* Calendar */}
                        <DateTimePicker
                            mode={mode || "single"}
                            date={date}
                            onChange={handleDateChange}
                            styles={{
                                day_label: {
                                    color: colors.textPrimary,
                                },

                                month_selector_label: {
                                    color: colors.textSecondary,
                                    fontSize: 18,
                                    fontWeight: '600',
                                },
                                year_selector_label: {
                                    color: colors.textSecondary,
                                    fontSize: 16,
                                    fontWeight: '500',
                                },
                                weekday_label: {
                                    color: colors.textSecondary,
                                    fontSize: 13,
                                    fontWeight: '600',
                                },
                                month_label: {
                                    color: colors.textPrimary,
                                },
                                year_label: {
                                    color: colors.textPrimary,
                                },
                                selected: {
                                    backgroundColor: colors.primary,
                                    borderRadius: 20,
                                },
                                selected_label: {
                                    color: '#FFFFFF',
                                    fontWeight: '600',
                                },
                                today: {
                                    borderWidth: 1,
                                    borderColor: colors.primaryLight,
                                    borderRadius: 20,
                                },
                                today_label: {
                                    color: colors.primaryLight,
                                    fontWeight: '600',
                                },
                            }}
                        />

                        {/* Selected Date */}
                        <Text style={[styles.selectedDate, { color: colors.textSecondary }]}>
                            Selected: {date.format('DD MMM YYYY')}
                        </Text>

                        {/* Done Button */}
                        <Pressable
                            style={[styles.doneButton, { backgroundColor: colors.primary, }]}
                            onPress={handleDone}
                        >
                            <Text style={styles.doneText}>
                                Done
                            </Text>
                        </Pressable>

                    </View>
                </View>
            </Modal>

        </View>
    );
};

const styles = StyleSheet.create({

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

    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        justifyContent: 'flex-end',
    },

    overlayTouchable: {
        flex: 1,
    },

    bottomSheet: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 20,
        paddingBottom: 30,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },

    title: {
        fontSize: 20,
        fontWeight: '600',
    },
    close: {
        fontSize: 20,
    },
    selectedDate: {
        fontSize: 15,
        marginTop: 10,
        marginBottom: 15,
    },

    doneButton: {
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    doneText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default Datepicker;