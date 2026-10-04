import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ArrowRight, Bookmark, RotateCcw, ShoppingBag, Star, Truck } from 'lucide-react-native'
import { colors } from '../../../theme/color'
import { radius } from '../../../theme/radius'
import { typography } from '../../../theme/typography'
import { useTheme } from '../../../theme/ThemeProvider'

const Items = ({ item }: any) => {

    const { colors } = useTheme();

    return (
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border, shadowOpacity: colors.isDark ? 0.2 : 0.04, }]}>
            <View style={styles.cardHeader}>
                {/* Product Thumbnail */}
                <View style={styles.imageWrapper}>
                    <Image source={{ uri: item.thumbnail }} style={[styles.productImage, { backgroundColor: colors.surfaceMuted, }]} />
                    <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>{item.discountPercentage}</Text>
                    </View>
                </View>

                {/* Product Info */}
                <View style={styles.infoWrapper}>
                    <View style={styles.metaRow}>
                        <Text style={[styles.skuText, { color: colors.textMuted }]} numberOfLines={1}>
                            {item.brand} • SKU: {item.sku}
                        </Text>
                        <TouchableOpacity>
                            <Bookmark size={15} color={colors.textMuted} />
                        </TouchableOpacity>
                    </View>

                    <Text style={[styles.productTitle, { color: colors.textPrimary }]} numberOfLines={1}>
                        {item.title}
                    </Text>

                    {/* Tags */}
                    <View style={styles.tagsRow}>
                        {item.tags.map((tag: string, idx: number) => (
                            <View key={idx} style={[styles.tagPill, { backgroundColor: colors.surfaceSecondary, borderColor: colors.borderMuted }]}>
                                <Text style={[styles.tagText, { color: colors.primaryLight, }]}>{tag}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Price and MOQ */}
                    <View style={styles.priceRow}>
                        <View style={styles.priceContainer}>
                            <Text style={[styles.currentPrice, { color: colors.textPrimary }]}>{item.price}</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Metrics Panel */}
            <View style={[styles.metricsBox, { backgroundColor: colors.surfaceMuted, borderColor: colors.borderMuted }]}>
                <View style={styles.metricItem}>
                    <Text style={[styles.metricHeading, { color: colors.textMuted }]}>Rating</Text>
                    <View style={styles.ratingVal}>
                        <Star size={12} color={colors.primaryLight} fill={colors.primaryLight} />
                        <Text style={[styles.ratingText, { color: colors.textPrimary }]}>{item.rating}</Text>
                    </View>
                </View>

                <View style={[styles.metricDivider, { backgroundColor: colors.borderMuted }]} />

                <View style={styles.metricItem}>
                    <Text style={[styles.metricHeading, { color: colors.textMuted }]}>Warranty</Text>
                    <Text style={[styles.metricValueText, { color: colors.textPrimary, }]}>{item.warrantyInformation}</Text>
                </View>
            </View>

            {/* Quote or Shipping details */}
            <View style={styles.shippingSection}>
                <View style={styles.logisticsRow}>
                    <View style={styles.shippingItem}>
                        <Truck size={13} color="#0D9488" />
                        <Text style={styles.shippingText}>{item.shippingInformation}</Text>
                    </View>
                </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.cardActions}>
                <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.85}>
                    <ShoppingBag size={15} color="#FFFFFF" />
                    <Text style={styles.primaryBtnText}>Add to Cart</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.secondaryBtn, { backgroundColor: colors.surfaceSecondary, borderColor: colors.borderMuted, }]} activeOpacity={0.85}>
                    <Text style={[styles.secondaryBtnText, { color: colors.primaryLight }]}>Details</Text>
                    <ArrowRight size={14} color={colors.primaryLight} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Items

const styles = StyleSheet.create({
    card: {
        borderRadius: radius.lg,
        padding: 14,
        marginBottom: 14,
        borderWidth: 1,
    },
    cardHeader: {
        flexDirection: 'row',
    },
    imageWrapper: {
        position: 'relative',
        marginRight: 12,
    },
    productImage: {
        width: 90,
        height: 90,
        borderRadius: radius.md,
    },
    discountBadge: {
        position: 'absolute',
        top: 4,
        left: 4,
        backgroundColor: '#DC2626',
        borderRadius: 6,
        paddingHorizontal: 4,
        paddingVertical: 1,
    },
    discountText: {
        color: '#FFFFFF',
        fontSize: typography.small,
        fontWeight: '700',
    },
    infoWrapper: {
        flex: 1,
    },
    metaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    skuText: {
        fontSize: 10,
        fontWeight: '600',
        maxWidth: 180,
    },
    productTitle: {
        fontSize: typography.caption,
        fontWeight: '700',
        marginTop: 2,
    },
    tagsRow: {
        flexDirection: 'row',
        gap: 6,
        marginTop: 5,
    },
    tagPill: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: radius.sm,
    },
    tagText: {
        fontSize: 10,
        fontWeight: '500',
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: 6,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 6,
    },
    currentPrice: {
        fontSize: typography.body,
        fontWeight: '800',
    },
    metricsBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: `rgb(${colors.primaryColor}, 0.05)`,
        borderRadius: radius.md,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginTop: 12,
    },
    metricItem: {
        alignItems: 'center',
        flex: 1,
    },
    metricDivider: {
        width: 1,
        backgroundColor: '#E2E8F0',
    },
    metricHeading: {
        fontSize: 10,
        fontWeight: '500',
        marginBottom: 2,
    },
    ratingVal: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
    },
    ratingText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#0F172A',
    },
    metricValueText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#0F172A',
    },
    shippingSection: {
        marginTop: 8,
        gap: 4,
    },
    logisticsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    shippingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    shippingText: {
        fontSize: 10,
        color: '#0D9488',
        fontWeight: '500',
    },
    cardActions: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 12,
    },
    primaryBtn: {
        flex: 1.6,
        flexDirection: 'row',
        backgroundColor: `rgb(${colors.primaryColor})`,
        paddingVertical: 10,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
    },
    primaryBtnText: {
        color: "#FFFFFF",
        fontSize: typography.small,
        fontWeight: '700',
    },
    secondaryBtn: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 10,
        borderRadius: radius.md,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
    },
    secondaryBtnText: {
        fontSize: typography.small,
        fontWeight: '700',
    },
})