


// Получение корзины из localStorage
export const getLocalCart = () => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  };
  
  // Сохранение корзины в localStorage
  export const saveLocalCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  
  // Добавление товара в локальную корзину
  export const addToLocalCart = (product) => {
    const cart = getLocalCart();
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      cart.push(product);
    }
    saveLocalCart(cart);
  };
  
  // Удаление товара из локальной корзины
  export const removeFromLocalCart = (productId) => {
    const cart = getLocalCart().filter((item) => item.id !== productId);
    saveLocalCart(cart);
  };
  
  // Обновление количества товара
  export const updateLocalCartQuantity = (productId, quantity) => {
    const cart = getLocalCart();
    const product = cart.find((item) => item.id === productId);
    if (product) {
      product.quantity = quantity;
    }
    saveLocalCart(cart);
  };