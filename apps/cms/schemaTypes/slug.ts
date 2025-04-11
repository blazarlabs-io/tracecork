export default {
  name: 'slug',
  title: 'Slug',
  type: 'slug',
  options: {
    source: (content: any) => {
      console.log(content)
      return content.title
    },
    maxLength: 200, // Optional: Set the maximum length of the slug
    // slugify: (input: any) =>
    //   input
    //     .toLowerCase()
    //     .replace(/\s+/g, '-') // Replace spaces with dashes
    //     .replace(/[^a-z0-9-]/g, '') // Remove invalid characters
    //     .slice(0, 200), // Trim to the max length
  },
  description: 'A URL-friendly identifier generated from the title.',
  validation: (Rule: any) => Rule.required(),
}
