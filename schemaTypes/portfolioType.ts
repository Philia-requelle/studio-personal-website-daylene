import {defineField, defineType, defineArrayMember} from 'sanity'
import {CaseIcon, ImageIcon, LinkIcon, TagIcon} from '@sanity/icons'

export const portfolioType = defineType({
  name: 'portfolio',
  title: 'Portfolio',
  type: 'document',
  icon: CaseIcon,
  groups: [
    {name: 'basic', title: 'Basic Info', icon: CaseIcon, default: true},
    {name: 'details', title: 'Project Details', icon: TagIcon},
    {name: 'media', title: 'Images & Links', icon: ImageIcon},
  ],
  fields: [
    // Basic Information
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      group: 'basic',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Short Description',
      type: 'string',
      group: 'basic',
      description: 'Brief description for project cards',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'basic',
      description: 'URL-friendly version of title',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    // Project Details
    defineField({
      name: 'role',
      title: 'My Role',
      type: 'string',
      group: 'details',
      description: 'Your role in this project',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'contribution',
      title: 'Key Contributions',
      type: 'text',
      rows: 3,
      group: 'details',
      description: 'What you specifically contributed to the project',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      group: 'details',
      validation: (rule) => rule.required().min(2000).max(new Date().getFullYear()),
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'text',
      rows: 6,
      group: 'details',
      description: 'Detailed project description',
      validation: (rule) => rule.max(2000),
    }),

    // Media & Links
    defineField({
      name: 'mainImage',
      title: 'Main Project Image',
      type: 'image',
      group: 'media',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Project Gallery',
      type: 'array',
      group: 'media',
      description: 'Additional project images',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
        }),
      ],
    }),
    defineField({
      name: 'links',
      title: 'Project Links',
      type: 'array',
      group: 'media',
      description: 'Live demo, repository, or other relevant links',
      of: [
        defineArrayMember({
          type: 'object',
          icon: LinkIcon,
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'type',
              type: 'string',
              options: {
                list: [
                  {title: 'Live Demo', value: 'demo'},
                  {title: 'Source Code', value: 'code'},
                  {title: 'Case Study', value: 'case-study'},
                  {title: 'Other', value: 'other'},
                ],
              },
              initialValue: 'demo',
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'type', url: 'url'},
            prepare(selection) {
              const {title, subtitle, url} = selection
              return {
                title: title,
                subtitle: `${subtitle} - ${url}`,
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      summary: 'summary',
      year: 'year',
    },
    prepare(selection) {
      const {title, media, summary, year} = selection
      return {
        title: title,
        subtitle: `${year} - ${summary}`,
        media: media,
      }
    },
  },
})