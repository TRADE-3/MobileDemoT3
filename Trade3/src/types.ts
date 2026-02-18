export type RootStackParamList = {
    Home: undefined;

    // Seller Flow
    SellerDashboard: undefined;
    NewRequest: undefined;
    SellerSuccess: undefined;

    // Lender Flow
    YieldMarketplace: undefined;
    VaultDetail: { vaultId: string };
    Portfolio: undefined;

    // Buyer Flow
    EscrowList: undefined;
    FundEscrow: { contractId: string };
    ShipmentTracking: { shipmentId: string };

    // Service Provider Flow
    InspectionList: undefined;
    Verification: { jobId: string };
    Confirmation: { verificationId: string };
};
