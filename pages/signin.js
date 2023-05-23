import { useRouter } from 'next/router'
import {useState,useEffect} from 'react'

function signin() {
    const [email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const router=useRouter()

    useEffect(() => {

      fetch('/api/user')
      .then(res=>res.json())
      .then(data=>{
        if(data.status=="success"){
          window.location.href="/dashboard"
        }
      })
      
    }, []);
 

    const handelClick=async()=>{
        const res=await fetch("/api/auth/signin",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({email,password})

        })
        const data=await res.json()
        if(data.status=="success") router.push('/dashboard')
        

    }
  return (
    <div>
        <h3>login from</h3>
        <input type="text"   value={email}  onChange={(event)=>setEmail(event.target.value)}/>
        <input type="password"   value={password}  onChange={(event)=>setPassword(event.target.value)}/>
        <button  onClick={handelClick}>login</button>

    </div>
  )
}

export default signin