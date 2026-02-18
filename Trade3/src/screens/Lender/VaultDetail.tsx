import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { COLORS, FONTS, SIZES, SHADOWS } from '../../constants/theme';
import { ArrowLeft, TrendingUp, Layers } from 'lucide-react-native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'VaultDetail'>;

import { useDemo } from '../../context/DemoContext';

export default function VaultDetail() {
    const navigation = useNavigation<NavigationProp>();
    const [investAmount, setInvestAmount] = useState('');
    const { stage } = useDemo();

    const isIngotCollateral = stage === 'CUSTODY_LOCKED' || stage === 'FINAL_SETTLEMENT' || stage === 'COMPLETED';

    const handleDeposit = () => {
        if (!investAmount) {
            Alert.alert('Error', 'Please enter an amount');
            return;
        }
        // Simulate deposit
        Alert.alert('Success', `Deposited ${investAmount} USDC into Liquidity Vault.`, [
            { text: 'View Portfolio', onPress: () => navigation.navigate('Portfolio') }
        ]);
    };

    return (
        <ScrollView style={styles.container}>
            {/* Chart Placeholder */}
            <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>Yield Performance (All Time)</Text>
                <View style={styles.chartPlaceholder}>
                    {/* Simple mock chart line */}
                    <View style={{ position: 'absolute', bottom: 20, left: 20, right: 20, height: 2, backgroundColor: 'rgba(255,255,255,0.3)' }} />
                    <View style={{ position: 'absolute', bottom: 20, left: 20, width: 2, height: 100, backgroundColor: 'rgba(255,255,255,0.3)' }} />
                    {/* Diagonal line */}
                    <View style={{
                        position: 'absolute',
                        bottom: 20,
                        left: 20,
                        height: 2,
                        backgroundColor: COLORS.accent,
                        transform: [{ rotate: '-15deg' }, { translateY: -20 }], // Simplified transform
                        width: 300,
                    }} />
                </View>
            </View>

            <View style={styles.content}>
                <Text style={styles.sectionTitle}>Asset Breakdown</Text>
                <View style={styles.assetList}>
                    <View style={styles.assetItem}>
                        <Layers color={COLORS.primary} size={20} />
                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <Text style={styles.assetName}>
                                {isIngotCollateral ? 'Warehouse Receipt (Ingots)' : 'Aluminum Scrap Invoice #22'}
                            </Text>
                            <Text style={styles.assetDetail}>
                                {isIngotCollateral ? 'Custody: Control Union • 900 MT' : 'Afeco Ltd • Net 60'}
                            </Text>
                        </View>
                        <Text style={styles.assetShare}>100%</Text>
                    </View>
                </View>

                {/* Collateral Metrics */}
                <View style={[styles.detailContainer, { marginBottom: 24 }]}>
                    <Text style={[styles.sectionTitle, { marginTop: 0, fontSize: 16 }]}>Collateral Metrics</Text>

                    {isIngotCollateral ? (
                        <View style={styles.metricsGrid}>
                            <View style={styles.metricItem}>
                                <Text style={styles.metricLabel}>Collateral Value (MTM)</Text>
                                <Text style={styles.metricValue}>$148,500</Text>
                            </View>
                            <View style={styles.metricItem}>
                                <Text style={styles.metricLabel}>Current LTV</Text>
                                <Text style={styles.metricValue}>80.8%</Text>
                            </View>
                            <View style={styles.metricItem}>
                                <Text style={styles.metricLabel}>Liquidation Price</Text>
                                <Text style={styles.metricValue}>$2,100/MT</Text>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.metricsGrid}>
                            <View style={styles.metricItem}>
                                <Text style={styles.metricLabel}>Invoice Value</Text>
                                <Text style={styles.metricValue}>$150,000</Text>
                            </View>
                            <View style={styles.metricItem}>
                                <Text style={styles.metricLabel}>Advance Rate</Text>
                                <Text style={styles.metricValue}>80.0%</Text>
                            </View>
                            <View style={styles.metricItem}>
                                <Text style={styles.metricLabel}>Credit Cover</Text>
                                <Text style={styles.metricValue}>Atradius (90%)</Text>
                            </View>
                        </View>
                    )}
                </View>


                <Text style={styles.sectionTitle}>Invest</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.currencyPrefix}>USDC</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="0.00"
                        keyboardType="numeric"
                        value={investAmount}
                        onChangeText={setInvestAmount}
                    />
                </View>

                {investAmount ? (
                    <Text style={styles.projectionText}>
                        Estimated Returns: <Text style={{ color: COLORS.accent, fontWeight: 'bold' }}>${(parseFloat(investAmount) * 0.105 * (60 / 365)).toFixed(2)}</Text> in 60 days
                    </Text>
                ) : null}

                <TouchableOpacity style={styles.depositButton} onPress={handleDeposit}>
                    <Text style={styles.depositText}>Deposit to Liquidity Vault</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    chartContainer: {
        backgroundColor: COLORS.primary,
        padding: SIZES.padding,
        paddingBottom: 40,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    chartTitle: {
        color: 'rgba(255,255,255,0.7)',
        fontFamily: FONTS.body,
        marginBottom: 20,
    },
    chartPlaceholder: {
        height: 150,
        justifyContent: 'flex-end',
        position: 'relative',
        overflow: 'hidden',
    },
    content: {
        padding: SIZES.padding,
        marginTop: -20,
    },
    sectionTitle: {
        fontFamily: FONTS.heading,
        fontSize: 18,
        color: COLORS.primary,
        marginBottom: 12,
        marginTop: 12,
        fontWeight: 'bold',
    },
    assetList: {
        backgroundColor: COLORS.secondary,
        borderRadius: SIZES.radius,
        padding: 16,
        ...SHADOWS.card,
        marginBottom: 24,
    },
    assetItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    },
    assetName: {
        fontFamily: FONTS.bodyBold,
        color: COLORS.primary,
        fontSize: 14,
    },
    assetDetail: {
        fontFamily: FONTS.body,
        color: COLORS.text,
        fontSize: 12,
    },
    assetShare: {
        fontFamily: FONTS.bodyBold,
        color: COLORS.primary,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: 8,
    },
    inputContainer: {
        backgroundColor: COLORS.secondary,
        borderRadius: SIZES.radius,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        height: 60,
        borderWidth: 1,
        borderColor: COLORS.border,
        marginBottom: 8,
    },
    currencyPrefix: {
        fontFamily: FONTS.bodyBold,
        color: COLORS.primary,
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontFamily: FONTS.heading,
        fontSize: 18,
        color: COLORS.primary,
    },
    projectionText: {
        fontFamily: FONTS.body,
        color: COLORS.text,
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 24,
    },
    depositButton: {
        backgroundColor: COLORS.primary,
        padding: 18,
        borderRadius: SIZES.radius,
        alignItems: 'center',
        ...SHADOWS.card,
    },
    depositText: {
        color: COLORS.secondary,
        fontFamily: FONTS.bodyBold,
        fontSize: 16,
    },
    detailContainer: {
        backgroundColor: 'rgba(0,0,0,0.03)',
        borderRadius: SIZES.radius,
        padding: 16,
    },
    metricsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
    },
    metricItem: {
        width: '30%',
    },
    metricLabel: {
        fontFamily: FONTS.body,
        fontSize: 11,
        color: COLORS.text,
        marginBottom: 4,
    },
    metricValue: {
        fontFamily: FONTS.bodyBold,
        fontSize: 14,
        color: COLORS.primary,
    },
});
