import express from "express";
import routes from "../routes";
import {
  order,
  menuDetail,
  carts,
  orderComplete,
  containItem,
} from "../controllers/orderController";

const orderRouter = express.Router();

orderRouter.get(routes.order, order);
orderRouter.get(routes.menuDetail(), menuDetail);
orderRouter.get(routes.cart, carts);
orderRouter.get(routes.containItem(), containItem);
orderRouter.get(routes.orderComplete(), orderComplete);

export default orderRouter;
