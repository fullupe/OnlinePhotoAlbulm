import React, { ReactElement, useState,useEffect } from 'react';
import Image from 'next/image'

import { AiFillLike,AiOutlineComment,AiFillHeart } from 'react-icons/ai';
import { useRouter } from 'next/router';
import sanityClient from ".././client";
import addLiked from '../utils/addLiked';

import {runFire} from "../utils/lib/runFire";

import {memo} from "react"

interface Props {
    id:string,
    mainImage:string,
    title?:string,
    slug:string | any,
    albulmUser:string

}

interface Likeds{
    
}

function CardImage({id, mainImage, title, slug, albulmUser}: Props): ReactElement {

    const router = useRouter()

    const [comment, setcomment] = useState<string[]>();

    const [likeds, setlikeds] = useState<string[]>()

    const [likedSent, setLikedSent] = useState<boolean>(false);

    const [alreadyClicked, setalreadyClicked] = useState<any>([])



    useEffect(() =>{
        const abortController = new AbortController();
       
        const getCommentData = ()=>{
        sanityClient
        .fetch(`*[ _type == "comment" && references(*[ _type == 'post' && _id == "${id}" ]._id)]`)
        .then((data) => setcomment(data))
    
        .catch(console.error);

        }

        getCommentData()

        return ()=>{
            abortController.abort()
        }
        
    },[sanityClient])



    useEffect(() =>{
        const abortController = new AbortController();

        const getLikedData =()=>{

            sanityClient
            
            .fetch(`*[ _type == "liked" && references(*[ _type == 'post' && _id == "${id}" ]._id)]`)
            .then((data) => setlikeds(data))
            
            .catch(console.error);
            
        }
        getLikedData()

        return ()=>{
            abortController.abort()
        }


    },[likedSent, sanityClient, alreadyClicked])


    const liked = (id: string)=>{

        let already = []

        already.push(id)

        setalreadyClicked(already)

        if(!alreadyClicked.includes(id)){
            addLiked(id, albulmUser)
    
            setLikedSent(!likedSent)
     
            runFire()
        }

    }

    
    return (
        <div 
        
        key={id!}
     
        className=" flex space-x-1 m-4 relative  rounded-lg cursor-pointer">
            <div  className="  flex  items-center justify-center rounded-lg h-96 w-96 border-2 border-orange-300 relative ">
                
                <Image
                src={mainImage} alt="img"
                loader={()=>mainImage}
                width={384}
                height={384}
                
                className=" object-cover  h-96 w-96  rounded-md  overflow-hidden " 
                />
              <div className="flex absolute  w-full h-full  overflow-hidden top-0  items-end ">

                <div onClick={()=>router.push(`/post/${slug.current}`)} className="flex h-full w-full"></div>
          
           
              <div className="flex space-y-8 hover:scale-105 hover:mr-2 duration-75 flex-col w-ful bg-[#AADC]d z-10 p-2 transparent items-end justify-center">

       
             <p className="captilize text-white tracking-[4px] italic">
               statistic
             </p>
            
             <div onClick={()=>router.push(`/post/${slug.current}`)} className="flex flex-col items-center justify-center">
             <div className="flex bg-[#5c5cacdd] rounded-full h-8 w-8 flex-col justify-center items-center">
                 <AiOutlineComment className="text-2xl text-white"/> 
             </div>
             <p className="flex text-white text-xs">{comment?.length}</p>
             </div>


                <div onClick={()=>liked(id)} className="flex flex-col items-center justify-center">
                 <div className="flex bg-[#5c5cacdd] rounded-full h-8 w-8  p-1  flex-col justify-center items-center">
                 <AiFillLike  className="text-2xl text-white hover:scale-150"/> 
                  </div>
                 <p className="text-xs text-white">{likeds?.length}</p>
                </div>

                 <div onClick={()=>liked(id)} className="bg-[#5c5cacdd] rounded-full h-8 w-8 p-1 flex justify-center items-center ">
                  <AiFillHeart  className="text-lg text-white hover:scale-150 "/>
                 </div>

               </div>
             

            </div>

            </div>


            
        </div>
    )
}

export default memo(CardImage)





