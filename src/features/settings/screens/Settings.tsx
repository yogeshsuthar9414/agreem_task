import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import {
    User,
    Mail,
    Save,
    RotateCcw,
} from 'lucide-react-native';
import Datepicker from '../../../components/ui/Datepicker';
import dayjs, { Dayjs } from 'dayjs';
import Dropdown from '../../../components/ui/Dropdown';
import { useTheme } from '../../../theme/ThemeProvider';

const countries = [
    { label: 'India', value: 'IN' },
    { label: 'United States', value: 'US' },
    { label: 'United Kingdom', value: 'GB' },
    { label: 'Canada', value: 'CA' },
    { label: 'Australia', value: 'AU' },
    { label: 'Germany', value: 'DE' },
    { label: 'France', value: 'FR' },
    { label: 'Japan', value: 'JP' },
    { label: 'China', value: 'CN' },
    { label: 'Singapore', value: 'SG' },
    { label: 'United Arab Emirates', value: 'AE' },
];

const Settings = () => {
    const [fullName, setFullName] = useState('Alex Morgan');
    const [email, setEmail] = useState('alex.morgan@mytestap.io');
    const [dob, setDob] = useState<Dayjs>(dayjs());
    const [country, setCountry] = useState({ value: "IN", label: 'India' });
    const { colors } = useTheme();


    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <StatusBar
                barStyle={colors.isDark ? 'light-content' : 'dark-content'}
                backgroundColor={colors.background}
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Personal Information Form Card */}
                <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border, shadowOpacity: colors.isDark ? 0.2 : 0.02, }]}>
                    <View style={styles.cardHeaderRow}>
                        <View style={styles.cardHeaderLeft}>
                            <User size={16} color="#4338CA" />
                            <Text style={[styles.cardTitle, { color: colors.textPrimary, }]}>Personal Information</Text>
                        </View>
                        <Text style={[styles.badgeHint, { color: colors.textMuted }]}>Required</Text>
                    </View>

                    {/* Full Name */}
                    <View style={styles.inputGroup}>
                        <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Full Name</Text>
                        <View style={[styles.inputField, { backgroundColor: colors.inputBg, borderColor: colors.borderMuted, }]}>
                            <User size={16} color={colors.textSecondary} style={styles.inputFieldIcon} />
                            <TextInput
                                value={fullName}
                                onChangeText={setFullName}
                                placeholderTextColor="#94A3B8"
                                style={[styles.textInput, { color: colors.textPrimary, }]}
                            />
                        </View>
                    </View>

                    {/* Email Address */}
                    <View style={styles.inputGroup}>
                        <View style={styles.inputLabelRow}>
                            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Email Address</Text>
                        </View>
                        <View style={[styles.inputField, { backgroundColor: colors.inputBg, borderColor: colors.borderMuted, }]}>
                            <Mail size={16} color={colors.textSecondary} style={styles.inputFieldIcon} />
                            <TextInput
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                style={[styles.textInput, { color: colors.textPrimary, }]}
                                placeholderTextColor="#94A3B8"
                            />
                        </View>
                    </View>

                    {/* Date of Birth */}
                    <View style={styles.inputGroup}>
                        <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Date of Birth</Text>
                        <Datepicker
                            date={dob}
                            setDate={setDob}
                        />
                    </View>

                    {/* Dropdown */}
                    <View style={styles.inputGroup}>
                        <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Date of Birth</Text>
                        <Dropdown
                            data={countries}
                            value={country}
                            placeholder="Select city"
                            onChange={setCountry}
                        />
                    </View>
                </View>

                {/* Bottom Action Buttons */}
                <TouchableOpacity style={styles.saveButton} activeOpacity={0.85}>
                    <Save size={16} color="#FFFFFF" />
                    <Text style={styles.saveButtonText}>Save Settings</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.resetButton, { backgroundColor: colors.surfaceSecondary, borderColor: colors.borderMuted, }]} activeOpacity={0.8}>
                    <RotateCcw size={15} color={colors.primaryLight} />
                    <Text style={[styles.resetButtonText, { color: colors.primaryLight, }]}>Reset to Defaults</Text>
                </TouchableOpacity>
            </ScrollView >
        </View >
    );
}

export default Settings

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 36,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        shadowColor: '#000',
        shadowOpacity: 0.02,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 1,
    },
    cardHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    cardHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#0F172A',
    },
    badgeHint: {
        fontSize: 11,
        color: '#94A3B8',
        fontWeight: '500',
    },
    inputGroup: {
        marginBottom: 14,
    },
    inputLabelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    inputLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#334155',
    },
    inputField: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 42,
    },
    inputFieldIcon: {
        marginRight: 8,
    },
    textInput: {
        flex: 1,
        fontSize: 13,
        color: '#0F172A',
        fontWeight: '500',
        padding: 0,
    },
    fieldValueText: {
        flex: 1,
        fontSize: 13,
        color: '#0F172A',
        fontWeight: '500',
    },
    countryPrefixBox: {
        marginRight: 8,
    },
    countryPrefixText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#0F172A',
    },
    saveButton: {
        flexDirection: 'row',
        backgroundColor: '#3730A3',
        paddingVertical: 13,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        marginTop: 6,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: '700',
    },
    resetButton: {
        flexDirection: 'row',
        paddingVertical: 12,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        marginTop: 10,
    },
    resetButtonText: {
        fontSize: 13,
        fontWeight: '700',
    },
})