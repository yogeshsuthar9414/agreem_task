import React from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { colors } from '../../theme/color';
import { useTheme } from '../../theme/ThemeProvider';

interface Props {
    label: string;
    icon: React.ReactNode;
    active?: boolean;
    onPress: () => void;
}

const TabBtn = ({
    label,
    icon,
    active,
    onPress,
}: Props) => {

    const { colors } = useTheme();

    return (
        <TouchableOpacity
            style={styles.navItemActive}
            onPress={onPress}
            activeOpacity={0.7}>
            <View style={active && [styles.navPillActive, { backgroundColor: colors.surfaceSecondary, }]}>{icon}</View>
            <Text style={active ? styles.navLabelActive : styles.navLabel}>{label}</Text>
        </TouchableOpacity >
    );
};

export default TabBtn;

const styles = StyleSheet.create({
    navItemActive: {
        alignItems: 'center',
    },
    navPillActive: {
        paddingHorizontal: 16,
        paddingVertical: 3,
        borderRadius: 14,
        marginBottom: 2,
    },
    navLabelActive: {
        fontSize: 11,
        fontWeight: '700',
        color: `rgb(${colors.primaryColor})`,
    },
    navLabel: {
        fontSize: 11,
        color: '#94A3B8',
        fontWeight: '500',
    },
});