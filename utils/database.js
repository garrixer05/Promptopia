import mongoose from "mongoose";
let isConnected = false;

export const connectDb = async ()=>{
    mongoose.set('strictQuery', true);
    if (isConnected){
        console.log('MongoDb is already running');
        return; 
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017",{
            dbName:"Promtopia",
        });
        isConnected = true;
        console.log('MongoDB connected!');
    } catch (e) {
        console.log(e);
    }
}