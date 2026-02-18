import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../../constants/theme';
import { CheckCircle, Circle, MapPin } from 'lucide-react-native';

const STEPS = [
    { title: 'Contract Signed', status: 'completed', date: 'Oct 24, 10:00 AM' },
    { title: 'Escrow Funded', status: 'completed', date: 'Oct 25, 2:30 PM' },
    { title: 'Goods Verified', status: 'pending', date: 'Waiting for Control Union' },
    { title: 'Payment Released', status: 'upcoming', date: 'Est. Nov 1' },
];

export default function ShipmentTracking() {
    return (
        <ScrollView style={styles.container}>
            {/* Map Placeholder */}
            <View style={styles.mapContainer}>
                <Text style={styles.mapText}>Map Visualization</Text>
                <Text style={styles.routeText}>New York Port ➔ Mumbai Port (Bonded)</Text>
                <MapPin color={COLORS.accent} size={32} style={{ marginTop: 12 }} />
            </View>

            <View style={styles.timelineContainer}>
                <Text style={styles.sectionTitle}>Shipment Status</Text>

                {STEPS.map((step, index) => (
                    <View key={index} style={styles.stepRow}>
                        <View style={styles.iconContainer}>
                            {step.status === 'completed' ? (
                                <CheckCircle color={COLORS.accent} size={24} />
                            ) : step.status === 'pending' ? (
                                <View style={styles.pendingCircle} />
                            ) : (
                                <Circle color={COLORS.border} size={24} />
                            )}
                            {index < STEPS.length - 1 && <View style={[styles.line, step.status === 'completed' ? { backgroundColor: COLORS.accent } : {}]} />}
                        </View>

                        <View style={styles.contentContainer}>
                            <Text style={[styles.stepTitle, step.status === 'completed' && { color: COLORS.primary }]}>
                                {step.title}
                            </Text>
                            <Text style={styles.stepDate}>{step.date}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    mapContainer: {
        height: 250,
        backgroundColor: '#e0e0e0',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    mapText: {
        fontFamily: FONTS.heading,
        fontSize: 20,
        color: '#757575',
    },
    routeText: {
        fontFamily: FONTS.bodyBold,
        marginTop: 8,
        color: COLORS.primary,
    },
    timelineContainer: {
        padding: SIZES.padding,
        backgroundColor: COLORS.secondary,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        flex: 1,
        ...SHADOWS.card,
    },
    sectionTitle: {
        fontFamily: FONTS.heading,
        fontSize: 20,
        color: COLORS.primary,
        marginBottom: 24,
        fontWeight: 'bold',
    },
    stepRow: {
        flexDirection: 'row',
        marginBottom: 32,
        height: 50,
    },
    iconContainer: {
        alignItems: 'center',
        width: 32, // Fixed width for alignment
        marginRight: 16,
    },
    pendingCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#f57c00',
        backgroundColor: '#fff3e0',
    },
    line: {
        width: 2,
        flex: 1,
        backgroundColor: COLORS.border,
        marginTop: 4,
        marginBottom: -28, // Connect to next icon
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 2,
    },
    stepTitle: {
        fontFamily: FONTS.bodyBold,
        fontSize: 16,
        color: COLORS.text,
        marginBottom: 4,
    },
    stepDate: {
        fontFamily: FONTS.body,
        fontSize: 14,
        color: '#9e9e9e',
    },
});
