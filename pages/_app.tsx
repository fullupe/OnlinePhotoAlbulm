import '../styles/globals.css'
import type { AppProps } from 'next/app';

import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'

import {SideBar} from "../components/SideBar"
import { Footer } from '../components/Footer';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  if(Component.getLayout){

    return Component.getLayout(<Component {...pageProps} />)

    };
  return (
    <div className="flex flex-col w-full justify-center items-center bg-[#F3F2EE]">
       <div className="flex w-full h-full justify-center items-center py-8">
      {/* <SideBar/> */}
      <Component {...pageProps} />
      </div>
      <Footer/>
    </div>
    

    )
}

export default MyApp
