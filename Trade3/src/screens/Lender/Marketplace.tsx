import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { COLORS, FONTS, SIZES, SHADOWS } from '../../constants/theme';
import { TrendingUp, ShieldCheck, Clock, CheckCircle } from 'lucide-react-native';
import { useDemo } from '../../context/DemoContext';
import TransactionFlowIndicator from '../../components/TransactionFlowIndicator';
import WalletHeader from '../../components/WalletHeader';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'YieldMarketplace'>;

export default function InvestorDashboard() {
    const navigation = useNavigation<NavigationProp>();
    const { stage, advanceStage } = useDemo();
    const [autoInvest, setAutoInvest] = useState(false);

    const isSettlement = stage === 'SETTLEMENT_NET';

    const handleReleaseFunds = () => {
        Alert.alert('Settlement Executed', 'Principal + Fees deducted. Net $8,387.50 sent to Manufacturer.');
        advanceStage(); // -> SETTLEMENT_NET
    };

    // Screen 2: Yield Realization
    if (isSettlement) {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.headerTitle}>Yield Realization</Text>
                <WalletHeader
                    persona="Investor"
                    address="0xCC...8812"
                    balance="2,501,087 USDC"
                    nftCount={12} // Portfolio
                />
                <TransactionFlowIndicator />

                <View style={styles.yieldCard}>
                    <Text style={styles.sectionTitle}>Performance Summary</Text>

                    {/* Visual Placeholder for Graph */}
                    <View style={styles.graphPlaceholder}>
                        <View style={styles.graphLine} />
                        <Text style={styles.graphLabel}>+12.2% APY Growth</Text>
                    </View>

                    <View style={styles.breakdownContainer}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Phase 1 (UBC Financing)</Text>
                            <Text style={styles.value}>+$725.00</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Phase 2 (Ingot Financing)</Text>
                            <Text style={styles.value}>+$362.50</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Total Yield Earned</Text>
                            <Text style={styles.totalValue}>$1,087.50</Text>
                        </View>
                        <Text style={styles.principalNote}>on $36,250 Principal</Text>
                    </View>

                    <View style={styles.reinvestRow}>
                        <Text style={styles.reinvestText}>Auto-Reinvest in Next Batch</Text>
                        <Switch
                            value={autoInvest}
                            onValueChange={(val) => {
                                setAutoInvest(val);
                                if (val) Alert.alert('Auto-Invest On', 'Funds will be deployed to Batch #UBC-2026-02 automatically.');
                            }}
                            trackColor={{ false: "#767577", true: COLORS.accent }}
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }

    // Screen 1: Vault Performance
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.headerTitle}>Aluminum Circular Economy Vault</Text>

            <WalletHeader
                persona="Investor"
                address="0xCC...8812"
                balance="2,500,000 USDC"
                nftCount={12}
            />

            <TransactionFlowIndicator />

            {/* Action Card for GFI (Supplier Finance) */}
            {stage === 'PAYMENT_UBC' && (
                <View style={styles.actionCard}>
                    <Text style={styles.actionTitle}>Finance Approval Required</Text>
                    <Text style={styles.actionDesc}>Verify Documents & Release Payment</Text>

                    <View style={styles.row}>
                        <Text style={styles.label}>Request Amount</Text>
                        <Text style={styles.value}>$35,525.00 (Net)</Text>
                    </View>

                    <View style={styles.divider} />

                    <Text style={[styles.label, { marginBottom: 8 }]}>Verified Documents:</Text>
                    <View style={styles.docRow}>
                        <CheckCircle size={14} color="green" />
                        <Text style={styles.docText}> Bill of Lading (Uploaded by Ivory)</Text>
                    </View>
                    <View style={styles.docRow}>
                        <CheckCircle size={14} color="green" />
                        <Text style={styles.docText}> Surveyor Report (Verified by SGS)</Text>
                    </View>

                    <TouchableOpacity style={styles.primaryButton} onPress={() => {
                        Alert.alert('Payment Sent', '$35,525 sent to Ivory Scrap via USDC.');
                        advanceStage(); // -> TRANSFORMATION (or TRANSIT if we had it, but next is Custodian Receipt)
                    }}>
                        <Text style={styles.primaryBtnText}>Approve & Pay Supplier</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Action Card for GFI (Ingot Release) */}
            {stage === 'PAYMENT_INGOT' && (
                <View style={styles.actionCard}>
                    <Text style={styles.actionTitle}>Payment Received</Text>
                    <Text style={styles.actionDesc}>End User sent $45,000.00 USDC</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Pending Settlement</Text>
                        <Text style={styles.value}>$8,387.50 (Net Profit to Afeco)</Text>
                    </View>
                    <TouchableOpacity style={styles.primaryButton} onPress={handleReleaseFunds}>
                        <Text style={styles.primaryBtnText}>Settle & Release Ownership</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Stats Row */}
            <View style={styles.statsContainer}>
                <View style={styles.statBox}>
                    <Text style={styles.statLabel}>APY</Text>
                    <Text style={styles.statValueHighlight}>12%</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statLabel}>Risk</Text>
                    <Text style={styles.statValue}>Low (A)</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statLabel}>Duration</Text>
                    <Text style={styles.statValue}>1.5 Mo</Text>
                </View>
            </View>

            {/* Asset List */}
            <Text style={styles.sectionTitle}>Active Assets</Text>
            <View style={styles.assetCard}>
                <View style={styles.assetHeader}>
                    <View>
                        <Text style={styles.assetTitle}>Trade #8821</Text>
                        <Text style={styles.assetSubtitle}>Afeco / Ivory Scrap</Text>
                    </View>
                    <View style={styles.statusBadge}>
                        <Text style={styles.statusText}>{stage}</Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.assetRow}>
                    <ShieldCheck size={16} color={COLORS.primary} style={{ marginRight: 8 }} />
                    <Text style={styles.assetDetail}>Collateral: 25MT UBC (Double-Verified)</Text>
                </View>

                <View style={styles.assetRow}>
                    <Clock size={16} color={COLORS.primary} style={{ marginRight: 8 }} />
                    <Text style={styles.assetDetail}>Maturity: March 15, 2026</Text>
                </View>

                {/* Simulation of Accrued Interest */}
                <View style={styles.accrualBox}>
                    <Text style={styles.accrualLabel}>Accrued Interest (Est.)</Text>
                    <Text style={styles.accrualValue}>
                        ${
                            ['CONTRACT_UBC', 'FINANCE_REQUEST'].includes(stage) ? '0.00' :
                                ['PAYMENT_UBC', 'TRANSFORMATION'].includes(stage) ? '725.00' :
                                    '1,087.50'
                        }
                    </Text>
                </View>
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
        fontSize: 20,
        color: COLORS.primary,
        marginBottom: 16,
        fontWeight: 'bold',
    },
    yieldCard: {
        backgroundColor: COLORS.secondary,
        borderRadius: SIZES.radius,
        padding: 20,
        ...SHADOWS.card,
    },
    sectionTitle: {
        fontFamily: FONTS.heading,
        fontSize: 16,
        color: COLORS.primary,
        marginBottom: 12,
        fontWeight: 'bold',
    },
    graphPlaceholder: {
        height: 120,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#eee',
    },
    graphLine: {
        width: '80%',
        height: 2,
        backgroundColor: COLORS.accent,
        transform: [{ rotate: '-10deg' }]
    },
    graphLabel: {
        marginTop: 10,
        fontFamily: FONTS.bodyBold,
        color: COLORS.accent,
    },
    breakdownContainer: {
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    label: {
        fontFamily: FONTS.body,
        fontSize: 14,
        color: COLORS.text,
    },
    value: {
        fontFamily: FONTS.bodyBold,
        fontSize: 14,
        color: COLORS.primary,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: 12,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    totalLabel: {
        fontFamily: FONTS.bodyBold,
        fontSize: 16,
        color: COLORS.primary,
    },
    totalValue: {
        fontFamily: FONTS.heading,
        fontSize: 20,
        color: COLORS.accent,
        fontWeight: 'bold',
    },
    principalNote: {
        textAlign: 'right',
        fontFamily: FONTS.body,
        fontSize: 12,
        color: '#a0a3b1',
    },
    reinvestRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f0f4f8',
        padding: 12,
        borderRadius: 8,
    },
    reinvestText: {
        fontFamily: FONTS.bodyBold,
        color: COLORS.primary,
        fontSize: 14,
    },
    // Stats
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    statBox: {
        flex: 1,
        backgroundColor: COLORS.secondary,
        padding: 12,
        borderRadius: SIZES.radius,
        alignItems: 'center',
        marginHorizontal: 4,
        ...SHADOWS.card,
    },
    statLabel: {
        fontFamily: FONTS.body,
        fontSize: 12,
        color: COLORS.text,
        marginBottom: 4,
    },
    statValue: {
        fontFamily: FONTS.bodyBold,
        fontSize: 14,
        color: COLORS.primary,
    },
    statValueHighlight: {
        fontFamily: FONTS.heading,
        fontSize: 18,
        color: COLORS.accent,
        fontWeight: 'bold',
    },
    // Asset Card
    assetCard: {
        backgroundColor: COLORS.secondary,
        borderRadius: SIZES.radius,
        padding: 16,
        ...SHADOWS.card,
    },
    assetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    assetTitle: {
        fontFamily: FONTS.bodyBold,
        fontSize: 16,
        color: COLORS.primary,
    },
    assetSubtitle: {
        fontFamily: FONTS.body,
        fontSize: 14,
        color: COLORS.text,
    },
    statusBadge: {
        backgroundColor: 'rgba(26, 31, 58, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    statusText: {
        fontFamily: FONTS.bodyBold,
        fontSize: 10,
        color: COLORS.primary,
    },
    assetRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    assetDetail: {
        fontFamily: FONTS.body,
        fontSize: 14,
        color: COLORS.text,
    },
    accrualBox: {
        marginTop: 12,
        backgroundColor: '#e0f7fa',
        padding: 12,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    accrualLabel: {
        fontFamily: FONTS.bodyBold,
        fontSize: 12,
        color: '#006064',
    },
    accrualValue: {
        fontFamily: FONTS.bodyBold,
        fontSize: 14,
        color: '#006064',
    },
    // Action Card Styles
    actionCard: {
        backgroundColor: COLORS.secondary,
        borderRadius: SIZES.radius,
        padding: 20,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: COLORS.accent,
        borderLeftWidth: 4,
        ...SHADOWS.card,
    },
    actionTitle: {
        fontFamily: FONTS.heading,
        color: COLORS.accent,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    actionDesc: {
        fontFamily: FONTS.body,
        color: COLORS.primary,
        fontSize: 16,
        marginBottom: 12,
        fontWeight: 'bold',
    },
    primaryButton: {
        backgroundColor: COLORS.accent,
        padding: 14,
        borderRadius: SIZES.radius,
        alignItems: 'center',
        marginTop: 16,
    },
    primaryBtnText: {
        color: COLORS.secondary,
        fontFamily: FONTS.bodyBold,
        fontSize: 16,
    },
    docRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
        marginLeft: 8,
    },
    docText: {
        fontFamily: FONTS.body,
        fontSize: 14,
        color: COLORS.text,
        marginLeft: 6,
    },
});
