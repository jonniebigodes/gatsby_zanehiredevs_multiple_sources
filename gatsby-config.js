/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

require('dotenv').config({
  /* path: `.env.${process.env.NODE_ENV}`, */
})
module.exports = {
  /* Your site config here */
  plugins:[
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        downloadLocal: true,
      },
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'RMAPI',
        fieldName: 'rickAndMorty',
        url: 'https://rickandmortyapi.com/graphql',
      },
    },
    `gatsby-transformer-remark`
  ]
}
