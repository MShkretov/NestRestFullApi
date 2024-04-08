import * as mongoose from 'mongoose';

export const UserOrderSchema = new mongoose.Schema({
  userId: { type: Number, required: true },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
});

export interface UserOrder extends mongoose.Document {
  userId: number;
  orderId: mongoose.Schema.Types.ObjectId;
}