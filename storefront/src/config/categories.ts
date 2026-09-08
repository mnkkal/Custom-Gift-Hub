export interface CategoryConfig {
    id?: string;
    slug: string;
    name: string;
    shortTitle: string;
    description: string;
    image: string;
    badge?: string;
    featured?: boolean;
    group: 'Personalized & 3D' | 'Home & Decor' | 'Lifestyle & Fashion' | 'Kids & Celebrations';
    subcategories: string[];
}

export const CATEGORIES_CONFIG: CategoryConfig[] = [
    {
        slug: 'chocolates-human-miniatures',
        name: '3D Human Miniatures & Chocolates',
        shortTitle: '3D Miniatures',
        description: 'Our Main Attraction: Handcrafted hyper-detailed 3D miniature figurines sculpted from your photos, 3D resin printed & artist painted, paired with artisan chocolates.',
        image: '/categories/chocolates-human-miniatures.svg',
        badge: 'MAIN ATTRACTION',
        featured: true,
        group: 'Personalized & 3D',
        subcategories: [
            'Single Human Miniature (8 inch)',
            'Couple 3D Miniature on Wood Base',
            'Family Figurine Sets',
            'Artisan Belgian Chocolates',
            '3D Milestone & Pet Miniatures'
        ]
    },
    {
        slug: 'photo-frames',
        name: 'Photo Frames',
        shortTitle: 'Photo Frames',
        description: 'Custom lighting acrylic night frames, 3D customize deep shadow box frames, and classic memory collage frames.',
        image: '/categories/photo-frames.svg',
        badge: 'LED GLOW',
        featured: true,
        group: 'Personalized & 3D',
        subcategories: [
            'Warm LED Acrylic Glow Night Lamp',
            'Custom 3D Shadow Box Frames',
            'Collage & Multi-Photo Wall Frames',
            'Rotating Wooden Photo Cubes',
            'Anniversary Engraved Acrylic Plates'
        ]
    },
    {
        slug: 'customisation',
        name: 'Customisation & Engraving',
        shortTitle: 'Custom Gifts',
        description: 'Permanent laser engraving on smart bottles, metal pens, diaries, tote bags, t-shirts, caps, and personalized keychains.',
        image: '/categories/customisation.svg',
        badge: 'POPULAR',
        featured: true,
        group: 'Personalized & 3D',
        subcategories: [
            'Laser Smart LED Temperature Bottles',
            'Executive Metal Pens & Gift Cases',
            'Personalized Leather Laptop Sleeves',
            'Custom Engraved Acrylic Keychains',
            'Custom Printed Caps & T-Shirts'
        ]
    },
    {
        slug: 'flower-corner',
        name: 'Flower Corner & Hampers',
        shortTitle: 'Flowers & Hampers',
        description: 'Original fresh flower bouquets, handcrafted everlasting flowers, lucky bamboo plants, and luxury keepsake gift boxes.',
        image: '/categories/flower-corner.svg',
        badge: 'FRESH',
        featured: true,
        group: 'Kids & Celebrations',
        subcategories: [
            'Fresh Red Rose Handcrafted Bouquets',
            'Everlasting Velvet & Fabric Flowers',
            'Lucky 2-Layer Bamboo Plants',
            'Luxury Reusable Hamper Keepsake Boxes',
            'Ready Gift Bags & Celebration Baskets'
        ]
    },
    {
        slug: 'showpieces',
        name: 'Showpieces & Sculptures',
        shortTitle: 'Showpieces',
        description: 'Antique brass murtis, romantic couple sculptures, artificial bonsai plants, and artistic resin centerpieces for home decor.',
        image: '/categories/showpieces.svg',
        badge: 'ARTISAN',
        featured: false,
        group: 'Home & Decor',
        subcategories: [
            'Sacred Divine Murtis & Idols',
            'Artisan Romantic Couple Statues',
            'Miniature Artificial Bonsai & Plants',
            'Geometric Resin Modern Accents',
            'Living Room & Desk Showpieces'
        ]
    },
    {
        slug: 'mugs-drinkers',
        name: 'Mugs & Drinkers',
        shortTitle: 'Mugs & Tumblers',
        description: 'Thermal insulated vacuum bottles, coffee mugs, travel tumblers, sippers, and borosilicate glass containers.',
        image: '/categories/mugs-drinkers.svg',
        badge: 'BESTSELLER',
        featured: false,
        group: 'Personalized & 3D',
        subcategories: [
            'Personalized Ceramic Coffee Mugs',
            'Double-Wall Vacuum Tumblers',
            'Smart LED Temperature Sippers',
            'Glass Infuser & Tea Bottles',
            'Couple Ceramic Mug Sets'
        ]
    },
    {
        slug: 'wall-frames',
        name: 'Wall Frames & Art',
        shortTitle: 'Wall Frames',
        description: 'Large living room gallery frames, modern minimalist art pieces, motivation quotes, and designer decor frames.',
        image: '/categories/wall-frames.svg',
        badge: 'DECOR',
        featured: false,
        group: 'Home & Decor',
        subcategories: [
            'Large Statement Living Room Frames',
            'Spiritual & Devotional Canvas Art',
            'Inspirational & Office Quote Art',
            'Modern Geometric Wall Panels',
            'Aesthetic Bedroom Decor Sets'
        ]
    },
    {
        slug: 'wall-clocks',
        name: 'Wall Clocks',
        shortTitle: 'Wall Clocks',
        description: 'Designer oversized clocks, silent sweep wall clocks, wooden clock frames, and modern aesthetic timepieces.',
        image: '/categories/wall-clocks.svg',
        badge: 'TIMELESS',
        featured: false,
        group: 'Home & Decor',
        subcategories: [
            'Silent Sweep Minimalist Clocks',
            'Large Vintage Roman Wall Clocks',
            'Photo Frame Combination Clocks',
            'Solid Wood Craft Wall Clocks',
            'Luxury Metallic Dial Clocks'
        ]
    },
    {
        slug: 'handbags',
        name: 'Handbags & Wallets',
        shortTitle: 'Bags & Wallets',
        description: 'Premium ladies purses, genuine leather gents wallets, versatile college backpacks, and stylish baby utility bags.',
        image: '/categories/handbags.svg',
        badge: 'FASHION',
        featured: false,
        group: 'Lifestyle & Fashion',
        subcategories: [
            'Ladies Tote & Shoulder Bags',
            'Gents RFID Leather Wallets',
            'Personalized Engraved Wallets',
            'College & Office Utility Backpacks',
            'Multi-Pocket Baby Diaper Bags'
        ]
    },
    {
        slug: 'jewellery',
        name: 'Jewellery Section',
        shortTitle: 'Jewellery',
        description: 'Anti-tarnish bracelets, sparkling solitaire rings, statement necklaces, trendy clutchers, earrings, and wrist watches.',
        image: '/categories/jewellery.svg',
        badge: 'LUXURY',
        featured: false,
        group: 'Lifestyle & Fashion',
        subcategories: [
            'Anti-Tarnish Stainless Bracelets',
            'Couple Adjustable Name Rings',
            'Minimalist Crystal Necklaces',
            'Designer Hair Clutchers & Pins',
            'Analog Couple Wrist Watches'
        ]
    },
    {
        slug: 'perfume',
        name: 'Perfumes & Fragrances',
        shortTitle: 'Perfumes',
        description: 'Long-lasting luxury perfumes for men, captivating scents for women, unisex artisanal aromas, and romantic couple perfume combos.',
        image: '/categories/perfume.svg',
        badge: 'AROMA',
        featured: false,
        group: 'Lifestyle & Fashion',
        subcategories: [
            'Luxury Gents Eau De Parfum',
            'Floral & Fruity Ladies Scents',
            'Unisex Oud & Woody Fragrances',
            'His & Hers Couple Gift Sets',
            'Pocket Travel Perfume Sprays'
        ]
    },
    {
        slug: 'stationery-decor',
        name: 'Stationery & Decor',
        shortTitle: 'Stationery',
        description: 'Leatherette executive diaries, fancy organizer pouches, laser-customized insulated tiffins, and creative art colour sets.',
        image: '/categories/stationery-decor.svg',
        badge: 'OFFICE',
        featured: false,
        group: 'Home & Decor',
        subcategories: [
            'Laser-Engraved Executive Diaries',
            'Multi-Compartment Organizer Pouches',
            'Stainless Steel Laser Lunch Tiffins',
            'Artist Sketching & Colour Sets',
            'Office Desk Accessories & Stands'
        ]
    },
    {
        slug: 'kids',
        name: 'Kids & Toys',
        shortTitle: 'Kids & Toys',
        description: 'Safe non-toxic toys, huggable soft plushies, cuddly teddy bears, and developmental learning games for children of all ages.',
        image: '/categories/kids.svg',
        badge: 'KIDS',
        featured: false,
        group: 'Kids & Celebrations',
        subcategories: [
            'Giant Plush Teddy Bears & Soft Toys',
            'Educational Wooden Puzzle Toys',
            'Interactive Musical & Light Toys',
            'Cartoon School Bags & Stationery',
            'Birthday Return Gift Combos'
        ]
    },
    {
        slug: 'seasonal-display',
        name: 'Seasonal & Festive Display',
        shortTitle: 'Festive Specials',
        description: 'Dynamic seasonal festival collections, Diwali diyas, Rakhi hampers, Valentine specials, and festive corporate gifting.',
        image: '/categories/seasonal-display.svg',
        badge: 'FESTIVE',
        featured: false,
        group: 'Kids & Celebrations',
        subcategories: [
            'Festive Diwali Light & Diya Sets',
            'New Year & Calendar Gift Packs',
            'Valentine Love Gift Hampers',
            'Raksha Bandhan Keepsake Boxes',
            'Corporate Festival Client Gift Boxes'
        ]
    },
    {
        slug: 'other-gifts',
        name: 'Other Unique Gifts',
        shortTitle: 'Unique Novelties',
        description: 'Melodious metallic wind chimes, decorative wall hangings, dream catchers, and distinctive gifting novelties.',
        image: '/categories/other-gifts.svg',
        badge: 'NOVELTY',
        featured: false,
        group: 'Home & Decor',
        subcategories: [
            'Harmonic Metallic Wind Chimes',
            'Handcrafted Boho Dreamcatchers',
            'Traditional Wall Door Hangings',
            'Gifting Greeting Cards & Shagun Envelopes',
            'Cute Keepsake Desk Novelties'
        ]
    }
];

export const CATEGORY_GROUPS = [
    {
        title: 'Personalized & 3D',
        slugs: ['chocolates-human-miniatures', 'photo-frames', 'customisation', 'mugs-drinkers']
    },
    {
        title: 'Home & Decor',
        slugs: ['showpieces', 'wall-clocks', 'wall-frames', 'stationery-decor', 'other-gifts']
    },
    {
        title: 'Fashion & Scents',
        slugs: ['handbags', 'jewellery', 'perfume']
    },
    {
        title: 'Festive & Kids',
        slugs: ['flower-corner', 'kids', 'seasonal-display']
    }
];

export function getCategoryConfig(slug: string): CategoryConfig | undefined {
    return CATEGORIES_CONFIG.find((c) => c.slug === slug);
}
