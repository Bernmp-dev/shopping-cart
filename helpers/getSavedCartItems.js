const getSavedCartItems = () => {
  try {
    return JSON.parse(localStorage.getItem('cartItems'));
  } catch (err) {
    return err.message;
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
