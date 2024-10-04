import express from "express";
import { placeOrder, cancelOrder, getAllOrders } from "../controller/ordersController";
const orderRouter = express.Router();

orderRouter.route('/').get(getAllOrders).post(placeOrder);
orderRouter.route('/:id').delete(cancelOrder);
export default orderRouter;


