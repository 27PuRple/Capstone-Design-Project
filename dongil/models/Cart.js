module.exports = function Cart(cart) {
  this.items = cart.items || {};
  this.totalItems = cart.totalItems || 0;
  this.totalPrice = cart.totalPrice || 0;

  this.add = function (item, id) {
    var cartItem = this.items[id];
    if (!cartItem) {
      cartItem = this.items[id] = { item: item, qty: 0, itemPrice: 0 };
    }
    cartItem.qty++;
    cartItem.itemPrice = cartItem.item.itemPrice * cartItem.qty;
    this.totalItems++;
    this.totalPrice += cartItem.item.itemPrice;
  };

  this.remove = function (id) {
    this.totalItems -= this.items[id].qty;
    this.totalPrice -= this.items[id].itemPrice;
    delete this.items[id];
  };

  this.getItems = function () {
    var arr = [];
    for (var id in this.items) {
      arr.push(this.items[id]);
    }
    return arr;
  };
};
