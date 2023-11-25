import mongoose from "mongoose";
let isConnected = false;

export const connectDb = async ()=>{
    mongoose.set('strictQuery', true);
    if (isConnected){
        console.log('MongoDb is already running');
        return; 
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName:"share_prompt",
            useNewUrlParser : true,
            useUnifiedTopology : true
        });
        isConnected = true;
        console.log('MongoDB connected!');
    } catch (e) {
        console.log(e);
    }
}