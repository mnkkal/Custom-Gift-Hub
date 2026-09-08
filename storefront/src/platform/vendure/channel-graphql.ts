import {graphql} from './graphql';

export const GetActiveChannelQuery = graphql(`
    query GetActiveChannel {
        activeChannel {
            id
            code
            defaultLanguageCode
            availableLanguageCodes
            defaultCurrencyCode
            availableCurrencyCodes
            customFields {
                announcementBarText
                announcementBadge
                promoDiscountCode
                promoBannerUrl
                promoBannerLink
            }
        }
    }
`);
