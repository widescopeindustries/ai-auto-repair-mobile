
import { AffiliateLink } from '../types';

if (!process.env.AMAZON_AFFILIATE_TAG) {
    // Graceful fallback or warning, but ideally this is set in .env
    console.warn("AMAZON_AFFILIATE_TAG is not set in environment variables. Commission links may not work.");
}

const AMAZON_TAG = process.env.AMAZON_AFFILIATE_TAG || 'antigravity-20'; // Fallback tag

export const generatePartLinks = (partName: string, vehicleString: string): AffiliateLink[] => {
    // Clean up strings for search query
    const query = `${vehicleString} ${partName}`.trim();
    const encodedQuery = encodeURIComponent(query);

    const amazonUrl = `https://www.amazon.com/s?k=${encodedQuery}&tag=${AMAZON_TAG}`;

    return [
        {
            provider: 'Amazon',
            url: amazonUrl,
            price: 'Check Price' // We can't know price without API
        }
    ];
};
