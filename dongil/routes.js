// Global
const HOME = "/";

// Order
const ORDER = "/order";
const CART = "/cart";
// const ORDER_TABLE_NUM = "/:id";
const MENU_DETAIL = "/:id/menuDetail"; //id는 item의 id
const CONTAIN_ITEM = "/:id/containitem";
const ORDER_COMPLETE = "/:id/ordercomplete";

//Admin
const ADMIN = "/admin";
const ADMIN_JOIN = "/join";
const ADMIN_LOGIN = "/login";
const ADMIN_LOGOUT = "/logout";
const ADMIN_ORDERLIST = "/orderlist";
const MENU_UPLOAD = "/upload";

// API
const API = "/api";
const ADD_ORDER = "/order";

const routes = {
  home: HOME,
  order: ORDER,
  // orderTableNum: ORDER_TABLE_NUM,
  menuDetail: (id) => {
    if (id) {
      return `/order/${id}/menudetail`;
    } else {
      return MENU_DETAIL;
    }
  },
  cart: CART,
  containItem: (id) => {
    if (id) {
      return `/order/${id}/containitem`;
    } else {
      return CONTAIN_ITEM;
    }
  },
  orderComplete: (id) => {
    if (id) {
      return `/order/${id}/ordercomplete`;
    } else {
      return ORDER_COMPLETE;
    }
  },
  admin: ADMIN,
  adminJoin: ADMIN_JOIN,
  adminLogin: ADMIN_LOGIN,
  adminLogout: ADMIN_LOGOUT,
  adminOrderlist: ADMIN_ORDERLIST,
  menuUpload: MENU_UPLOAD,
  api: API,
  addOrder: ADD_ORDER,
};

export default routes;
