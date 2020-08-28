import React from "react";
import {
  Card,
  Typography,
  Avatar,
  IconButton,
  makeStyles,
  useMediaQuery,
} from "@material-ui/core";
import { Delete, PlayArrow, Pause } from "@material-ui/icons";
import { SongContext } from "../App";
import { REMOVE_OR_ADD_FROM_PLAYLIST } from "../graphql/mutations";
import { useMutation } from "@apollo/react-hooks";

const useStyles = makeStyles({
  container: {
    display: "grid",
    gridAutoFlow: "column",
    gridTemplateColumns: "50px auto 50px 50px",
    gridGap: 12,
    alignItems: "center",
    marginTop: 10,
  },
  avator: {
    width: 44,
    height: 44,
  },
  text: {
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  songInfoContainer: {
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
});

function Playlist({ playlist }) {
  // console.log( {playlist} )
  const greaterThanMd = useMediaQuery((theme) => theme.breakpoints.up("md"));

  // const song = {
  //     title: 'Abhishek',
  //     artist: 'Naidu',
  //     thumbnail: 'https://avatars0.githubusercontent.com/u/55599878?s=460&u=ed7ab421e2b7b0fdc9fd0ddeae2f73feeb72eede&v=4'
  // }

  if (greaterThanMd) {
    return (
      <div style={{ margin: "10px 0" }}>
        <Typography color="textSecondary" variant="button">
          PLAYLIST ({playlist.length})
        </Typography>
        {playlist.map((song, i) => (
          <PlaylistSong key={i} song={song} />
        ))}
      </div>
    );
  } else {
    return (
      <div style={{ margin: "10px 0" }}>
        <Typography color="inherit" variant="button">
          PLAYLIST ({playlist.length})
        </Typography>
        <Card style={{ height: "240px", overflow: "scroll" }}>
          {playlist.map((song, i) => (
            <PlaylistSong key={i} song={song} />
          ))}
        </Card>
      </div>
    );
  }
}

function PlaylistSong({ song }) {
  const [currentSongPlaying, setCurrentSongPlaying] = React.useState(false);
  const { state, dispatch } = React.useContext(SongContext);

  const classes = useStyles();
  const [addOrRemoveFromPlaylist] = useMutation(REMOVE_OR_ADD_FROM_PLAYLIST, {
    onCompleted: (data) => {
      localStorage.setItem(
        "playlist",
        JSON.stringify(data.addOrRemoveFromPlaylist)
      ); //Stores playlist in browser's local storage!
    },
  });
  const { thumbnail, artist, title, id } = song;
  React.useEffect(() => {
    const isSongPlaying = state.isPlaying && id === state.song.id;
    setCurrentSongPlaying(isSongPlaying);
    //Our dependency array
  }, [id, state.song.id, state.isPlaying]); // we have to identify given song by ID

  function handleSongPlay() {
    dispatch({ type: "SET_SONG", payload: { song } });
    dispatch(state.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" });
  }

  function handleRemoveOrAddFromPlaylist() {
    addOrRemoveFromPlaylist({
      variables: { input: { ...song, __typename: "Song" } },
    });
  }

  return (
    <div className={classes.container}>
      <Avatar className={classes.avator} src={thumbnail} alt="Song Thumbnail" />
      <div className={classes.songInfoContainer}>
        <Typography className={classes.text} variant="subtitile2">
          {title}
        </Typography>
        <Typography
          className={classes.text}
          color="textSecondary"
          variant="body2"
        >
          {artist}
        </Typography>
      </div>
      <IconButton onClick={handleSongPlay} color="primary">
        {currentSongPlaying ? <Pause /> : <PlayArrow />}
      </IconButton>
      <IconButton onClick={handleRemoveOrAddFromPlaylist}>
        <Delete color="warning" />
      </IconButton>
    </div>
  );
}

export default Playlist;
