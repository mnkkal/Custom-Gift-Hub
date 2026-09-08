import { Metadata } from 'next';
import { SITE_NAME } from '@/config/metadata';

export const metadata: Metadata = {
    title: `Privacy Policy - ${SITE_NAME}`,
    description: 'Privacy Policy of Custom Gift Hub ~ By Chaturmal & Co. How we safeguard customer data and client reference photos for 3D human miniatures.',
};

export default function PrivacyPage() {
    return (
        <main className="container mx-auto px-4 py-16 max-w-4xl min-h-[70vh]">
            <div className="space-y-4 mb-12">
                <div className="text-xs font-semibold text-primary uppercase tracking-wider">Privacy & Protection</div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Privacy Policy</h1>
                <p className="text-muted-foreground text-sm">Last updated: September 2026</p>
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-sm md:text-base leading-relaxed text-muted-foreground">
                <section className="space-y-3">
                    <h2 className="text-xl font-bold text-foreground">1. Overview</h2>
                    <p>
                        At <strong>Custom Gift Hub ~ By Chaturmal & Co.</strong>, we prioritize the confidentiality and safety of your personal information. This Privacy Policy details how we collect, handle, and protect your data when you use our website or purchase gifts from us.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-bold text-foreground">2. Special Policy: Customer Reference Photos (3D Human Miniatures & Photo Gifts)</h2>
                    <p className="p-4 rounded-xl bg-card border border-primary/20 text-foreground font-medium">
                        Because our hallmark specialty is creating custom 3D human miniatures and photo-engraved keepsakes, we handle personal photographs with the utmost care and strict confidentiality.
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong>Sole Purpose Usage:</strong> Your uploaded photos are used exclusively by our 3D design and sculpting artists for modeling facial geometry, proportions, and coloring.
                        </li>
                        <li>
                            <strong>No Public Posting Without Consent:</strong> We will <em>never</em> publish, share, or display your custom miniature photos, recipient portraits, or finished models on our social media channels or marketing portfolios without your prior written permission.
                        </li>
                        <li>
                            <strong>Data Retention & Deletion:</strong> Reference photos are kept on encrypted media during the 3D manufacturing period and may be permanently deleted from our servers upon your written request at any time post-delivery.
                        </li>
                    </ul>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-bold text-foreground">3. Information We Collect</h2>
                    <p>
                        We collect standard customer information necessary to process orders and deliver your gifts safely:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Contact details: Name, email address, phone number.</li>
                        <li>Shipping address: Delivery location, pin code, state.</li>
                        <li>Customization inputs: Inscribed text, names, dates, and uploaded graphic files.</li>
                    </ul>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-bold text-foreground">4. Payment Security</h2>
                    <p>
                        We do not collect or store your sensitive payment card details or net banking credentials. All electronic payments are processed through secure, PCI-DSS compliant Indian payment gateways with end-to-end encryption.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-bold text-foreground">5. Inquiries & Requests</h2>
                    <p>
                        If you have questions about your personal data or wish to request photo deletion post-order, please contact us at <a href="mailto:chelwaniarchita22@gmail.com" className="text-primary hover:underline">chelwaniarchita22@gmail.com</a>.
                    </p>
                </section>
            </div>
        </main>
    );
}
