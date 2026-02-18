import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { COLORS } from '../constants/theme';

// Import Screens (to be implemented)
import Home from '../screens/Home';

import SellerDashboard from '../screens/Seller/Dashboard';
import NewRequest from '../screens/Seller/NewRequest';
import SellerSuccess from '../screens/Seller/Success';

import YieldMarketplace from '../screens/Lender/Marketplace';
import VaultDetail from '../screens/Lender/VaultDetail';
import Portfolio from '../screens/Lender/Portfolio';

import EscrowList from '../screens/Buyer/EscrowList';
import FundEscrow from '../screens/Buyer/FundEscrow';
import ShipmentTracking from '../screens/Buyer/Tracking';

import InspectionList from '../screens/ServiceProvider/TaskList';
import Verification from '../screens/ServiceProvider/Verification';
import Confirmation from '../screens/ServiceProvider/Confirmation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: COLORS.primary,
                    },
                    headerTintColor: COLORS.secondary,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    contentStyle: {
                        backgroundColor: COLORS.background,
                    },
                }}
            >
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />

                {/* Seller Flow */}
                <Stack.Screen
                    name="SellerDashboard"
                    component={SellerDashboard}
                    options={{ title: 'Seller Dashboard' }}
                />
                <Stack.Screen
                    name="NewRequest"
                    component={NewRequest}
                    options={{ title: 'New Financing Request' }}
                />
                <Stack.Screen
                    name="SellerSuccess"
                    component={SellerSuccess}
                    options={{ headerShown: false }}
                />

                {/* Lender Flow */}
                <Stack.Screen
                    name="YieldMarketplace"
                    component={YieldMarketplace}
                    options={{ title: 'Yield Marketplace' }}
                />
                <Stack.Screen
                    name="VaultDetail"
                    component={VaultDetail}
                    options={{ title: 'Vault Detail' }}
                />
                <Stack.Screen
                    name="Portfolio"
                    component={Portfolio}
                    options={{ title: 'My Portfolio' }}
                />

                {/* Buyer Flow */}
                <Stack.Screen
                    name="EscrowList"
                    component={EscrowList}
                    options={{ title: 'Pending Payments' }}
                />
                <Stack.Screen
                    name="FundEscrow"
                    component={FundEscrow}
                    options={{ title: 'Fund Escrow' }}
                />
                <Stack.Screen
                    name="ShipmentTracking"
                    component={ShipmentTracking}
                    options={{ title: 'Shipment Tracking' }}
                />

                {/* Service Provider Flow */}
                <Stack.Screen
                    name="InspectionList"
                    component={InspectionList}
                    options={{ title: 'Inspection Tasks' }}
                />
                <Stack.Screen
                    name="Verification"
                    component={Verification}
                    options={{ title: 'Verify Shipment' }}
                />
                <Stack.Screen
                    name="Confirmation"
                    component={Confirmation}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
