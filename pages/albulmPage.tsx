import { GetServerSideProps } from 'next'
import React, {useEffect, useState } from 'react';


import CardImage from "../components/CardImage"
import imageUrlBuilder from "@sanity/image-url"



//console.log(imageData)
interface Props{
  posts:[],
  albulmUser:string
}

interface Posts{
  _id:string,
  title:string,
  mainImage:string,
  slug:string | undefined
 
}

function AlbulmPage({posts, albulmUser}:Props) {

  //console.log("post",posts)

  const [mappedPost, setMappedPost] = useState<any>([])

 

  useEffect(() =>{
    const abortController = new AbortController();
    
    const getPostfromSanity = ()=>{

      
      if(posts.length){
        const imageBuilder = imageUrlBuilder({
          projectId:process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID!,
          dataset:process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET!,
          
        })
        setMappedPost(
          posts.map((post:[] | any)=>{
            return {
              ...post,
              mainImage:imageBuilder.image(post.mainImage).url()
            }
          })
          )
          
        }else{
          setMappedPost([])
        }
        
        
      }
      getPostfromSanity()

        return ()=>{
          abortController.abort()
        }
  },[posts])

  


  return (
        <div className=" flex md:w-[70%] md:h-[55%]  w-full shadow bg-white items-center justify-center overflow-scroll">
           

            <div className=" grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 sm:px-4 sm:mx-4 items-center justify-center  h-screend my-4  ">

                {
                  mappedPost?.map(({_id, title, mainImage, slug}:Posts)=>(

                    <CardImage id={_id} mainImage={mainImage} title={title} slug={slug} albulmUser={albulmUser} />

                  ))
                }

                
  
            </div>

   
          
        </div>

 
  )
}

 export const getServerSideProps: GetServerSideProps= async (Constext) =>{

  const albulmUser = Constext.req.cookies.name;

 const query = encodeURIComponent('*[ _type == "post" ]');
 const  projectId = process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID;

 const url = `https://${projectId}.api.sanity.io/v1/data/query/production?query=${query}`

 const result = await fetch(url).then(res=>res.json());


 if(!result.result || !result.result.length){
     return{
    props:{
      posts:[],
    }
     }
 }else{

  return{
    props:{
      posts:result.result,
      albulmUser,
    }
     }
 }

 
 }

export default AlbulmPage

