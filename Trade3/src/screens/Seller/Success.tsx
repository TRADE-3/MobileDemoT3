import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { CheckCircle } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SellerSuccess'>;

export default function SellerSuccess() {
    const navigation = useNavigation<NavigationProp>();
    const scale = new Animated.Value(0);

    useEffect(() => {
        Animated.spring(scale, {
            toValue: 1,
            friction: 5,
            useNativeDriver: true,
        }).start();

        // Auto navigate back after 3 seconds or keep it for manual exit?
        // Prompt says "Success Animation... Waiting for Buyer Deposit". Usually needs a "Done" button.
        // I'll add a timeout or a press handler.
        const timer = setTimeout(() => {
            // navigation.navigate('SellerDashboard'); 
            // Keeping it on screen is better to read the message.
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View style={{ transform: [{ scale }] }}>
                <CheckCircle color={COLORS.accent} size={100} strokeWidth={1.5} />
            </Animated.View>
            <Text style={styles.title}>Smart Escrow Created</Text>
            <Text style={styles.subtitle}>Waiting for Buyer Deposit.</Text>

            <View style={styles.tokenInfo}>
                <Text style={styles.tokenText}>RWA Token ID: #8821</Text>
                <Text style={styles.tokenText}>Contract: 0x7f...3a</Text>
            </View>

            <Text
                style={styles.link}
                onPress={() => navigation.navigate('SellerDashboard')}
            >
                Return to Dashboard
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary, // Navy background as per branding for some success states? Or White? 
        // "Use the Navy (#1a1f3a) background with White text" was for dashboard hero. 
        // Prompt says "Show a success animation using the Coral color".
        // Let's use Navy background for high impact.
        alignItems: 'center',
        justifyContent: 'center',
        padding: SIZES.padding,
    },
    title: {
        fontFamily: FONTS.heading,
        fontSize: 28,
        color: COLORS.secondary,
        marginTop: 24,
        marginBottom: 8,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    subtitle: {
        fontFamily: FONTS.body,
        fontSize: 18,
        color: '#a0a3b1',
        textAlign: 'center',
        marginBottom: 40,
    },
    tokenInfo: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        padding: 16,
        borderRadius: 8,
        marginBottom: 40,
    },
    tokenText: {
        color: COLORS.text, // Gray might be too dark on Navy. 
        // Let's use a lighter gray or white.
        color: '#d1d5db',
        fontFamily: FONTS.body,
        textAlign: 'center',
        marginBottom: 4,
    },
    link: {
        color: COLORS.accent,
        fontFamily: FONTS.bodyBold,
        fontSize: 16,
        marginTop: 20,
    },
});
