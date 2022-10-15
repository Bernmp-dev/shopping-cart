//----------------------------------------------------------------------------
const cartBox = document.querySelector('.cart__items');
const cartSection = document.querySelector('.cart');
const itemsContainer = document.querySelector('.items');

let storedContent = [];

function totalPrice() {
  const priceInnerText = document.querySelector('.total-price');
  let totalPriceConst = 0;
  if (storedContent.length > 0) {
    totalPriceConst = storedContent.map((currItem) =>
    currItem.price).reduce((acc, curr) => acc + curr);
    priceInnerText.innerHTML = `${totalPriceConst}`;
  } else {
    priceInnerText.innerHTML = `${totalPriceConst}`;
  }
}

function removeEvents(event) {
  const itemID = Array.prototype.indexOf.call(cartBox.childNodes, event.target);
  storedContent.splice(itemID, 1);
  event.target.remove();
  saveCartItems(storedContent);
  totalPrice();
}

function emptyCartByButton() {
  const emptyCartButton = document.querySelector('.empty-cart');
  const priceInnerText = document.querySelector('.total-price');
  emptyCartButton.addEventListener('click', () => {
    localStorage.clear();
    while (cartBox.firstChild) cartBox.removeChild(cartBox.firstChild);
    priceInnerText.innerHTML = '';
  });
}
//----------------------------------------------------------------------------

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
function createProductItemElement({ id, title, thumbnail }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
}

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
// const getIdFromProductItem = (product) => product.querySelector('span.id').innerText;

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */
const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', (event) => removeEvents(event));
  return li;
};

//----------------------------------------------------------------------------
function createPriceSection() {
  const totalPriceSection = document.createElement('span');
  totalPriceSection.className = 'total-price';
  cartSection.appendChild(totalPriceSection);
  }

function getStoredContent() {
  storedContent = getSavedCartItems();

  if (storedContent) {
    storedContent.forEach((currItem) => {
      cartBox.appendChild(createCartItemElement(currItem));
    });
  } else storedContent = [];
}

function storedCartItemAsObject({ id, title, price }) {
  storedContent.push({ id, title, price });
  saveCartItems(storedContent);
}

async function addCartItem() {
  itemsContainer.childNodes.forEach((currItem) => {
    currItem.lastChild.addEventListener('click', async () => {
      const productById = await fetchItem(currItem.firstChild.innerText);
      cartBox.appendChild(createCartItemElement(productById));
      storedCartItemAsObject(productById);
      totalPrice();
    });
  });
}

async function createProductItemElementRepeat() {
  const productList = await fetchProducts('computador');

  productList.results.forEach((currProduct) => {
    itemsContainer.appendChild(createProductItemElement(currProduct));
  });
  addCartItem();
}
//----------------------------------------------------------------------------

window.onload = () => {
  createProductItemElementRepeat();
  getStoredContent();
  createPriceSection();
  emptyCartByButton();
};
