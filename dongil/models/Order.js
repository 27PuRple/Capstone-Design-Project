import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";
import moment from "moment-timezone";

const dateSeoul = moment.tz.setDefault("Asia/Seoul");

const OrderSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    required: true,
    default: dateSeoul,
  },
  table_num: {
    type: Number,
    required: true,
  },
  items: {
    type: Object,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  order_num: {
    type: Number,
    required: true,
  },
});

OrderSchema.plugin(autoIncrement.plugin, {
  model: "Order",
  field: "order_num",
  startAt: 1, //시작
  increment: 1, // 증가
});

const model = mongoose.model("Order", OrderSchema);

export default model;
