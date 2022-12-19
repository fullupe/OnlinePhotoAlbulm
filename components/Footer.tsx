import React from 'react';
import { AiOutlineTwitter } from 'react-icons/ai';
import { MdContactPage } from 'react-icons/md';
import Link from 'next/link'


interface Props {
    
}

export const Footer = (props: Props) => {
    return (
        <footer className="flex h-24 w-full items-center justify-center md:hidden border-t">
        
        <div className="flex space-x-10"> 
        
        <Link target="_blank" href="https://williamgyekyeportfolio.vercel.app/"  className="flex flex-col  items-center">
          <p className="text-gray-700">Contact Dev.</p>
          <MdContactPage className="bg-black text-white rounded-full text-4xl p-1 hover:scale-75 duration-75"/>
        </Link>

        <Link target="_blank" href="https://twitter.com/home" className="flex flex-col items-center justify-center">
          <p className="text-gray-700">Twitter</p>
          <AiOutlineTwitter className="bg-black text-white rounded-full text-4xl p-1 hover:scale-75 duration-75"/>
        </Link>

        </div>
      </footer>
    )
}
