import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SearchX } from 'lucide-react-native'
import { useTheme } from '../../../theme/ThemeProvider';


const NoDataFound = () => {

    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.border, }]}>
            <View style={[styles.iconCircle, { backgroundColor: colors.surfaceSecondary, borderColor: colors.borderMuted, }]}>
                <SearchX size={38} color={colors.primaryLight} strokeWidth={1.75} />
            </View>

            <Text style={[styles.title, { color: colors.textPrimary, }]}>No Products Found</Text>
        </View>
    )
}

export default NoDataFound

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 50,
        marginHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        marginTop: 10,
    },
    iconCircle: {
        width: 76,
        height: 76,
        borderRadius: 38,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '800',
        marginBottom: 8,
    },
})