import {Sparkles, Phone, MapPin, Truck, Tag} from "lucide-react";
import {Link} from "@/platform/i18n/navigation";
import {getActiveChannel} from "@/platform/vendure/channel";

export async function AnnouncementBar() {
    let channel: any = null;
    try {
        channel = await getActiveChannel();
    } catch {}

    const customFields = channel?.customFields || {};
    const headline = customFields.announcementBarText || "Think gift, Think us! — Handcrafted 3D Human Miniatures & Custom Gifts";
    const promoBadge = customFields.announcementBadge || "FREE PAN-INDIA DELIVERY OVER ₹499";
    const discountCode = customFields.promoDiscountCode;

    return (
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-white text-xs py-1.5 px-4 font-medium tracking-wide shadow-inner">
            <div className="container mx-auto flex items-center justify-between gap-2">
                <div className="hidden lg:flex items-center gap-4 text-amber-100 shrink-0">
                    <span className="flex items-center gap-1.5">
                        <MapPin className="size-3 text-amber-200" />
                        <span>Bharuch, Gujarat • 9:00 AM – 10:00 PM</span>
                    </span>
                    <span className="text-amber-300/60">|</span>
                    <a href="tel:+918369981329" className="flex items-center gap-1.5 hover:text-white transition-colors">
                        <Phone className="size-3 text-amber-200" />
                        <span>+91 83699 81329</span>
                    </a>
                </div>

                <div className="flex-1 text-center flex flex-wrap items-center justify-center gap-2">
                    <Sparkles className="size-3.5 text-yellow-200 animate-pulse hidden sm:inline" />
                    <span className="font-semibold text-white">{headline}</span>

                    {discountCode && (
                        <span className="inline-flex items-center gap-1 bg-amber-900/80 text-amber-200 px-2.5 py-0.5 rounded-full text-[11px] font-bold border border-amber-400/40">
                            <Tag className="size-2.5" />
                            <span>CODE: {discountCode}</span>
                        </span>
                    )}

                    {promoBadge && (
                        <span className="hidden sm:inline bg-amber-800/60 text-amber-100 px-2 py-0.5 rounded-full text-[11px] font-bold border border-amber-400/30">
                            {promoBadge}
                        </span>
                    )}
                </div>

                <div className="hidden lg:flex items-center gap-3 text-amber-100 shrink-0">
                    <Link href="/contact" className="hover:text-white transition-colors flex items-center gap-1">
                        <Truck className="size-3 text-amber-200" />
                        <span>Bulk / Corporate Enquiry</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
