import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { CheckCircle } from 'lucide-react-native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Confirmation'>;

export default function Confirmation() {
    const navigation = useNavigation<NavigationProp>();
    const scale = new Animated.Value(0);

    useEffect(() => {
        Animated.spring(scale, {
            toValue: 1,
            friction: 5,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View style={{ transform: [{ scale }] }}>
                <CheckCircle color={COLORS.secondary} size={100} />
            </Animated.View>

            <Text style={styles.title}>Verification Complete</Text>

            <View style={styles.infoBox}>
                <Text style={styles.label}>Verification Hash</Text>
                <Text style={styles.value}>0x7f...3a</Text>
            </View>

            <Text style={styles.status}>
                Smart Contract Update: <Text style={{ color: COLORS.accent, fontWeight: 'bold' }}>Payment Triggered to Seller</Text>
            </Text>

            <Text
                style={styles.link}
                onPress={() => navigation.navigate('InspectionList')}
            >
                Return to Task List
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        padding: SIZES.padding,
    },
    title: {
        fontFamily: FONTS.heading,
        fontSize: 24,
        color: COLORS.secondary,
        marginTop: 24,
        marginBottom: 40,
        fontWeight: 'bold',
    },
    infoBox: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        padding: 24,
        borderRadius: SIZES.radius,
        width: '100%',
        alignItems: 'center',
        marginBottom: 32,
    },
    label: {
        color: '#a0a3b1',
        fontFamily: FONTS.body,
        marginBottom: 8,
    },
    value: {
        color: COLORS.secondary,
        fontFamily: FONTS.heading,
        fontSize: 20,
        letterSpacing: 2,
    },
    status: {
        color: COLORS.secondary,
        fontFamily: FONTS.body,
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 40,
    },
    link: {
        color: COLORS.accent,
        fontFamily: FONTS.bodyBold,
        fontSize: 16,
        textDecorationLine: 'underline',
    },
});
