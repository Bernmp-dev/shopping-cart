const getSavedCartItems = () => {
    return (JSON.parse(localStorage.getItem('cartItems')));
};
if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
