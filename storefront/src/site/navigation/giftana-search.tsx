'use client';

import {useState} from 'react';
import {Search} from 'lucide-react';
import {useRouter} from '@/platform/i18n/navigation';
import {CATEGORIES_CONFIG} from '@/config/categories';

export function GiftanaSearch() {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = query.trim();
        if (!trimmed && !selectedCategory) return;

        if (selectedCategory && !trimmed) {
            router.push(`/collection/${selectedCategory}`);
            return;
        }

        const params = new URLSearchParams();
        if (trimmed) params.set('q', trimmed);
        if (selectedCategory) params.set('collection', selectedCategory);
        router.push(`/search?${params.toString()}`);
    };

    return (
        <form onSubmit={handleSearch} className="flex items-center w-full max-w-xl mx-auto rounded-full border-2 border-amber-500/80 bg-background shadow-sm hover:border-amber-500 transition-all focus-within:ring-2 focus-within:ring-amber-500/30 overflow-hidden">
            <select
                aria-label="Filter search by category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="hidden sm:block text-xs bg-muted/60 hover:bg-muted font-medium text-foreground px-3 py-2.5 border-r border-border outline-none transition-colors max-w-[130px] truncate cursor-pointer"
            >
                <option value="">All Categories</option>
                {CATEGORIES_CONFIG.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>
                        {cat.shortTitle}
                    </option>
                ))}
            </select>

            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search gifts, 3D miniatures, photo frames, mugs..."
                className="flex-1 px-4 py-2 text-sm bg-transparent outline-none placeholder:text-muted-foreground"
            />

            <button
                type="submit"
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-5 py-2.5 flex items-center justify-center gap-1.5 font-medium text-xs tracking-wider uppercase transition-colors"
                aria-label="Search"
            >
                <Search className="size-4 shrink-0" />
                <span className="hidden md:inline">Search</span>
            </button>
        </form>
    );
}
