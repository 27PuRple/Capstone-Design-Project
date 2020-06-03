import Items from "../models/Item";
import Order from "../models/Order";
import Cart from "../models/Cart";
import routes from "../routes";

export const home = (req, res) => {
  console.log(req.session.cart);
  res.render("home", { pageTitle: "Home" });
  console.log(req.session.cart);
};

// 주문페이지
export const order = async (req, res) => {
  const session = req.session;
  session.tableId = req.query.tableId;
  req.session.save();
  console.log(session.tableId);
  try {
    const items = await Items.find({}).sort(); //items db 값 넣고 수정할것!
    res.render("order", {
      pageTitle: "Order",
      tableId: session.tableId,
      items,
    });
  } catch (error) {
    console.log(error);
    res.render("order", {
      pageTitle: "Order",
      tableId: session.tableId,
      items: [],
    });
  }
};

//메뉴 상세 페이지
export const menuDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  console.log(req.session.tableId);
  try {
    const items = await Items.findById(id);
    res.render("menuDetail", { pageTitle: "Menu Detail", items });
  } catch (error) {
    console.log(error);
    res.render("menuDetail", { pageTitle: "Menu Detail" });
  }
};

//장바구니 페이지
//메뉴 상세페이지에서 장바구니 버튼을 클릭했을 때 => 첫 order가 생성이되고 메뉴를 push하게됨d
export const carts = async (req, res) => {
  if (!req.session.cart) {
    return res.render("emptyCart", { pageTitle: "Empty Cart" });
  }
  const cart = new Cart(req.session.cart);
  const cartIn = cart.getItems();
  res.render("cart", {
    pageTitle: "Cart",
    products: cartIn,
    totalPrice: cart.totalPrice,
  });
};

export const postAddOrder = async (req, res) => {
  const tableId = req.session.tableId;
  const cart = new Cart(req.session.cart);
  const order = await Order.create({
    table_num: tableId,
    items: cart,
    totalPrice: cart.totalPrice,
  });
  console.log(order.id);
  res.redirect(routes.orderComplete(order.id)); //routes.orderComplete
};

export const orderComplete = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const order = await Order.findById(id); //video가 있는지 없는지 알고 얻어야함
    res.render("orderComplete", {
      pageTitle: "Order Complete",
      table_num: order.table_num,
      order_num: order.order_num,
    });
  } catch (error) {
    console.log(error);
  }
};

//장바구니 담기 버튼
export const containItem = async (req, res) => {
  const {
    params: { id },
  } = req;
  const tableId = req.session.tableId;
  try {
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    Items.findById(id, (err, item) => {
      if (err) {
        return res.redirect(routes.home);
      }
      cart.add(item, item.id);
      req.session.cart = cart;
      console.log(req.session.cart);
      res.redirect(routes.order + "/order?tableId=" + tableId);
    });
  } catch (error) {
    console.log(error);
  }
};
