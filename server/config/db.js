import mongoose from 'mongoose';
import 'dotenv/config'; // لو شغال ES Modules

export const connectedDb=async()=>{
    try{

        console.log(process.env.MONGOOSE_URL)
        await mongoose.connect(process.env.MONGOOSE_URL);
        console.log("mongoose are working")

    }catch(error){
        console.log(error)
    }
}