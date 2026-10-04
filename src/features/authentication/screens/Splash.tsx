import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
    withSpring,
    Easing,
} from 'react-native-reanimated';
import { colors } from '../../../theme/color';
import { ROUTES } from '../../../navigation/routes';
import { runOnJS } from 'react-native-worklets';
import { useTheme } from '../../../theme/ThemeProvider';

const { width } = Dimensions.get('window');

const Splash = ({ navigation }: any) => {

    const { colors } = useTheme();

    // Shared values for entry animations
    const logoScale = useSharedValue(0.6);
    const logoOpacity = useSharedValue(0);

    const textTranslateY = useSharedValue(20);
    const textOpacity = useSharedValue(0);

    const progress = useSharedValue(0);

    const handleLogin = () => {
        navigation.navigate(ROUTES.MAIN);
    };

    useEffect(() => {
        logoScale.value = withSpring(1, { damping: 12, stiffness: 90 });
        logoOpacity.value = withTiming(1, { duration: 600 });

        textTranslateY.value = withDelay(300, withSpring(0, { damping: 14 }));
        textOpacity.value = withDelay(300, withTiming(1, { duration: 500 }));

        progress.value = withDelay(
            600,
            withTiming(1, { duration: 1400, easing: Easing.inOut(Easing.cubic) }, (isFinished) => {
                if (isFinished) {
                    runOnJS(handleLogin)();
                }
            })
        );
    }, []);

    // Animated styles
    const animatedLogoStyle = useAnimatedStyle(() => ({
        opacity: logoOpacity.value,
        transform: [{ scale: logoScale.value }],
    }));

    const animatedTextStyle = useAnimatedStyle(() => ({
        opacity: textOpacity.value,
        transform: [{ translateY: textTranslateY.value }],
    }));

    const animatedProgressStyle = useAnimatedStyle(() => ({
        width: `${progress.value * 100}%`,
    }));

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <StatusBar
                barStyle={colors.isDark ? 'light-content' : 'dark-content'}
                backgroundColor={colors.background}
            />

            {/* Main Content */}
            <View style={styles.content}>
                {/* App Icon Container */}
                <Animated.View style={[styles.logoWrapper, animatedLogoStyle]}>
                    <View style={[styles.iconCard, { backgroundColor: colors.surface, shadowOpacity: colors.isDark ? 0.35 : 0.08, }]}>
                        <View style={styles.innerIcon}>
                            <Text style={styles.monogram}>M</Text>
                        </View>
                    </View>

                </Animated.View>

                {/* Title and Tagline */}
                <Animated.View style={[styles.textBlock, animatedTextStyle]}>
                    <Text style={[styles.title, { color: colors.textPrimary }]}>My New App</Text>
                </Animated.View>

                {/* Progress Bar */}
                <View style={[styles.progressTrack, { backgroundColor: colors.border }]}>
                    <Animated.View style={[styles.progressFill, { backgroundColor: colors.primary }, animatedProgressStyle]} />
                </View>
            </View>
        </View>
    )
}

export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 40,
    },
    logoWrapper: {
        position: 'relative',
        marginBottom: 28,
    },
    iconCard: {
        width: 124,
        height: 124,
        borderRadius: 28,
        padding: 12,
        shadowColor: `rgb(${colors.secondaryColor})`,
        shadowOffset: { width: 0, height: 16 },
        shadowOpacity: 0.1,
        shadowRadius: 24,
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerIcon: {
        width: '100%',
        height: '100%',
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: `rgb(${colors.primaryColor})`
    },
    monogram: {
        color: '#FFFFFF',
        fontSize: 52,
        fontWeight: '800',
        letterSpacing: -1,
    },
    textBlock: {
        alignItems: 'center',
        marginBottom: 32,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        letterSpacing: -0.5,
        marginBottom: 8,
    },
    progressTrack: {
        width: width * 0.58,
        height: 5,
        backgroundColor: '#E2E8F0',
        borderRadius: 3,
        overflow: 'hidden',
        marginBottom: 14,
    },
    progressFill: {
        height: '100%',
        backgroundColor: `rgb(${colors.primaryColor})`,
        borderRadius: 3,
    },
});