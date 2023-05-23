import { verifyToken } from '../utils/auth'
import {useState} from 'react'

function dashboars({result}) {

  const [name,setName]=useState("")
  const[lastName,setLastName]=useState("")
  const[password,setPassword]=useState("")

  const clickHandler=async()=>{

    const res=await fetch('/api/update-info',{
      method:"POST",
      body:JSON.stringify({name,lastName,password}),
      headers:{"Content-Type":"application/json"}
    })
    const data=await res.json()
    console.log(data )

  }
  return (
    <>
       <div>dashboars</div>
       <p>your email is{result.email}</p>
       <input type="text"   value={name}  onChange={(event)=> setName(event.target.value)}/>
       <input type="text"   value={lastName}  onChange={(event)=>setLastName(event.target.value)}/>
       <input type="password"   value={password}  onChange={(event)=>setPassword(event.target.value)}/>

       <button  onClick={clickHandler}>Submit</button>
    
    </>
 
    
  )
}

export default dashboars


export  async function getServerSideProps(context){

  const {token}=context.req.cookies
  const secretkey=process.env.SECRET_KEY

  const result=verifyToken(token,secretkey)

  if(!result){
    return{
      redirect:{destination:"/signin", permanent:false}
    }
  }

  return{
    props:{result}
  }



}