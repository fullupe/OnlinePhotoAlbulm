import React, { ReactElement } from 'react'
import Image from "next/image"

interface Props {
    
}

function Avatar({}: Props): ReactElement {
    return (
        <Image
        className="rounded-full bg-black"
        layout="fillh" 
        width="300"
        height="300"
        src={`https://avatars.dicebear.com/api/pixel-art/${Math.random()*100}.svg`} alt={''}/>
            
    
    )
}

export default Avatar
