import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
  productId: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
});

export interface Order extends mongoose.Document {
  id: string;
  productId: number;
  quantity: number;
}