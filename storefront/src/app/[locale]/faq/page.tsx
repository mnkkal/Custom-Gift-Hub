import { Metadata } from 'next';
import { HelpCircle, Clock, Truck, ShieldCheck, Mail, Camera, Sparkles } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SITE_NAME } from '@/config/metadata';

export const metadata: Metadata = {
    title: `Frequently Asked Questions - ${SITE_NAME}`,
    description: 'Frequently asked questions about personalized gifts, 3D human miniatures, delivery times, and ordering from Custom Gift Hub in Bharuch, Gujarat.',
};

const faqs = [
    {
        id: 'item-1',
        icon: Sparkles,
        question: 'How can I place an order?',
        answer: 'You can easily place an order online through our website. Simply browse through our categories, select your desired gift, choose your specifications (size, finish, options), enter your custom engraving text or upload your reference photos directly on the product page, and proceed to checkout using any Indian payment method (UPI, credit/debit card, or net banking). You can also visit our retail store in Bharuch, Gujarat for in-person orders.',
    },
    {
        id: 'item-2',
        icon: Sparkles,
        question: 'How does product customisation work?',
        answer: 'For laser-engraved items (bottles, pens, diaries, wooden frames), we etch your custom name, quote, or logo directly into the material. For photo gifts (mugs, lighted frames, crystal frames), we use high-definition UV printing. For our flagship 3D Human Miniatures, our artists digitally sculpt a 3D model from your 2D photographs, print it using high-grade resin, and hand-paint the fine facial contours, hair, and attire before adding a protective curing sealant.',
    },
    {
        id: 'item-3',
        icon: Clock,
        question: 'How long does customisation take?',
        answer: 'Standard customized items (laser engraved bottles, mugs, personalized photo frames, and keychains) are typically crafted and dispatched within 2 to 4 business days. Due to the meticulous manual artistry and digital sculpting involved, 3D Human Miniatures require 7 to 12 business days for complete 3D modeling, resin printing, curing, and hand-painting.',
    },
    {
        id: 'item-4',
        icon: Clock,
        question: 'Can I get same-day or urgent orders?',
        answer: 'Yes! For customers located in or near Bharuch, Gujarat, same-day pickup or local express dispatch is available for select items, such as fresh flower bouquets, ready gift hampers, standard plush toys, and quick 2D photo prints. Please reach out to us directly or visit our store beside Kanhaiya Dairy before 2:00 PM for same-day requests.',
    },
    {
        id: 'item-5',
        icon: Truck,
        question: 'Do you deliver across India?',
        answer: 'Yes, we safely deliver to all serviceable pin codes across India using trusted express logistics partners. Delicate items such as glass frames, lighted showpieces, and 3D human miniatures are packed with multi-layer bubble wrap, foam corner protectors, and reinforced corrugated boxes to guarantee safe arrival.',
    },
    {
        id: 'item-6',
        icon: Camera,
        question: 'What information/photos are required for personalised products & 3D human miniatures?',
        answer: 'For 3D Human Miniatures, please provide: (1) At least one high-resolution, front-facing portrait photo in good lighting showing facial features clearly, (2) An optional side-profile photo to assist with jawline and nose sculpting, and (3) A full-length photo showing your preferred posture and clothing style. For engraved products, simply enter your desired name or text in the personalization field at checkout.',
    },
    {
        id: 'item-7',
        icon: ShieldCheck,
        question: 'Can customised orders be cancelled or returned?',
        answer: 'Customized and 3D miniature orders can be cancelled or edited only within 4 hours of placing the order. Once production, 3D sculpting, or engraving begins, personalized orders cannot be cancelled, returned, or exchanged because they are created exclusively for you. If an item arrives damaged in transit, send us an unboxing video within 24 hours of delivery, and we will replace it free of charge.',
    },
    {
        id: 'item-8',
        icon: Mail,
        question: 'How can I contact you for bulk or corporate orders?',
        answer: 'We specialize in corporate gift sets, employee welcome kits, customized diaries and metal pens, Diwali hampers, and bulk wedding favors with custom branding. Please email us at chelwaniarchita22@gmail.com with your quantity requirements, or visit our store in Bharuch between 9:00 AM and 10:00 PM for sample inspections and volume discounts.',
    },
];

export default function FAQPage() {
    return (
        <main className="container mx-auto px-4 py-16 max-w-4xl min-h-[70vh]">
            <div className="text-center space-y-4 mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
                    <HelpCircle className="size-3.5" />
                    Help & Support
                </div>
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Frequently Asked Questions</h1>
                <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                    Everything you need to know about our personalized gifts, 3D human miniatures, delivery across India, and store policies.
                </p>
            </div>

            <div className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm">
                <Accordion className="w-full space-y-4">
                    {faqs.map((faq) => (
                        <AccordionItem key={faq.id} value={faq.id} className="border-b last:border-b-0 pb-3">
                            <AccordionTrigger className="text-left font-semibold text-base md:text-lg hover:no-underline hover:text-primary transition-colors py-3">
                                <span className="flex items-center gap-3">
                                    <faq.icon className="size-5 text-primary shrink-0" />
                                    <span>{faq.question}</span>
                                </span>
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed pl-8 pt-2">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

            <div className="mt-12 p-6 md:p-8 rounded-2xl bg-muted/40 border text-center space-y-4">
                <h3 className="text-xl font-bold">Have more questions?</h3>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                    Visit our store beside Kanhaiya Dairy, opposite Zadeshwar Bus Stop, Bharuch, Gujarat or contact our support team.
                </p>
                <div className="flex flex-wrap justify-center gap-4 pt-2">
                    <a
                        href="mailto:chelwaniarchita22@gmail.com"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
                    >
                        <Mail className="size-4" />
                        Email Support
                    </a>
                </div>
            </div>
        </main>
    );
}
