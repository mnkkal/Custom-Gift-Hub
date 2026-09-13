"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@vendure/core");
const vendure_config_1 = require("./vendure-config");
const CATEGORIES = [
    { name: 'KIDS', slug: 'kids', description: 'Toys, Soft toys and plushies for children of all ages' },
    { name: 'Handbags', slug: 'handbags', description: 'Ladies purses, Gents wallets, College bags, Baby bags' },
    { name: 'Perfume', slug: 'perfume', description: 'Gents perfume, Ladies perfume, Unisex perfumes, Couple combos' },
    { name: 'Wall frames', slug: 'wall-frames', description: 'Big wall frames, Small wall frames, Designer decor frames' },
    { name: 'Photo frames', slug: 'photo-frames', description: 'Normal photo frames, Lighting photo frames, Customise 3D frames' },
    { name: 'Wall clocks', slug: 'wall-clocks', description: 'Big clocks, Small clocks, Frame with clocks' },
    { name: 'Showpieces', slug: 'showpieces', description: 'Murtis, Couple showpieces, Artificial plants, Other showpieces' },
    { name: 'Mugs & Drinkers', slug: 'mugs-drinkers', description: 'Mugs & cups, Sippers, Insulated bottles, Tumblers, Glass containers' },
    { name: 'Customisation', slug: 'customisation', description: 'Customised mugs, bottles, pens, folders, laptop bags, keychains, t-shirts, caps, tote bags' },
    { name: 'Flower Corner', slug: 'flower-corner', description: 'All original flowers, Handmade flowers, Bamboo plants, Gift boxes, Hamper boxes, Gift bags, Ready bouquets' },
    { name: 'Jewellery Section', slug: 'jewellery', description: 'Bracelets, Rings, Necklaces, Clutchers, Earrings, Wrist watches, Envelopes, Goggles' },
    { name: 'Stationery and Decor', slug: 'stationery-decor', description: 'Diaries, Fancy pouches, Fancy tiffins (ready for laser-customization), Colour sets, Decor items' },
    { name: 'Seasonal Section / Display Section', slug: 'seasonal-display', description: 'Dynamic seasonal, festival, and event display items' },
    { name: 'Other', slug: 'other-gifts', description: 'Wall hangings, Wind chimes, Large frames, and unique gifting novelties' },
    { name: 'Chocolates & Special Highlight', slug: 'chocolates-human-miniatures', description: 'All varieties of chocolates, and our Main Attraction: Handcrafted 3D Human Miniatures' },
];
const STARTER_PRODUCTS = [
    {
        name: '3D Human Miniature (8 inch - Resin Hand-Painted)',
        slug: '3d-human-miniature-8-inch',
        description: 'Our Main Attraction: Handcrafted, hyper-detailed 3D human miniature sculpted from your photographs, 3D printed in premium resin, and hand-painted by artisan painters. Ideal for birthdays, anniversaries, and unforgettable milestone gifts.',
        categorySlug: 'chocolates-human-miniatures',
        sku: 'MINI-3D-8INCH',
        price: 499900, // ₹4,999.00
        customFields: {
            isCustomizable: true,
            customizationType: 'HUMAN_MINIATURE_3D',
        },
        variantCustomFields: {
            dimensions: '8 inch height',
            material: 'High-Definition Photopolymer Resin',
        },
    },
    {
        name: '3D Human Miniature Couple (8 inch - Double Figurine)',
        slug: '3d-human-miniature-couple',
        description: 'Custom 3D miniature couple sculpted from your photographs, mounted on a solid wooden display base. Features fine hand-painted attire, expressions, and posture. A timeless anniversary and wedding gift.',
        categorySlug: 'chocolates-human-miniatures',
        sku: 'MINI-3D-COUPLE',
        price: 899900, // ₹8,999.00
        customFields: {
            isCustomizable: true,
            customizationType: 'HUMAN_MINIATURE_3D',
        },
        variantCustomFields: {
            dimensions: '8 inch height x 6 inch width',
            material: 'Resin & Hardwood Base',
        },
    },
    {
        name: 'Personalized LED Lighting Acrylic Photo Frame',
        slug: 'personalized-led-acrylic-photo-frame',
        description: 'Custom engraved acrylic night lamp frame with warm LED wooden base. Features your favorite photograph with a custom engraved date or message.',
        categorySlug: 'photo-frames',
        sku: 'FRAME-LED-01',
        price: 129900, // ₹1,299.00
        customFields: {
            isCustomizable: true,
            customizationType: 'PHOTO_PRINT',
        },
        variantCustomFields: {
            dimensions: '7 x 5 inches',
            material: 'Optical Grade Acrylic & Beechwood',
        },
    },
    {
        name: 'Laser-Engraved Smart Temperature Bottle (500ml)',
        slug: 'laser-engraved-smart-temperature-bottle',
        description: 'Matte black double-wall insulated stainless steel flask with digital touch LED temperature display. Permanently laser-engraved with your name or initials.',
        categorySlug: 'customisation',
        sku: 'BOTTLE-SMART-01',
        price: 89900, // ₹899.00
        customFields: {
            isCustomizable: true,
            customizationType: 'LASER_ENGRAVING',
        },
        variantCustomFields: {
            dimensions: '500ml capacity',
            material: 'Food Grade 304 Stainless Steel',
        },
    },
    {
        name: 'Luxury Red Velvet Flower & Chocolates Gift Hamper',
        slug: 'luxury-flower-chocolates-gift-hamper',
        description: 'Exquisite handcrafted bouquet of red roses, paired with imported artisan chocolates in a luxury reusable keepsake gift box.',
        categorySlug: 'flower-corner',
        sku: 'HAMPER-FLOWER-01',
        price: 249900, // ₹2,499.00
        customFields: {
            isCustomizable: false,
            customizationType: 'NONE',
        },
        variantCustomFields: {
            dimensions: 'Large Hamper',
            material: 'Keepsake Box & Fresh Flowers',
        },
    },
    {
        name: 'Artisan Romantic Couple Showpiece (Handcrafted)',
        slug: 'artisan-romantic-couple-showpiece',
        description: 'Handcrafted resin sculpture capturing a romantic embrace, finished in antique bronze and gold leafing. Perfect for bedroom and living room decor.',
        categorySlug: 'showpieces',
        sku: 'SHOW-COUPLE-01',
        price: 159900, // ₹1,599.00
        customFields: {
            isCustomizable: false,
            customizationType: 'NONE',
        },
        variantCustomFields: {
            dimensions: '10 inch height',
            material: 'Cold Cast Bronze Resin',
        },
    },
];
async function seed() {
    console.log('🚀 Bootstrapping Vendure for Custom Gift Hub seeding...');
    const seedConfig = {
        ...vendure_config_1.config,
        apiOptions: {
            ...vendure_config_1.config.apiOptions,
            port: 3005,
        },
    };
    const app = await (0, core_1.bootstrap)(seedConfig);
    const connection = app.get(core_1.TransactionalConnection);
    const requestContextService = app.get(core_1.RequestContextService);
    const channelService = app.get(core_1.ChannelService);
    const collectionService = app.get(core_1.CollectionService);
    const productService = app.get(core_1.ProductService);
    const productVariantService = app.get(core_1.ProductVariantService);
    const countryService = app.get(core_1.CountryService);
    const zoneService = app.get(core_1.ZoneService);
    const taxCategoryService = app.get(core_1.TaxCategoryService);
    const taxRateService = app.get(core_1.TaxRateService);
    const searchService = app.get(core_1.SearchService);
    // 1. Create superadmin RequestContext
    const superAdminUser = await connection.rawConnection.getRepository(core_1.User).findOneOrFail({
        where: { identifier: 'superadmin' },
        relations: { roles: { channels: true } },
    });
    let ctx = await requestContextService.create({
        apiType: 'admin',
        user: superAdminUser,
    });
    console.log('✅ Admin RequestContext created.');
    // 2. Ensure Country 'India' (IN) exists and is enabled
    const countries = await countryService.findAll(ctx);
    let india = countries.items.find(c => c.code === 'IN');
    if (!india) {
        india = await countryService.create(ctx, {
            code: 'IN',
            enabled: true,
            translations: [{ languageCode: core_1.LanguageCode.en, name: 'India' }],
        });
        console.log('✅ Country India (IN) created.');
    }
    // 3. Ensure Zone 'India' exists
    const zones = await zoneService.findAll(ctx);
    let indiaZone = zones.items.find(z => z.name.toLowerCase() === 'india');
    if (!indiaZone) {
        indiaZone = await zoneService.create(ctx, { name: 'India', memberIds: [india.id] });
        console.log('✅ Zone India created with country IN.');
    }
    // 4. Ensure TaxCategory 'Standard Tax' exists
    const taxCategories = await taxCategoryService.findAll(ctx);
    let standardTaxCategory = taxCategories.items.find(tc => tc.name === 'Standard Tax');
    if (!standardTaxCategory) {
        standardTaxCategory = await taxCategoryService.create(ctx, {
            name: 'Standard Tax',
            isDefault: true,
        });
        console.log('✅ TaxCategory Standard Tax created.');
    }
    // 5. Ensure TaxRate exists for Standard Tax & India Zone
    const taxRates = await taxRateService.findAll(ctx);
    let standardTaxRate = taxRates.items.find(tr => tr.name === 'Standard Tax (India)');
    if (!standardTaxRate) {
        standardTaxRate = await taxRateService.create(ctx, {
            name: 'Standard Tax (India)',
            enabled: true,
            value: 0,
            categoryId: standardTaxCategory.id,
            zoneId: indiaZone.id,
        });
        console.log('✅ TaxRate Standard Tax (India) created.');
    }
    // 6. Configure Default Channel for India (INR, Currency, TaxZone & ShippingZone)
    const defaultChannel = await channelService.getDefaultChannel();
    await channelService.update(ctx, {
        id: defaultChannel.id,
        defaultCurrencyCode: core_1.CurrencyCode.INR,
        availableCurrencyCodes: [core_1.CurrencyCode.INR, core_1.CurrencyCode.USD],
        defaultLanguageCode: core_1.LanguageCode.en,
        availableLanguageCodes: [core_1.LanguageCode.en],
        pricesIncludeTax: true,
        defaultTaxZoneId: indiaZone.id,
        defaultShippingZoneId: indiaZone.id,
    });
    console.log('✅ Default Channel set to INR currency with active India Tax Zone.');
    // Refresh RequestContext so it carries the updated channel with active tax zone
    const freshChannel = await channelService.getDefaultChannel();
    ctx = await requestContextService.create({
        apiType: 'admin',
        user: superAdminUser,
        channelOrToken: freshChannel,
    });
    // 7. Seed 15 Collections
    console.log('📦 Seeding 15 Categories (Collections)...');
    const existingCollections = await collectionService.findAll(ctx);
    const collectionMap = new Map();
    for (const cat of CATEGORIES) {
        let existing = existingCollections.items.find(c => c.slug === cat.slug);
        if (!existing) {
            existing = await collectionService.create(ctx, {
                isPrivate: false,
                translations: [
                    {
                        languageCode: core_1.LanguageCode.en,
                        name: cat.name,
                        slug: cat.slug,
                        description: cat.description,
                    },
                ],
                filters: [],
            });
            console.log(`   + Created Collection: ${cat.name} (/collection/${cat.slug})`);
        }
        else {
            console.log(`   - Existing Collection: ${cat.name}`);
        }
        collectionMap.set(cat.slug, existing);
    }
    // 8. Seed Starter Products
    console.log('🎁 Seeding Highlight Products with INR Pricing & Custom Fields...');
    const existingProducts = await productService.findAll(ctx);
    const collectionProductMap = new Map();
    for (const prod of STARTER_PRODUCTS) {
        let product = existingProducts.items.find(p => p.slug === prod.slug);
        if (!product) {
            product = await productService.create(ctx, {
                translations: [
                    {
                        languageCode: core_1.LanguageCode.en,
                        name: prod.name,
                        slug: prod.slug,
                        description: prod.description,
                    },
                ],
                customFields: prod.customFields,
            });
            console.log(`   + Created Product: ${prod.name}`);
        }
        else {
            console.log(`   - Existing Product: ${prod.name}`);
        }
        // Check if variant exists
        const variantList = await productVariantService.getVariantsByProductId(ctx, product.id);
        if (!variantList.items || variantList.items.length === 0) {
            await productVariantService.create(ctx, [
                {
                    productId: product.id,
                    sku: prod.sku,
                    price: prod.price,
                    translations: [
                        {
                            languageCode: core_1.LanguageCode.en,
                            name: prod.name,
                        },
                    ],
                    customFields: prod.variantCustomFields,
                },
            ]);
            console.log(`   + Created Variant for: ${prod.name} (Price: ₹${prod.price / 100})`);
        }
        // Map for collection filter
        if (!collectionProductMap.has(prod.categorySlug)) {
            collectionProductMap.set(prod.categorySlug, []);
        }
        collectionProductMap.get(prod.categorySlug).push(String(product.id));
    }
    // 9. Assign Products to Collections via filter
    console.log('🔗 Assigning Products to Collections via filter...');
    for (const [slug, productIds] of collectionProductMap.entries()) {
        const targetCollection = collectionMap.get(slug);
        if (targetCollection && productIds.length > 0) {
            await collectionService.update(ctx, {
                id: targetCollection.id,
                filters: [
                    {
                        code: core_1.productIdCollectionFilter.code,
                        arguments: [{ name: 'productIds', value: JSON.stringify(productIds) }],
                    },
                ],
            });
            console.log(`   + Linked ${productIds.length} product(s) to collection "${targetCollection.name}"`);
        }
    }
    console.log('🔍 Reindexing Search...');
    await searchService.reindex(ctx);
    console.log('✅ Search reindexing complete.');
    console.log('\n🎉 ALL DONE! Custom Gift Hub ~ By Chaturmal & Co. is fully configured!');
    await app.close();
    process.exit(0);
}
seed().catch(err => {
    console.error('❌ Error during seeding:', err);
    process.exit(1);
});
