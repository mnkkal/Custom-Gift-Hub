import Image from "next/image";
import {Suspense} from "react";
import {NavigationLink} from '@/site/navigation/navigation-link';
import {NavbarCart} from '@/site/navigation/navbar/navbar-cart';
import {NavbarUser} from '@/site/navigation/navbar/navbar-user';
import {ThemeSwitcher} from '@/site/navigation/navbar/theme-switcher';
import {LanguagePicker} from '@/site/navigation/navbar/language-picker';
import {CurrencyPickerWrapper} from '@/site/navigation/navbar/currency-picker-wrapper';
import {MobileNavWrapper} from '@/site/navigation/navbar/mobile-nav-wrapper';
import {NavbarUserSkeleton} from '@/site/navigation/skeletons/navbar-user-skeleton';
import {AnnouncementBar} from '@/site/navigation/announcement-bar';
import {GiftanaSearch} from '@/site/navigation/giftana-search';
import {DesktopNav} from '@/site/navigation/desktop-nav';
import {Phone, Sparkles} from 'lucide-react';

export function Navbar() {
    return (
        <header className="sticky top-0 left-0 right-0 z-50 bg-background shadow-sm">
            {/* Top Tier: Golden Announcement Bar */}
            <AnnouncementBar />

            {/* Middle Tier: Main Header Row with Logo, Giftana Search & Utilities */}
            <div className="border-b bg-card/90 backdrop-blur-md">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between gap-4 py-3 min-h-[72px]">
                        {/* Mobile Drawer Trigger & Brand Logo */}
                        <div className="flex items-center gap-3">
                            <Suspense>
                                <MobileNavWrapper />
                            </Suspense>
                            <NavigationLink href="/" className="flex items-center gap-3 group">
                                <div className="relative size-11 md:size-12 rounded-lg overflow-hidden border border-amber-500/30 bg-white p-0.5 shadow-sm group-hover:scale-105 transition-transform shrink-0">
                                    <Image
                                        src="/logo.png"
                                        alt="Custom Gift Hub ~ By Chaturmal & Co."
                                        width={48}
                                        height={48}
                                        className="size-full object-contain"
                                        priority
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-1.5">
                                        <span className="font-extrabold text-base md:text-lg tracking-tight text-foreground group-hover:text-amber-600 transition-colors leading-tight">
                                            Custom Gift Hub
                                        </span>
                                    </div>
                                    <span className="text-[10px] md:text-[11px] font-medium text-amber-600 dark:text-amber-400 tracking-wide leading-tight">
                                        By Chaturmal & Co. • Bharuch
                                    </span>
                                </div>
                            </NavigationLink>
                        </div>

                        {/* Center: Giftana-Style Smart Search Bar with Category Filter */}
                        <div className="flex-1 max-w-xl mx-2 hidden md:block">
                            <GiftanaSearch />
                        </div>

                        {/* Right Utility Bar: Help Desk, Currency, Language, Theme, Cart, Profile */}
                        <div className="flex items-center gap-2 lg:gap-3">
                            {/* Contact Helpline pill on desktop */}
                            <a
                                href="tel:+918369981329"
                                className="hidden 2xl:flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border border-border bg-muted/40 hover:bg-muted transition-colors text-foreground"
                            >
                                <Phone className="size-3.5 text-amber-600" />
                                <span>+91 83699 81329</span>
                            </a>

                            <Suspense>
                                <CurrencyPickerWrapper />
                            </Suspense>

                            <Suspense>
                                <LanguagePicker />
                            </Suspense>

                            <Suspense>
                                <ThemeSwitcher />
                            </Suspense>

                            <Suspense>
                                <NavbarCart />
                            </Suspense>

                            <Suspense fallback={<NavbarUserSkeleton />}>
                                <NavbarUser />
                            </Suspense>
                        </div>
                    </div>

                    {/* Mobile Search Row */}
                    <div className="pb-3 md:hidden">
                        <GiftanaSearch />
                    </div>
                </div>
            </div>

            {/* Bottom Tier: Giftana Desktop Menu with All 15 Categories & Mega-Menus */}
            <DesktopNav />
        </header>
    );
}
