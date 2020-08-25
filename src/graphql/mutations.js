import { gql } from "apollo-boost";

export const ADD_SONG = gql`
  mutation addSong(
    $title: String!
    $artist: String!
    $thumbnail: String!
    $duration: Float!
    $url: String!
  ) {
    insert_songs(
      objects: {
        title: $title
        artist: $artist
        thumbnail: $thumbnail
        duration: $duration
        url: $url
      }
    ) {
      affected_rows
    }
  }
`;

export const REMOVE_OR_ADD_FROM_PLAYLIST = gql`
  mutation addOrRemoveFromPlaylist($input: SongInput!) {
    addOrRemoveFromPlaylist(input: $input) @client
  }
`;
