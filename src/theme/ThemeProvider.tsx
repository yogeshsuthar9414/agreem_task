import React, { createContext, useContext, useState, useMemo } from 'react';
import { useColorScheme } from 'react-native';

export type ThemeMode = 'light' | 'midnight';

export const palette = {
    light: {
        isDark: false,
        background: '#F8FAFC',
        surface: '#FFFFFF',
        surfaceSecondary: '#EEF2FF',
        surfaceMuted: '#F1F5F9',
        border: '#E2E8F0',
        borderMuted: '#F1F5F9',
        textPrimary: '#0F172A',
        textSecondary: '#64748B',
        textMuted: '#94A3B8',
        primary: '#3730A3',
        primaryLight: '#4338CA',
        accent: '#2563EB',
        accentBadge: '#E0E7FF',
        successBg: '#E0F2FE',
        successText: '#0284C7',
        warningBg: '#FEE2E2',
        warningText: '#DC2626',
        inputBg: '#F1F5F9',
        statusBar: 'dark-content' as const,
    },
    midnight: {
        isDark: true,
        background: '#0B0F19',
        surface: '#151D2F',
        surfaceSecondary: '#1E293B',
        surfaceMuted: '#192237',
        border: '#23304B',
        borderMuted: '#1E293B',
        textPrimary: '#F8FAFC',
        textSecondary: '#94A3B8',
        textMuted: '#64748B',
        primary: '#4F46E5',
        primaryLight: '#6366F1',
        accent: '#3B82F6',
        accentBadge: '#1E2238',
        successBg: '#07333B',
        successText: '#38BDF8',
        warningBg: '#3F171A',
        warningText: '#F87171',
        inputBg: '#1A2338',
        statusBar: 'light-content' as const,
    },
};

type ThemeColors = typeof palette.light;

interface ThemeContextProps {
    theme: ThemeMode;
    colors: any;
    toggleTheme: () => void;
    setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const systemScheme = useColorScheme();
    const [theme, setTheme] = useState<ThemeMode>(
        systemScheme === 'dark' ? 'midnight' : 'light'
    );

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'midnight' : 'light'));
    };

    const colors = useMemo(() => palette[theme], [theme]);

    return (
        <ThemeContext.Provider value={{ theme, colors, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}