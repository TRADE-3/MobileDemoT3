import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';
import { useDemo } from '../context/DemoContext';
import { Check } from 'lucide-react-native';

const STEPS = [
    { id: 'CONTRACT_UBC', label: 'Contract' },
    { id: 'FINANCE_REQUEST', label: 'Finance' },
    { id: 'INSPECTION_ORIGIN', label: 'Survey' },
    { id: 'PAYMENT_UBC', label: 'Pay Supplier' },
    { id: 'TRANSFORMATION', label: 'Transform' },
    { id: 'CONTRACT_INGOT', label: 'Sell Ingot' },
    { id: 'PAYMENT_INGOT', label: 'Pay GFI' },
    { id: 'SETTLEMENT_NET', label: 'Settled' },
];

export default function TransactionFlowIndicator() {
    const { stage } = useDemo();

    const getCurrentStepIndex = () => {
        return STEPS.findIndex(s => s.id === stage);
    };

    const activeIndex = getCurrentStepIndex();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Transaction Lifecycle</Text>
            <View style={styles.stepsContainer}>
                {STEPS.map((step, index) => {
                    const isActive = index === activeIndex;
                    const isCompleted = index < activeIndex;

                    return (
                        <View key={step.id} style={styles.stepWrapper}>
                            {/* Line Connector */}
                            {index > 0 && (
                                <View style={[
                                    styles.connector,
                                    { backgroundColor: index <= activeIndex ? COLORS.accent : '#e0e0e0' }
                                ]} />
                            )}

                            {/* Step Circle */}
                            <View style={[
                                styles.stepCircle,
                                isActive && styles.activeCircle,
                                isCompleted && styles.completedCircle,
                                !isActive && !isCompleted && styles.inactiveCircle
                            ]}>
                                {isCompleted ? (
                                    <Check size={10} color={COLORS.secondary} />
                                ) : (
                                    <Text style={[
                                        styles.stepNumber,
                                        isActive ? styles.activeText : styles.inactiveText
                                    ]}>{index + 1}</Text>
                                )}
                            </View>

                            {/* Label */}
                            <Text style={[
                                styles.stepLabel,
                                isActive ? styles.activeLabel : styles.inactiveLabel
                            ]}>
                                {step.label}
                            </Text>
                        </View>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.secondary,
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3.84,
        elevation: 2,
    },
    title: {
        fontFamily: FONTS.heading,
        fontSize: 14,
        color: COLORS.primary,
        marginBottom: 12,
        fontWeight: 'bold',
    },
    stepsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    stepWrapper: {
        alignItems: 'center',
        flex: 1,
        position: 'relative',
    },
    connector: {
        position: 'absolute',
        top: 10,
        right: '50%',
        left: '-50%',
        height: 2,
        zIndex: -1,
    },
    stepCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
        borderWidth: 1.5,
    },
    activeCircle: {
        backgroundColor: COLORS.secondary,
        borderColor: COLORS.accent,
    },
    completedCircle: {
        backgroundColor: COLORS.accent,
        borderColor: COLORS.accent,
    },
    inactiveCircle: {
        backgroundColor: COLORS.secondary,
        borderColor: '#e0e0e0',
    },
    stepNumber: {
        fontSize: 10,
        fontFamily: FONTS.bodyBold,
    },
    activeText: {
        color: COLORS.accent,
    },
    inactiveText: {
        color: '#bdbdbd',
    },
    stepLabel: {
        fontSize: 9, // Small text to fit 6 steps
        fontFamily: FONTS.body,
        textAlign: 'center',
    },
    activeLabel: {
        color: COLORS.accent,
        fontFamily: FONTS.bodyBold,
    },
    inactiveLabel: {
        color: '#bdbdbd',
    },
});
