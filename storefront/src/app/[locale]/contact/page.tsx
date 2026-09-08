import { Metadata } from 'next';
import { Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SITE_NAME } from '@/config/metadata';

export const metadata: Metadata = {
    title: `Contact Us - ${SITE_NAME}`,
    description: 'Contact Custom Gift Hub ~ By Chaturmal & Co. in Bharuch, Gujarat. Inquiries for personalized gifts, 3D human miniatures, corporate bulk orders, and custom delivery.',
};

export default function ContactPage() {
    return (
        <main className="container mx-auto px-4 py-16 max-w-5xl">
            <div className="text-center space-y-4 mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
                    Get in Touch
                </div>
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight">We Love to Hear From You</h1>
                <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
                    Have a customization inquiry, corporate gifting requirement, or need guidance on 3D human miniatures? Connect with us directly.
                </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-12">
                {/* Contact Information */}
                <div className="lg:col-span-2 space-y-8 bg-card border rounded-3xl p-8 shadow-sm">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Store Information</h2>
                        <p className="text-sm text-muted-foreground">
                            Custom Gift Hub ~ By Chaturmal & Co.
                        </p>
                    </div>

                    <div className="space-y-6 text-sm">
                        <div className="flex items-start gap-3.5">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <MapPin className="size-5" />
                            </div>
                            <div>
                                <div className="font-semibold text-foreground mb-1">Physical Address</div>
                                <p className="text-muted-foreground leading-relaxed">
                                    Beside Kanhaiya Dairy,<br />
                                    Opposite Zadeshwar Bus Stop,<br />
                                    Bharuch, Gujarat, India.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3.5">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <Clock className="size-5" />
                            </div>
                            <div>
                                <div className="font-semibold text-foreground mb-1">Business Hours</div>
                                <p className="text-muted-foreground leading-relaxed">
                                    Monday to Sunday: 9:00 AM – 10:00 PM IST<br />
                                    <span className="text-xs text-primary">Open all 7 days for consultations</span>
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3.5">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <Mail className="size-5" />
                            </div>
                            <div>
                                <div className="font-semibold text-foreground mb-1">Direct Email</div>
                                <a href="mailto:chelwaniarchita22@gmail.com" className="text-muted-foreground hover:text-primary transition-colors underline">
                                    chelwaniarchita22@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t space-y-2">
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Store Pickup & Express</div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Need urgent pickup in Bharuch? Visit our store with your photo references before 2:00 PM for fast fulfillment on ready items.
                        </p>
                    </div>
                </div>

                {/* Contact & Custom Order Form */}
                <div className="lg:col-span-3 bg-card border rounded-3xl p-8 md:p-10 shadow-sm space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Send Us an Enquiry</h2>
                        <p className="text-sm text-muted-foreground">
                            Fill out the form below for 3D miniature estimates, laser cut gifts, or corporate gift inquiries.
                        </p>
                    </div>

                    <form className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-muted-foreground uppercase">Your Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-muted-foreground uppercase">Phone Number</label>
                                <input
                                    type="tel"
                                    placeholder="+91 Mobile number"
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-muted-foreground uppercase">Email Address</label>
                            <input
                                type="email"
                                placeholder="name@example.com"
                                required
                                className="w-full px-4 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-muted-foreground uppercase">Category of Interest</label>
                            <select className="w-full px-4 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                                <option value="human-miniatures">3D Human Miniatures</option>
                                <option value="photo-frames">Personalized Photo Frames</option>
                                <option value="customisation">Laser Engraved Bottles / Mugs / Accessories</option>
                                <option value="hampers">Gift Hampers & Flower Bouquets</option>
                                <option value="corporate">Corporate / Bulk Gifting</option>
                                <option value="other">Other General Enquiry</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-muted-foreground uppercase">Your Message or Custom Request</label>
                            <textarea
                                rows={4}
                                placeholder="Describe what you would like to create (e.g. 8-inch miniature couple, engraved names, timeline)..."
                                required
                                className="w-full px-4 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                            ></textarea>
                        </div>

                        <Button type="submit" size="lg" className="w-full">
                            <Send className="size-4 mr-2" />
                            Submit Enquiry
                        </Button>
                    </form>
                </div>
            </div>
        </main>
    );
}
