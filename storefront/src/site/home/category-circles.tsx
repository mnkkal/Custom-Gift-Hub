'use client';

import Image from "next/image";
import {Link} from "@/platform/i18n/navigation";
import {CATEGORIES_CONFIG} from "@/config/categories";
import {Sparkles} from "lucide-react";

export function CategoryCircles() {
    return (
        <section className="border-b bg-card/60 backdrop-blur-sm py-8">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <div className="flex items-center gap-2">
                            <Sparkles className="size-4 text-amber-500 fill-amber-500" />
                            <h2 className="text-lg md:text-xl font-bold tracking-tight text-foreground">
                                Explore by Category
                            </h2>
                            <span className="text-[11px] font-semibold bg-amber-500/15 text-amber-600 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                15 Collections
                            </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Handcrafted 3D miniatures, personalized gifts, frames & luxury surprises
                        </p>
                    </div>

                    <Link
                        href="/search"
                        className="text-xs font-semibold text-amber-600 hover:text-amber-700 hover:underline hidden sm:inline-block"
                    >
                        View All Categories →
                    </Link>
                </div>

                {/* Horizontal Scrollable Category Circles */}
                <div className="flex items-start gap-4 md:gap-6 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-amber-500/20 scrollbar-track-transparent">
                    {CATEGORIES_CONFIG.map((cat) => (
                        <Link
                            key={cat.slug}
                            href={`/collection/${cat.slug}`}
                            className="flex flex-col items-center gap-2.5 shrink-0 group focus:outline-none"
                            style={{width: '92px'}}
                        >
                            <div className="relative">
                                {/* Story circle outline with gradient */}
                                <div className="size-[78px] md:size-[84px] rounded-full p-[2.5px] bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 group-hover:from-amber-600 group-hover:to-yellow-300 transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:scale-105">
                                    <div className="size-full rounded-full overflow-hidden bg-background p-0.5 border border-white/40 dark:border-white/10">
                                        <Image
                                            src={cat.image}
                                            alt={cat.name}
                                            width={84}
                                            height={84}
                                            className="size-full object-cover rounded-full transition-transform duration-300 group-hover:scale-110"
                                        />
                                    </div>
                                </div>

                                {/* Hot/Badge chip */}
                                {cat.badge && (
                                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-600 to-amber-500 text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-full shadow whitespace-nowrap uppercase tracking-tighter">
                                        {cat.badge === 'MAIN ATTRACTION' ? '3D HERO' : cat.badge}
                                    </span>
                                )}
                            </div>

                            <span className="text-xs font-medium text-center text-foreground group-hover:text-amber-600 transition-colors line-clamp-2 leading-tight">
                                {cat.shortTitle}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
