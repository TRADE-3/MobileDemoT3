import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { COLORS, FONTS, SIZES, SHADOWS } from '../../constants/theme';
import { Upload, FileText, ChevronDown } from 'lucide-react-native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'NewRequest'>;

export default function NewRequest() {
    const navigation = useNavigation<NavigationProp>();
    const [selectedBuyer, setSelectedBuyer] = useState<string | null>(null);
    const [documentsUploaded, setDocumentsUploaded] = useState(false);

    const handleUpload = () => {
        // Mock upload delay
        setTimeout(() => {
            setDocumentsUploaded(true);
            Alert.alert('Documents Verified', 'NFT Wrapping complete. Contract is uniquely active.');
        }, 500);
    };

    const handleSubmit = () => {
        if (selectedBuyer && documentsUploaded) {
            navigation.replace('SellerSuccess');
        } else {
            Alert.alert('Incomplete', 'Please select a buyer and upload documents.');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Select Buyer</Text>
            <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setSelectedBuyer('Afeco')}
            >
                <Text style={[styles.dropdownText, !selectedBuyer && { color: COLORS.text }]}>
                    {selectedBuyer === 'Afeco' ? 'Afeco (Kohlapur)' : selectedBuyer === 'AAR' ? 'AAR Inc (NY)' : 'Select Buyer'}
                </Text>
                <ChevronDown color={COLORS.text} size={20} />
            </TouchableOpacity>

            {/* Buyer Mock Selection Options */}
            <View style={{ flexDirection: 'row', marginBottom: 24, gap: 10 }}>
                {['Afeco', 'AAR'].map((buyer) => (
                    <TouchableOpacity
                        key={buyer}
                        onPress={() => setSelectedBuyer(buyer)}
                        style={[
                            styles.buyerChip,
                            selectedBuyer === buyer && { backgroundColor: COLORS.primary, borderColor: COLORS.primary }
                        ]}
                    >
                        <Text style={[
                            styles.buyerChipText,
                            selectedBuyer === buyer && { color: COLORS.secondary }
                        ]}>{buyer}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.label}>Document Upload</Text>
            <TouchableOpacity style={styles.uploadArea} onPress={handleUpload}>
                {documentsUploaded ? (
                    <View style={{ alignItems: 'center' }}>
                        <FileText color={COLORS.accent} size={48} />
                        <Text style={styles.uploadText}>SPA (Alu Scrap) Uploaded</Text>
                        <View style={styles.nftBadge}>
                            <Text style={styles.nftText}>Digital Twin Created</Text>
                        </View>
                    </View>
                ) : (
                    <View style={{ alignItems: 'center' }}>
                        <Upload color={COLORS.text} size={48} />
                        <Text style={styles.uploadText}>Upload SPA & Invoice (UBC/Ingot)</Text>
                    </View>
                )}
            </TouchableOpacity>

            {documentsUploaded && (
                <View style={styles.termsContainer}>
                    <Text style={styles.sectionTitle}>Financing Terms</Text>
                    <View style={styles.termRow}>
                        <Text style={styles.termLabel}>Loan Amount (90% LTV)</Text>
                        <Text style={styles.termValue}>$45,000</Text>
                    </View>
                    <View style={styles.termRow}>
                        <Text style={styles.termLabel}>Interest Rate</Text>
                        <Text style={styles.termValue}>10% APR</Text>
                    </View>
                    <View style={styles.termRow}>
                        <Text style={styles.termLabel}>Origination Fee</Text>
                        <Text style={styles.termValue}>25 bps</Text>
                    </View>
                </View>
            )}

            <TouchableOpacity
                style={[styles.button, (!selectedBuyer || !documentsUploaded) && styles.buttonDisabled]}
                onPress={handleSubmit}
                disabled={!selectedBuyer || !documentsUploaded}
            >
                <Text style={styles.buttonText}>Mint RWA Token & Request Loan</Text>
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
    label: {
        fontFamily: FONTS.bodyBold,
        fontSize: 16,
        color: COLORS.primary,
        marginBottom: 8,
    },
    dropdown: {
        backgroundColor: COLORS.secondary,
        padding: 16,
        borderRadius: SIZES.radius,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    dropdownText: {
        fontFamily: FONTS.body,
        fontSize: 14,
        color: '#000',
    },
    buyerChip: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: COLORS.secondary,
    },
    buyerChipText: {
        fontFamily: FONTS.body,
        color: COLORS.text,
    },
    uploadArea: {
        borderWidth: 2,
        borderColor: COLORS.border,
        borderStyle: 'dashed',
        borderRadius: SIZES.radius,
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        marginBottom: 24,
    },
    uploadText: {
        fontFamily: FONTS.body,
        color: COLORS.text,
        marginTop: 12,
    },
    nftBadge: {
        marginTop: 8,
        backgroundColor: '#e3f2fd',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#90caf9',
    },
    nftText: {
        fontSize: 10,
        color: '#1976d2',
        fontFamily: FONTS.bodyBold,
    },
    termsContainer: {
        backgroundColor: COLORS.secondary,
        padding: 24,
        borderRadius: SIZES.radius,
        marginBottom: 24,
        ...SHADOWS.card,
    },
    sectionTitle: {
        fontFamily: FONTS.heading,
        fontSize: 18,
        color: COLORS.primary,
        marginBottom: 16,
        fontWeight: 'bold',
    },
    termRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    termLabel: {
        fontFamily: FONTS.body,
        color: COLORS.text,
    },
    termValue: {
        fontFamily: FONTS.bodyBold,
        color: COLORS.primary,
        fontSize: 16,
    },
    button: {
        backgroundColor: COLORS.accent,
        padding: 18,
        borderRadius: SIZES.radius,
        alignItems: 'center',
        marginBottom: 40,
        ...SHADOWS.card,
    },
    buttonDisabled: {
        backgroundColor: '#ffccbc',
        elevation: 0,
    },
    buttonText: {
        color: COLORS.secondary,
        fontFamily: FONTS.bodyBold,
        fontSize: 16,
    },
});
