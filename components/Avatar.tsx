import React, { ReactElement } from 'react'
import Image from "next/image"

interface Props {
    
}

function Avatar({}: Props): ReactElement {
    return (
        <img
        className="rounded-full bg-black flex p-0.5 w-9 h-9"
        //layout="fill" 
        //width="32"
        //height="32"
        src={`https://avatars.dicebear.com/api/pixel-art/${Math.random()*100}.svg`} alt={''}/>
            
    
    )
}

export default Avatar
