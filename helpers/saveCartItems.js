const saveCartItems = (storedContent) => {
  localStorage.setItem('cartItems', JSON.stringify(storedContent));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
