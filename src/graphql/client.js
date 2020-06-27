// New Changes are done in order to use the subscription tool!
import ApolloClient from 'apollo-client'
import { WebSocketLink } from 'apollo-link-ws'
import { InMemoryCache } from 'apollo-cache-inmemory'

// import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
    link: new WebSocketLink({
        uri: 'wss://zepta-music.herokuapp.com/v1/graphql',
        options: {
            //Connects whenever it's possible
            reconnect: true
        }
    }),
    cache: new InMemoryCache(),
    // This has been done by hasura previously, creating these typeDefs for us 
    // , creating these shema's for us  but now we need to tell apollo
    // what we quering for, the data itself or any mutations
    typeDefs: gql`
    `
})

// const client = new ApolloClient( {
//     uri: 'https://zepta-music.herokuapp.com/v1/graphql'
// })

export default client;