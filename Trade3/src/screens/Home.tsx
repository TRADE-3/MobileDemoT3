import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';
import { Briefcase, TrendingUp, ShoppingCart, ShieldCheck, AlertCircle } from 'lucide-react-native';
import { useDemo, DemoStage } from '../context/DemoContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function Home() {
    const navigation = useNavigation<NavigationProp>();
    const { stage, advanceStage, resetDemo, getStageDescription } = useDemo();

    const getActivePersonaIndex = (currentStage: DemoStage) => {
        switch (currentStage) {
            case 'CONTRACT_UBC': return 1; // Supplier (Uploads Docs)
            case 'FINANCE_REQUEST': return 0; // Manufacturer (Requests Finance)
            case 'INSPECTION_ORIGIN': return 2; // Custodian (Surveyor Verification)
            case 'PAYMENT_UBC': return 3; // Investor (Approves & Pays)
            case 'TRANSFORMATION': return 2; // Custodian (Transformation)
            case 'CONTRACT_INGOT': return 0; // Manufacturer (Authorizes Delivery)
            case 'PAYMENT_INGOT': return 3; // Investor (Releases Funds)
            case 'SETTLEMENT_NET': return 0; // Manufacturer (Views Settlement)
            default: return -1;
        }
    };

    const activeIndex = getActivePersonaIndex(stage);

    const personas = [
        {
            title: 'Manufacturer (Afeco)',
            description: 'Borrower | Aluminum Buyer',
            route: 'EscrowList' as const,
            icon: <ShoppingCart color={COLORS.secondary} size={24} />,
        },
        {
            title: 'Supplier (Ivory)',
            description: 'Seller | Raw Material (UBC)',
            route: 'SellerDashboard' as const,
            icon: <Briefcase color={COLORS.secondary} size={24} />,
        },
        {
            title: 'Custodian (Logistics)',
            description: 'Inspector | SGS / Control Union',
            route: 'InspectionList' as const,
            icon: <ShieldCheck color={COLORS.secondary} size={24} />,
        },
        {
            title: 'Investor (GFI)',
            description: 'Lender | Circular Economy Fund',
            route: 'YieldMarketplace' as const,
            icon: <TrendingUp color={COLORS.secondary} size={24} />,
        },
    ];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../../assets/logo.png')}
                    style={styles.logoImage}
                    resizeMode="contain"
                />
                <Text style={styles.subtitle}>Blockchain Trade Finance Demo</Text>
            </View>

            {/* Scenario Controller */}
            <View style={styles.scenarioCard}>
                <Text style={styles.scenarioTitle}>End-to-End Demo Controller</Text>

                <View style={styles.stageContainer}>
                    <Text style={styles.stageLabel}>Current Stage:</Text>
                    <Text style={styles.stageValue}>{getStageDescription()}</Text>
                </View>

                <View style={styles.controls}>
                    <TouchableOpacity style={styles.controlBtn} onPress={advanceStage}>
                        <Text style={styles.controlBtnText}>Next Stage ➔</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.controlBtn, { backgroundColor: '#e53935' }]} onPress={resetDemo}>
                        <Text style={styles.controlBtnText}>Reset</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Text style={styles.sectionTitle}>Select Your Persona</Text>

            <View style={styles.grid}>
                {personas.map((persona, index) => {
                    const isActionRequired = index === activeIndex;
                    return (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.card,
                                isActionRequired && styles.activeCard
                            ]}
                            onPress={() => navigation.navigate(persona.route)}
                        >
                            <View style={[styles.iconContainer, { backgroundColor: isActionRequired ? COLORS.accent : COLORS.primary }]}>
                                {persona.icon}
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.cardTitle}>{persona.title}</Text>
                                <Text style={styles.cardDesc}>{persona.description}</Text>
                            </View>

                            {isActionRequired && (
                                <View style={styles.actionBadge}>
                                    <AlertCircle size={14} color={COLORS.secondary} style={{ marginRight: 4 }} />
                                    <Text style={styles.actionText}>Action</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    );
                })}
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
    header: {
        alignItems: 'center',
        marginVertical: 40,
    },
    logoImage: {
        width: 200,
        height: 60,
        marginBottom: 8,
    },
    subtitle: {
        fontFamily: FONTS.body,
        fontSize: 16,
        color: COLORS.text,
    },
    sectionTitle: {
        fontFamily: FONTS.heading,
        fontSize: 20,
        color: COLORS.primary,
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    grid: {
        gap: 16,
    },
    card: {
        backgroundColor: COLORS.secondary,
        borderRadius: SIZES.radius,
        padding: 24,
        ...SHADOWS.card,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'transparent',
    },
    activeCard: {
        borderColor: COLORS.accent,
        backgroundColor: '#fff5f2', // Very light coral tint
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    cardTitle: {
        fontFamily: FONTS.heading,
        fontSize: 18,
        color: COLORS.primary,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    cardDesc: {
        fontFamily: FONTS.body,
        fontSize: 14,
        color: COLORS.text,
        flexShrink: 1,
    },
    actionBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.accent,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
        marginLeft: 8,
    },
    actionText: {
        color: COLORS.secondary,
        fontFamily: FONTS.bodyBold,
        fontSize: 12,
    },
    scenarioCard: {
        // Let's use a very light navy tint.
        backgroundColor: 'rgba(26, 31, 58, 0.05)',
        padding: 16,
        borderRadius: 12,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    scenarioTitle: {
        fontFamily: FONTS.heading,
        fontSize: 16,
        color: COLORS.primary,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    stageContainer: {
        marginBottom: 16,
    },
    stageLabel: {
        fontFamily: FONTS.body,
        fontSize: 12,
        color: COLORS.text,
        textTransform: 'uppercase',
    },
    stageValue: {
        fontFamily: FONTS.heading,
        fontSize: 16,
        color: COLORS.primary,
        fontWeight: 'bold',
        marginTop: 4,
    },
    controls: {
        flexDirection: 'row',
        gap: 12,
    },
    controlBtn: {
        backgroundColor: COLORS.primary,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        flex: 1,
        alignItems: 'center',
    },
    controlBtnText: {
        color: COLORS.secondary,
        fontFamily: FONTS.heading,
        fontWeight: 'bold',
    },
});
