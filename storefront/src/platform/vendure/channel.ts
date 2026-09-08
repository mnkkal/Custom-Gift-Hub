import {cacheLife} from 'next/cache';
import {query} from './api';
import {GetActiveChannelQuery} from './channel-graphql';

/**
 * Get the active channel with caching enabled.
 * Channel configuration rarely changes, so it is cached for one hour.
 * Channel configuration is language-independent, so no locale is required.
 */
const DEFAULT_CHANNEL = {
    id: '1',
    code: '__default_channel__',
    defaultLanguageCode: 'en',
    availableLanguageCodes: ['en'],
    defaultCurrencyCode: 'INR',
    availableCurrencyCodes: ['INR'],
    customFields: {
        announcementBarText: 'Think gift, Think us! — Handcrafted 3D Human Miniatures & Custom Gifts',
        announcementBadge: 'FREE PAN-INDIA DELIVERY OVER ₹499',
        promoDiscountCode: '',
        promoBannerUrl: '',
        promoBannerLink: '',
    },
};

export async function getActiveChannel() {
    'use cache';
    cacheLife('minutes');

    try {
        const result = await query(GetActiveChannelQuery);
        if (result?.data?.activeChannel) {
            return result.data.activeChannel;
        }
    } catch {
        // Fallback for offline build
    }

    return DEFAULT_CHANNEL as any;
}


