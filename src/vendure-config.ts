import {
  CurrencyCode,
  DefaultJobQueuePlugin,
  DefaultSearchPlugin,
  LanguageCode,
  VendureConfig,
} from '@vendure/core';
import path from 'path';
import 'dotenv/config';

import { AdminUiPlugin } from '@vendure/admin-ui-plugin';
import {
  CloudinaryAssetPreviewStrategy,
  CloudinaryAssetStorageStrategy,
} from './plugins/cloudinary-asset-strategy';

export const config: VendureConfig = {
  defaultLanguageCode: LanguageCode.en,
  apiOptions: {
    port: parseInt(process.env.VENDURE_PORT || process.env.PORT || '3002', 10),
    adminApiPath: 'admin-api',
    shopApiPath: 'shop-api',

    cors: {
      origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        const allowedOrigins = [
          'http://localhost:3001',
          'http://localhost:3000',
          'https://customgifthub.in',
          'https://www.customgifthub.in',
          'https://api.customgifthub.in',
        ];
        if (
          !origin ||
          allowedOrigins.includes(origin) ||
          origin.endsWith('.vercel.app')
        ) {
          callback(null, true);
        } else {
          callback(null, false);
        }
      },
      credentials: true,
    },
  },


  authOptions: {
    tokenMethod: ['bearer', 'cookie'],
    superadminCredentials: {
      identifier: process.env.SUPERADMIN_USERNAME || 'superadmin',
      password: process.env.SUPERADMIN_PASSWORD || 'superadmin',
    },
    cookieOptions: {
      secret: process.env.COOKIE_SECRET || 'cookie-secret-key',
    },
  },
  dbConnectionOptions: {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: process.env.DB_SYNCHRONIZE === 'true' || process.env.NODE_ENV !== 'production',
    migrations: [path.join(__dirname, '../migrations/*.+(js|ts)')],
    logging: false,
  },
  paymentOptions: {
    paymentMethodHandlers: [],
  },
  assetOptions: {
    assetStorageStrategy: new CloudinaryAssetStorageStrategy(),
    assetPreviewStrategy: new CloudinaryAssetPreviewStrategy(),
    permittedFileTypes: ['image/*', 'video/*', 'audio/*', '.pdf'],
    uploadMaxFileSize: 20971520,
  },
  customFields: {
    Product: [
      {
        name: 'isCustomizable',
        type: 'boolean',
        defaultValue: false,
        public: true,
        label: [{ languageCode: LanguageCode.en, value: 'Is Customizable' }],
      },
      {
        name: 'customizationType',
        type: 'string',
        options: [
          { value: 'NONE' },
          { value: 'HUMAN_MINIATURE_3D' },
          { value: 'LASER_ENGRAVING' },
          { value: 'PHOTO_PRINT' },
          { value: 'EMBROIDERY' },
        ],
        public: true,
        label: [{ languageCode: LanguageCode.en, value: 'Customization Method' }],
      },
    ],
    ProductVariant: [
      {
        name: 'dimensions',
        type: 'string',
        public: true,
        label: [{ languageCode: LanguageCode.en, value: 'Dimensions / Height (e.g. 6 inch, 8 inch)' }],
      },
      {
        name: 'material',
        type: 'string',
        public: true,
        label: [{ languageCode: LanguageCode.en, value: 'Base Material (Resin, Acrylic, Metal, Ceramic)' }],
      },
    ],
    OrderLine: [
      {
        name: 'customPhotoUrl',
        type: 'string',
        public: true,
        label: [{ languageCode: LanguageCode.en, value: 'Customer Reference Photo URL' }],
      },
      {
        name: 'engravingText',
        type: 'string',
        public: true,
        label: [{ languageCode: LanguageCode.en, value: 'Custom Text / Name to Engrave' }],
      },
      {
        name: 'specialInstructions',
        type: 'text',
        public: true,
        label: [{ languageCode: LanguageCode.en, value: 'Special Customization Notes' }],
      },
    ],
    Channel: [
      {
        name: 'announcementBarText',
        type: 'string',
        public: true,
        label: [{ languageCode: LanguageCode.en, value: 'Announcement Bar Headline (e.g. Think gift, Think us!)' }],
        defaultValue: 'Think gift, Think us! — Handcrafted 3D Human Miniatures & Custom Gifts',
      },
      {
        name: 'announcementBadge',
        type: 'string',
        public: true,
        label: [{ languageCode: LanguageCode.en, value: 'Promo Badge (e.g. FREE PAN-INDIA DELIVERY OVER ₹499)' }],
        defaultValue: 'FREE PAN-INDIA DELIVERY OVER ₹499',
      },
      {
        name: 'promoDiscountCode',
        type: 'string',
        public: true,
        label: [{ languageCode: LanguageCode.en, value: 'Featured Promo / Coupon Code (e.g. MINI10)' }],
      },
      {
        name: 'promoBannerUrl',
        type: 'string',
        public: true,
        label: [{ languageCode: LanguageCode.en, value: 'Homepage Promo Banner Image URL' }],
      },
      {
        name: 'promoBannerLink',
        type: 'string',
        public: true,
        label: [{ languageCode: LanguageCode.en, value: 'Homepage Promo Banner Target URL (e.g. /collection/chocolates-human-miniatures)' }],
      },
    ],
  },
  plugins: [
    DefaultJobQueuePlugin.init({ useDatabaseForBuffer: true }),
    DefaultSearchPlugin.init({ bufferUpdates: false, indexStockStatus: true }),
    AdminUiPlugin.init({
      route: 'admin',
      port: parseInt(process.env.VENDURE_PORT || process.env.PORT || '3002', 10),
      adminUiConfig: {
        apiHost: 'auto',
        apiPort: 'auto',
        adminApiPath: 'admin-api',
      },
    }),
  ],
};