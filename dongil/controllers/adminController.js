import routes from "../routes";
import Item from "../models/Item";
import Order from "../models/Order";

export const adminJoin = (req, res) =>
  res.render("adminJoin", { pageTitle: "Admin Join" });

export const adminLogin = (req, res) =>
  res.render("adminLogin", { pageTitle: "Admin Login" });

export const adminLogout = (req, res) =>
  res.render("adminLogout", { pageTitle: "Admin Logout" });

export const adminOrderlist = async (req, res) => {
  try {
    const orders = await Order.find({}).sort(); //items db 값 넣고 수정할것!
    res.render("adminOrderlist", {
      pageTitle: "Ordered List",
      orders,
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

// 메뉴 업로드 페이지
export const getMenuUpload = (req, res) => {
  res.render("menuUpload", { pageTitle: "Upload Menu" });
};

export const postMenuUpload = async (req, res) => {
  const {
    body: { itemName, itemPrice, description },
    file: { path },
  } = req;
  console.log(req.file.path);
  console.log(req.body.itemName);
  console.log(req.body.itemPrice);
  console.log(req.body.description);

  const newItem = await Item.create({
    itemUrl: path,
    itemName,
    itemPrice,
    description,
    // creator: req.user.id,
  });
  newItem.save();
  // req.user.save();
  // res.redirect(routes.videoDetail(newVideo.id));
  res.render("menuUpload", { pageTitle: "Upload Menu" });
};
