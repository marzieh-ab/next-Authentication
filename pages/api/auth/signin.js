import conectDB from "../../../utils/conectDb"

import User from "../../../models/Userstwo"
import { verifyPassword } from "../../../utils/auth"
import { sign } from "jsonwebtoken"
import { serialize } from "cookie"

export default async function handler(req,res){

    if(req.method!=="POST"){
        return
    }

    try {
        await conectDB()
        
    } catch (error) {

        console.log(error.message)
        return res.status(500).json({
            status:"faield",
            message:"Error in conecting to Db"

        })
        
    }

    const {email,password}=req.body

    const secretkey=process.env.SECRET_KEY
    const expieration=24*60*60

    if(!email || !password){
        return res.status(422).json({
            status:"faield",
            message:"Invalid Data"
        })
    }

    const user=await User.findOne({email:email})
    if(!user){
        res.status(404).json({
            status:"faield",
            message:"User dose not Exist"
        })

    }

    const isValid=await verifyPassword(password,user.password)

    if(!isValid){
        return res.status(422).json({
            status:"faield",
            message:"username or password is invalid"
        })
    }

    const token=sign({email},secretkey,{expiresIn:expieration})
    const serialized=serialize("token",token,{
        httpOnly:true,
        maxAge:expieration,
        path:"/"
    })

    res.status(200)
    .setHeader("Set-cookie",serialized)
    .json({
        status:"success",
        message:"Loggedin"
    })

}