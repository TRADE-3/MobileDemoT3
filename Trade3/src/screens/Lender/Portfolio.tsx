import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../../constants/theme';
import { PieChart } from 'lucide-react-native';

export default function Portfolio() {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.headerTitle}>My Portfolio</Text>

            <View style={styles.balanceCard}>
                <Text style={styles.label}>Total Balance</Text>
                <Text style={styles.balance}>$12,450.00</Text>
                <View style={styles.yieldTag}>
                    <Text style={styles.yieldText}>+ $124.50 (Today)</Text>
                </View>
            </View>

            <View style={styles.chartSection}>
                {/* Mock Doughnut Chart */}
                <View style={styles.doughnutPlaceholder}>
                    <View style={[styles.doughnutSegment, { borderTopColor: COLORS.primary, transform: [{ rotate: '45deg' }] }]} />
                    <View style={[styles.doughnutSegment, { borderTopColor: COLORS.accent, transform: [{ rotate: '225deg' }] }]} />
                    <View style={styles.innerCircle}>
                        <Text style={styles.centerText}>3 Active Vaults</Text>
                    </View>
                </View>
                <Text style={styles.activeYieldText}>You are earning ~10% APY across 3 vaults.</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: SIZES.padding,
    },
    headerTitle: {
        fontFamily: FONTS.heading,
        fontSize: 24,
        color: COLORS.primary,
        marginBottom: 24,
        fontWeight: 'bold',
    },
    balanceCard: {
        backgroundColor: COLORS.secondary,
        borderRadius: SIZES.radius,
        padding: 24,
        marginBottom: 24,
        ...SHADOWS.card,
        alignItems: 'center',
    },
    label: {
        fontFamily: FONTS.body,
        color: COLORS.text,
        fontSize: 14,
        marginBottom: 8,
    },
    balance: {
        fontFamily: FONTS.heading,
        color: COLORS.primary,
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    yieldTag: {
        backgroundColor: '#e8f5e9',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    yieldText: {
        color: '#2e7d32',
        fontFamily: FONTS.bodyBold,
        fontSize: 12,
    },
    chartSection: {
        backgroundColor: COLORS.secondary,
        borderRadius: SIZES.radius,
        padding: 24,
        alignItems: 'center',
        ...SHADOWS.card,
    },
    doughnutPlaceholder: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 20,
        borderColor: '#eee',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        overflow: 'hidden',
    },
    doughnutSegment: {
        position: 'absolute',
        top: -20,
        left: -20,
        width: 240,
        height: 240,
        borderRadius: 120,
        borderWidth: 20,
        borderColor: 'transparent',
    },
    innerCircle: {
        position: 'absolute',
        width: 160,
        height: 160,
        backgroundColor: COLORS.secondary,
        borderRadius: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centerText: {
        fontFamily: FONTS.bodyBold,
        color: COLORS.primary,
        width: 80,
        textAlign: 'center',
    },
    activeYieldText: {
        fontFamily: FONTS.body,
        color: COLORS.text,
        textAlign: 'center',
        fontSize: 14,
    },
});
