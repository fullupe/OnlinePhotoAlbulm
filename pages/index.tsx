import type { NextPage } from 'next'
import React,{ ReactElement, useEffect, useState} from 'react';
import Head from 'next/head'
import { Login } from '../components/Login';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie'


const Home: NextPage = () => {
  const router = useRouter()


  const [albulmUser, setAlbulmUser] = useState<string>('')

  useEffect(() =>{

    setAlbulmUser(Cookies.get('name') || "")

  },[])

  if(albulmUser){
    router.push('/albulmPage')
  }


  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>B. Snap</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-0 text-center">
      
          <Login/>
          
      </main>

     
    </div>
  )
}

export default Home;
// Home.getLayout = function PageLayout(page:ReactElement){
 // return (<>{page}</>)
//}
// function key(key: any, arg1: string): string {
//   throw new Error('Function not implemented.');
// }

