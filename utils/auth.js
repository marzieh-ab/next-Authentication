import  { compare, hash }  from "bcryptjs"
import { verify } from "jsonwebtoken"

async function hashPassword(password){
    const hashedPassword=await hash(password,12)

    return hashedPassword

}

async  function verifyPassword(password,hashedPassword){
    const isValid=await compare(password,hashedPassword)
    

    return isValid

}

function verifyToken(token,secretkey){
   
    try {
        const result=verify(token,secretkey)
     
        return {email:result.email}
        
    } catch (error) {
        return false
        
    }


}

export {hashPassword,verifyPassword,verifyToken}