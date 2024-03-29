import { GetServerSideProps } from 'next';
import React, {useState, useEffect, ReactElement } from 'react'
import imageUrlBuilder from "@sanity/image-url"
import sanityClient from "../../client";
import addCommment from '../../utils/addComment';
import { BiSend } from 'react-icons/bi';
import {TbArrowBackUp } from 'react-icons/tb';
import {BsEmojiFrown,BsArrowUpCircleFill } from 'react-icons/bs';


import { useRouter } from 'next/router'
import Image from 'next/image'

import Avatar from '../../components/Avatar';
import TimeAgo from 'react-timeago'
import { Footer } from '../../components/Footer';
import Cookies from 'js-cookie'

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'


interface Props {
    title: string,
    body: string,
    image:any,
    id:string,
    comment:[]
    somename:string
}


function Post({image, id, somename}: Props): ReactElement {

    const router = useRouter()

    const [showEmoji, setShowEmoji] = useState(false)

    const [imageUrl, setImageUrl] = useState<any>("")

    const [comment, setcomment] = useState<[]>([]);

    const [inputComment, setinputComment] = useState<string>('')

    const [comentSent, setComentSent] = useState<boolean>(false);


    //console.log(albulmUser)

    useEffect(() =>{
        const abortController = new AbortController();

        const getCommentData = ()=>{

            sanityClient
            .fetch(`*[ _type == "comment" && references(*[ _type == 'post' && _id == "${id}" ]._id) ] |  order (_createdAt desc) `)
            .then((data) => setcomment(data))
            .catch(console.error);
        }
         getCommentData()

        return ()=>{
             abortController.abort()
         }

    },[inputComment, comentSent, id])


    useEffect(()=>{

        const abortController = new AbortController();
        const loadSanityImage = ()=>{

            const imageBuilder = imageUrlBuilder({
                 projectId:process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID!,
                 dataset:process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET!,
            })
            setImageUrl(imageBuilder.image(image).url())
        }

        loadSanityImage()

        return ()=>{

            abortController.abort()
        }

    },[image])

    const AddEmoji = (e:any)=>{
        const sym = e.unified.split("_");
        const codeArray: any[] =[];
        sym.map((el:any)=>codeArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codeArray);

        setinputComment(inputComment + emoji)


    }


    const addSubmit=  async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

       
        if(inputComment ){

            await addCommment(inputComment, id, somename)
    
            setinputComment('')

            setComentSent(!comentSent)

         
        }
        
    }



    return (
        <div className=" bg-whited flex h-full w-full  flex-col md:max-w-[60%] space-y-2 ">

      

                <div className="flex h-70 object-containk w-full bg-red-00 rounded-lg shadow relative">
                    {
                      imageUrl ? (
                         
                          <Image
                          loader={()=>imageUrl}
                           width={384}

                           //fill
                           height={384}
                           src={imageUrl} alt="img" 
                           //className="object-cover object-center"
                           className=" object-cover object-center md:object-topl  transition duration-300 w-full h-[600px] md:h-[960px] md:object-center rounded-lg p-2  overflow-hidden"
                           />
                       
                      )  :(
                          null
                      )
                    }
                 
                    <TbArrowBackUp onClick={()=>router.push("/")} className="absolute top-2 left-2 text-4xl bg-black rounded-lg text-white m-2 hover:scale-105 cursor-pointer"/>

                </div>


                <div className=" flex flex-col space-y-4 mx-2 bg-whites w-full ">
                    <form  onSubmit={addSubmit} className=" flex w-full px-2 py-1 rounded-lg border-2  relative">
                        <div className="flex w-full items-center px-2 py-1 rounded-lg border-2 border-orange-400">
                        <input value={inputComment} onChange={(e)=>setinputComment(e.target.value)} placeholder="Type comments......" type="text" className=" w-full outline-none bg-transparent "/>
                            
                       
                            <BsEmojiFrown onClick={()=>setShowEmoji(!showEmoji)} className="mr-4 w-6 h-6 cursor-pointer"/>
    
                            <button type="submit"  disabled={!inputComment} className=" bg-orange-400 p-2 disabled:bg-gray-500 rounded-full">
                                <BiSend className="w-5 h-5 text-white"/>
                            </button>
                        
                        </div>

                        {
                            showEmoji && (
                                <div  className="absolute right-20 top-14 -mt-1 bg-red-900d pb-2 items-center justify-center flex flex-col ">
                        <Picker data={data} emojiSize={20} emojiButtonSize={28} maxFrequentRows={0} onEmojiSelect={AddEmoji} />
                        <BsArrowUpCircleFill onClick={()=>setShowEmoji(!showEmoji)} className="h-6 z-10 -mt-4 w-6 cursor-pointer"/>
                        </div>
                            )
                        }
                        
                        
                    </form>

                    <p className="ml-2 text-xs text-gray-900 italic font-serif">welcom.. {somename} !</p>
                    <div className="flex flex-col m-2 h-[400px] space-y-5 scrollbar-hide overflow-scroll mx-4">
             
                    {
                      
                        comment?.map((com:any)=>(
                                
                            <div key={com?._id} className="flex w-full border-b-2d border-gray-300 shadow   scrollbar-hide rounded-lg bg-white px-2 py-1">
                                  <div className=" flex-1 space-x-2 ">
                                     <div className=" flex  space-x-2 h-10 w-10">
                                      <Avatar/>
                                      <p className="text-xs text-gray-500 italic">{com?.user}</p>
                                     </div>
                                     <p className="pt-1 capitalize font-mono text-black">{com?.comment}</p> 
                                   </div>

                                   <div className="mr-2 text-xs text-gray-500">
                                    
                                    <TimeAgo date={com?._createdAt}/>
                                    </div>
                            </div>
                            
                            ))
                     
                    }
                        
                    </div>


                    <Footer/>

                </div>
              



  
            
        </div>
    )
}


export const getServerSideProps: GetServerSideProps= async (Constext) =>{

     const imagePost = Constext?.query?.slug;
     const somename = Constext.req.cookies.name;

     console.log(imagePost);

    if(!imagePost){
        return { 
            notFound:true
        }
    }

    const query = encodeURIComponent(`*[ _type == "post" && slug.current == "${imagePost}"]`)

    const  projectId = process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID
   
    const url = `https://${projectId}.api.sanity.io/v1/data/query/production?query=${query}`
    
    const result = await fetch(url).then(res=>res.json());
    const post = result.result[0];
    
    
    
    if(!post){
        return{
        notFound:true
        }
    }else{
        return {
        props:{
            body:post?.body || null,
            title:post?.title ,
            image:post?.mainImage,
            id:post?._id,
            somename,
            
           

        }
        }
    }


}
export default Post;








