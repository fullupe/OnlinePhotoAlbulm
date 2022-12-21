import React, { useState } from 'react'
import {SimpleTypeWriter} from "./SimpleTypeWriter";
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'



interface Props {
    
}

export const Login = (props: Props) => {
    const router = useRouter()

  
    const [password, setPassword] = useState<string>();

  
    const submitName =(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

       if(password) {

        Cookies.set('name', password)
    
        router.push('/albulmPage')
    }

    console.log(password)

    }


    return (
        <div className="flex flex-col h-screen justify-center items-center w-full bg-gray-100">
            <div className=" flex bg-white  h-60 overflow-hidden justify-center rounded-t-lg shadow w-96 rounded-br-[50%] bg-[url('/bg2.jpg')] bg-cover hover:bg-cover bg-local">
            <div className=" backdrop-blur-sm  bg-black flex flex-col w-full h-full  items-center justify-center text-white  opacity-80">

            
                         <SimpleTypeWriter/>
                        <>
                        
                         <form onSubmit={submitName} className="flex flex-col items-center space-y-3">
                          

                         <input value={password} onChange={(e)=>setPassword(e.target.value)} maxLength={7} className=" rounded w-full text-center  text-black outline-none" placeholder="Your Name...." type="text"/>
                         <button type="submit" className="px-4 mt-2 py-1 tracking-[2px] shadow rounded-full bg-orange-900">Login</button>
                         </form>

                        </>
                  
            </div>
            </div>
            <div className=" flex flex-col bg-white h-60 border border-[#A3DF] items-center justify-center rounded-b-lg shadow w-96 rounded-tr-[50%]  opacity-100">
                <div className={`  backdrop-blur-sm shadow-lg cursor-pointer border  border-green-300 flex w-24 h-24 rounded-full items-center justify-center text-white  bg-[url('/bg2.jpg')] bg-cover hover:bg-cover bg-local`}>

            
                </div>

                <p className="tracking-[4px] text-gray-400">Photo Albulm</p>

             </div>

        </div>
    )
}
