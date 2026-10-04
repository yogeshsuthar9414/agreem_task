import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Moon, Sun } from 'lucide-react-native'
import { useTheme } from '../../theme/ThemeProvider'
import { typography } from '../../theme/typography'
import { radius } from '../../theme/radius'

const Header = () => {
    const { colors, toggleTheme } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.surface, borderBottomColor: colors.borderMuted }]}>

            <View style={styles.brandRow}>
                <View style={styles.logoBadge}>
                    <Text style={styles.logoLetter}>M</Text>
                </View>
                <View>
                    <Text style={[styles.appName, { color: colors.textPrimary }]}>MyTestAp</Text>
                    <Text style={[styles.screenLabel, { color: colors.textSecondary }]}>Listing</Text>
                </View>
            </View>

            <View style={styles.headerActions}>
                <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
                    {colors.isDark ? (
                        <Sun size={20} color="#FBBF24" />
                    ) : (
                        <Moon size={20} color="#334155" />
                    )}
                </TouchableOpacity>
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' }}
                    style={styles.avatar}
                />
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({

    container: {
        height: 100,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 25,
        paddingTop: 25,
        borderBottomWidth: 1,
    },
    brandRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoBadge: {
        width: 32,
        height: 32,
        borderRadius: radius.sm,
        backgroundColor: '#2563EB',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    logoLetter: {
        color: '#FFFFFF',
        fontWeight: '800',
        fontSize: typography.body,
    },
    appName: {
        fontSize: typography.body,
        fontWeight: '700',
    },
    screenLabel: {
        fontSize: typography.small,
        marginTop: -2,
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    themeToggle: {
        marginRight: 12,
        padding: 4,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: radius.lg,
    },
})