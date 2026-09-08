import { Metadata } from 'next';
import { SITE_NAME } from '@/config/metadata';

export const metadata: Metadata = {
    title: `Terms & Conditions - ${SITE_NAME}`,
    description: 'Terms and Conditions governing orders, customized items, 3D human miniatures, and services at Custom Gift Hub ~ By Chaturmal & Co.',
};

export default function TermsPage() {
    return (
        <main className="container mx-auto px-4 py-16 max-w-4xl min-h-[70vh]">
            <div className="space-y-4 mb-12">
                <div className="text-xs font-semibold text-primary uppercase tracking-wider">Legal Document</div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Terms and Conditions</h1>
                <p className="text-muted-foreground text-sm">Last updated: September 2026</p>
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-sm md:text-base leading-relaxed text-muted-foreground">
                <section className="space-y-3">
                    <h2 className="text-xl font-bold text-foreground">1. Introduction & Acceptance</h2>
                    <p>
                        Welcome to <strong>Custom Gift Hub ~ By Chaturmal & Co.</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;). By visiting our website or purchasing products from our online store or retail outlet located beside Kanhaiya Dairy, opposite Zadeshwar Bus Stop, Bharuch, Gujarat, India, you agree to be bound by these Terms and Conditions.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-bold text-foreground">2. Personalized Products & 3D Human Miniatures</h2>
                    <p>
                        Our store specializes in customized items, laser-engraved gifts, and handcrafted 3D human miniatures.
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong>Artistic Representation:</strong> 3D Human Miniatures are digital artistic interpretations created from 2D photographs. While we strive for maximum resemblance, slight variations in facial contours, skin shading, and hand-painted hair texture are intrinsic to bespoke craftsmanship and do not qualify as manufacturing defects.
                        </li>
                        <li>
                            <strong>Customer Photo Warranties:</strong> You warrant that any photograph, logo, or artwork uploaded for customization belongs to you or that you possess full legal authorization to use it. We reserve the right to decline text or imagery deemed offensive, infringing, or inappropriate.
                        </li>
                        <li>
                            <strong>Approval & Lock-In:</strong> Once an order for a personalized gift or 3D miniature passes the 4-hour cancellation window, production commences immediately, and no alterations to text, photos, or sizing can be accommodated.
                        </li>
                    </ul>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-bold text-foreground">3. Pricing and Payments</h2>
                    <p>
                        All prices on the platform are listed in <strong>Indian Rupees (INR / ₹)</strong>. We reserve the right to modify prices without prior notice; however, active confirmed orders will not be subjected to price changes. Payments must be settled in full prior to order dispatch or custom production.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-bold text-foreground">4. Governing Law & Jurisdiction</h2>
                    <p>
                        These Terms and all commercial transactions shall be governed by and construed in accordance with the substantive laws of the Republic of India. Any legal dispute, claim, or proceeding arising under or in connection with Custom Gift Hub shall fall under the exclusive jurisdiction of the competent courts in <strong>Bharuch, Gujarat</strong>.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-bold text-foreground">5. Contact Information</h2>
                    <p>
                        For any queries regarding these Terms, please reach out to:
                        <br />
                        <strong>Custom Gift Hub ~ By Chaturmal & Co.</strong>
                        <br />
                        Beside Kanhaiya Dairy, opposite Zadeshwar Bus Stop, Bharuch, Gujarat, India.
                        <br />
                        Email: <a href="mailto:chelwaniarchita22@gmail.com" className="text-primary hover:underline">chelwaniarchita22@gmail.com</a>
                    </p>
                </section>
            </div>
        </main>
    );
}
