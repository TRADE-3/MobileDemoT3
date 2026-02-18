import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { COLORS, FONTS, SIZES, SHADOWS } from '../../constants/theme';
import { Upload, CheckCircle, Package, Truck, Clock } from 'lucide-react-native';
import { useDemo } from '../../context/DemoContext';
import TransactionFlowIndicator from '../../components/TransactionFlowIndicator';
import WalletHeader from '../../components/WalletHeader';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SellerDashboard'>;

export default function SupplierDashboard() {
    const navigation = useNavigation<NavigationProp>();
    const { stage, advanceStage } = useDemo();
    const [uploading, setUploading] = useState(false);

    const handleUploadAndShip = () => {
        setUploading(true);
        setTimeout(() => {
            setUploading(false);
            Alert.alert('Documents Verified', 'Bill of Lading, COW, and COA verified on-chain.');
            advanceStage(); // Move to PAYMENT
        }, 2000);
    };

    const isShipment = stage === 'CONTRACT_UBC';
    const isPaymentOrLater = ['PAYMENT_UBC', 'TRANSFORMATION', 'CONTRACT_INGOT', 'PAYMENT_INGOT', 'SETTLEMENT_NET'].includes(stage);

    if (uploading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={COLORS.accent} />
                <Text style={{ marginTop: 20, fontFamily: FONTS.bodyBold, color: COLORS.primary }}>
                    Minting Shipment NFT...
                </Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.welcomeText}>Supplier: Ivory Scrap</Text>
                <View style={styles.badge}>
                    <Package size={14} color={COLORS.secondary} />
                </View>
            </View>

            <WalletHeader
                persona="Supplier"
                address="0x8B...2E19"
                balance={isPaymentOrLater ? "35,525 USDC" : "0 USDC"}
                nftCount={isShipment ? 0 : 1}
            />
            <TransactionFlowIndicator />

            {/* Stage 1: Shipment & Upload */}
            {isShipment && (
                <View>
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardTitle}>New Shipment: UBC to Afeco</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Contract Details</Text>
                            <Text style={styles.value}>25MT UBC @ $1,450/MT</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Total Value</Text>
                            <Text style={styles.highlightValue}>$36,250</Text>
                        </View>

                        <Text style={styles.sectionTitle}>Required Documents</Text>
                        {['Bill of Lading (CIF Mumbai)', 'Certificate of Weight (COW)', 'Certificate of Analysis (COA)'].map((doc, index) => (
                            <View key={index} style={styles.uploadRow}>
                                <Text style={styles.docName}>{doc}</Text>
                                <Upload size={16} color={COLORS.accent} />
                            </View>
                        ))}

                        <TouchableOpacity style={styles.actionButton} onPress={handleUploadAndShip}>
                            <Text style={styles.actionText}>Mint Shipment NFT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* Stage 2 (Finance Req): Waiting */}
            {stage === 'FINANCE_REQUEST' && (
                <View style={styles.waitingCard}>
                    <Clock size={40} color={COLORS.text} style={{ marginBottom: 16 }} />
                    <Text style={styles.waitingText}>Waiting for Finance Approval...</Text>
                </View>
            )}

            {/* Stage 3+: Payment Confirmation */}
            {isPaymentOrLater && (
                <View style={styles.card}>
                    <View style={styles.successHeader}>
                        <CheckCircle size={24} color={COLORS.accent} style={{ marginRight: 8 }} />
                        <Text style={styles.successTitle}>Payment Received from GFI</Text>
                    </View>

                    <View style={styles.divider} />

                    <Text style={styles.subHeader}>Finance Summary</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Contract Value</Text>
                        <Text style={styles.value}>$36,250.00</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Implied Finance Cost (1m)</Text>
                        <Text style={[styles.value, { color: '#e53935' }]}>-$725.00</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.row}>
                        <Text style={styles.totalLabel}>Net Payment</Text>
                        <Text style={styles.totalValue}>$35,525.00</Text>
                    </View>

                    <View style={styles.timeline}>
                        <View style={styles.timelineItem}>
                            <Truck size={14} color={COLORS.primary} style={{ marginRight: 8 }} />
                            <Text style={styles.timelineText}>Goods in Transit to Mumbai</Text>
                        </View>
                        <View style={[styles.timelineLine, { height: 12 }]} />
                        <View style={styles.timelineItem}>
                            <Package size={14} color={COLORS.text} style={{ marginRight: 8 }} />
                            <Text style={[styles.timelineText, { color: COLORS.text }]}>Custodian Receipt Pending</Text>
                        </View>
                    </View>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: SIZES.padding,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    welcomeText: {
        fontFamily: FONTS.heading,
        fontSize: 20,
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    badge: {
        backgroundColor: COLORS.primary,
        padding: 8,
        borderRadius: 8,
    },
    waitingCard: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        backgroundColor: COLORS.secondary,
        borderRadius: SIZES.radius,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderStyle: 'dashed',
    },
    waitingText: {
        fontFamily: FONTS.body,
        color: COLORS.text,
    },
    card: {
        backgroundColor: COLORS.secondary,
        borderRadius: SIZES.radius,
        padding: 20,
        marginBottom: 20,
        ...SHADOWS.card,
    },
    cardHeader: {
        marginBottom: 16,
    },
    cardTitle: {
        fontFamily: FONTS.heading,
        fontSize: 18,
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
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
    highlightValue: {
        fontFamily: FONTS.heading,
        color: COLORS.primary,
        fontSize: 18,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontFamily: FONTS.bodyBold,
        fontSize: 14,
        color: COLORS.primary,
        marginTop: 12,
        marginBottom: 12,
    },
    uploadRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    docName: {
        fontFamily: FONTS.body,
        color: COLORS.primary,
        fontSize: 14,
    },
    actionButton: {
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.radius,
        padding: 16,
        alignItems: 'center',
        marginTop: 20,
    },
    actionText: {
        color: COLORS.secondary,
        fontFamily: FONTS.bodyBold,
        fontSize: 16,
    },
    // Payment Success Styles
    successHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    successTitle: {
        fontFamily: FONTS.heading,
        color: COLORS.primary,
        fontSize: 18,
        fontWeight: 'bold',
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: 12,
    },
    subHeader: {
        fontFamily: FONTS.bodyBold,
        color: COLORS.primary,
        marginBottom: 12,
    },
    totalLabel: {
        fontFamily: FONTS.bodyBold,
        color: COLORS.primary,
        fontSize: 16,
    },
    totalValue: {
        fontFamily: FONTS.heading,
        color: COLORS.accent,
        fontSize: 20,
        fontWeight: 'bold',
    },
    timeline: {
        marginTop: 20,
        padding: 12,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
    },
    timelineItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timelineLine: {
        width: 1,
        backgroundColor: COLORS.border,
        marginLeft: 7,
        marginVertical: 4,
    },
    timelineText: {
        fontFamily: FONTS.bodyBold,
        color: COLORS.primary,
        fontSize: 12,
    },
});
