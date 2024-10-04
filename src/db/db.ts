import mongoose from "mongoose";

const connectDb=async():Promise<void>=>{
    try{
        await mongoose.connect(`${process.env.MONGO_URI}`);
        console.log(`Database connected!`);
    }catch(error){
        throw new Error("Error while connecting database!");
    }
}
export default connectDb;