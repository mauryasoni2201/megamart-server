import { Response, Request, NextFunction } from "express";
import order from "../schema/order";
import mongoose from "mongoose";
import Order from "../models/Order";

export const placeOrder=async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
        const {orders} = req.body;
        const myOrders:Array<Order>= orders;
        if(myOrders.length===0){
            res.status(400).json({message:'Invalid Input provided.'})
            return;
        }else{
        await order.create({items:myOrders});
        res.status(201).json({message:'Order placed successfully.'});   
        }
    } catch (err:any) {
        if (err.name === 'ValidationError') {
            const errorMessages = Object.values(err.errors).map((error: any) => error.message).join(', ');
            res.status(422).json({
            message: 'Please provide a valid input.',
            errors: errorMessages
            });
        } else {
            res.status(500).json({message:'An error occurred while placing the order.'});
        }
        }
    }

export const getAllOrders=async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
        const orders:Array<Order> = await order.find();
        res.status(200).json(orders);    
    }catch(err){
        res.status(500).json({message:'An error occurred while getting orders.'});
    }
}

export const cancelOrder=async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(400).json({ message: 'Invalid order ID format.' });
            return;
        }
        const findOrder = await order.findById(req.params.id);
        if(!findOrder){
            res.status(404).json({message:'Order not found.'});
            return;
        }
        await order.findByIdAndDelete(req.params.id);
        res.status(200).json({message:'Order canceled successfully.'});
    }catch(err){
        res.status(500).json({ message:'An error occurred while canceling the order.'})
    }
}           

