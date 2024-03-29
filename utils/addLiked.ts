export default async function  addLiked (id:string,albulmUser:string){

    const  projectId = process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID
    
    const mutations={
        mutations:[
            { 
                create:{
                    _type:'liked',
                    liked:'liked',
                    user:albulmUser,
                    post:{
                        _type:'reference',
                        _ref:id,
                    }
                }
            }
        ]

    }

    console.log("you",albulmUser)
    
    await fetch(`https://${projectId}.api.sanity.io/v1/data/mutate/production`, {
    method: 'post',
    headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_STUDIO_API_TOKEN}`
    
    },
    body: JSON.stringify(mutations)
    })
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.error(error))
    
    }