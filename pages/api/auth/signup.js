
import connecteDB from "../../../utils/conectDb"
import User from "../../../models/Userstwo"
import { hashPassword } from "../../../utils/auth"
export default async function handler(req,res){

    if(req.method !=="POST"){
        return

    }

    try {
        await connecteDB()
        
    } catch (error) {
        console.log(error)
       return  res.status(500).json({
            status:"faield",
            message:" Error in conection DB"
        })

        
    }

    const {email,password}=req.body;
    if(!email || !password){
        return res.status(422).json({
            status:"faield",
            message:"invalid data"
        })
    }

    const existingUser=await User.findOne({email:email})

    if(existingUser){
        return res.status(422).json({
            status:"faeild",
            message:"User Existing "

        })
    }

const hashedPassword=await  hashPassword(password)

const newUser=await User.create({email:email,password:hashedPassword})
console.log(newUser)
res.status(201).json({
    status:"success",
    message:"User Created"
})


}