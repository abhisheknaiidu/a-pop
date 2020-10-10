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

export const GET_PAGINATED_SONGS = gql`
  query getPaginatedSongs($offset: Int, $limit: Int) {
    songs(order_by: { created_at: desc }, limit:$limit, offset:$offset) {
      artist
      duration
      id
      thumbnail
      title
      url
    }
  }
`;
// One imp thing we need to add in here, is annotation,
// that tells apollo, only want to perform this query on client
// using @client
