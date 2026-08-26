// Product catalog
// Each product may include:
// - category: group for filtering
// - title, type, image, alt: display/data attributes
// - wide: boolean to span a larger grid column
// - aspect: suggested aspect helper (square, portrait, landscape, wide)
// - match: optional flag used to apply shared CSS (e.g. 'featured')
const products = [
    {
        category: 'clothing',
        title: 'Branded Tees',
        type: 'Clothing',
        image: 'hanger.avif',
        alt: 'White t-shirt mockup with KemZio logo',
        wide: true,
        aspect: 'wide'
    },
    {
        category: 'hoodie',
        title: 'Everyday Hoodies',
        type: 'Hoodies',
        image: 'everyday.png',
        alt: 'Black hoodie mockup for custom printing',
        aspect: 'portrait'
    },
    {
        category: 'mug',
        title: 'Coffee Break Mug',
        type: 'Mugs',
        image: 'mug.png',
        alt: 'KemZio ceramic mug mockup',
        aspect: 'square',
        // mark this product to share sizing with the statement hoodie
        match: 'featured'
    },
    {
        category: 'clothing',
        title: 'Team Uniforms',
        type: 'Clothing',
        image: 'Team uniforms.png',
        alt: 'KemZio team shirt mockup',
        aspect: 'landscape'
    },
    {
        category: 'hoodie',
        title: 'Statement Hoodies',
        type: 'Hoodies',
        image: 'hoodies.png',
        alt: 'Neutral hoodie mockup printed with "Wear Beauty"',
        wide: true,
        aspect: 'wide',
        // share the same visual sizing as the mug above
        match: 'featured'
    }
];
