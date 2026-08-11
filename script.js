const filters = document.querySelectorAll('.filter');
const tiles = document.querySelectorAll('.tile');
const modal = document.querySelector('.modal');
const modalImage = modal.querySelector('img');
const modalTitle = modal.querySelector('.modal-caption');
const closeButton = modal.querySelector('.close');
const productCount = document.querySelector('#product-count');
let lastFocusedElement;

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
