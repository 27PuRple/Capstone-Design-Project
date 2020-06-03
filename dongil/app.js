import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo"; //db설정에 필요
import express from "express";
import session from "express-session"; //db설정에 필요
import helmet from "helmet";
import mongoose from "mongoose"; //db설정에 필요
import morgan from "morgan";
import adminRouter from "./routers/adminRouter";
import orderRouter from "./routers/orderRouter";
import globalRouter from "./routers/globalRouter";
import apiRouter from "./routers/apiRouter";
import routes from "./routes";
import { localsMiddleware } from "./middlewares";

const app = express();

const CookieStore = MongoStore(session); //db설정에 필요

app.use(helmet());
app.set("view engine", "pug");
app.use("/order/uploads", express.static("uploads")); //이게 빠지니 html에 이미지 파일이 안떴음
app.use("/order/:id/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 180 * 60 * 1000 },
  })
); //db설정에 필요
app.use(localsMiddleware); //이 middleware을 통해 컨트롤러에 있는 정보를 템플릿에 넘길수있다!! 그리고 위치가 가장 위에 있어야 모든 라우터에 접근이 가능하다.

app.use(routes.home, globalRouter);
app.use(routes.order, orderRouter);
app.use(routes.admin, adminRouter);
app.use(routes.api, apiRouter);

export default app;
