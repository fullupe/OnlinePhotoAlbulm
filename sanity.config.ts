import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

const projectId=process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID!;
const dataset=process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET!;

export default defineConfig({
  basePath:"/studio",
  name: 'BERIMA_snap_studio',
  title: 'BERIMA Snap Studio',

  projectId,
  dataset,

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
