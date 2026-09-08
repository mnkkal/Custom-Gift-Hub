import { Metadata } from 'next';
import { Truck, Clock, PackageCheck, MapPin, Sparkles } from 'lucide-react';
import { SITE_NAME } from '@/config/metadata';

export const metadata: Metadata = {
    title: `Shipping Policy - ${SITE_NAME}`,
    description: 'Shipping Policy for Custom Gift Hub ~ By Chaturmal & Co. Details on pan-India delivery, 3D miniature crafting timelines, and local Bharuch pickup.',
};

export default function ShippingPage() {
    return (
        <main className="container mx-auto px-4 py-16 max-w-4xl min-h-[70vh]">
            <div className="space-y-4 mb-12">
                <div className="text-xs font-semibold text-primary uppercase tracking-wider">Delivery Information</div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Shipping & Delivery Policy</h1>
                <p className="text-muted-foreground text-sm">Last updated: September 2026</p>
            </div>

            <div className="space-y-8 text-sm md:text-base leading-relaxed text-muted-foreground">
                <section className="space-y-3">
                    <h2 className="text-xl font-bold text-foreground">1. Pan-India Delivery Coverage</h2>
                    <p>
                        <strong>Custom Gift Hub ~ By Chaturmal & Co.</strong> delivers to all major cities, towns, and serviceable rural pin codes across the Republic of India through premier express courier partners.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold text-foreground">2. Crafting & Processing Turnaround Times</h2>
                    <p>
                        Every order has two phases: (1) <strong>Artisan Crafting / Customization</strong>, followed by (2) <strong>Courier Transit</strong>.
                    </p>

                    <div className="grid sm:grid-cols-3 gap-4 pt-2">
                        <div className="p-5 rounded-xl border bg-card space-y-2">
                            <PackageCheck className="size-6 text-primary" />
                            <div className="font-bold text-foreground text-sm">Standard Stock Items</div>
                            <p className="text-xs text-muted-foreground">
                                Dispatched within <strong>24 to 48 hours</strong> of order verification.
                            </p>
                        </div>

                        <div className="p-5 rounded-xl border bg-card space-y-2">
                            <Sparkles className="size-6 text-primary" />
                            <div className="font-bold text-foreground text-sm">Standard Personalized Gifts</div>
                            <p className="text-xs text-muted-foreground">
                                Laser-engraved bottles, custom mugs, lighting photo frames ready in <strong>2 to 4 business days</strong>.
                            </p>
                        </div>

                        <div className="p-5 rounded-xl border bg-card space-y-2">
                            <Clock className="size-6 text-primary" />
                            <div className="font-bold text-foreground text-sm">3D Human Miniatures</div>
                            <p className="text-xs text-muted-foreground">
                                Digital sculpting, precision resin printing, curing, and manual hand-painting take <strong>7 to 12 business days</strong>.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-bold text-foreground">3. Courier Transit Durations</h2>
                    <p>
                        Once your handcrafted gift is dispatched from our workshop in Bharuch, Gujarat:
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5">
                        <li><strong>Gujarat & Western India:</strong> 2 to 4 business days.</li>
                        <li><strong>Metro Cities (Mumbai, Delhi, Bengaluru, Hyderabad, Kolkata, Chennai):</strong> 3 to 5 business days.</li>
                        <li><strong>Rest of India:</strong> 4 to 7 business days.</li>
                    </ul>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-bold text-foreground">4. Local Pickup in Bharuch, Gujarat</h2>
                    <p>
                        Customers located in Bharuch can choose local store pickup during checkout. Visit our counter beside Kanhaiya Dairy, opposite Zadeshwar Bus Stop, Bharuch between 9:00 AM and 10:00 PM once you receive your ready notification. Same-day expedited fulfillment is available on select non-personalized items.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-bold text-foreground">5. Secure Shockproof Packaging</h2>
                    <p>
                        We take extra measures for fragile glassware, clocks, and 3D sculptures. Each item is securely shielded in thick air-bubble cushions, foam encasements, and heavy-duty corrugated cartons designed to withstand postal handling.
                    </p>
                </section>
            </div>
        </main>
    );
}
