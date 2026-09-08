import {cacheLife, cacheTag} from 'next/cache';
import {query} from '@/platform/vendure/api';
import {GetTopCollectionsQuery} from './graphql';
import {CATEGORIES_CONFIG} from '@/config/categories';

export async function getTopCollections(locale: string) {
    'use cache';
    cacheLife('days');
    cacheTag(`collections-${locale}`);

    try {
        const result = await query(GetTopCollectionsQuery, undefined, {languageCode: locale});
        if (result?.data?.collections?.items?.length) {
            return result.data.collections.items;
        }
    } catch (e) {
        console.warn('Vendure API unavailable during build/fetch, using default categories configuration:', (e as Error).message);
    }

    return CATEGORIES_CONFIG.map((cat, idx) => ({
        id: String(idx + 1),
        name: cat.name,
        slug: cat.slug,
    }));
}

