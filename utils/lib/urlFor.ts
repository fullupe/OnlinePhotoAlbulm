import React from 'react'
import sanityClient from '../../client'


import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(sanityClient)


function urlFor(source:any){
    return builder.image(source)
}

export default urlFor

// this file is not in use...