import sanityClient from "@sanity/client";


export default sanityClient({
  projectId:process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID,
  dataset:process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET || 'production',
  apiVersion: "v1",
  //useCdn: process.env.NODE_ENV === 'production',
  useCdn: false,
});