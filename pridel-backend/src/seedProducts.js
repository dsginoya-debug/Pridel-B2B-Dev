const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

// Pridel Industries Product Catalog
const pridelProducts = [
  // Floor Drain Products (12 types)
  {
    name: 'Floor Drain',
    category: 'Floor Drain',
    subcategory: 'Standard Drain',
    description: 'High-quality stainless steel floor drain for bathroom and kitchen applications',
    specifications: {
      material: 'Stainless Steel 304',
      finish: 'Mirror Polish',
      size: 'Multiple sizes available'
    },
    features: [
      'Corrosion resistant',
      'Easy to clean',
      'Anti-clog design',
      'Durable construction'
    ],
    isActive: true,
    isFeatured: true,
    tags: ['floor drain', 'bathroom', 'kitchen', 'drainage']
  },
  {
    name: 'Cockroach Trap (Auto Close Bowl)',
    category: 'Floor Drain',
    subcategory: 'Trap Drain',
    description: 'Innovative floor drain with auto-closing mechanism to prevent cockroach entry',
    specifications: {
      material: 'Stainless Steel 304',
      finish: 'Satin/Mirror',
      size: '100mm, 150mm'
    },
    features: [
      'Auto-close mechanism',
      'Pest prevention',
      'Odor control',
      'Hygienic design'
    ],
    isActive: true,
    isFeatured: true,
    tags: ['cockroach trap', 'auto close', 'pest control', 'floor drain']
  },
  {
    name: 'Cockroach Trap (Double Bowl)',
    category: 'Floor Drain',
    subcategory: 'Trap Drain',
    description: 'Double bowl cockroach trap floor drain for enhanced pest protection',
    specifications: {
      material: 'Stainless Steel 304',
      finish: 'Satin/Mirror',
      size: '100mm, 150mm'
    },
    features: [
      'Double bowl design',
      'Enhanced pest protection',
      'Water seal technology',
      'Easy maintenance'
    ],
    isActive: true,
    isFeatured: false,
    tags: ['cockroach trap', 'double bowl', 'pest control', 'floor drain']
  },
  {
    name: 'Flat Cut Floor Drain',
    category: 'Floor Drain',
    subcategory: 'Designer Drain',
    description: 'Modern flat cut design floor drain with sleek appearance',
    specifications: {
      material: 'Stainless Steel 304',
      finish: 'Satin/Mirror',
      size: 'Multiple sizes'
    },
    features: [
      'Contemporary design',
      'Flat profile',
      'Easy to clean',
      'Anti-slip surface'
    ],
    isActive: true,
    isFeatured: true,
    tags: ['flat cut', 'designer drain', 'modern', 'floor drain']
  },
  {
    name: 'Flat Cut Cockroach Trap',
    category: 'Floor Drain',
    subcategory: 'Designer Trap Drain',
    description: 'Combination of flat cut design with cockroach trap functionality',
    specifications: {
      material: 'Stainless Steel 304',
      finish: 'Satin/Mirror',
      size: '100mm, 150mm'
    },
    features: [
      'Modern flat design',
      'Pest prevention',
      'Aesthetic appeal',
      'Functional design'
    ],
    isActive: true,
    isFeatured: false,
    tags: ['flat cut', 'cockroach trap', 'designer', 'floor drain']
  },
  {
    name: 'Locking Drain (Square)',
    category: 'Floor Drain',
    subcategory: 'Locking System',
    description: 'Square locking floor drain for secure installation',
    specifications: {
      material: 'Stainless Steel 304',
      finish: 'Satin/Mirror',
      size: '100mm, 150mm'
    },
    features: [
      'Locking mechanism',
      'Secure installation',
      'Square design',
      'Theft prevention'
    ],
    isActive: true,
    isFeatured: false,
    tags: ['locking drain', 'square', 'security', 'floor drain']
  },
  {
    name: 'Locking Drain (Round)',
    category: 'Floor Drain',
    subcategory: 'Locking System',
    description: 'Round locking floor drain for secure installation',
    specifications: {
      material: 'Stainless Steel 304',
      finish: 'Satin/Mirror',
      size: '100mm, 150mm'
    },
    features: [
      'Locking mechanism',
      'Secure installation',
      'Round design',
      'Theft prevention'
    ],
    isActive: true,
    isFeatured: false,
    tags: ['locking drain', 'round', 'security', 'floor drain']
  },
  {
    name: 'Fix Drain & Cockroach Bowl',
    category: 'Floor Drain',
    subcategory: 'Fixed System',
    description: 'Fixed installation drain with cockroach prevention bowl',
    specifications: {
      material: 'Stainless Steel 304',
      finish: 'Satin',
      size: 'Standard sizes'
    },
    features: [
      'Fixed installation',
      'Cockroach prevention',
      'Durable design',
      'Long-lasting'
    ],
    isActive: true,
    isFeatured: false,
    tags: ['fix drain', 'cockroach bowl', 'fixed', 'floor drain']
  },
  {
    name: 'Tiles Insert Drain',
    category: 'Floor Drain',
    subcategory: 'Tile Insert',
    description: 'Invisible floor drain designed to accommodate tiles for seamless look',
    specifications: {
      material: 'Stainless Steel',
      finish: 'Tile Insert Frame',
      size: 'Multiple sizes'
    },
    features: [
      'Invisible design',
      'Tile compatible',
      'Seamless integration',
      'Modern aesthetics'
    ],
    isActive: true,
    isFeatured: true,
    tags: ['tile insert', 'invisible drain', 'designer', 'floor drain']
  },
  {
    name: 'Shower Channel Drain',
    category: 'Floor Drain',
    subcategory: 'Linear Drain',
    description: 'Linear channel drain for modern shower installations',
    specifications: {
      material: 'Stainless Steel 304',
      finish: 'Satin/Mirror',
      size: '600mm, 900mm, 1200mm'
    },
    features: [
      'Linear design',
      'High water flow',
      'Easy to clean',
      'Modern appearance'
    ],
    isActive: true,
    isFeatured: true,
    tags: ['shower drain', 'channel drain', 'linear', 'bathroom']
  },
  {
    name: 'Shower & Shower Arm',
    category: 'Floor Drain',
    subcategory: 'Shower Accessories',
    description: 'Complete shower system with arm and fixtures',
    specifications: {
      material: 'Brass/Stainless Steel',
      finish: 'Chrome',
      size: 'Standard'
    },
    features: [
      'Complete shower set',
      'Adjustable arm',
      'Quality construction',
      'Easy installation'
    ],
    isActive: true,
    isFeatured: false,
    tags: ['shower', 'shower arm', 'bathroom', 'fixtures']
  },
  {
    name: 'Rack Bolt',
    category: 'Floor Drain',
    subcategory: 'Accessories',
    description: 'High-quality rack bolts for drain installation and fixtures',
    specifications: {
      material: 'Stainless Steel',
      finish: 'Polished',
      size: 'Various sizes'
    },
    features: [
      'Corrosion resistant',
      'Strong and durable',
      'Easy to install',
      'Universal fit'
    ],
    isActive: true,
    isFeatured: false,
    tags: ['rack bolt', 'hardware', 'installation', 'accessories']
  },
  // Bathroom Accessories Collections (10 collections)
  {
    name: 'Angel Collection',
    category: 'Bathroom Accessories',
    collection: 'Angel',
    description: 'Premium bathroom accessories from the Angel collection featuring elegant design',
    specifications: {
      material: 'Stainless Steel/Brass',
      finish: 'Chrome/Gold',
      thickness: 'Heavy duty'
    },
    features: [
      'Premium quality',
      'Elegant design',
      'Complete bathroom solution',
      'Corrosion resistant'
    ],
    isActive: true,
    isFeatured: true,
    tags: ['bathroom accessories', 'angel', 'premium', 'collection']
  },
  {
    name: 'Aura Collection',
    category: 'Bathroom Accessories',
    collection: 'Aura',
    description: 'Modern Aura collection bathroom accessories with contemporary styling',
    specifications: {
      material: 'Stainless Steel',
      finish: 'Chrome/Matte',
      thickness: 'Standard'
    },
    features: [
      'Modern design',
      'Durable construction',
      'Complete set available',
      'Easy installation'
    ],
    isActive: true,
    isFeatured: true,
    tags: ['bathroom accessories', 'aura', 'modern', 'collection']
  },
  {
    name: 'Crystal Collection',
    category: 'Bathroom Accessories',
    collection: 'Crystal',
    description: 'Luxurious Crystal collection with crystal accents and premium finishes',
    specifications: {
      material: 'Brass with Crystal',
      finish: 'Chrome/Gold',
      thickness: 'Premium'
    },
    features: [
      'Luxury design',
      'Crystal accents',
      'Premium materials',
      'Sophisticated look'
    ],
    isActive: true,
    isFeatured: true,
    tags: ['bathroom accessories', 'crystal', 'luxury', 'collection']
  },
  {
    name: 'Elista Collection',
    category: 'Bathroom Accessories',
    collection: 'Elista',
    description: 'Elegant Elista collection featuring refined bathroom accessories',
    specifications: {
      material: 'Stainless Steel',
      finish: 'Chrome',
      thickness: 'Standard'
    },
    features: [
      'Elegant styling',
      'Quality materials',
      'Complete range',
      'Long-lasting finish'
    ],
    isActive: true,
    isFeatured: false,
    tags: ['bathroom accessories', 'elista', 'elegant', 'collection']
  },
  {
    name: 'Ocean Collection',
    category: 'Bathroom Accessories',
    collection: 'Ocean',
    description: 'Ocean-inspired bathroom accessories with flowing designs',
    specifications: {
      material: 'Stainless Steel/Brass',
      finish: 'Chrome/Brushed',
      thickness: 'Standard'
    },
    features: [
      'Flowing design',
      'Ocean-inspired aesthetics',
      'Corrosion resistant',
      'Contemporary style'
    ],
    isActive: true,
    isFeatured: false,
    tags: ['bathroom accessories', 'ocean', 'contemporary', 'collection']
  },
  {
    name: 'Liva Collection',
    category: 'Bathroom Accessories',
    collection: 'Liva',
    description: 'Stylish Liva collection bathroom accessories for modern bathrooms',
    specifications: {
      material: 'Stainless Steel',
      finish: 'Chrome/Matte Black',
      thickness: 'Standard'
    },
    features: [
      'Stylish design',
      'Modern aesthetics',
      'Versatile options',
      'Quality finish'
    ],
    isActive: true,
    isFeatured: false,
    tags: ['bathroom accessories', 'liva', 'stylish', 'collection']
  },
  {
    name: 'Moon Collection',
    category: 'Bathroom Accessories',
    collection: 'Moon',
    description: 'Moon collection featuring curved and rounded design elements',
    specifications: {
      material: 'Stainless Steel/Brass',
      finish: 'Chrome/Satin',
      thickness: 'Standard'
    },
    features: [
      'Curved design',
      'Smooth finish',
      'Complete set',
      'Elegant curves'
    ],
    isActive: true,
    isFeatured: true,
    tags: ['bathroom accessories', 'moon', 'curved', 'collection']
  },
  {
    name: 'Royal Collection',
    category: 'Bathroom Accessories',
    collection: 'Royal',
    description: 'Premium Royal collection with regal design and superior quality',
    specifications: {
      material: 'Brass',
      finish: 'Gold/Rose Gold/Chrome',
      thickness: 'Heavy duty premium'
    },
    features: [
      'Regal design',
      'Premium quality',
      'Luxury finishes',
      'Superior craftsmanship'
    ],
    isActive: true,
    isFeatured: true,
    tags: ['bathroom accessories', 'royal', 'premium', 'luxury']
  },
  {
    name: 'Square Collection',
    category: 'Bathroom Accessories',
    collection: 'Square',
    description: 'Contemporary Square collection with geometric design',
    specifications: {
      material: 'Stainless Steel',
      finish: 'Chrome/Matte Black',
      thickness: 'Standard'
    },
    features: [
      'Geometric design',
      'Contemporary look',
      'Sharp lines',
      'Modern styling'
    ],
    isActive: true,
    isFeatured: true,
    tags: ['bathroom accessories', 'square', 'geometric', 'modern']
  },
  {
    name: 'Star Collection',
    category: 'Bathroom Accessories',
    collection: 'Star',
    description: 'Star collection bathroom accessories with stellar design',
    specifications: {
      material: 'Stainless Steel/Brass',
      finish: 'Chrome/Gold',
      thickness: 'Standard'
    },
    features: [
      'Stellar design',
      'Quality construction',
      'Versatile styling',
      'Complete range'
    ],
    isActive: true,
    isFeatured: false,
    tags: ['bathroom accessories', 'star', 'design', 'collection']
  }
];

// Database connection and seeding function
const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert Pridel products
    await Product.insertMany(pridelProducts);
    console.log(`Successfully seeded ${pridelProducts.length} Pridel products`);

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeding if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { pridelProducts, seedDatabase };
