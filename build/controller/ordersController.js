"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelOrder = exports.getAllOrders = exports.placeOrder = void 0;
const order_1 = __importDefault(require("../schema/order"));
const mongoose_1 = __importDefault(require("mongoose"));
const placeOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orders } = req.body;
        const myOrders = orders;
        if (myOrders.length === 0) {
            res.status(400).json({ message: 'Invalid Input provided.' });
            return;
        }
        else {
            yield order_1.default.create({ items: myOrders });
            res.status(201).json({ message: 'Order placed successfully.' });
        }
    }
    catch (err) {
        if (err.name === 'ValidationError') {
            const errorMessages = Object.values(err.errors).map((error) => error.message).join(', ');
            res.status(422).json({
                message: 'Please provide a valid input.',
                errors: errorMessages
            });
        }
        else {
            res.status(500).json({ message: 'An error occurred while placing the order.' });
        }
    }
});
exports.placeOrder = placeOrder;
const getAllOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_1.default.find();
        res.status(200).json(orders);
    }
    catch (err) {
        res.status(500).json({ message: 'An error occurred while getting orders.' });
    }
});
exports.getAllOrders = getAllOrders;
const cancelOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(req.params.id)) {
            res.status(400).json({ message: 'Invalid order ID format.' });
            return;
        }
        const findOrder = yield order_1.default.findById(req.params.id);
        if (!findOrder) {
            res.status(404).json({ message: 'Order not found.' });
            return;
        }
        yield order_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Order canceled successfully.' });
    }
    catch (err) {
        res.status(500).json({ message: 'An error occurred while canceling the order.' });
    }
});
exports.cancelOrder = cancelOrder;
