import { Metadata } from 'next';
import Image from 'next/image';
import { Sparkles, Heart, ShieldCheck, Clock, MapPin, Award, Smile } from 'lucide-react';
import { SITE_NAME } from '@/config/metadata';

export const metadata: Metadata = {
    title: `About Us - ${SITE_NAME}`,
    description: 'Learn about Custom Gift Hub ~ By Chaturmal & Co. Making gifting easy, meaningful, and memorable with personalized gifts, 3D miniatures, and handcrafted hampers in Bharuch, Gujarat.',
};

const values = [
    {
        icon: Sparkles,
        title: 'Creativity',
        description: 'Constantly designing novel gifting ideas, intricate 3D sculptures, and customized keepsakes.',
    },
    {
        icon: Award,
        title: 'Uncompromised Quality',
        description: 'Only high-grade materials, precision laser etching, and hand-painted resin 3D miniatures.',
    },
    {
        icon: Heart,
        title: 'Personalisation',
        description: 'Transforming memories, names, and photographs into permanent, heartfelt emotional treasures.',
    },
    {
        icon: Smile,
        title: 'Customer Delight',
        description: 'Dedicated to ensuring every recipient feels genuinely special and valued on their big day.',
    },
    {
        icon: ShieldCheck,
        title: 'Trust & Reliability',
        description: 'Rooted in the legacy of Chaturmal & Co., delivering on time with safe pan-India shipping.',
    },
];

export default function AboutPage() {
    return (
        <main className="container mx-auto px-4 py-16 max-w-5xl">
            {/* Hero Header */}
            <div className="text-center space-y-4 mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
                    Our Story & Values
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                    Custom Gift Hub <span className="text-primary font-normal">~ By Chaturmal & Co.</span>
                </h1>
                <p className="text-xl md:text-2xl text-primary font-serif italic max-w-xl mx-auto">
                    &ldquo;Think Gift, Think Us!&rdquo;
                </p>
            </div>

            {/* Main Story & Mission */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                        Making Gifting Easy, Meaningful & Memorable
                    </h2>
                    <p>
                        At <strong>Custom Gift Hub ~ By Chaturmal & Co.</strong>, we believe that a gift should speak directly to the heart. Whether celebrating a birthday, an anniversary, festive joy, or corporate milestones, our purpose is to replace ordinary gifts with personalized wonders that evoke genuine emotion.
                    </p>
                    <p>
                        From our retail store in Bharuch, Gujarat, we craft a wide range of personalized gifts—from laser-engraved bottles, lighting photo frames, luxury hampers, and watches to our signature highlight: <strong>Hand-Painted 3D Human Miniatures</strong> sculpted accurately from your photographs.
                    </p>
                    <div className="p-4 rounded-xl bg-card border border-primary/20 space-y-2">
                        <div className="text-sm font-semibold text-foreground uppercase tracking-wide">Our Mission</div>
                        <p className="text-sm text-muted-foreground">
                            To make gifting easy, meaningful and memorable by offering creative, high-quality and personalised gifting solutions.
                        </p>
                    </div>
                </div>

                <div className="relative flex justify-center items-center p-8 bg-gradient-to-br from-primary/5 via-muted to-muted/50 rounded-3xl border shadow-sm">
                    <Image
                        src="/logo.png"
                        alt="Custom Gift Hub ~ By Chaturmal & Co."
                        width={360}
                        height={360}
                        className="w-full max-w-xs h-auto object-contain drop-shadow-md rounded-2xl"
                    />
                </div>
            </div>

            {/* Core Values */}
            <div className="mb-20">
                <div className="text-center space-y-3 mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Our Core Values</h2>
                    <p className="text-muted-foreground max-w-lg mx-auto text-sm">
                        The fundamental principles that guide every single gift we craft and ship.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {values.map((v, i) => (
                        <div key={i} className="p-6 rounded-2xl border bg-card hover:shadow-md transition-shadow space-y-3">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                <v.icon className="size-6" />
                            </div>
                            <h3 className="font-bold text-lg">{v.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Store Location & Hours */}
            <div className="p-8 md:p-12 rounded-3xl bg-card border shadow-sm space-y-8">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Visit Our Retail Store in Bharuch</h2>
                    <p className="text-muted-foreground text-sm">
                        Experience our handcrafted gifts, view 3D human miniature samples, and consult our customization specialists in person.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 pt-4">
                    <div className="flex items-start gap-4 p-5 rounded-xl bg-muted/30 border">
                        <MapPin className="size-6 text-primary shrink-0 mt-1" />
                        <div>
                            <div className="font-semibold text-base mb-1">Physical Location</div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Custom Gift Hub, beside Kanhaiya Dairy,<br />
                                opposite Zadeshwar Bus Stop,<br />
                                Bharuch, Gujarat, India.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-5 rounded-xl bg-muted/30 border">
                        <Clock className="size-6 text-primary shrink-0 mt-1" />
                        <div>
                            <div className="font-semibold text-base mb-1">Business Hours</div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Monday – Sunday (All 7 Days)<br />
                                9:00 AM to 10:00 PM IST<br />
                                <span className="text-primary font-medium">Walk-ins & Order Consultations Welcome</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
