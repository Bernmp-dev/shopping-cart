const fetchItem = async (item) => {
  const url = `https://api.mercadolibre.com/items/${item}`;
  const data = await (await fetch(url)).json();
  if (!item) throw new Error('You must provide an url');
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
