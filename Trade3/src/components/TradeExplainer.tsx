import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';
import { ChevronDown, ChevronUp, Users, Package, DollarSign, ArrowRight } from 'lucide-react-native';

export default function TradeExplainer() {
    const [expanded, setExpanded] = useState(false);

    if (!expanded) {
        return (
            <TouchableOpacity style={styles.collapsedContainer} onPress={() => setExpanded(true)}>
                <View style={styles.headerRow}>
                    <Text style={styles.title}>Trade Overview: UBC to Aluminium Ingot Breakdown</Text>
                    <ChevronDown size={20} color={COLORS.primary} />
                </View>
                <Text style={styles.subtitle}>25MT Scrap Metal • $36,250 Financed • 28% ROI</Text>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.headerRow} onPress={() => setExpanded(false)}>
                <Text style={styles.title}>Trade Overview</Text>
                <ChevronUp size={20} color={COLORS.primary} />
            </TouchableOpacity>

            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Users size={16} color={COLORS.accent} style={{ marginRight: 6 }} />
                    <Text style={styles.sectionTitle}>The Participants</Text>
                </View>
                <View style={styles.grid}>
                    <View style={styles.gridItem}>
                        <Text style={styles.role}>Buyer (Mfg)</Text>
                        <Text style={styles.entity}>Afeco Heating</Text>
                    </View>
                    <View style={styles.gridItem}>
                        <Text style={styles.role}>Seller</Text>
                        <Text style={styles.entity}>Ivory Scrap</Text>
                    </View>
                    <View style={styles.gridItem}>
                        <Text style={styles.role}>Financier</Text>
                        <Text style={styles.entity}>Xtraa Ltd</Text>
                    </View>
                    <View style={styles.gridItem}>
                        <Text style={styles.role}>Custodian</Text>
                        <Text style={styles.entity}>SGS India</Text>
                    </View>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Package size={16} color={COLORS.accent} style={{ marginRight: 6 }} />
                    <Text style={styles.sectionTitle}>The Commodity Cycle</Text>
                </View>
                <View style={styles.flowRow}>
                    <View style={styles.flowItem}>
                        <Text style={styles.flowLabel}>Raw Material</Text>
                        <Text style={styles.flowValue}>25MT UBC</Text>
                        <Text style={styles.flowSub}>@ $1,450/MT</Text>
                    </View>
                    <ArrowRight size={16} color={COLORS.text} />
                    <View style={styles.flowItem}>
                        <Text style={styles.flowLabel}>Finished Good</Text>
                        <Text style={styles.flowValue}>Aluminium Ingots</Text>
                        <Text style={styles.flowSub}>Market Value: $45k</Text>
                    </View>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <DollarSign size={16} color={COLORS.accent} style={{ marginRight: 6 }} />
                    <Text style={styles.sectionTitle}>Financials</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Principal Financed</Text>
                    <Text style={styles.value}>$36,250.00</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Sale Price (Revenue)</Text>
                    <Text style={styles.valuePositive}>$45,000.00</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Net Profit (Afeco)</Text>
                    <Text style={[styles.value, { color: COLORS.accent }]}>$8,387.50</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    collapsedContainer: {
        backgroundColor: COLORS.secondary,
        padding: 16,
        borderRadius: SIZES.radius,
        marginBottom: 16,
        ...SHADOWS.card,
    },
    container: {
        backgroundColor: COLORS.secondary,
        padding: 16,
        borderRadius: SIZES.radius,
        marginBottom: 16,
        ...SHADOWS.card,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    title: {
        fontFamily: FONTS.heading,
        fontSize: 16,
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    subtitle: {
        fontFamily: FONTS.body,
        fontSize: 12,
        color: COLORS.text,
        marginTop: 4,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: 12,
    },
    section: {
        marginBottom: 4,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    sectionTitle: {
        fontFamily: FONTS.bodyBold,
        fontSize: 14,
        color: COLORS.primary,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    gridItem: {
        width: '48%',
        marginBottom: 8,
        backgroundColor: COLORS.background,
        padding: 8,
        borderRadius: 6,
    },
    role: {
        fontSize: 10,
        color: COLORS.text,
        fontFamily: FONTS.body,
    },
    entity: {
        fontSize: 12,
        color: COLORS.primary,
        fontFamily: FONTS.bodyBold,
    },
    flowRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        padding: 10,
        borderRadius: 8,
    },
    flowItem: {
        alignItems: 'center',
    },
    flowLabel: { fontSize: 10, color: COLORS.text },
    flowValue: { fontSize: 14, color: COLORS.primary, fontFamily: FONTS.bodyBold },
    flowSub: { fontSize: 10, color: COLORS.accent },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    label: { fontSize: 12, color: COLORS.text, fontFamily: FONTS.body },
    value: { fontSize: 12, color: COLORS.primary, fontFamily: FONTS.bodyBold },
    valuePositive: { fontSize: 12, color: '#2e7d32', fontFamily: FONTS.bodyBold },
});
