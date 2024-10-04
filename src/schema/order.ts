import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  items:{
    type:[{
        name:String,
        totalPrice:Number,
        image:String,
        quantity:Number,

    }],
    require:true
  }
});

export default mongoose.model("orders", orderSchema);
