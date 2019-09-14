import React from 'react'

const DummyTemplate=({pageContext})=>{
    // destructures the data that was recieved through gatsby-node.js 
    const {contents,AuthorData}= pageContext
    return(
        <div>
            <h1 style={{textAlign:'center'}}>{contents.title}</h1>
            <div>
                <div dangerouslySetInnerHTML={{__html:contents.content}}/>
            </div>
            <div>
                <div>
                    <img src={AuthorData.image} alt="random character"/>
                </div>
                <h2>About the author</h2>
                <h3>Created By:{AuthorData.name} who is a {AuthorData.species} {AuthorData.gender}</h3>
            </div>
        </div>
    )
}

export default DummyTemplate