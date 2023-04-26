import React, { useState } from 'react'
import {SimpleTypeWriter} from "./SimpleTypeWriter";
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { ColorRing } from 'react-loader-spinner'



interface Props {
    
}

export const Login = (props: Props) => {
    const router = useRouter()

  
    const [password, setPassword] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false)

  
    const submitName =(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

       if(password) {

        setLoading(true)
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
                          
                         <input value={password} onChange={(e)=>setPassword(e.target.value)} maxLength={7} className=" rounded-full py-1 w-full text-center border-2 border-[#A3DF]  text-black outline-none" placeholder="Your Name...." type="text"/>
                            
                            {
                            loading &&
                            <ColorRing
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="blocks-loading"
                            wrapperStyle={{}}
                            wrapperClass="blocks-wrapper"
                            colors={['#e15b64', '#f47e60', '#A3DF', '#abbd81', '#849b87']}
                            />
                            
                            }

                         <div className=" bg-yellow-500 rounded-full items-center w-[80%] border-2 border-black  flex justify-center">
                         <button type="submit" className="px-4 my-1 w-[80%] tracking-[2px] shadow  border-2  font-bold rounded-full bg-yellow-600">Login</button>
                         </div>

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
