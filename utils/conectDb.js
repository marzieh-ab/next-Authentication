import { mongoose } from 'mongoose';

async function conectDB(){

  
        if(mongoose.connections[0].readyState) {
            console.log("ol")
             return;
        } 
        await mongoose.connect(process.env.MONGO_URI)
        console.log("conected db")
   

}

export default conectDB