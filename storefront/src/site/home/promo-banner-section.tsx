import Image from 'next/image';
import {Link} from '@/platform/i18n/navigation';
import {getActiveChannel} from '@/platform/vendure/channel';
import {ArrowRight, Sparkles, Tag} from 'lucide-react';

export async function PromoBannerSection() {
    let channel: any = null;
    try {
        channel = await getActiveChannel();
    } catch {}

    const customFields = channel?.customFields || {};
    const bannerUrl = customFields.promoBannerUrl;
    const bannerLink = customFields.promoBannerLink || '/search';
    const discountCode = customFields.promoDiscountCode;
    const headline = customFields.announcementBarText || 'Special Celebration Offers';

    // If admin has not set a banner image or promo code, hide this section
    if (!bannerUrl && !discountCode) {
        return null;
    }

    return (
        <section className="py-10 bg-gradient-to-r from-amber-500/10 via-background to-amber-600/10 border-t border-b">
            <div className="container mx-auto px-4">
                <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 bg-card p-6 md:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Background glow */}
                    <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="space-y-3 max-w-xl text-center md:text-left z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
                            <Sparkles className="size-3.5 text-amber-500 fill-amber-500" />
                            <span>Exclusive Offer</span>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
                            {headline}
                        </h3>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Handcrafted with love in Bharuch. Explore limited-time savings on 3D human miniatures, customized photo frames, mugs, and corporate luxury hampers.
                        </p>

                        {discountCode && (
                            <div className="flex items-center justify-center md:justify-start gap-3 pt-2">
                                <span className="text-xs font-medium text-muted-foreground">Use Promo Code:</span>
                                <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-mono font-bold text-sm px-3.5 py-1.5 rounded-lg shadow-sm tracking-wider border border-amber-400">
                                    <Tag className="size-3.5" />
                                    {discountCode}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Banner Image / CTA */}
                    <div className="flex flex-col items-center gap-4 z-10">
                        {bannerUrl ? (
                            <div className="relative w-64 h-36 md:w-80 md:h-44 rounded-xl overflow-hidden shadow-md border bg-background">
                                <Image
                                    src={bannerUrl}
                                    alt={headline}
                                    fill
                                    className="object-cover"
                                    sizes="320px"
                                />
                            </div>
                        ) : null}

                        <Link
                            href={bannerLink}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold text-sm px-6 py-2.5 rounded-xl shadow transition-all hover:gap-3"
                        >
                            <span>Claim Offer Now</span>
                            <ArrowRight className="size-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
