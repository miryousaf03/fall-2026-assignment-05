import products from './data/products.json';

const PRODUCTS_PER_PAGE = 5;

const grid = document.getElementById('product-grid');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageIndicator = document.getElementById('page-indicator');

const totalPages = Math.max(1, Math.ceil(products.length / PRODUCTS_PER_PAGE));
let currentPage = 1;

function createProductCard(product) {
  const card = document.createElement('article');
  card.className = 'product-card';

  const image = document.createElement('img');
  image.src = product.imageUrl;
  image.alt = product.name;
  image.loading = 'lazy';

  const body = document.createElement('div');
  body.className = 'product-card-body';

  const badge = document.createElement('span');
  badge.className = 'badge';
  badge.textContent = product.category;

  const title = document.createElement('h3');
  title.textContent = product.name;

  const description = document.createElement('p');
  description.className = 'product-desc';
  description.textContent = product.description;

  const price = document.createElement('p');
  price.className = 'product-price';
  price.textContent = `$${Number(product.price).toFixed(2)}`;

  body.append(badge, title, description, price);
  card.append(image, body);
  return card;
}

function renderPage() {
  const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const pageItems = products.slice(start, start + PRODUCTS_PER_PAGE);

  grid.replaceChildren(...pageItems.map(createProductCard));

  pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

function goToPage(page) {
  if (page < 1 || page > totalPages) {
    return;
  }
  currentPage = page;
  renderPage();
  grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

if (grid && prevBtn && nextBtn && pageIndicator) {
  prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
  nextBtn.addEventListener('click', () => goToPage(currentPage + 1));
  renderPage();
}
