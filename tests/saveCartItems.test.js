const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('Teste a função saveCartItems', () => {
  test('Teste se "saveCartItems" é uma função', () => {
    expect(typeof saveCartItems).toBe('function');
  });
  test('Com um cartItem como argumento, o método localStorage.setItem é chamado;', () => {
    saveCartItems('computador');
    expect(localStorage.setItem).toBeCalled();
  });
  test('Teste se, ao executar saveCartItems com um cartItem como argumento, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro a chave "cartItems" e o segundo sendo o valor passado como argumento para saveCartItems.', () => {
    saveCartItems('computador');
    expect(localStorage.setItem).toBeCalledWith('cartItems', JSON.stringify('computador'));
  });
});
