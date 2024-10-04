"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ordersController_1 = require("../controller/ordersController");
const orderRouter = express_1.default.Router();
orderRouter.route('/').get(ordersController_1.getAllOrders).post(ordersController_1.placeOrder);
orderRouter.route('/:id').delete(ordersController_1.cancelOrder);
exports.default = orderRouter;
