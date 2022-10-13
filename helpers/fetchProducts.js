const fetchProducts = async (query) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const data = await (await fetch(url)).json();
  if (!query) throw new Error('You must provide an url');
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
