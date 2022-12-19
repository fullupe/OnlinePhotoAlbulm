import React from 'react';
import { useTypewriter } from 'react-simple-typewriter'

interface Props {
    
}

export const SimpleTypeWriter = (props: Props) => {

    const [text, count] = useTypewriter({
        /* Config */
        words:["Welcome","berima's photo albulm"],loop:true, delaySpeed:500,
        //words:["WELCOME...🙏","BERIMA OKWANING BRAKO-GYEKYE"],loop:true, delaySpeed:2000,
        // words:["CONGRATULATIONS TO MYSELF...🥂","AND THANK YOU MY DEAR WIFE...😘"],loop:true, delaySpeed:2000,
      })
    return (
        <div className="h-8 bg-orange-40q0 my-1 px-2 rounded-lg justify-center items-center flex">
    <p className="text-white text-xs uppercase">{text}</p>
  </div>
    )
}



