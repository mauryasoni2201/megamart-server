"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    items: {
        type: [{
                name: String,
                totalPrice: Number,
                image: String,
                quantity: Number,
            }],
        require: true
    }
});
exports.default = mongoose_1.default.model("orders", orderSchema);
