'use client';

import {useState} from 'react';
import Image from 'next/image';
import {Link} from '@/platform/i18n/navigation';
import {
    CATEGORIES_CONFIG,
    CategoryConfig
} from '@/config/categories';
import {
    ChevronDown,
    Grid,
    Sparkles,
    ArrowRight,
    Star,
    Layers
} from 'lucide-react';

export function DesktopNav() {
    const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
    const [allCategoriesOpen, setAllCategoriesOpen] = useState(false);

    const miniatureCategory = CATEGORIES_CONFIG.find(c => c.slug === 'chocolates-human-miniatures')!;
    const photoFrameCategory = CATEGORIES_CONFIG.find(c => c.slug === 'photo-frames')!;
    const customisationCategory = CATEGORIES_CONFIG.find(c => c.slug === 'customisation')!;
    const flowerCategory = CATEGORIES_CONFIG.find(c => c.slug === 'flower-corner')!;
    const showpieceCategory = CATEGORIES_CONFIG.find(c => c.slug === 'showpieces')!;
    const fashionCategory = CATEGORIES_CONFIG.find(c => c.slug === 'handbags')!;
    const kidsCategory = CATEGORIES_CONFIG.find(c => c.slug === 'kids')!;
    const seasonalCategory = CATEGORIES_CONFIG.find(c => c.slug === 'seasonal-display')!;

    return (
        <div className="relative border-t border-b bg-card/95 backdrop-blur shadow-sm hidden md:block">
            <div className="container mx-auto px-4">
                <nav className="flex items-center justify-between text-sm font-medium">
                    {/* All Categories Dropdown Trigger */}
                    <div 
                        className="relative"
                        onMouseEnter={() => setAllCategoriesOpen(true)}
                        onMouseLeave={() => setAllCategoriesOpen(false)}
                    >
                        <button
                            type="button"
                            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold px-4 py-3 text-xs tracking-wider uppercase hover:from-amber-600 hover:to-amber-700 transition-colors"
                        >
                            <Grid className="size-4" />
                            <span>All 15 Categories</span>
                            <ChevronDown className={`size-3.5 transition-transform ${allCategoriesOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* All Categories Mega Grid Menu */}
                        {allCategoriesOpen && (
                            <div className="absolute top-full left-0 w-[840px] bg-card border border-border shadow-2xl rounded-b-xl p-5 grid grid-cols-3 gap-3 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
                                {CATEGORIES_CONFIG.map((cat) => (
                                    <Link
                                        key={cat.slug}
                                        href={`/collection/${cat.slug}`}
                                        className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/70 transition-colors border border-transparent hover:border-amber-500/30 group"
                                        onClick={() => setAllCategoriesOpen(false)}
                                    >
                                        <div className="size-12 rounded-lg overflow-hidden shrink-0 border bg-muted/30 p-1 group-hover:scale-105 transition-transform">
                                            <Image
                                                src={cat.image}
                                                alt={cat.name}
                                                width={48}
                                                height={48}
                                                className="size-full object-cover rounded"
                                            />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-1.5">
                                                <span className="font-semibold text-xs text-foreground group-hover:text-amber-600 transition-colors truncate">
                                                    {cat.name}
                                                </span>
                                                {cat.badge && (
                                                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-500/15 text-amber-600 shrink-0">
                                                        {cat.badge}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-[11px] text-muted-foreground truncate">
                                                {cat.subcategories.slice(0, 2).join(', ')}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Primary Horizontal Menu Links */}
                    <div className="flex items-center gap-1 lg:gap-2">
                        {/* 1. 3D Miniatures Highlight Menu */}
                        <div
                            className="relative"
                            onMouseEnter={() => setActiveMegaMenu('3d-miniatures')}
                            onMouseLeave={() => setActiveMegaMenu(null)}
                        >
                            <Link
                                href={`/collection/${miniatureCategory.slug}`}
                                className="flex items-center gap-1.5 px-3 py-3 font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-700 transition-colors relative"
                            >
                                <Sparkles className="size-3.5 text-amber-500 animate-spin-slow" />
                                <span>3D Miniatures</span>
                                <span className="bg-amber-500 text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-full uppercase tracking-tighter">
                                    ★ Hot
                                </span>
                                <ChevronDown className="size-3 text-muted-foreground" />
                            </Link>

                            {activeMegaMenu === '3d-miniatures' && (
                                <MegaMenuContent category={miniatureCategory} onClose={() => setActiveMegaMenu(null)} />
                            )}
                        </div>

                        {/* 2. Photo Frames */}
                        <div
                            className="relative"
                            onMouseEnter={() => setActiveMegaMenu('photo-frames')}
                            onMouseLeave={() => setActiveMegaMenu(null)}
                        >
                            <Link
                                href={`/collection/${photoFrameCategory.slug}`}
                                className="flex items-center gap-1 px-2.5 py-3 hover:text-amber-600 transition-colors"
                            >
                                <span>Photo Frames</span>
                                <span className="bg-primary/10 text-primary text-[9px] font-bold px-1 rounded">LED</span>
                                <ChevronDown className="size-3 text-muted-foreground" />
                            </Link>

                            {activeMegaMenu === 'photo-frames' && (
                                <MegaMenuContent category={photoFrameCategory} onClose={() => setActiveMegaMenu(null)} />
                            )}
                        </div>

                        {/* 3. Customised Gifts */}
                        <div
                            className="relative"
                            onMouseEnter={() => setActiveMegaMenu('customisation')}
                            onMouseLeave={() => setActiveMegaMenu(null)}
                        >
                            <Link
                                href={`/collection/${customisationCategory.slug}`}
                                className="flex items-center gap-1 px-2.5 py-3 hover:text-amber-600 transition-colors"
                            >
                                <span>Customisation</span>
                                <ChevronDown className="size-3 text-muted-foreground" />
                            </Link>

                            {activeMegaMenu === 'customisation' && (
                                <MegaMenuContent category={customisationCategory} onClose={() => setActiveMegaMenu(null)} />
                            )}
                        </div>

                        {/* 4. Flower Corner & Hampers */}
                        <div
                            className="relative"
                            onMouseEnter={() => setActiveMegaMenu('flower-corner')}
                            onMouseLeave={() => setActiveMegaMenu(null)}
                        >
                            <Link
                                href={`/collection/${flowerCategory.slug}`}
                                className="flex items-center gap-1 px-2.5 py-3 hover:text-amber-600 transition-colors"
                            >
                                <span>Flower Corner</span>
                                <ChevronDown className="size-3 text-muted-foreground" />
                            </Link>

                            {activeMegaMenu === 'flower-corner' && (
                                <MegaMenuContent category={flowerCategory} onClose={() => setActiveMegaMenu(null)} />
                            )}
                        </div>

                        {/* 5. Showpieces & Decor */}
                        <div
                            className="relative"
                            onMouseEnter={() => setActiveMegaMenu('showpieces')}
                            onMouseLeave={() => setActiveMegaMenu(null)}
                        >
                            <Link
                                href={`/collection/${showpieceCategory.slug}`}
                                className="flex items-center gap-1 px-2.5 py-3 hover:text-amber-600 transition-colors"
                            >
                                <span>Showpieces & Clocks</span>
                                <ChevronDown className="size-3 text-muted-foreground" />
                            </Link>

                            {activeMegaMenu === 'showpieces' && (
                                <MegaMenuContent 
                                    category={showpieceCategory} 
                                    extraCategorySlugs={['wall-clocks', 'wall-frames']}
                                    onClose={() => setActiveMegaMenu(null)} 
                                />
                            )}
                        </div>

                        {/* 6. Fashion & Bags */}
                        <div
                            className="relative"
                            onMouseEnter={() => setActiveMegaMenu('fashion')}
                            onMouseLeave={() => setActiveMegaMenu(null)}
                        >
                            <Link
                                href={`/collection/${fashionCategory.slug}`}
                                className="flex items-center gap-1 px-2.5 py-3 hover:text-amber-600 transition-colors"
                            >
                                <span>Bags & Jewellery</span>
                                <ChevronDown className="size-3 text-muted-foreground" />
                            </Link>

                            {activeMegaMenu === 'fashion' && (
                                <MegaMenuContent 
                                    category={fashionCategory} 
                                    extraCategorySlugs={['jewellery', 'perfume']}
                                    onClose={() => setActiveMegaMenu(null)} 
                                />
                            )}
                        </div>

                        {/* 7. Kids & Toys */}
                        <div
                            className="relative"
                            onMouseEnter={() => setActiveMegaMenu('kids')}
                            onMouseLeave={() => setActiveMegaMenu(null)}
                        >
                            <Link
                                href={`/collection/${kidsCategory.slug}`}
                                className="flex items-center gap-1 px-2.5 py-3 hover:text-amber-600 transition-colors"
                            >
                                <span>Kids & Toys</span>
                                <ChevronDown className="size-3 text-muted-foreground" />
                            </Link>

                            {activeMegaMenu === 'kids' && (
                                <MegaMenuContent 
                                    category={kidsCategory} 
                                    extraCategorySlugs={['stationery-decor']}
                                    onClose={() => setActiveMegaMenu(null)} 
                                />
                            )}
                        </div>

                        {/* 8. Seasonal Specials */}
                        <div
                            className="relative"
                            onMouseEnter={() => setActiveMegaMenu('seasonal')}
                            onMouseLeave={() => setActiveMegaMenu(null)}
                        >
                            <Link
                                href={`/collection/${seasonalCategory.slug}`}
                                className="flex items-center gap-1 px-2.5 py-3 hover:text-amber-600 transition-colors"
                            >
                                <span>Festive</span>
                                <ChevronDown className="size-3 text-muted-foreground" />
                            </Link>

                            {activeMegaMenu === 'seasonal' && (
                                <MegaMenuContent 
                                    category={seasonalCategory} 
                                    extraCategorySlugs={['other-gifts']}
                                    onClose={() => setActiveMegaMenu(null)} 
                                />
                            )}
                        </div>
                    </div>

                    {/* Corporate Bulk CTA */}
                    <div className="hidden xl:flex items-center gap-2">
                        <Link
                            href="/contact"
                            className="text-xs font-semibold text-amber-600 hover:text-amber-700 bg-amber-50 dark:bg-amber-950/40 px-3 py-1.5 rounded-full border border-amber-300 dark:border-amber-800 transition-colors flex items-center gap-1.5"
                        >
                            <Star className="size-3 text-amber-500 fill-amber-500" />
                            <span>Corporate Bulk Enquiry</span>
                        </Link>
                    </div>
                </nav>
            </div>
        </div>
    );
}

interface MegaMenuContentProps {
    category: CategoryConfig;
    extraCategorySlugs?: string[];
    onClose: () => void;
}

function MegaMenuContent({category, extraCategorySlugs = [], onClose}: MegaMenuContentProps) {
    const extraCategories = extraCategorySlugs
        .map(slug => CATEGORIES_CONFIG.find(c => c.slug === slug))
        .filter((c): c is CategoryConfig => Boolean(c));

    return (
        <div className="absolute top-full left-0 w-[540px] bg-card border border-border shadow-2xl rounded-b-xl p-5 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
            <div className="grid grid-cols-12 gap-5">
                {/* Links Column */}
                <div className="col-span-7 space-y-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1.5">
                            <h4 className="font-bold text-sm text-foreground">{category.name}</h4>
                            {category.badge && (
                                <span className="bg-amber-500/15 text-amber-600 text-[10px] font-bold px-1.5 py-0.2 rounded">
                                    {category.badge}
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                            {category.description}
                        </p>
                        <ul className="space-y-1.5 border-l-2 border-amber-500/40 pl-3">
                            {category.subcategories.map((sub, idx) => (
                                <li key={idx}>
                                    <Link
                                        href={`/collection/${category.slug}`}
                                        onClick={onClose}
                                        className="text-xs text-muted-foreground hover:text-amber-600 hover:translate-x-0.5 transition-all block"
                                    >
                                        • {sub}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {extraCategories.length > 0 && (
                        <div className="pt-2 border-t space-y-2">
                            <span className="text-[11px] font-semibold uppercase text-muted-foreground tracking-wider flex items-center gap-1">
                                <Layers className="size-3" /> Also Explore:
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {extraCategories.map((extra) => (
                                    <Link
                                        key={extra.slug}
                                        href={`/collection/${extra.slug}`}
                                        onClick={onClose}
                                        className="text-xs bg-muted/60 hover:bg-muted font-medium px-2.5 py-1 rounded border hover:text-amber-600 transition-colors"
                                    >
                                        {extra.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Visual Preview Card Column (With Category Dummy Image) */}
                <div className="col-span-5 flex flex-col justify-between bg-muted/30 rounded-xl p-3.5 border">
                    <div>
                        <div className="relative aspect-square w-full rounded-lg overflow-hidden border shadow-sm bg-background mb-3">
                            <Image
                                src={category.image}
                                alt={category.name}
                                fill
                                sizes="200px"
                                className="object-cover"
                            />
                        </div>
                        <h5 className="font-bold text-xs text-foreground line-clamp-1">{category.shortTitle}</h5>
                        <p className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5">
                            Personalized & packed with care in Bharuch
                        </p>
                    </div>

                    <Link
                        href={`/collection/${category.slug}`}
                        onClick={onClose}
                        className="mt-3 flex items-center justify-center gap-1.5 w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-semibold py-2 px-3 rounded-lg shadow-sm transition-all"
                    >
                        <span>Explore Collection</span>
                        <ArrowRight className="size-3.5" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
