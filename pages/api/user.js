import { verifyToken } from "@/utils/auth"

export default async function  handler (req,res){

    if(req.method!=="GET"){
        return

    }

    const secretkey=process.env.SECRET_KEY


    const {token}=req.cookies
    if(!token){
        return res.status(401).json({
            status:"faeild",
            message:"You are not login"

        })
    }

    const result=verifyToken(token,secretkey)
    if(result){
        return res.status(200).json({
            status:"success",
            data:result
        })

    }else{
        return res.status(401).json({
            status:"faeild",
            message:"you are unauthorization"
        })
    }
  
  

}