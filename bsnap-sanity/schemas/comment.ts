import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    defineField({
      name: 'comment',
      title: 'Comment',
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
