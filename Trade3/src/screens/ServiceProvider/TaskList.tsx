import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Switch, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { COLORS, FONTS, SIZES, SHADOWS } from '../../constants/theme';
import { ClipboardCheck, MapPin, CheckSquare, ArrowRight, RefreshCw } from 'lucide-react-native';
import { useDemo } from '../../context/DemoContext';
import TransactionFlowIndicator from '../../components/TransactionFlowIndicator';
import WalletHeader from '../../components/WalletHeader';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'InspectionList'>;

export default function SGSDashboard() {
    const navigation = useNavigation<NavigationProp>();
    const { stage, advanceStage } = useDemo();
    const [auditPassed, setAuditPassed] = useState(true);

    const handleConfirmReceipt = () => {
        Alert.alert('Receipt Confirmed', '25MT UBC verified at Mumbai Bonded Warehouse.');
        // In this flow, we stay in TRANSFORMATION until the transformation is done?
        // Or we just toggle local state. For demo simplicity, we assume this is the first step of TRANSFORMATION.
        // We won't advance stage here because we need to do the transformation next?
        // Let's assume this button just visualizes verification.
    };

    const handleUpdateCMA = () => {
        Alert.alert('CMA Updated', 'Collateral converted to Ingots. Risk Grade: A.');
        advanceStage(); // -> CONTRACT_INGOT
    };

    const isPending = ['CONTRACT_UBC', 'FINANCE_REQUEST'].includes(stage);
    const isInbound = stage === 'PAYMENT_UBC';
    const isTransformation = stage === 'TRANSFORMATION';
    const isRelease = ['CONTRACT_INGOT', 'PAYMENT_INGOT'].includes(stage);
    const isCompleted = stage === 'SETTLEMENT_NET';

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Custodian: Logistics & Inspection</Text>
            <WalletHeader
                persona="Custodian"
                address="0xSS...1122"
                balance="0.45 ETH"
                nftCount={isCompleted ? 0 : (isTransformation ? 1 : 0)}
            />
            <TransactionFlowIndicator />

            {/* Stage 1-2: Pending */}
            {isPending && (
                <View style={styles.card}>
                    <View style={styles.headerRow}>
                        <Text style={styles.jobId}>Inbound Shipment</Text>
                        <View style={[styles.statusBadge, styles.statusPending]}>
                            <Text style={styles.textPending}>Waiting for Supplier</Text>
                        </View>
                    </View>
                    <Text style={styles.typeText}>UBC - Ivory to Afeco</Text>
                    <View style={styles.locationRow}>
                        <MapPin size={16} color={COLORS.text} />
                        <Text style={styles.locationText}>Not Dispatched</Text>
                    </View>
                </View>
            )}

            {/* Stage 3: Origin Inspection (Surveyor) */}
            {(stage === 'INSPECTION_ORIGIN' || isInbound || isTransformation || isRelease || isCompleted) && (
                <View style={[styles.card, stage === 'INSPECTION_ORIGIN' ? { borderColor: COLORS.accent, borderWidth: 1 } : { opacity: 0.7 }]}>
                    <View style={styles.headerRow}>
                        <Text style={styles.jobId}>Task #1: Origin Survey</Text>
                        <View style={[styles.statusBadge, stage === 'INSPECTION_ORIGIN' ? styles.statusAction : styles.statusDone]}>
                            <Text style={[styles.statusText, stage === 'INSPECTION_ORIGIN' ? styles.textAction : styles.textDone]}>
                                {stage === 'INSPECTION_ORIGIN' ? 'Action Required' : 'Verified'}
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.typeText}>Verify Goods at Origin (NY)</Text>
                    <View style={styles.locationRow}>
                        <MapPin size={16} color={COLORS.text} />
                        <Text style={styles.locationText}>Port of New York</Text>
                    </View>

                    {stage === 'INSPECTION_ORIGIN' && (
                        <View>
                            <View style={styles.checklistRow}>
                                <Text style={styles.label}>Quality Check (UBC Grade A)</Text>
                                <Switch
                                    value={auditPassed}
                                    onValueChange={setAuditPassed}
                                    trackColor={{ false: "#767577", true: COLORS.accent }}
                                />
                            </View>
                            <View style={styles.checklistRow}>
                                <Text style={styles.label}>Quantity Check (25MT)</Text>
                                <Switch
                                    value={true}
                                    disabled
                                    trackColor={{ false: "#767577", true: COLORS.accent }}
                                />
                            </View>
                            <TouchableOpacity style={styles.actionButton} onPress={() => {
                                Alert.alert('Surveyor Report Verified', 'Documents sent to GFI for Payment Approval.');
                                advanceStage(); // -> PAYMENT_UBC
                            }}>
                                <ClipboardCheck size={16} color={COLORS.secondary} style={{ marginRight: 6 }} />
                                <Text style={styles.actionBtnText}>Submit Inspection Report</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            )}

            {/* Stage 4: In Transit (Visible after Payment) */}
            {isInbound && (
                <View style={styles.card}>
                    <View style={styles.headerRow}>
                        <Text style={styles.jobId}>Inbound Shipment</Text>
                        <View style={[styles.statusBadge, styles.statusAction]}>
                            <Text style={styles.textAction}>Approved & Paid</Text>
                        </View>
                    </View>
                    <Text style={styles.typeText}>UBC - Ivory to Afeco</Text>
                    <View style={styles.locationRow}>
                        <MapPin size={16} color={COLORS.text} />
                        <Text style={styles.locationText}>In Transit (NY -> Mumbai)</Text>
                    </View>
                    <TouchableOpacity style={[styles.actionButton, { marginTop: 12, backgroundColor: COLORS.secondary, borderWidth: 1, borderColor: COLORS.border }]} onPress={advanceStage}>
                        <Text style={[styles.actionBtnText, { color: COLORS.primary }]}>[DEV] Simulate Arrival</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Stage 4: Transformation (Inspection + Minting) */}
            {(isTransformation || isRelease || isCompleted) && (
                <ScrollView>
                    {/* Task 1: Receipt */}
                    <View style={[styles.card, isTransformation ? {} : { opacity: 0.7 }]}>
                        <View style={styles.headerRow}>
                            <Text style={styles.jobId}>Task #1: Mint Warehouse Receipt</Text>
                            <View style={[styles.statusBadge, isTransformation ? styles.statusAction : styles.statusDone]}>
                                <Text style={[styles.statusText, isTransformation ? styles.textAction : styles.textDone]}>
                                    {isTransformation ? 'Active' : 'Completed'}
                                </Text>
                            </View>
                        </View>
                        <Text style={styles.typeText}>Incoming Shipment (25MT UBC)</Text>

                        {isTransformation && (
                            <View>
                                <View style={styles.checklistRow}>
                                    <Text style={styles.label}>Goods Match Invoice?</Text>
                                    <Switch
                                        value={auditPassed}
                                        onValueChange={setAuditPassed}
                                        trackColor={{ false: "#767577", true: COLORS.accent }}
                                    />
                                </View>
                                <TouchableOpacity style={styles.actionButton} onPress={handleConfirmReceipt}>
                                    <ClipboardCheck size={16} color={COLORS.secondary} style={{ marginRight: 6 }} />
                                    <Text style={styles.actionBtnText}>Mint WR NFT</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                    {/* Task 2: Transformation */}
                    <View style={[styles.card, { borderColor: COLORS.accent, borderWidth: isTransformation ? 1 : 0 }]}>
                        <View style={styles.headerRow}>
                            <Text style={styles.jobId}>Task #2: Transformation Event</Text>
                            <View style={[styles.statusBadge, isTransformation ? styles.statusAction : styles.statusDone]}>
                                <Text style={[styles.statusText, isTransformation ? styles.textAction : styles.textDone]}>
                                    {isTransformation ? 'Action Required' : 'Completed'}
                                </Text>
                            </View>
                        </View>
                        <Text style={styles.typeText}>Burn UBC Token {'->'} Mint Ingot Token</Text>

                        <View style={styles.magicContainer}>
                            <View style={styles.tokenBox}>
                                <Text style={styles.tokenText}>UBC Token</Text>
                                <Text style={styles.burnText}>🔥 Burned</Text>
                            </View>
                            <RefreshCw size={24} color={COLORS.accent} />
                            <View style={[styles.tokenBox, { backgroundColor: '#e8f5e9', borderColor: '#2e7d32' }]}>
                                <Text style={[styles.tokenText, { color: '#2e7d32' }]}>Ingot Token</Text>
                                <Text style={styles.mintText}>✨ Minted</Text>
                            </View>
                        </View>

                        {isTransformation && (
                            <TouchableOpacity style={styles.actionButton} onPress={handleUpdateCMA}>
                                <RefreshCw size={16} color={COLORS.secondary} style={{ marginRight: 6 }} />
                                <Text style={styles.actionBtnText}>Execute Token Transformation</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Task 3: Release */}
                    {(isRelease || isCompleted) && (
                        <View style={styles.card}>
                            <View style={styles.headerRow}>
                                <Text style={styles.jobId}>Task #3: Release Order</Text>
                                <View style={[styles.statusBadge, isCompleted ? styles.statusDone : styles.statusPending]}>
                                    <Text style={[styles.statusText, isCompleted ? styles.textDone : styles.textPending]}>
                                        {isCompleted ? 'Delivered' : 'Pending Payment'}
                                    </Text>
                                </View>
                            </View>
                            <Text style={styles.typeText}>Deliver Ingots to End User</Text>
                            <View style={styles.locationRow}>
                                <MapPin size={16} color={COLORS.text} />
                                <Text style={styles.locationText}>
                                    {isCompleted ? 'Delivered to User Facility' : 'Holding at Afeco Warehouse'}
                                </Text>
                            </View>
                        </View>
                    )}
                </ScrollView>
            )}
        </View>
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
    card: {
        backgroundColor: COLORS.secondary,
        borderRadius: SIZES.radius,
        padding: 16,
        marginBottom: 16,
        ...SHADOWS.card,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    jobId: {
        fontFamily: FONTS.bodyBold,
        fontSize: 16,
        color: COLORS.primary,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    statusPending: { backgroundColor: '#eeeeee' },
    statusAction: { backgroundColor: '#fff3e0' },
    statusDone: { backgroundColor: '#e8f5e9' },
    statusText: { fontFamily: FONTS.bodyBold, fontSize: 12 },
    textPending: { color: '#9e9e9e' },
    textAction: { color: '#e65100' },
    textDone: { color: '#2e7d32' },
    typeText: {
        fontFamily: FONTS.heading,
        fontSize: 18,
        color: COLORS.primary,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 12,
    },
    locationText: {
        fontFamily: FONTS.body,
        fontSize: 14,
        color: COLORS.text,
    },
    checklistRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    label: {
        fontFamily: FONTS.bodyBold,
        fontSize: 14,
        color: COLORS.primary,
    },
    actionButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
    },
    actionBtnText: {
        color: COLORS.secondary,
        fontFamily: FONTS.bodyBold,
        fontSize: 14,
    },
    magicContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 16,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        marginBottom: 12,
    },
    tokenBox: {
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        minWidth: 80,
    },
    tokenText: {
        fontFamily: FONTS.bodyBold,
        fontSize: 12,
        color: COLORS.primary,
        marginBottom: 4,
    },
    burnText: { fontSize: 10, color: '#e53935' },
    mintText: { fontSize: 10, color: '#2e7d32' },
    checklistContainer: {
        marginBottom: 12,
    },
    checkItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 6,
    },
    checkText: {
        fontFamily: FONTS.body,
        fontSize: 14,
        color: COLORS.text,
    },
});
