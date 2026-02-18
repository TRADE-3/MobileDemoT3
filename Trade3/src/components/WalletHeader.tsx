import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';
import { Wallet, Coins, Layers } from 'lucide-react-native';

interface WalletHeaderProps {
    persona: 'Manufacturer' | 'Supplier' | 'Custodian' | 'Investor';
    balance: string; // e.g., "500,000 USDC"
    nftCount?: number;
    address: string; // e.g., "0x71C...9A21"
}

export default function WalletHeader({ persona, balance, nftCount = 0, address }: WalletHeaderProps) {
    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                <View style={styles.addressBadge}>
                    <Wallet size={12} color={COLORS.secondary} style={{ marginRight: 4 }} />
                    <Text style={styles.addressText}>{address}</Text>
                </View>
                <Text style={styles.networkText}>Likwid Chain (Testnet)</Text>
            </View>

            <View style={styles.balanceRow}>
                <View style={styles.balanceContainer}>
                    <Text style={styles.label}>Balance</Text>
                    <View style={styles.valueRow}>
                        <Coins size={16} color={COLORS.accent} style={{ marginRight: 6 }} />
                        <Text style={styles.balanceValue}>{balance}</Text>
                    </View>
                </View>

                <View style={[styles.balanceContainer, { alignItems: 'flex-end' }]}>
                    <Text style={styles.label}>Assets</Text>
                    <View style={styles.valueRow}>
                        <Layers size={16} color={COLORS.text} style={{ marginRight: 6 }} />
                        <Text style={styles.assetValue}>{nftCount} NFTs</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.primary,
        padding: 16,
        borderRadius: SIZES.radius,
        marginBottom: 20,
        ...SHADOWS.card,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
        paddingBottom: 8,
    },
    addressBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    addressText: {
        color: COLORS.secondary,
        fontFamily: FONTS.body,
        fontSize: 12,
    },
    networkText: {
        color: COLORS.accent,
        fontFamily: FONTS.bodyBold,
        fontSize: 10,
    },
    balanceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    balanceContainer: {
        flex: 1,
    },
    label: {
        color: '#8b8d98',
        fontFamily: FONTS.body,
        fontSize: 12,
        marginBottom: 4,
    },
    valueRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    balanceValue: {
        color: COLORS.secondary,
        fontFamily: FONTS.heading,
        fontSize: 18,
        fontWeight: 'bold',
    },
    assetValue: {
        color: COLORS.secondary,
        fontFamily: FONTS.bodyBold,
        fontSize: 16,
    }
});
