import React, { createContext, useContext, useState, ReactNode } from 'react';

export type DemoStage =
    | 'CONTRACT_UBC'     // 1. Ivory -> Afeco (Contract)
    | 'FINANCE_REQUEST'  // 2. Afeco -> GFI (Request)
    | 'INSPECTION_ORIGIN' // 3. Custodian (Surveyor Verification)
    | 'PAYMENT_UBC'      // 4. GFI -> Ivory (Payment - Fees)
    | 'TRANSFORMATION'   // 5. UBC -> Ingot (Processing)
    | 'CONTRACT_INGOT'   // 6. User -> Afeco (Purchase)
    | 'PAYMENT_INGOT'    // 7. User -> GFI (Full Amount)
    | 'SETTLEMENT_NET';  // 8. GFI -> Afeco (Net Profit)

interface DemoContextType {
    stage: DemoStage;
    setStage: (stage: DemoStage) => void;
    advanceStage: () => void;
    resetDemo: () => void;
    getStageDescription: () => string;
    isAutoRun: boolean;
    toggleAutoRun: () => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const DemoProvider = ({ children }: { children: ReactNode }) => {
    const [stage, setStage] = useState<DemoStage>('CONTRACT_UBC');
    const [isAutoRun, setIsAutoRun] = useState(false);

    const STAGE_ORDER: DemoStage[] = [
        'CONTRACT_UBC',
        'FINANCE_REQUEST',
        'INSPECTION_ORIGIN',
        'PAYMENT_UBC',
        'TRANSFORMATION',
        'CONTRACT_INGOT',
        'PAYMENT_INGOT',
        'SETTLEMENT_NET'
    ];

    React.useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isAutoRun) {
            interval = setInterval(() => {
                setStage((prevStage) => {
                    const currentIndex = STAGE_ORDER.indexOf(prevStage);
                    if (currentIndex < STAGE_ORDER.length - 1) {
                        return STAGE_ORDER[currentIndex + 1];
                    } else {
                        setIsAutoRun(false); // Stop at end
                        return prevStage;
                    }
                });
            }, 3500); // 3.5 seconds per stage
        }
        return () => clearInterval(interval);
    }, [isAutoRun]);

    const advanceStage = () => {
        const currentIndex = STAGE_ORDER.indexOf(stage);
        if (currentIndex < STAGE_ORDER.length - 1) {
            setStage(STAGE_ORDER[currentIndex + 1]);
        }
    };

    const resetDemo = () => {
        setStage('CONTRACT_UBC');
        setIsAutoRun(false);
    };

    const toggleAutoRun = () => {
        if (stage === 'SETTLEMENT_NET') {
            setStage('CONTRACT_UBC'); // Restart if at end
        }
        setIsAutoRun(prev => !prev);
    };

    const getStageDescription = () => {
        switch (stage) {
            case 'CONTRACT_UBC': return '1. UBC Contract (Ivory -> Afeco)';
            case 'FINANCE_REQUEST': return '2. Finance Req (Afeco -> GFI)';
            case 'INSPECTION_ORIGIN': return '3. Origin Survey (Custodian)';
            case 'PAYMENT_UBC': return '4. Supplier Payment (GFI -> Ivory)';
            case 'TRANSFORMATION': return '5. Transformation (UBC -> Ingot)';
            case 'CONTRACT_INGOT': return '6. Ingot Purchase (User -> Afeco)';
            case 'PAYMENT_INGOT': return '7. User Payment ($45k -> GFI)';
            case 'SETTLEMENT_NET': return '8. Final Settlement (Net Profit)';
            default: return '';
        }
    };

    return (
        <DemoContext.Provider value={{ stage, setStage, advanceStage, resetDemo, getStageDescription, isAutoRun, toggleAutoRun }}>
            {children}
        </DemoContext.Provider>
    );
};

export const useDemo = () => {
    const context = useContext(DemoContext);
    if (!context) {
        throw new Error('useDemo must be used within a DemoProvider');
    }
    return context;
};
