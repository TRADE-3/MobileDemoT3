export const COLORS = {
    primary: '#1a1f3a', // Navy
    accent: '#ff6b4a',  // Coral
    secondary: '#ffffff', // White
    text: '#8b8d98',    // Gray
    background: '#f8f9fa', // Light gray background for contrast
    success: '#ff6b4a', // Using accent for success as per Coral usage
    border: '#e1e3e8',  // Light border
};

export const FONTS = {
    heading: 'Outfit_700Bold', // Using Outfit Bold as Satoshi alternative
    body: 'Inter_400Regular',
    bodyBold: 'Inter_700Bold',
};

export const SIZES = {
    padding: 16,
    radius: 12,
    h1: 24,
    h2: 20,
    h3: 18,
    body: 14,
    caption: 12,
};

export const SHADOWS = {
    card: {
        shadowColor: COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 2,
    },
};
