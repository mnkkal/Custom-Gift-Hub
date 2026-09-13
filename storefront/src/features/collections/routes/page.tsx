import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Link } from '@/platform/i18n/navigation';
import { query } from '@/platform/vendure/api';
import {SearchProductsQuery} from '@/features/search/graphql';
import {GetCollectionProductsQuery} from '@/features/collections/graphql';
import {ProductGrid} from '@/features/products/product-grid';
import {FacetFilters} from '@/features/search/facet-filters';
import {ProductGridSkeleton} from '@/features/products/product-grid-skeleton';
import { buildSearchInput, getCurrentPage } from '@/features/search/search-helpers';
import { cacheLife, cacheTag } from 'next/cache';
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { routing } from '@/platform/i18n/routing';
import {
    SITE_NAME,
    truncateDescription,
    buildCanonicalUrl,
    buildOgImages,
} from '@/config/metadata';
import {toOgLocale} from '@/platform/i18n/locale-utils';
import {getActiveCurrencyCode} from '@/features/currency/currency-server';
import {getRouteLocale} from '@/platform/i18n/server';
import Image from 'next/image';
import {getCategoryConfig} from '@/config/categories';
import {getTranslations} from 'next-intl/server';

async function getCollectionProducts(slug: string, searchParams: { [key: string]: string | string[] | undefined }, currencyCode: string) {
    'use cache';
    cacheLife('hours');

    const locale = await getRouteLocale();
    cacheTag(`collection-${slug}-${locale}-${currencyCode}`);
    cacheTag('collection');

    try {
        return await query(SearchProductsQuery, {
            input: buildSearchInput({
                searchParams,
                collectionSlug: slug
            })
        }, {languageCode: locale, currencyCode});
    } catch (e) {
        console.warn(`Failed to query collection products for slug "${slug}":`, (e as Error).message);
        return {
            data: {
                search: {
                    totalItems: 0,
                    items: [],
                    facetValues: [],
                }
            }
        } as any;
    }
}

async function getCollectionMetadata(slug: string) {
    'use cache';
    cacheLife('hours');

    const locale = await getRouteLocale();
    cacheTag(`collection-meta-${slug}-${locale}`);

    try {
        const result = await query(GetCollectionProductsQuery, {
            slug,
            input: { take: 0, collectionSlug: slug, groupByProduct: true },
        }, {languageCode: locale});

        if (result?.data?.collection) {
            return result;
        }
    } catch (e) {
        console.warn(`Failed to query collection metadata for slug "${slug}":`, (e as Error).message);
    }

    const categoryConfig = getCategoryConfig(slug);
    return {
        data: {
            collection: categoryConfig ? {
                id: slug,
                name: categoryConfig.name,
                slug: categoryConfig.slug,
                description: categoryConfig.description,
                featuredAsset: categoryConfig.image ? {
                    id: slug,
                    preview: categoryConfig.image
                } : null
            } : null
        }
    } as any;
}

export async function generateMetadata({
    params,
}: PageProps<'/[locale]/collection/[slug]'>): Promise<Metadata> {
    const { slug } = await params;
    const locale = await getRouteLocale();
    const result = await getCollectionMetadata(slug);
    const collection = result.data.collection;

    const t = await getTranslations({locale, namespace: 'Collection'});

    if (!collection) {
        return {
            title: t('collectionNotFound'),
        };
    }

    const description =
        truncateDescription(collection.description) ||
        t('browseCollectionAt', {name: collection.name, siteName: SITE_NAME});
    const ogLocale = toOgLocale(locale);
    const collectionPath = `/collection/${collection.slug}`;

    return {
        title: collection.name,
        description,
        alternates: {
            canonical: buildCanonicalUrl(`/${locale}${collectionPath}`),
            languages: Object.fromEntries(
                routing.locales.map((l) => [l, buildCanonicalUrl(`/${l}${collectionPath}`)])
            ),
        },
        openGraph: {
            title: collection.name,
            description,
            type: 'website',
            locale: ogLocale,
            url: buildCanonicalUrl(`/${locale}${collectionPath}`),
            images: buildOgImages(collection.featuredAsset?.preview, collection.name),
        },
        twitter: {
            card: 'summary_large_image',
            title: collection.name,
            description,
            images: collection.featuredAsset?.preview
                ? [collection.featuredAsset.preview]
                : undefined,
        },
    };
}

export default async function CollectionPage({params, searchParams}: PageProps<'/[locale]/collection/[slug]'>) {
    const { slug } = await params;
    const searchParamsResolved = await searchParams;
    const locale = await getRouteLocale();
    const currencyCode = await getActiveCurrencyCode();
    const t = await getTranslations({locale, namespace: 'Collection'});
    const page = getCurrentPage(searchParamsResolved);

    const productDataPromise = getCollectionProducts(slug, searchParamsResolved, currencyCode);
    const collectionResult = await getCollectionMetadata(slug);
    const collectionName = collectionResult.data.collection?.name ?? slug;

    return (
        <div className="container mx-auto px-4 py-8 mt-16">
            {/* Breadcrumbs */}
            <Breadcrumb className="mb-6">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink render={<Link href="/" />}>{t('home')}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{collectionName}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/* Collection Header & Banner */}
            {(() => {
                const categoryConfig = getCategoryConfig(slug);
                const categoryImage = collectionResult.data.collection?.featuredAsset?.preview || categoryConfig?.image;
                const categoryDescription = collectionResult.data.collection?.description || categoryConfig?.description;

                return (
                    <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-background to-muted border border-border/70 shadow-sm flex flex-col md:flex-row items-center gap-6">
                        {categoryImage && (
                            <div className="relative size-24 md:size-28 rounded-xl overflow-hidden shrink-0 border-2 border-amber-500/30 bg-background shadow-md">
                                <Image
                                    src={categoryImage}
                                    alt={collectionName}
                                    fill
                                    className="object-cover"
                                    sizes="120px"
                                />
                            </div>
                        )}
                        <div className="flex-1 text-center md:text-left space-y-1.5">
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">{collectionName}</h1>
                                {categoryConfig?.badge && (
                                    <span className="bg-amber-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                        {categoryConfig.badge}
                                    </span>
                                )}
                            </div>
                            {categoryDescription && (
                                <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
                                    {categoryDescription}
                                </p>
                            )}
                        </div>
                    </div>
                );
            })()}

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filters Sidebar */}
                <aside className="lg:col-span-1">
                    <Suspense fallback={<div className="h-64 animate-pulse bg-muted rounded-lg" />}>
                        <FacetFilters productDataPromise={productDataPromise} />
                    </Suspense>
                </aside>

                {/* Product Grid */}
                <div className="lg:col-span-3">
                    <Suspense fallback={<ProductGridSkeleton />}>
                        <ProductGrid productDataPromise={productDataPromise} currentPage={page} take={12} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
