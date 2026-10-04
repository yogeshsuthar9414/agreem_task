import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    StatusBar,
    FlatList,
} from 'react-native';
import {
    SlidersHorizontal,
    Sparkles,
    Flower2,
    Search,
    LayoutGrid,
} from 'lucide-react-native';
import { useListing } from '../hooks/useList';
import Items from '../components/Items';
import { colors } from '../../../theme/color';
import { radius } from '../../../theme/radius';
import { typography } from '../../../theme/typography';
import NoDataFound from '../components/NoDataFound';
import SkeletonCard from '../components/SkeletonCard';
import { useTheme } from '../../../theme/ThemeProvider';

const CATEGORIES = [
    { id: '1', label: 'All', icon: LayoutGrid, active: true },
    { id: '2', label: 'Beauty', icon: Sparkles, active: false },
    { id: '3', label: 'Skincare', icon: Flower2, active: false },
    { id: '4', label: 'Fragrance', icon: Sparkles, active: false },
];


const Listing = () => {

    const { colors } = useTheme();

    const {
        loading,
        selectedCategory,
        setSelectedCategory,
        search,
        setSearch,
        filteredProducts
    } = useListing();

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <StatusBar
                barStyle={colors.isDark ? 'light-content' : 'dark-content'}
                backgroundColor={colors.background}
            />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Search Input Bar */}
                <View style={[styles.searchContainer, { backgroundColor: colors.inputBg }]}>
                    <Search size={18} color={colors.textMuted} style={styles.searchIcon} />
                    <TextInput
                        placeholder="Search products, brands, SKUs..."
                        placeholderTextColor={colors.textMuted}
                        style={[styles.searchInput, { color: colors.textPrimary }]}
                        value={search}
                        onChangeText={setSearch}
                    />
                    <TouchableOpacity style={styles.filterButton}>
                        <SlidersHorizontal size={18} color={colors.textSecondary} />
                    </TouchableOpacity>
                </View>

                {/* Categories Bar */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoryScroll}
                >
                    {CATEGORIES.map((cat) => {
                        const Icon = cat.icon;
                        const isSelected = selectedCategory === cat.label;
                        return (
                            <TouchableOpacity
                                key={cat.id}
                                style={[styles.categoryChip, isSelected && styles.categoryChipActive, { backgroundColor: !isSelected ? colors.surfaceSecondary : colors.primary }]}
                                onPress={() => setSelectedCategory(cat.label)}
                            >
                                <Icon size={14} color={isSelected ? '#FFFFFF' : colors.textSecondary} />
                                <Text style={[styles.categoryText, { color: !isSelected ? colors.textSecondary : '#FFFFFF' }]}>
                                    {cat.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                {/* Product Cards */}
                {loading ? <SkeletonCard /> :
                    <FlatList
                        data={filteredProducts}
                        renderItem={({ item }: any) => <Items item={item} />}
                        keyExtractor={(item: any) => item.id}
                        ListEmptyComponent={NoDataFound}
                    />
                }

            </ScrollView>
        </View>
    )
}

export default Listing

const styles = StyleSheet.create({
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 28,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EEF2F6',
        borderRadius: radius.md,
        paddingHorizontal: 12,
        marginTop: 12,
        height: 44,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: typography.caption,
        color: '#0F172A',
    },
    filterButton: {
        padding: 6,
    },
    categoryScroll: {
        paddingVertical: 12,
        gap: 8,
    },
    categoryChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EEF2FF',
        paddingHorizontal: 14,
        paddingVertical: 7,
        borderRadius: radius.lg,
        gap: 6,
    },
    categoryChipActive: {
        backgroundColor: `rgb(${colors.primaryColor})`,
    },
    categoryText: {
        fontSize: typography.small,
        fontWeight: '600',
    },
})