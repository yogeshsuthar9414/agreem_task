import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    Easing,
} from 'react-native-reanimated';
import { useTheme } from '../../../theme/ThemeProvider';

const SkeletonCard = () => {
    const opacity = useSharedValue(0.35);
    const { colors } = useTheme();

    useEffect(() => {
        opacity.value = withRepeat(
            withTiming(0.85, { duration: 850, easing: Easing.inOut(Easing.quad) }),
            -1,
            true
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    return (
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.headerRow}>
                {/* Thumbnail Skeleton */}
                <Animated.View style={[styles.imagePlaceholder, animatedStyle, { backgroundColor: colors.border }]} />

                {/* Text Lines */}
                <View style={styles.infoWrapper}>
                    <Animated.View style={[styles.line, { width: '50%', height: 10, backgroundColor: colors.border, }, animatedStyle]} />
                    <Animated.View style={[styles.line, { width: '85%', height: 14, marginVertical: 8, backgroundColor: colors.border, }, animatedStyle]} />

                    <View style={styles.chipRow}>
                        <Animated.View style={[styles.pill, { width: 50, backgroundColor: colors.border, }, animatedStyle]} />
                        <Animated.View style={[styles.pill, { width: 60, backgroundColor: colors.border, }, animatedStyle]} />
                    </View>

                    <View style={styles.priceRow}>
                        <Animated.View style={[styles.line, { width: '40%', height: 16, backgroundColor: colors.border, }, animatedStyle]} />
                        <Animated.View style={[styles.line, { width: '25%', height: 12, backgroundColor: colors.border, }, animatedStyle]} />
                    </View>
                </View>
            </View>

            {/* Metrics Bar Skeleton */}
            <View style={[styles.metricsBar, { backgroundColor: colors.surfaceMuted, borderColor: colors.borderMuted }]}>
                <Animated.View style={[styles.line, { width: '25%', height: 14, backgroundColor: colors.border, }, animatedStyle]} />
                <Animated.View style={[styles.line, { width: '25%', height: 14, backgroundColor: colors.border, }, animatedStyle]} />
                <Animated.View style={[styles.line, { width: '25%', height: 14, backgroundColor: colors.border, }, animatedStyle]} />
            </View>

            {/* Buttons Skeleton */}
            <View style={styles.buttonRow}>
                <Animated.View style={[styles.btnPlaceholder, { flex: 1.6, backgroundColor: colors.border }, animatedStyle]} />
                <Animated.View style={[styles.btnPlaceholder, { flex: 1, backgroundColor: colors.border }, animatedStyle]} />
            </View>
        </View>
    );
}

export default SkeletonCard

const styles = StyleSheet.create({
    card: {
        borderRadius: 18,
        padding: 14,
        marginBottom: 14,
        borderWidth: 1,
    },
    headerRow: {
        flexDirection: 'row',
    },
    imagePlaceholder: {
        width: 90,
        height: 90,
        borderRadius: 12,
        marginRight: 12,
    },
    infoWrapper: {
        flex: 1,
        justifyContent: 'space-between',
    },
    line: {
        borderRadius: 4,
    },
    chipRow: {
        flexDirection: 'row',
        gap: 6,
        marginVertical: 4,
    },
    pill: {
        height: 18,
        borderRadius: 6,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
    },
    metricsBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 10,
        paddingVertical: 12,
        marginTop: 12,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 12,
    },
    btnPlaceholder: {
        height: 40,
        borderRadius: 12,
        backgroundColor: '#E2E8F0',
    },
})