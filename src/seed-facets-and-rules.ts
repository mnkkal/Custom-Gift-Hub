import {
  bootstrap,
  ChannelService,
  CollectionService,
  FacetService,
  FacetValueService,
  LanguageCode,
  ProductService,
  ProductVariantService,
  RequestContextService,
  SearchService,
  User,
} from '@vendure/core';
import { facetValueCollectionFilter } from '@vendure/core/dist/config/catalog/default-collection-filters';
import { config } from './vendure-config';

interface CategoryFacetDefinition {
  collectionSlug: string;
  facetValueCode: string;
  facetValueName: string;
}

const CATEGORY_FACETS: CategoryFacetDefinition[] = [
  { collectionSlug: 'chocolates-human-miniatures', facetValueCode: '3d-miniatures-chocolates', facetValueName: '3D Human Miniatures & Chocolates' },
  { collectionSlug: 'photo-frames', facetValueCode: 'photo-frames', facetValueName: 'Photo Frames' },
  { collectionSlug: 'customisation', facetValueCode: 'customisation', facetValueName: 'Customisation & Engraving' },
  { collectionSlug: 'flower-corner', facetValueCode: 'flower-corner', facetValueName: 'Flower Corner & Hampers' },
  { collectionSlug: 'showpieces', facetValueCode: 'showpieces', facetValueName: 'Artisan Showpieces' },
  { collectionSlug: 'mugs-drinkers', facetValueCode: 'mugs-drinkers', facetValueName: 'Mugs & Drinkers' },
  { collectionSlug: 'wall-frames', facetValueCode: 'wall-frames', facetValueName: 'Wall Frames' },
  { collectionSlug: 'wall-clocks', facetValueCode: 'wall-clocks', facetValueName: 'Wall Clocks' },
  { collectionSlug: 'handbags', facetValueCode: 'handbags', facetValueName: 'Handbags & Purses' },
  { collectionSlug: 'jewellery', facetValueCode: 'jewellery', facetValueName: 'Jewellery Section' },
  { collectionSlug: 'perfume', facetValueCode: 'perfume', facetValueName: 'Perfumes & Scents' },
  { collectionSlug: 'stationery-decor', facetValueCode: 'stationery-decor', facetValueName: 'Stationery & Decor' },
  { collectionSlug: 'kids', facetValueCode: 'kids', facetValueName: 'Kids Toys & Plushies' },
  { collectionSlug: 'seasonal-display', facetValueCode: 'seasonal-display', facetValueName: 'Seasonal & Festive Display' },
  { collectionSlug: 'other-gifts', facetValueCode: 'other-gifts', facetValueName: 'Other Unique Gifts' },
];

// Map existing starter products to their category facet code
const PRODUCT_CATEGORY_MAP: Record<string, string> = {
  '3d-human-miniature-8-inch': '3d-miniatures-chocolates',
  '3d-human-miniature-couple': '3d-miniatures-chocolates',
  'personalized-led-acrylic-photo-frame': 'photo-frames',
  'laser-engraved-smart-temperature-bottle': 'customisation',
  'luxury-flower-chocolates-gift-hamper': 'flower-corner',
  'artisan-romantic-couple-showpiece': 'showpieces',
  'luxury-couple-perfume-hamper': 'perfume',
  'ganesha-artisan-resin-murti': 'showpieces',
};

