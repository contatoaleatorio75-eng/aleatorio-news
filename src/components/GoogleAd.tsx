
import React, { useEffect } from 'react';

interface GoogleAdProps {
    slot: string;
    format?: string;
    responsive?: boolean;
    style?: React.CSSProperties;
    className?: string;
}

/**
 * Google AdSense Component
 * 
 * This component uses environment variables for secure configuration.
 * Set VITE_ADSENSE_CLIENT_ID in your .env.local file.
 * 
 * Usage:
 * <GoogleAd slot="1234567890" />
 * <GoogleAd slot="1234567890" format="rectangle" responsive={false} />
 */
export const GoogleAd: React.FC<GoogleAdProps> = ({
    slot,
    format = 'auto',
    responsive = true,
    style,
    className = ''
}) => {
    // Get AdSense client ID from environment variable
    const adsenseClientId = import.meta.env.VITE_ADSENSE_CLIENT_ID;

    useEffect(() => {
        try {
            // Push ad to AdSense
            ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        } catch (err) {
            console.error('AdSense error:', err);
        }
    }, []);

    // Don't render if client ID is not configured
    if (!adsenseClientId) {
        console.warn('AdSense client ID not configured. Set VITE_ADSENSE_CLIENT_ID in .env.local');
        return null;
    }

    return (
        <div className={className} style={style}>
            <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client={adsenseClientId}
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive={responsive.toString()}
            />
        </div>
    );
};
