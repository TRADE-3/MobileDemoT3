import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { COLORS, FONTS, SIZES, SHADOWS } from '../../constants/theme';
import { FileText, ChevronRight, Activity } from 'lucide-react-native';
import { useDemo } from '../../context/DemoContext';
import TransactionFlowIndicator from '../../components/TransactionFlowIndicator';
import WalletHeader from '../../components/WalletHeader';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'EscrowList'>;

export default function AfecoDashboard() {
    const navigation = useNavigation<NavigationProp>();
    const { stage, advanceStage } = useDemo();

    const isSettlement = stage === 'SETTLEMENT_NET';

    // Screen 2: Trade Settlement
    if (isSettlement) {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.headerTitle}>Trade Settlement Statement</Text>
                <TransactionFlowIndicator />

                <View style={styles.settlementCard}>
                    <Text style={styles.settlementHeader}>Transaction #UBC-2026-01</Text>
                    <View style={styles.divider} />

                    <View style={styles.row}>
                        <Text style={styles.label}>Gross Revenue (Ingot Sale)</Text>
                        <Text style={styles.valuePositive}>+$45,000.00</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Principal Repayment</Text>
                        <Text style={styles.valueNegative}>-$36,250.00</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Financing Fees (1.5 Mo)</Text>
                        <Text style={styles.valueNegative}>-$1,087.50</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.netRow}>
                        <Text style={styles.netLabel}>Net Profit Released</Text>
                        <Text style={styles.netValue}>$8,387.50</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.downloadButton} onPress={() => Alert.alert('Downloaded', 'Statement saved to device.')}>
                    <FileText color={COLORS.secondary} size={20} style={{ marginRight: 8 }} />
                    <Text style={styles.downloadText}>Download Statement</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }

    // handle actions
    const handleRequestFinance = () => {
        Alert.alert('Finance Requested', 'Request sent to GFI for Approval.');
        advanceStage(); // -> PAYMENT_UBC
    };

    const handleAuthorizeDelivery = () => {
        Alert.alert('Delivery Authorized', 'Invoice sent to User. Waiting for Payment.');
        advanceStage(); // -> PAYMENT_INGOT
    };

    // Screen 1: Dashboard & Credit Overview
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.welcomeText}>Welcome, Afeco</Text>
                    <View style={styles.badge}>
                        <Activity size={12} color={COLORS.secondary} style={{ marginRight: 4 }} />
                        <Text style={styles.badgeText}>Credit Facility Active</Text>
                    </View>
                </View>
            </View>

            <WalletHeader
                persona="Manufacturer"
                address="0xA1...9B22"
                balance="24,500 USDC"
                nftCount={isSettlement ? 1 : 0}
            />
            <TransactionFlowIndicator />

            {/* Hero Card */}
            <View style={styles.heroCard}>
                <View style={styles.heroRow}>
                    <View>
                        <Text style={styles.heroLabel}>Available Limit</Text>
                        <Text style={styles.heroValue}>$500,000</Text>
                    </View>
                    <View>
                        <Text style={styles.heroLabel}>Active Utilization</Text>
                        <Text style={[styles.heroValue, { color: COLORS.accent }]}>$36,250</Text>
                    </View>
                </View>
                <View style={styles.progressBar}>
                    <View style={{ width: '7%', height: '100%', backgroundColor: COLORS.accent, borderRadius: 2 }} />
                </View>
                <Text style={styles.progressLabel}>7.2% Utilized</Text>
            </View>

            {/* Action Cards */}
            {stage === 'FINANCE_REQUEST' && (
                <View style={styles.actionCard}>
                    <Text style={styles.actionTitle}>Action Required</Text>
                    <Text style={styles.actionDesc}>New Purchase Contract from Ivory Scrap</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Contract Value</Text>
                        <Text style={styles.value}>$36,250.00</Text>
                    </View>
                    <TouchableOpacity style={styles.primaryButton} onPress={handleRequestFinance}>
                        <Text style={styles.primaryBtnText}>Request Trade Finance</Text>
                    </TouchableOpacity>
                </View>
            )}

            {stage === 'CONTRACT_INGOT' && (
                <View style={styles.actionCard}>
                    <Text style={styles.actionTitle}>Action Required</Text>
                    <Text style={styles.actionDesc}>Ingot Purchase Order Received</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Order Value</Text>
                        <Text style={styles.value}>$45,000.00</Text>
                    </View>
                    <TouchableOpacity style={styles.primaryButton} onPress={handleAuthorizeDelivery}>
                        <Text style={styles.primaryBtnText}>Authorize Delivery & Invoice</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Active Operations Card (Monitoring) */}
            <Text style={styles.sectionTitle}>Active Operations</Text>
            <TouchableOpacity style={styles.operationCard} onPress={() => Alert.alert('Collateral Status', 'Values matched on-chain.')}>
                <View style={styles.opHeader}>
                    <Text style={styles.opTitle}>Batch #UBC-2026-01</Text>
                    <View style={styles.phaseBadge}>
                        <Text style={styles.phaseText}>{stage}</Text>
                    </View>
                </View>

                <Text style={styles.opDetail}>
                    {stage === 'CONTRACT_UBC' ? 'Waiting for Supplier Upload' :
                        stage === 'PAYMENT_UBC' ? 'Supplier Paid. Goods in Transit.' :
                            stage === 'TRANSFORMATION' ? 'Processing at Custodian' :
                                stage === 'PAYMENT_INGOT' ? 'Waiting for User Payment' :
                                    'Active Trade Cycle'}
                </Text>

                <View style={styles.opFooter}>
                    <Text style={styles.footerAction}>View Collateral Status</Text>
                    <ChevronRight size={16} color={COLORS.accent} />
                </View>
            </TouchableOpacity>
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
    header: {
        marginBottom: 20,
    },
    welcomeText: {
        fontFamily: FONTS.heading,
        fontSize: 24,
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2e7d32',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
        marginTop: 4,
    },
    badgeText: {
        color: COLORS.secondary,
        fontFamily: FONTS.bodyBold,
        fontSize: 10,
    },
    // Hero Card
    heroCard: {
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.radius,
        padding: 24,
        marginBottom: 24,
        ...SHADOWS.card,
    },
    heroRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    heroLabel: {
        color: '#a0a3b1',
        fontFamily: FONTS.body,
        fontSize: 12,
        marginBottom: 4,
    },
    heroValue: {
        color: COLORS.secondary,
        fontFamily: FONTS.heading,
        fontSize: 20,
        fontWeight: 'bold',
    },
    progressBar: {
        height: 6,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 3,
        marginBottom: 8,
    },
    progressLabel: {
        color: '#a0a3b1',
        fontFamily: FONTS.body,
        fontSize: 10,
        textAlign: 'right',
    },
    // Operations Card
    sectionTitle: {
        fontFamily: FONTS.heading,
        fontSize: 18,
        color: COLORS.primary,
        marginBottom: 12,
        fontWeight: 'bold',
    },
    operationCard: {
        backgroundColor: COLORS.secondary,
        borderRadius: SIZES.radius,
        padding: 16,
        ...SHADOWS.card,
    },
    opHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    opTitle: {
        fontFamily: FONTS.bodyBold,
        fontSize: 16,
        color: COLORS.primary,
    },
    phaseBadge: {
        backgroundColor: 'rgba(255, 107, 74, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    phaseText: {
        color: COLORS.accent,
        fontFamily: FONTS.bodyBold,
        fontSize: 12,
    },
    opDetail: {
        fontFamily: FONTS.body,
        color: COLORS.text,
        fontSize: 14,
        marginBottom: 16,
    },
    opFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    footerAction: {
        color: COLORS.accent,
        fontFamily: FONTS.bodyBold,
        fontSize: 14,
        marginRight: 4,
    },
    // Settlement
    settlementCard: {
        backgroundColor: COLORS.secondary,
        borderRadius: SIZES.radius,
        padding: 20,
        marginBottom: 20,
        ...SHADOWS.card,
    },
    settlementHeader: {
        fontFamily: FONTS.bodyBold,
        fontSize: 16,
        color: COLORS.primary,
        marginBottom: 12,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: 12,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    label: {
        fontFamily: FONTS.body,
        color: COLORS.text,
        fontSize: 14,
    },
    value: {
        fontFamily: FONTS.bodyBold,
        color: COLORS.primary,
        fontSize: 14,
    },
    valuePositive: {
        fontFamily: FONTS.bodyBold,
        color: COLORS.primary,
        fontSize: 14,
    },
    valueNegative: {
        fontFamily: FONTS.bodyBold,
        color: '#e53935',
        fontSize: 14,
    },
    netRow: {
        marginTop: 8,
        alignItems: 'center',
    },
    netLabel: {
        fontFamily: FONTS.body,
        color: COLORS.text,
        fontSize: 12,
        marginBottom: 4,
    },
    netValue: {
        fontFamily: FONTS.heading,
        color: COLORS.accent,
        fontSize: 24,
        fontWeight: 'bold',
    },
    downloadButton: {
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: SIZES.radius,
    },
    downloadText: {
        color: COLORS.secondary,
        fontFamily: FONTS.bodyBold,
        fontSize: 16,
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
});
