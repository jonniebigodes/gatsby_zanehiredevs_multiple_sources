exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
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
  if (multipleDataQuery.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const {data}= multipleDataQuery
  const {ContentFulItems,externalGraphQL}= data

  ContentFulItems.edges.forEach(element => {
    const characterPos= Math.floor(Math.random() * (externalGraphQL.characters.results.length - 1 + 1)) + 1;
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
