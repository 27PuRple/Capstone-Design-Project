import express from "express";
import routes from "../routes";
import { postAddOrder } from "../controllers/orderController";

const apiRouter = express.Router();

apiRouter.get(routes.addOrder, postAddOrder);

export default apiRouter;
