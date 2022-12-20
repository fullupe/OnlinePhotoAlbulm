import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'liked',
  title: 'Liked',
  type: 'document',
  fields: [
    defineField({
      name: 'liked',
      title: 'Liked',
      type: 'string',
    }),
    defineField({
      name: 'user',
      title: 'User',
      type: 'string',
    }),
    defineField({
      name: 'post',
      title: 'Post',
      type: 'reference',
      to:{
        type:'post'
      }
    }),
  ],
})
