// Core DOM references and behavior for the product gallery and modal
// This script renders `products` into `#product-grid` and wires
// keyboard/aria interactions for accessibility.
const filters = document.querySelectorAll('.filter');
const productGrid = document.querySelector('#product-grid');
const modal = document.querySelector('.modal');
const modalImage = modal.querySelector('img');
const modalTitle = modal.querySelector('.modal-caption');
const closeButton = modal.querySelector('.close');
const productCount = document.querySelector('#product-count');
let lastFocusedElement;

// Render each product. If `product.sources` exists it will render a
// <picture> element (allowing WebP/srcset/sizes). Otherwise falls back
// to a single <img>. Each <figure> also emits `data-match` when present
// so CSS can apply shared visual rules (used for the mug + hoodie pairing).
productGrid.innerHTML = products.map((product, index) => {
    const picture = product.sources && product.sources.length
        ? `
            <picture>
                ${product.sources.map(s => `<source ${s.type ? `type="${s.type}"` : ''} srcset="${s.srcset}" ${s.sizes ? `sizes="${s.sizes}"` : ''}></source>`).join('')}
                <img class="product-img ${product.aspect ? `aspect-${product.aspect}` : ''}" src="${product.image}" alt="${product.alt}" loading="lazy" decoding="async">
            </picture>
        `
        : `<img class="product-img ${product.aspect ? `aspect-${product.aspect}` : ''}" src="${product.image}" alt="${product.alt}" loading="lazy" decoding="async">`;

    return `
    <figure class="tile${product.wide ? ' wide' : ''}"${product.match ? ` data-match="${product.match}"` : ''} data-kind="${product.category}" data-title="${product.title}" role="button" tabindex="0" aria-label="Preview ${product.title}">
        ${picture}
        <figcaption><span class="tile-title">${product.title}</span><span class="tile-type">${product.type} / ${String(index + 1).padStart(2, '0')}</span></figcaption>
    </figure>
    `;
}).join('');

const tiles = productGrid.querySelectorAll('.tile');

const updateProductCount = (filterName) => {
    const visibleCount = [...tiles].filter((tile) => filterName === 'all' || tile.dataset.kind === filterName).length;
    productCount.textContent = `(${String(visibleCount).padStart(2, '0')})`;
};

filters.forEach((filter) => filter.addEventListener('click', () => {
    filters.forEach((item) => {
        item.classList.remove('active');
        item.setAttribute('aria-pressed', 'false');
    });
    filter.classList.add('active');
    filter.setAttribute('aria-pressed', 'true');
    tiles.forEach((tile) => {
        tile.hidden = filter.dataset.filter !== 'all' && tile.dataset.kind !== filter.dataset.filter;
    });
    updateProductCount(filter.dataset.filter);
}));

const openModal = (tile) => {
    lastFocusedElement = document.activeElement;
    modalImage.src = tile.querySelector('img').src;
    modalImage.alt = tile.dataset.title;
    modalTitle.textContent = tile.dataset.title;
    modal.hidden = false;
    modal.classList.add('open');
    document.body.classList.add('modal-open');
    closeButton.focus();
};

const closeModal = () => {
    modal.classList.remove('open');
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    modalImage.src = '';
    if (lastFocusedElement) lastFocusedElement.focus();
};

tiles.forEach((tile) => {
    tile.addEventListener('click', () => openModal(tile));
    tile.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openModal(tile);
        }
    });
});

closeButton.addEventListener('click', closeModal);
modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
});
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) closeModal();
});
