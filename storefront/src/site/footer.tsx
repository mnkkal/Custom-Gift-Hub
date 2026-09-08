import { getRouteLocale } from '@/platform/i18n/server';
import { cacheLife, cacheTag } from 'next/cache';
import { getTopCollections } from '@/features/collections/data';
import Image from "next/image";
import { NavigationLink } from '@/site/navigation/navigation-link';
import { getTranslations } from 'next-intl/server';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';

const COPYRIGHT_YEAR = 2026;

async function Copyright() {
    'use cache';
    cacheLife('days');

    const locale = await getRouteLocale();
    const t = await getTranslations({ locale, namespace: 'Footer' });

    return (
        <div>
            &copy; {COPYRIGHT_YEAR} {t('copyright')}
        </div>
    );
}

export async function Footer() {
    'use cache';
    cacheLife('days');

    const locale = await getRouteLocale();
    cacheTag(`footer-${locale}`);

    const t = await getTranslations({ locale, namespace: 'Footer' });
    const collections = await getTopCollections(locale);

    return (
        <footer className="border-t border-border mt-auto bg-muted/20">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Info & Physical Location */}
                    <div className="md:col-span-1 space-y-4">
                        <NavigationLink href="/" className="flex items-center gap-3">
                            <Image src="/logo.png" alt="Custom Gift Hub" width={52} height={52} className="h-12 w-auto rounded-sm object-contain" />
                            <div>
                                <span className="font-bold text-base block leading-tight">Custom Gift Hub</span>
                                <span className="text-xs text-muted-foreground block font-medium">~ By Chaturmal & Co.</span>
                            </div>
                        </NavigationLink>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {t('description')}
                        </p>
                        <div className="space-y-2 pt-2 text-xs text-muted-foreground">
                            <div className="flex items-start gap-2">
                                <MapPin className="size-4 shrink-0 mt-0.5 text-primary" />
                                <span>Beside Kanhaiya Dairy, opposite Zadeshwar Bus Stop, Bharuch, Gujarat</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="size-4 shrink-0 text-primary" />
                                <span>Open 7 Days: 9:00 AM – 10:00 PM</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="size-4 shrink-0 text-primary" />
                                <a href="mailto:chelwaniarchita22@gmail.com" className="hover:underline">chelwaniarchita22@gmail.com</a>
                            </div>
                        </div>
                    </div>

                    {/* Categories Column */}
                    <div>
                        <p className="text-sm font-semibold mb-4">{t('categories')}</p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            {collections.slice(0, 8).map((collection) => (
                                <li key={collection.id}>
                                    <NavigationLink
                                        href={`/collection/${collection.slug}`}
                                        className="hover:text-foreground transition-colors"
                                    >
                                        {collection.name}
                                    </NavigationLink>
                                </li>
                            ))}
                            <li>
                                <NavigationLink href="/search" className="text-primary font-medium hover:underline">
                                    View All 15 Categories &rarr;
                                </NavigationLink>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Support */}
                    <div>
                        <p className="text-sm font-semibold mb-4">{t('customer')}</p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <NavigationLink href="/search" className="hover:text-foreground transition-colors">
                                    {t('shopAll')}
                                </NavigationLink>
                            </li>
                            <li>
                                <NavigationLink href="/account/orders" className="hover:text-foreground transition-colors">
                                    {t('orders')}
                                </NavigationLink>
                            </li>
                            <li>
                                <NavigationLink href="/faq" className="hover:text-foreground transition-colors">
                                    {t('faq')}
                                </NavigationLink>
                            </li>
                            <li>
                                <NavigationLink href="/about" className="hover:text-foreground transition-colors">
                                    {t('about')}
                                </NavigationLink>
                            </li>
                            <li>
                                <NavigationLink href="/contact" className="hover:text-foreground transition-colors">
                                    {t('contact')}
                                </NavigationLink>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Policies */}
                    <div>
                        <p className="text-sm font-semibold mb-4">{t('company')}</p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <NavigationLink href="/terms" className="hover:text-foreground transition-colors">
                                    {t('terms')}
                                </NavigationLink>
                            </li>
                            <li>
                                <NavigationLink href="/privacy" className="hover:text-foreground transition-colors">
                                    {t('privacy')}
                                </NavigationLink>
                            </li>
                            <li>
                                <NavigationLink href="/returns" className="hover:text-foreground transition-colors">
                                    {t('returns')}
                                </NavigationLink>
                            </li>
                            <li>
                                <NavigationLink href="/shipping" className="hover:text-foreground transition-colors">
                                    {t('shipping')}
                                </NavigationLink>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                    <Copyright />
                    <div>
                        <span>{t('poweredBy')}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
