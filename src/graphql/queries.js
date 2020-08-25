import { gql } from "apollo-boost";

export const GET_PLAYLIST_SONGS = gql`
  query getPlaylistSongs {
    playlist @client {
      id
      title
      artist
      thumbnail
      url
    }
  }
`;
// One imp thing we need to add in here, is annotation,
// that tells apollo, only want to perform this query on client
// using @client
