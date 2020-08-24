// New Changes are done in order to use the subscription tool!
import ApolloClient from "apollo-client";
import { WebSocketLink } from "apollo-link-ws";
import { InMemoryCache } from "apollo-cache-inmemory";
import { gql } from "apollo-boost";
import { GET_PLAYLIST_SONGS } from "./queries";

// import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
  link: new WebSocketLink({
    uri: "wss://zepta-music.herokuapp.com/v1/graphql",
    options: {
      //Connects whenever it's possible
      reconnect: true,
    },
  }),
  cache: new InMemoryCache(),
  // This has been done by hasura previously, creating these typeDefs for us
  // , creating these shema's for us  but now we need to tell apollo
  // what we quering for, the data itself or any mutations

  typeDefs: gql`
    type Song {
      id: uuid!
      thumbnail: String!
      artist: String!
      title: String!
      duration: Float!
      url: String!
    }

    input SongInput {
      id: uuid!
      thumbnail: String!
      artist: String!
      title: String!
      duration: Float!
      url: String!
    }

    type Query {
      playlist: [Song]!
    }

    type Mutation {
      addOrRemoveFromPlaylist(input: SongInput!): [Song]!
    }
  `,
  // returns array of type song
  // So we defined to apollo, what exactly our song data woulb be consists of,
  // how to query the data and how to make mutations to it
  // Tells how our mutations and queries resolve!
  resolvers: {
    Mutation: {
      // We're gonna specify how the data we got recieved on input
      // is gonna turn into array into array of Songs!
      addOrRemoveFromPlaylist: (_, { input }, { cache }) => {
        const queryResult = cache.readQuery({
          query: GET_PLAYLIST_SONGS,
        });
        if (queryResult) {
          const { playlist } = queryResult;
          //checking where the particular song already resides in playlist or not
          const isInPlaylist = playlist.some((song) => song.id === input.id);
          const newPlaylist = isInPlaylist
            ? playlist.filter((song) => song.id !== input.id)
            : [...playlist, input]; // Add input in the very end!
          // add it in the end of the queue
          cache.writeQuery({
            query: GET_PLAYLIST_SONGS,
            data: { playlist: newPlaylist },
          });
          return newPlaylist;
        }
        return [];
      },
    },
  },
});

const hasPlaylist = Boolean(localStorage.getItem("playlist"));
// taken from local storage and put them in a cache, queried using a
// local query and put in the Playlist component!
const data = {
  playlist: hasPlaylist ? JSON.parse(localStorage.getItem("playlist")) : [],
};

// the way through which we give the created client the data
client.writeData({ data });

// const client = new ApolloClient( {
//     uri: 'https://zepta-music.herokuapp.com/v1/graphql'
// })

export default client;
