import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo } from 'react'
import { colors } from '../../../theme/color'
import { Database, Gauge, MonitorCog, Package, Proportions, Settings, ShieldCheck, Smartphone, Zap } from 'lucide-react-native'
import { typography } from '../../../theme/typography'
import { radius } from '../../../theme/radius'
import { useHome } from '../hook/useHome'
import { useTheme } from '../../../theme/ThemeProvider'

const Home = () => {

    const { accessGellary, devicesData } = useHome();
    const { colors, } = useTheme();


    const deviceSpecs = useMemo(() => [
        { label: 'Operating System', value: `${devicesData?.operatingSystem?.name} ${devicesData?.operatingSystem?.version}`, icon: <MonitorCog size={16} color={colors.textSecondary} /> },
        { label: 'Device Model', value: devicesData?.device?.model || "", icon: <Smartphone size={16} color={colors.textSecondary} /> },
        { label: 'Device ID / UUID', value: devicesData?.device?.uniqueId || "", icon: <ShieldCheck size={16} color={colors.textSecondary} />, copyable: true },
        { label: 'App Version & Build', value: `${devicesData?.app?.version} (Build ${devicesData?.app?.buildNumber})`, icon: <Package size={16} color={colors.textSecondary} /> },
        {
            label: 'System Storage',
            value: `${devicesData?.storage?.totalGB} (${devicesData?.storage?.percentageFreeGB}% Free)`,
            icon: <Database size={16} color={colors.textSecondary} />,
            showProgress: true,
            progressPercent: devicesData?.storage?.percentageUsedGB,
        },
        { label: 'Battery Status', value: `${devicesData?.battery?.level}% ${devicesData?.battery?.isCharging ? "(Fast Charging)" : ""} `, icon: <Zap size={16} color={colors.textSecondary} /> },
        { label: 'Display Resolution', value: `${devicesData?.display?.resolution}`, icon: <Proportions size={16} color={colors.textSecondary} /> },
    ], [devicesData]);

    return (

        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <StatusBar
                barStyle={colors.isDark ? 'light-content' : 'dark-content'}
                backgroundColor={colors.background}
            />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Diagnostics Live Banner Card */}
                <View
                    style={[styles.diagnosticsCard, { backgroundColor: colors.accentBadge }]}
                >
                    <View style={styles.diagnosticsTopRow}>
                        <View>
                            <View style={[styles.liveBadge, { backgroundColor: colors.surface }]}>
                                <View style={[styles.liveDot, { backgroundColor: colors.primary }]} />
                                <Text style={[styles.liveBadgeText, { color: colors.primary }]}>Diagnostics Live</Text>
                            </View>
                            <Text style={[styles.greetingTitle, { color: colors.textPrimary }]}>Hello, Alex</Text>
                            <Text style={[styles.greetingSubtitle, { color: colors.textSecondary }]}>
                                Your hardware diagnostics & media assets are synced and verified.
                            </Text>
                        </View>

                        <View style={[styles.speedIconBox, { backgroundColor: colors.primary }]}>
                            <Gauge color={"#FFFFFF"} />
                        </View>
                    </View>

                    {/* Quick Metrics */}
                    <View style={styles.metricsRow}>
                        <View style={[styles.metricCard, { backgroundColor: colors.surface }]}>
                            <View style={styles.metricLabelRow}>
                                <Zap size={12} color={colors.primaryLight} />
                                <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Battery</Text>
                            </View>
                            <Text style={[styles.metricValue, { color: colors.textPrimary }]}>{devicesData?.battery?.level}%</Text>
                        </View>

                        <View style={[styles.metricCard, { backgroundColor: colors.surface }]}>
                            <View style={styles.metricLabelRow}>
                                <Settings size={12} color={colors.primaryLight} />
                                <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>RAM</Text>
                            </View>
                            <Text style={[styles.metricValue, { color: colors.textPrimary }]}>{devicesData?.memory?.totalGB} GB</Text>
                        </View>
                    </View>
                </View>

                {/* Gallery Action Button */}
                <TouchableOpacity style={styles.galleryButton} activeOpacity={0.88} onPress={() => accessGellary()}>
                    <View style={styles.galleryLeft}>
                        <View style={styles.galleryIconWrapper}>
                            <Text style={styles.galleryIcon}>📑</Text>
                        </View>
                        <View>
                            <Text style={styles.galleryTitle}>Open Photos Gallery</Text>
                            <Text style={styles.gallerySubtitle}>
                                Manage recent captures & diagnostic logs
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.chevron}>›</Text>
                </TouchableOpacity>

                {/* Device Specifications Card */}
                <View style={[styles.specsCard, { backgroundColor: colors.surface, borderColor: colors.border, shadowOpacity: colors.isDark ? 0.2 : 0.04, }]}>
                    <View style={styles.specsHeaderRow}>
                        <View style={styles.specsTitleLeft}>
                            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Device Specifications</Text>
                        </View>
                        <View style={[styles.kernelBadge, { backgroundColor: colors.surfaceMuted }]}>
                            <Text style={[styles.kernelText, { color: colors.primaryLight }]}>Live Kernel Data</Text>
                        </View>
                    </View>

                    {deviceSpecs.map((item, index) => (
                        <View
                            key={index}
                            style={[
                                styles.specRow,
                                index === deviceSpecs.length - 1 && styles.lastSpecRow,
                                { borderBottomColor: colors.borderMuted }
                            ]}
                        >
                            <View style={styles.specLabelContainer}>
                                <Text style={styles.specItemIcon}>{item.icon}</Text>
                                <Text style={[styles.specLabel, { color: colors.textSecondary }]}>{item.label}</Text>
                            </View>

                            <View style={styles.specValueContainer}>
                                <Text style={[styles.specValue, { color: colors.textPrimary }]}>{item.value}</Text>
                                {item.copyable && <Text style={styles.copyIcon}>📋</Text>}
                                {item.showProgress && (
                                    <View style={[styles.storageProgressTrack, { backgroundColor: colors.border }]}>
                                        <View
                                            style={[
                                                styles.storageProgressFill,
                                                { width: `${item.progressPercent}%` },
                                            ]}
                                        />
                                    </View>
                                )}
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView >
        </View >
    )
}

export default Home

const styles = StyleSheet.create({
    scrollContent: {
        paddingHorizontal: 18,
        // paddingBottom: 24,
    },
    diagnosticsCard: {
        borderRadius: 20,
        marginTop: 15,
        padding: 16,
    },
    diagnosticsTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    liveBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        marginBottom: 8,
    },
    liveDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6,
    },
    liveBadgeText: {
        fontSize: 11,
        fontWeight: '600',
    },
    greetingTitle: {
        fontSize: typography.h4,
        fontWeight: '800',
        marginBottom: 4,
    },
    greetingSubtitle: {
        fontSize: typography.small,
        maxWidth: 220,
        lineHeight: 17,
    },
    speedIconBox: {
        width: 44,
        height: 44,
        borderRadius: radius.md,
        justifyContent: 'center',
        alignItems: 'center',
    },
    speedIconText: {
        fontSize: typography.h4,
    },
    metricsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 18,
    },
    metricCard: {
        flex: 1,
        borderRadius: 14,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginHorizontal: 3,
        alignItems: 'center',
    },
    metricLabelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    metricLabel: {
        fontSize: 11,
        fontWeight: '600',
    },
    metricValue: {
        fontSize: 15,
        fontWeight: '800',
        color: '#0F172A',
    },
    galleryButton: {
        backgroundColor: `rgb(${colors.primaryColor})`,
        borderRadius: 16,
        paddingVertical: 14,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 14,
    },
    galleryLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    galleryIconWrapper: {
        marginRight: 12,
    },
    galleryIcon: {
        fontSize: 22,
        color: '#FFFFFF',
    },
    galleryTitle: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 14,
    },
    gallerySubtitle: {
        color: '#C7D2FE',
        fontSize: 11,
        marginTop: 2,
    },
    chevron: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: '300',
    },
    specsCard: {
        borderRadius: 18,
        padding: 16,
        marginTop: 14,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
    },
    specsHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    specsTitleLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: '700',
    },
    kernelBadge: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 8,
    },
    kernelText: {
        fontSize: 10,
        fontWeight: '600',
    },
    specRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 9,
        borderBottomWidth: 1,
    },
    lastSpecRow: {
        borderBottomWidth: 0,
    },
    specLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    specItemIcon: {
        fontSize: 13,
        marginRight: 8,
    },
    specLabel: {
        fontSize: 12,
        fontWeight: '500',
    },
    specValueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    specValue: {
        fontSize: 12,
        fontWeight: '600',
    },
    copyIcon: {
        fontSize: 11,
        color: `rgb(${colors.primaryColor})`,
        marginLeft: 6,
    },
    storageProgressTrack: {
        position: 'absolute',
        bottom: -6,
        left: 0,
        right: 0,
        height: 3,
        borderRadius: 2,
    },
    storageProgressFill: {
        height: '100%',
        backgroundColor: `rgb(${colors.primaryColor})`,
        borderRadius: 2,
    },
})