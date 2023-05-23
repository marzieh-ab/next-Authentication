
import { verifyToken ,verifyPassword} from "../../utils/auth"
import conectDB from "@/utils/conectDb"
import User from "../../models/Userstwo"


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


    const{name,password,lastName}=req.body

    console.log(password)
    const {token}=req.cookies
    const secretkey=process.env.SECRET_KEY

    if(!token){
        return res.status(401).json({
            status:"faield",
            message:"You are not logedin"

        })
    }

    const result=verifyToken(token,secretkey)
    console.log(result,"result")

    if(!result){

        return res.status(401).json({
            status:"faield",
            message:"You are not authorizied"

        })

    }

    const user=await User.findOne({email:result.email})
    if(!user){
        return res.status(404).json({
            status:"faield",
            message:"user dosenot exist"

        })

    }

    const isValid=await verifyPassword(password,user.password)

    if(!isValid){
        return res.status(422).json({
            status:"faield",
            message:"password is incorrect"

        })

    }
    user.name=name,
    user.lastName=lastName
    user.save()
    return res.status(200).json({
        status:"success",
        data:{name,lastName,email:result.email}

    })





}