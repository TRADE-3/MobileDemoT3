import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../../constants/theme';
import { Users, Shield, Wallet, ArrowRight } from 'lucide-react-native';

export default function FundEscrow() {
    const navigation = useNavigation();
    const [funding, setFunding] = useState(false);

    const handleFund = () => {
        setFunding(true);
        setTimeout(() => {
            setFunding(false);
            Alert.alert('Escrow Funded', 'Funds locked. 5% APY accruing.', [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);
        }, 1500);
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.headerTitle}>Fund Smart Escrow</Text>
            <Text style={styles.description}>
                Deposit funds into the multi-sig smart contract to secure the trade.
            </Text>

            {/* Multi-party Wallet Diagram */}
            <View style={styles.diagramContainer}>
                <View style={styles.diagramHeader}>
                    <Shield color={COLORS.primary} size={24} />
                    <Text style={styles.diagramTitle}>Smart Contract Escrow</Text>
                </View>

                <View style={styles.nodeRow}>
                    <View style={styles.node}>
                        <View style={[styles.iconCircle, { backgroundColor: '#e3f2fd' }]}>
                            <Users color="#1976d2" size={20} />
                        </View>
                        <Text style={styles.nodeText}>Buyer (You)</Text>
                    </View>

                    <View style={styles.connector} />

                    <View style={styles.node}>
                        <View style={[styles.iconCircle, { backgroundColor: '#fff3e0' }]}>
                            <Users color="#f57c00" size={20} />
                        </View>
                        <Text style={styles.nodeText}>Seller</Text>
                    </View>
                </View>

                <View style={styles.centerNode}>
                    <View style={styles.connectorVertical} />
                    <View style={styles.node}>
                        <View style={[styles.iconCircle, { backgroundColor: '#e8f5e9' }]}>
                            <Shield color="#2e7d32" size={20} />
                        </View>
                        <Text style={styles.nodeText}>Consensus Node</Text>
                    </View>
                </View>
            </View>

            <View style={styles.infoCard}>
                <Text style={styles.infoText}>
                    Funds will be locked in Smart Escrow. Buyer accrues <Text style={{ color: COLORS.accent, fontWeight: 'bold' }}>~5% APY</Text> while funds are locked.
                </Text>
            </View>

            <TouchableOpacity
                style={[styles.button, funding && styles.buttonDisabled]}
                onPress={handleFund}
                disabled={funding}
            >
                <Wallet color={COLORS.secondary} size={20} style={{ marginRight: 10 }} />
                <Text style={styles.buttonText}>{funding ? 'Processing Deposit...' : 'Deposit $150,000 USDC'}</Text>
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
        fontSize: 24,
        color: COLORS.primary,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    description: {
        fontFamily: FONTS.body,
        color: COLORS.text,
        marginBottom: 32,
    },
    diagramContainer: {
        backgroundColor: COLORS.secondary,
        borderRadius: SIZES.radius,
        padding: 24,
        alignItems: 'center',
        marginBottom: 24,
        ...SHADOWS.card,
    },
    diagramHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        gap: 8,
    },
    diagramTitle: {
        fontFamily: FONTS.bodyBold,
        color: COLORS.primary,
        fontSize: 16,
    },
    nodeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    node: {
        alignItems: 'center',
    },
    iconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    nodeText: {
        fontFamily: FONTS.body,
        fontSize: 12,
        color: COLORS.text,
    },
    connector: {
        flex: 1,
        height: 2,
        backgroundColor: COLORS.border,
        marginHorizontal: 10,
    },
    centerNode: {
        alignItems: 'center',
        marginTop: -10, // Pull up to overlap connector if needed, or just standard flow
    },
    connectorVertical: {
        width: 2,
        height: 30,
        backgroundColor: COLORS.border,
        marginBottom: 10,
    },
    infoCard: {
        backgroundColor: '#e0f7fa',
        padding: 16,
        borderRadius: 8,
        marginBottom: 32,
    },
    infoText: {
        color: '#006064',
        fontFamily: FONTS.body,
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'center',
    },
    button: {
        backgroundColor: COLORS.primary,
        padding: 18,
        borderRadius: SIZES.radius,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        ...SHADOWS.card,
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: COLORS.secondary,
        fontFamily: FONTS.bodyBold,
        fontSize: 16,
    },
});
