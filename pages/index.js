import Link from "next/link";
import {useState,useEffect}  from "react"


export default function Home() {
  const [isLogin,setIsLogin]=useState(false)

  useEffect(()=>{
    fetch('/api/user')
    .then(res=>res.json())
    .then(data=>{
     if( data.status=="success") setIsLogin(true)
    })


  },[])

  const signOutHandler= async()=>{
    const res=await fetch('/api/auth/signout')
    const data=await res.json()
   if(data.status=="success") setIsLogin(false)

  }

  


  return (
    <>
    {!isLogin?
    <>
    <button>
    <Link  href="/signup">signup</Link>
    </button>
    <button>
    <Link  href="/signin">signin</Link>
    </button>

    </>:null}
 {
  isLogin?(

  <>

<button>
    <Link  href="/dashboard">dashboard</Link>
    </button>

    <button  onClick={signOutHandler} >

      logout
   


    </button>
  
  </>
  ):null
 }

  


  
    </>
 
  )
}


