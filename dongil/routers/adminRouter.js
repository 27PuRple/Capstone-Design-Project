import express from "express";
import routes from "../routes";
import {
  adminJoin,
  adminLogin,
  adminLogout,
  adminOrderlist,
  getMenuUpload,
  postMenuUpload,
} from "../controllers/adminController";
import { uploadItem } from "../middlewares";

const adminRouter = express.Router();

adminRouter.get(routes.adminJoin, adminJoin);
adminRouter.get(routes.adminLogin, adminLogin);
adminRouter.get(routes.adminLogout, adminLogout);
adminRouter.get(routes.adminOrderlist, adminOrderlist);

//메뉴 업로드
adminRouter.get(routes.menuUpload, getMenuUpload);
adminRouter.post(routes.menuUpload, uploadItem, postMenuUpload);

export default adminRouter;
