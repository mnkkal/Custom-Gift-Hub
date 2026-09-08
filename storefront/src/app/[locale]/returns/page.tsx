import { Metadata } from 'next';
import { ShieldAlert, CheckCircle2, AlertTriangle, Video } from 'lucide-react';
import { SITE_NAME } from '@/config/metadata';

export const metadata: Metadata = {
    title: `Return & Refund Policy - ${SITE_NAME}`,
    description: 'Return and Refund Policy for Custom Gift Hub ~ By Chaturmal & Co. Clear rules for standard items, customized goods, and 3D human miniatures.',
};

export default function ReturnsPage() {
    return (
        <main className="container mx-auto px-4 py-16 max-w-4xl min-h-[70vh]">
            <div className="space-y-4 mb-12">
                <div className="text-xs font-semibold text-primary uppercase tracking-wider">Customer Policy</div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Return & Refund Policy</h1>
                <p className="text-muted-foreground text-sm">Last updated: September 2026</p>
            </div>

            <div className="space-y-8 text-sm md:text-base leading-relaxed text-muted-foreground">
                {/* Highlight Notice */}
                <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-4">
                    <AlertTriangle className="size-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <div className="text-foreground text-sm">
                        <div className="font-bold mb-1 text-base">Important Notice on Personalized & 3D Items</div>
                        Because customized gifts (laser-engraved bottles, pens, customized mugs) and handcrafted <strong>3D Human Miniatures</strong> are bespoke artworks manufactured specifically for you, <strong>they cannot be returned, exchanged, or refunded</strong> once production has commenced.
                    </div>
                </div>

                <section className="space-y-3">
                    <h2 className="text-xl font-bold text-foreground">1. Non-Personalized Products (Standard Stock)</h2>
                    <p>
                        For non-personalized items (e.g., standard soft toys, non-customized wall clocks, unengraved ready showpieces):
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>You may request a return or exchange within <strong>48 hours</strong> of package delivery.</li>
                        <li>The item must be unused, unwashed, and in its original retail packaging with all protective tags attached.</li>
                        <li>Return courier fees for non-defective returns are the responsibility of the customer.</li>
                    </ul>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-bold text-foreground">2. Personalized Items & 3D Human Miniatures</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong>Cancellation Window:</strong> You may cancel or amend your personalized order within <strong>4 hours</strong> of placement by contacting us immediately.
                        </li>
                        <li>
                            <strong>After 4 Hours:</strong> Our artists begin 3D digital sculpting, slicing, resin printing, and laser calibration. From this point forward, cancellations and refunds cannot be granted.
                        </li>
                    </ul>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-bold text-foreground">3. Transit Damage & Defective Replacements</h2>
                    <p>
                        We pack every fragile gift and 3D sculpture in heavy-duty protective materials. In the unlikely event that your order is damaged during transit:
                    </p>
                    <div className="p-4 rounded-xl bg-card border space-y-3">
                        <div className="flex items-center gap-2 font-semibold text-foreground">
                            <Video className="size-5 text-primary" />
                            <span>Mandatory Unboxing Video Protocol:</span>
                        </div>
                        <ol className="list-decimal pl-5 space-y-1 text-sm">
                            <li>Record a clear, continuous 360° video while opening the outer courier parcel and inspecting the inner gift box.</li>
                            <li>Notify us within <strong>24 hours</strong> of delivery by emailing <a href="mailto:chelwaniarchita22@gmail.com" className="text-primary underline">chelwaniarchita22@gmail.com</a> with your order number and the unboxing video.</li>
                            <li>Upon verification of transit breakage, we will craft and dispatch a <strong>free replacement</strong> promptly at no extra charge.</li>
                        </ol>
                    </div>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-bold text-foreground">4. Refund Processing</h2>
                    <p>
                        Eligible refunds (for orders cancelled within the 4-hour window or approved standard returns) are credited to the original source account (UPI / Bank Account) within <strong>5 to 7 business days</strong>.
                    </p>
                </section>
            </div>
        </main>
    );
}
