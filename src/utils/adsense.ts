/**
 * AdSense Initialization Helper
 * 
 * This helper loads the AdSense script dynamically using environment variables.
 * Call this function once in your app initialization (e.g., in App.tsx or index.tsx)
 */

export const initializeAdSense = (): void => {
    const adsenseClientId = import.meta.env.VITE_ADSENSE_CLIENT_ID;

    // Don't initialize if client ID is not configured
    if (!adsenseClientId) {
        console.warn('AdSense not initialized: VITE_ADSENSE_CLIENT_ID not found in environment variables');
        return;
    }

    // Check if script is already loaded
    if (document.querySelector(`script[src*="adsbygoogle.js"]`)) {
        console.log('AdSense script already loaded');
        return;
    }

    // Create and append the AdSense script
    const script = document.createElement('script');
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`;
    script.async = true;
    script.crossOrigin = 'anonymous';

    script.onload = () => {
        console.log('AdSense script loaded successfully');
    };

    script.onerror = () => {
        console.error('Failed to load AdSense script');
    };

    document.head.appendChild(script);
};
