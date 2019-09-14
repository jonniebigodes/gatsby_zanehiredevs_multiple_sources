
//gatsby api to create the pages programmatically based on the data fetched
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  // aliased query with 2 datasources
  const multipleDataQuery = await graphql(`
    {
      ContentFulItems: allContentfulBlogPost {
        edges {
          node {
            slug
            title
            body {
              childMarkdownRemark {
                html
              }
            }
          }
        }
      }
      externalGraphQL: rickAndMorty {
        characters {
          results {
            id
            name
            status
            species
            image
            gender
          }
        }
      }
    }
  `)
  // checks if there's errors, puts them on the console
  if (multipleDataQuery.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // destructures the data
  const {data}= multipleDataQuery
  const {ContentFulItems,externalGraphQL}= data

  // will create a page based on each item from contentful
  ContentFulItems.edges.forEach(element => {
    // generates a random number to fetch a item from the second query.
    const characterPos= Math.floor(Math.random() * (externalGraphQL.characters.results.length - 1 + 1)) + 1;
    //
    /**
     * create page api call to generate the page based on contentful.
     * path will be where the page will "live"
     * component will be the template used to display the data
     * context is a special gatsby prop that allows injecting data from node to the actual page.
     * to access it you'll have get the data from pageContext prop ( see the template)
     * 
     */
    createPage({
      path:`/${element.node.slug}/`,
      component:require.resolve('./src/templates/dummy-template.js'),
      context:{
        contents:{
          title:element.node.title,
          content:element.node.body.childMarkdownRemark.html
        },
        AuthorData:externalGraphQL.characters.results[characterPos]
      }
    })
  });
}
