import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  itemUrl: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  itemPrice: {
    type: Number,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
    default: 1,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const model = mongoose.model("Item", ItemSchema);

export default model;
