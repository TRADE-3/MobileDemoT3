import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { COLORS, FONTS, SIZES, SHADOWS } from '../../constants/theme';
import { Camera, Check, Fingerprint } from 'lucide-react-native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Verification'>;

import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';

export default function Verification() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<RouteProp<RootStackParamList, 'Verification'>>();
    const { jobId } = route.params;
    const [photoCaptured, setPhotoCaptured] = useState(false);

    const [checklist, setChecklist] = useState({
        sealIntact: false,
        quantityMatches: false,
        insuranceVerified: false,
    });

    const toggleSwitch = (key: keyof typeof checklist) => {
        setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleCapture = () => {
        setPhotoCaptured(true);
        Alert.alert('Photo Captured', 'Condition photo stored securely.');
    };

    const handleSign = () => {
        const allChecked = Object.values(checklist).every(v => v);
        if (allChecked && photoCaptured) {
            navigation.replace('Confirmation', { verificationId: '0x7f...3a' });
        } else {
            Alert.alert('Incomplete', 'Please complete all checks and capture a photo first.');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>
                {jobId === '#4025' ? 'Ingot Batch Inspection #4025' : 'Aluminum Scrap Container #4021'}
            </Text>

            {/* Mock Camera View */}
            <View style={styles.cameraContainer}>
                {photoCaptured ? (
                    <View style={styles.photoPlaceholder}>
                        <Check color={COLORS.secondary} size={48} />
                        <Text style={styles.photoText}>Photo Captured</Text>
                    </View>
                ) : (
                    <View style={styles.cameraView}>
                        <Camera color="#fff" size={48} />
                        <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
                            <Text style={styles.captureText}>Capture Condition Photo</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            <Text style={styles.sectionTitle}>Verification Checklist</Text>
            <View style={styles.checklistContainer}>
                {jobId === '#4025' ? (
                    // Ingot Checklist
                    <>
                        <View style={styles.checkRow}>
                            <Text style={styles.checkLabel}>Ingot Count Verified (900 MT)?</Text>
                            <Switch
                                value={checklist.sealIntact}
                                onValueChange={() => toggleSwitch('sealIntact')}
                                trackColor={{ false: '#767577', true: COLORS.accent }}
                            />
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.checkRow}>
                            <Text style={styles.checkLabel}>Purity Analysis {'>'} 99.7%?</Text>
                            <Switch
                                value={checklist.quantityMatches}
                                onValueChange={() => toggleSwitch('quantityMatches')}
                                trackColor={{ false: '#767577', true: COLORS.accent }}
                            />
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.checkRow}>
                            <Text style={styles.checkLabel}>Warehouse Receipt Generated?</Text>
                            <Switch
                                value={checklist.insuranceVerified}
                                onValueChange={() => toggleSwitch('insuranceVerified')}
                                trackColor={{ false: '#767577', true: COLORS.accent }}
                            />
                        </View>
                    </>
                ) : (
                    // UBC Checklist
                    <>
                        <View style={styles.checkRow}>
                            <Text style={styles.checkLabel}>Container Seal Intact?</Text>
                            <Switch
                                value={checklist.sealIntact}
                                onValueChange={() => toggleSwitch('sealIntact')}
                                trackColor={{ false: '#767577', true: COLORS.accent }}
                            />
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.checkRow}>
                            <Text style={styles.checkLabel}>Quantity Matches Invoice?</Text>
                            <Switch
                                value={checklist.quantityMatches}
                                onValueChange={() => toggleSwitch('quantityMatches')}
                                trackColor={{ false: '#767577', true: COLORS.accent }}
                            />
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.checkRow}>
                            <Text style={styles.checkLabel}>Radiation Check Passed?</Text>
                            <Switch
                                value={checklist.insuranceVerified}
                                onValueChange={() => toggleSwitch('insuranceVerified')}
                                trackColor={{ false: '#767577', true: COLORS.accent }}
                            />
                        </View>
                    </>
                )}
            </View>

            <TouchableOpacity
                style={[styles.signButton, (!Object.values(checklist).every(v => v) || !photoCaptured) && styles.disabledButton]}
                onPress={handleSign}
                disabled={!Object.values(checklist).every(v => v) || !photoCaptured}
            >
                <Fingerprint color={COLORS.secondary} size={24} style={{ marginRight: 10 }} />
                <Text style={styles.signButtonText}>Sign FOTG On-Chain</Text>
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
    title: {
        fontFamily: FONTS.heading,
        fontSize: 18,
        color: COLORS.primary,
        marginBottom: 16,
        fontWeight: 'bold',
    },
    cameraContainer: {
        height: 200,
        backgroundColor: '#000',
        borderRadius: SIZES.radius,
        marginBottom: 24,
        overflow: 'hidden',
    },
    cameraView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#333',
    },
    photoPlaceholder: {
        flex: 1,
        backgroundColor: COLORS.accent,
        alignItems: 'center',
        justifyContent: 'center',
    },
    photoText: {
        color: COLORS.secondary,
        fontFamily: FONTS.bodyBold,
        marginTop: 8,
    },
    captureButton: {
        marginTop: 16,
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    captureText: {
        color: '#fff',
        fontFamily: FONTS.bodyBold,
        fontSize: 12,
    },
    sectionTitle: {
        fontFamily: FONTS.heading,
        fontSize: 16,
        color: COLORS.primary,
        marginBottom: 12,
        fontWeight: 'bold',
    },
    checklistContainer: {
        backgroundColor: COLORS.secondary,
        borderRadius: SIZES.radius,
        padding: 16,
        marginBottom: 32,
        ...SHADOWS.card,
    },
    checkRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    checkLabel: {
        fontFamily: FONTS.body,
        fontSize: 14,
        color: COLORS.text,
        flex: 1,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
    },
    signButton: {
        backgroundColor: COLORS.primary,
        padding: 18,
        borderRadius: SIZES.radius,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
        ...SHADOWS.card,
    },
    disabledButton: {
        backgroundColor: '#b0bec5',
        elevation: 0,
    },
    signButtonText: {
        color: COLORS.secondary,
        fontFamily: FONTS.bodyBold,
        fontSize: 16,
    },
});
