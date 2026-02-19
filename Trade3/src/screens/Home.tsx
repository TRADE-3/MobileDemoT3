import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';
import { Factory, Truck, Briefcase, Frame, RotateCcw, Play, TrendingUp, ShoppingCart, ShieldCheck, AlertCircle } from 'lucide-react-native';
import TransactionFlowIndicator from '../components/TransactionFlowIndicator';
import TradeExplainer from '../components/TradeExplainer';
import { useDemo, DemoStage } from '../context/DemoContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

// Persona Card Component
const PersonaCard = ({ name, role, Icon, isActive, isActionRequired, onPress }: any) => (
    <TouchableOpacity
        style={[styles.card, isActive && styles.activeCard]}
        onPress={onPress}
    >
        <View style={[styles.iconContainer, isActive && { backgroundColor: COLORS.accent }]}>
            {/* Clone icon with color adjustment if active */}
            {React.cloneElement(Icon, { color: isActive ? COLORS.secondary : COLORS.primary })}
        </View>
        <Text style={styles.role}>{role}</Text>
        <Text style={styles.name}>{name}</Text>

        {isActionRequired && (
            <View style={styles.badge}>
                <Text style={styles.badgeText}>Action Required</Text>
            </View>
        )}
    </TouchableOpacity>
);

export default function Home() {
    const navigation = useNavigation<NavigationProp>();
    const { stage, resetDemo, getStageDescription, isAutoRun, toggleAutoRun } = useDemo();

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

    const activePersonaIndex = getActivePersonaIndex(stage);

    const PERSONAS = [
        {
            name: 'Manufacturer (Afeco)',
            role: 'Buyer',
            screen: 'EscrowList',
            icon: <ShoppingCart size={24} color={COLORS.primary} />,
        },
        {
            name: 'Supplier (Ivory)',
            role: 'Seller',
            screen: 'SellerDashboard',
            icon: <Briefcase size={24} color={COLORS.primary} />,
        },
        {
            name: 'Custodian (SGS)',
            role: 'Inspector',
            screen: 'InspectionList',
            icon: <ShieldCheck size={24} color={COLORS.primary} />,
        },
        {
            name: 'Lender (Xtraa)',
            role: 'Financier',
            screen: 'YieldMarketplace',
            icon: <TrendingUp size={24} color={COLORS.primary} />,
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerRow}>
                        <Image
                            source={require('../../assets/logo.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <View style={styles.headerControls}>
                            <TouchableOpacity
                                style={[styles.controlButton, isAutoRun ? { backgroundColor: COLORS.accent } : { borderColor: COLORS.accent, borderWidth: 1 }]}
                                onPress={toggleAutoRun}
                            >
                                <Play size={16} color={isAutoRun ? COLORS.secondary : COLORS.accent} style={{ marginRight: 6 }} />
                                <Text style={[styles.controlText, isAutoRun ? { color: COLORS.secondary } : { color: COLORS.accent }]}>
                                    {isAutoRun ? 'Auto-Running...' : 'Auto-Pilot'}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.resetButton} onPress={resetDemo}>
                                <RotateCcw size={18} color={COLORS.text} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={styles.subtitle}>Antigravity Trade Finance Demo</Text>
                </View>

                {/* Trade Explainer */}
                <TradeExplainer />

                {/* Transaction Progress */}
                <View style={styles.progressContainer}>
                    <Text style={styles.sectionTitle}>Live Transaction Status</Text>
                    <TransactionFlowIndicator />
                    <View style={styles.stageDescription}>
                        <Text style={styles.stageText}>Current Stage: {getStageDescription()}</Text>
                    </View>
                </View>

                {/* Persona Selection */}
                <Text style={styles.sectionTitle}>Select Persona View</Text>
                <View style={styles.grid}>
                    {PERSONAS.map((persona, index) => (
                        <PersonaCard
                            key={index}
                            name={persona.name}
                            role={persona.role}
                            Icon={persona.icon}
                            isActive={activePersonaIndex === index}
                            isActionRequired={activePersonaIndex === index && !['SETTLEMENT_NET'].includes(stage)}
                            onPress={() => navigation.navigate(persona.screen as any)}
                        />
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollContent: {
        padding: SIZES.padding,
        paddingBottom: 40,
    },
    header: {
        marginBottom: 20,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    headerControls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    logo: {
        width: 140,
        height: 40,
    },
    subtitle: {
        fontFamily: FONTS.body,
        fontSize: 14,
        color: COLORS.text,
    },
    controlButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
    },
    controlText: {
        fontFamily: FONTS.bodyBold,
        fontSize: 12,
    },
    resetButton: {
        padding: 8,
    },
    progressContainer: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontFamily: FONTS.heading,
        fontSize: 18,
        color: COLORS.primary,
        marginBottom: 16,
        fontWeight: 'bold',
    },
    stageDescription: {
        marginTop: 8,
        backgroundColor: COLORS.secondary,
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    stageText: {
        fontFamily: FONTS.bodyBold,
        color: COLORS.accent,
        fontSize: 14,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: '48%',
        backgroundColor: COLORS.secondary,
        borderRadius: SIZES.radius,
        padding: 16,
        marginBottom: 16,
        alignItems: 'center',
        ...SHADOWS.card,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    activeCard: {
        borderColor: COLORS.accent,
        backgroundColor: '#fff8f6', // Light coral tint
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    role: {
        fontFamily: FONTS.heading,
        fontSize: 16,
        color: COLORS.primary,
        marginBottom: 4,
        fontWeight: 'bold',
    },
    name: {
        fontFamily: FONTS.body,
        fontSize: 12,
        color: COLORS.text,
        textAlign: 'center',
    },
    badge: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: '#e53935',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
});