async function run() {
  console.log('🚀 Starting Automatic Category & Facet Rules Seeder for Custom Gift Hub...');
  const app = await bootstrap(config);

  const requestContextService = app.get(RequestContextService);
  const channelService = app.get(ChannelService);
  const facetService = app.get(FacetService);
  const facetValueService = app.get(FacetValueService);
  const collectionService = app.get(CollectionService);
  const productService = app.get(ProductService);
  const searchService = app.get(SearchService);

  // 1. Superadmin RequestContext
  const defaultChannel = await channelService.getDefaultChannel();
  const superAdminUser = await app.get(ChannelService)['connection'].rawConnection.getRepository(User).findOneOrFail({
    where: { identifier: 'superadmin' },
    relations: { roles: { channels: true } },
  });

  const ctx = await requestContextService.create({
    apiType: 'admin',
    user: superAdminUser,
    channelOrToken: defaultChannel,
  });

  console.log('✅ Admin RequestContext initialized.');

  // 2. Ensure "Category" Facet exists
  console.log('\n🏷️  Checking/Creating "Category" Facet...');
  let categoryFacet = await facetService.findByCode(ctx, 'category', LanguageCode.en);
  if (!categoryFacet) {
    categoryFacet = await facetService.create(ctx, {
      code: 'category',
      isPrivate: false,
      translations: [
        {
          languageCode: LanguageCode.en,
          name: 'Category',
        },
      ],
    });
    console.log(`   + Created Facet: "Category" (code: category, ID: ${categoryFacet.id})`);
  } else {
    console.log(`   - Found existing Facet: "Category" (ID: ${categoryFacet.id})`);
  }

  // Reload facet with values
  const allFacetValues = await facetValueService.findByFacetId(ctx, categoryFacet.id);
  const facetValueMap = new Map<string, any>();
  for (const fv of allFacetValues) {
    facetValueMap.set(fv.code, fv);
  }

  // 3. Create all 15 Facet Values
  console.log('\n🎯 Ensuring all 15 Category Facet Values exist...');
  for (const item of CATEGORY_FACETS) {
    let fv = facetValueMap.get(item.facetValueCode);
    if (!fv) {
      fv = await facetValueService.create(ctx, categoryFacet as any, {
        code: item.facetValueCode,
        translations: [
          {
            languageCode: LanguageCode.en,
            name: item.facetValueName,
          },
        ],
      });
      console.log(`   + Created FacetValue: "${item.facetValueName}" (code: ${item.facetValueCode}, ID: ${fv.id})`);
    } else {
      console.log(`   - Existing FacetValue: "${item.facetValueName}" (ID: ${fv.id})`);
    }
    facetValueMap.set(item.facetValueCode, fv);
  }

  // 4. Update Collections with Automatic Filter Rule (facetValueCollectionFilter)
  console.log('\n⚙️  Configuring Automatic Collection Filters (facetValueCollectionFilter)...');
  const collections = await collectionService.findAll(ctx);

  for (const item of CATEGORY_FACETS) {
    const collection = collections.items.find(c => c.slug === item.collectionSlug);
    const fv = facetValueMap.get(item.facetValueCode);

    if (collection && fv) {
      // Configure facet-value-filter
      await collectionService.update(ctx, {
        id: collection.id,
        filters: [
          {
            code: facetValueCollectionFilter.code,
            arguments: [
              { name: 'facetValueIds', value: JSON.stringify([String(fv.id)]) },
              { name: 'containsAny', value: 'true' },
              { name: 'combineWithAnd', value: 'true' },
            ],
          },
        ],
      });
      console.log(`   ✓ Linked Collection "${collection.name}" -> Auto Rule: Category = "${item.facetValueName}"`);
    } else {
      console.warn(`   ⚠️  Could not find collection for slug "${item.collectionSlug}"`);
    }
  }

  // 5. Tag Existing Starter Products AND Variants with their corresponding Category Facet Value
  console.log('\n📦 Tagging Existing Products & Variants with Category Facet Values...');
  const products = await productService.findAll(ctx);
  const productVariantService = app.get(ProductVariantService);

  for (const product of products.items) {
    const targetFacetCode = PRODUCT_CATEGORY_MAP[product.slug];
    if (targetFacetCode) {
      const fv = facetValueMap.get(targetFacetCode);
      if (fv) {
        const existingFacetIds = (product.facetValues || []).map(f => String(f.id));
        if (!existingFacetIds.includes(String(fv.id))) {
          const updatedFacetIds = [...existingFacetIds, String(fv.id)];
          await productService.update(ctx, {
            id: product.id,
            facetValueIds: updatedFacetIds,
          });
          console.log(`   ✓ Tagged product "${product.name}" with FacetValue "${fv.name}"`);
        }

        // Tag all variants of this product as well
        const variants = await productVariantService.getVariantsByProductId(ctx, product.id);
        for (const variant of variants.items) {
          await productVariantService.update(ctx, [
            {
              id: variant.id,
              facetValueIds: [String(fv.id)],
            },
          ]);
          console.log(`   ✓ Tagged variant SKU "${variant.sku}" with FacetValue "${fv.name}"`);
        }
      }
    }
  }

  // 6. Trigger Collection Filter Execution & Reindex Search
  console.log('\n🔄 Re-evaluating Collection Filters & Reindexing Search...');
  const updatedCollections = await collectionService.findAll(ctx);
  for (const col of updatedCollections.items) {
    await (collectionService as any).applyCollectionFiltersInternal(col, false);
    console.log(`   ✓ Evaluated collection filter for "${col.name}"`);
  }
  await searchService.reindex(ctx);
  console.log('✅ Collection filters applied & search index updated.');

  console.log('\n🎉 SUCCESS! Automatic Category Rules & Facet Values are active!');
  console.log('👉 Any product tagged with Category in the Admin Panel will now automatically appear in its collection on the website.');

  await app.close();
  process.exit(0);
}

run().catch(err => {
  console.error('❌ Error executing facet rules seeder:', err);
  process.exit(1);
});
