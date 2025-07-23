import {defineField, defineType, defineArrayMember} from 'sanity'
import {UserIcon, BookIcon, CogIcon, CaseIcon} from '@sanity/icons'

export const aboutType = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  icon: UserIcon,
  groups: [
    {name: 'about', title: 'About', icon: UserIcon, default: true},
    {name: 'experience', title: 'Experience', icon: CaseIcon},
    {name: 'education', title: 'Education', icon: BookIcon},
    {name: 'skills', title: 'Skills & Tools', icon: CogIcon},
  ],
  fields: [
    // About Section
    defineField({
      name: 'aboutImage',
      title: 'Profile Image',
      type: 'image',
      group: 'about',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'aboutDescription',
      title: 'About Description',
      type: 'text',
      rows: 6,
      group: 'about',
      validation: (rule) => rule.required().min(50).max(1000),
    }),

    // Experience Section
    defineField({
      name: 'experiences',
      title: 'Work Experience',
      type: 'array',
      group: 'experience',
      of: [
        defineArrayMember({
          type: 'object',
          icon: CaseIcon,
          fields: [
            defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'company', type: 'string', validation: (rule) => rule.required()}),
            defineField({
              name: 'description',
              type: 'text',
              rows: 4,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'startDate',
              type: 'date',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'endDate',
              type: 'date',
              description: 'Leave empty if current position',
            }),
            defineField({
              name: 'isCurrent',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: 'title',
              company: 'company',
              startDate: 'startDate',
              endDate: 'endDate',
              isCurrent: 'isCurrent',
            },
            prepare(selection) {
              const {title, company, startDate, endDate, isCurrent} = selection

              const formatDate = (dateString: string) => {
                if (!dateString) return ''
                const date = new Date(dateString)
                return date.toLocaleDateString('en-US', {month: 'short', year: 'numeric'})
              }

              const start = formatDate(startDate)
              const end = isCurrent ? 'Present' : formatDate(endDate)

              return {
                title: `${title} at ${company}`,
                subtitle: `${start} - ${end}`,
              }
            },
          },
        }),
      ],
    }),

    // Education Section
    defineField({
      name: 'educations',
      title: 'Education',
      type: 'array',
      group: 'education',
      of: [
        defineArrayMember({
          type: 'object',
          icon: BookIcon,
          fields: [
            defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
            defineField({
              name: 'institution',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({name: 'description', type: 'text', rows: 3}),
            defineField({name: 'startDate', type: 'date', validation: (rule) => rule.required()}),
            defineField({
              name: 'endDate',
              type: 'date',
              description: 'Leave empty if currently studying',
            }),
            defineField({name: 'isCurrent', type: 'boolean', initialValue: false}),
          ],
          preview: {
            select: {
              title: 'title',
              institution: 'institution',
              startDate: 'startDate',
              endDate: 'endDate',
              isCurrent: 'isCurrent',
            },
            prepare(selection) {
              const {title, institution, startDate, endDate, isCurrent} = selection

              const getYear = (dateString: string) => {
                if (!dateString) return ''
                return new Date(dateString).getFullYear()
              }

              const startYear = getYear(startDate)
              const endYear = isCurrent ? 'Present' : getYear(endDate)

              return {
                title: `${title} - ${institution}`,
                subtitle: `${startYear} - ${endYear}`,
              }
            },
          },
        }),
      ],
    }),

    // Disciplines Section
    defineField({
      name: 'disciplines',
      title: 'Disciplines',
      type: 'array',
      group: 'skills',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'name', type: 'string', validation: (rule) => rule.required()}),
          ],
          preview: {select: {title: 'name'}},
        }),
      ],
    }),

    // Tools Section
    defineField({
      name: 'tools',
      title: 'Tools & Technologies',
      type: 'array',
      group: 'skills',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'name', type: 'string', validation: (rule) => rule.required()}),
            defineField({
              name: 'icon',
              type: 'image',
              options: {hotspot: true},
              validation: (rule) => rule.required(),
            })
          ],
          preview: {
            select: {title: 'name', media: 'icon'},
            prepare(selection) {
              const {title, media} = selection
              return {
                title: title,
                media: media,
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {media: 'aboutImage', description: 'aboutDescription'},
    prepare(selection) {
      const {media, description} = selection
      return {
        title: 'About me',
        subtitle: description ? `${description.substring(0, 60)}...` : 'About content',
        media: media,
      }
    },
  },
})