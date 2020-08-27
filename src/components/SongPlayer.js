import React from "react";
import Playlist from "./Playlist";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Slider,
  CardMedia,
  makeStyles,
  useMediaQuery,
} from "@material-ui/core";
import {
  SkipPrevious,
  PlayArrow,
  SkipNext,
  Pause,
  RepeatOne,
  Repeat,
} from "@material-ui/icons";
import { SongContext } from "../App";
import { useQuery } from "@apollo/react-hooks";
import { GET_PLAYLIST_SONGS } from "../graphql/queries";
import ReactPlayer from "react-player";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    padding: "0px 15px",
  },
  content: {
    flex: "1 0 auto",
  },
  thumbnail: {
    width: 150,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

function SongPlayer() {
  const classes = useStyles();

  const [playedSeconds, setPlayedSeconds] = React.useState(0);
  const reactPlayerRef = React.useRef();
  const [played, setPlayed] = React.useState(0);
  const [seeking, setSeeking] = React.useState(false);
  const { data } = useQuery(GET_PLAYLIST_SONGS);
  const { state, dispatch } = React.useContext(SongContext);
  const [postionInPlaylist, setPostionInPlaylist] = React.useState(0);
  const [displayPlaylist, setDisplayPlaylist] = React.useState("none");
  const greaterThanMd = useMediaQuery((theme) => theme.breakpoints.up("md"));

  // It dispatches a new action
  function handleSongPlay() {
    dispatch(state.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" });
  }
  // slider provides newValue prop
  function handleMusicChange(event, newValue) {
    setPlayed(newValue);
  }

  function handleSeekMouseDown() {
    setSeeking(true);
  }

  function handleSeekMouseUp() {
    setSeeking(false);
    reactPlayerRef.current.seekTo(played);
  }

  function formatDuration(seconds) {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
  }

  function handlePlayPrevSong() {
    const prevSong = data.playlist[postionInPlaylist - 1];
    if (prevSong) {
      dispatch({ type: "SET_SONG", payload: { song: prevSong } });
    }
  }

  function handlePlayNextSong() {
    const nextSong = data.playlist[postionInPlaylist + 1];
    if (nextSong) {
      dispatch({ type: "SET_SONG", payload: { song: nextSong } });
    }
  }

  function handleRepeatOn() {
    dispatch(
      state.isRepeating ? { type: "REPEAT_OFF" } : { type: "REPEAT_ON" }
    );
  }

  function handleDisplayPlaylist() {
    if (!greaterThanMd) {
      if (displayPlaylist === "none") setDisplayPlaylist("block");
      else setDisplayPlaylist("none");
    }
  }

  React.useEffect(() => {
    const songIndex = data.playlist.findIndex(
      (song) => song.id === state.song.id
    );
    setPostionInPlaylist(songIndex);
  }, [data.playlist, state.song.id]);

  // logic to play for next song
  React.useEffect(() => {
    const nextSong = data.playlist[postionInPlaylist + 1];

    // After finishing, played song becomes 1

    /* SINGLE SONG REPEAT */
    if (played >= 0.999) {
      if (state.isRepeating) {
        setPlayed(0);
        reactPlayerRef.current.seekTo(played);
      } else if (!state.isRepeating && nextSong) {
        setPlayed(0);
        dispatch({ type: "SET_SONG", payload: { song: nextSong } });
      }
    }
  }, [state, data.playlist, played, dispatch, postionInPlaylist]);

  React.useEffect(() => {
    /* Only target desktop device */
    if (window.screen.width >= 1280) {
      window.onkeydown = function (e) {
        /* Only target spacebar click on "body" to not interfer with "input", "button", (...) elements */
        if (e.target === document.body && (e.keyCode || e.wich) === 32) {
          e.preventDefault();
          handleSongPlay();
        }
      };
    }
  });

  return (
    <>
      <Card className={classes.container} variant="outlined">
        <div className={classes.details}>
          <CardContent
            className={classes.content}
            onClick={handleDisplayPlaylist}
          >
            <Typography variant="h5" component="h3">
              {state.song.title}
            </Typography>
            <Typography variant="subtitle1" component="p" color="textSecondary">
              {state.song.artist}
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <IconButton onClick={handlePlayPrevSong}>
              <SkipPrevious />
            </IconButton>
            <IconButton onClick={handleSongPlay}>
              {state.isPlaying ? (
                <Pause className={classes.playIcon} />
              ) : (
                <PlayArrow className={classes.playIcon} />
              )}
            </IconButton>
            <IconButton onClick={handlePlayNextSong}>
              <SkipNext />
            </IconButton>
            <IconButton onClick={handleRepeatOn}>
              {state.isRepeating ? (
                <RepeatOne style={{ color: "green" }} />
              ) : (
                <Repeat />
              )}
            </IconButton>
            <Typography variant="subtitle1" component="p" color="textSecondary">
              {formatDuration(playedSeconds)}
            </Typography>
          </div>
          <Slider
            defaultValue={40}
            value={played}
            onPointerUp={handleSeekMouseUp}
            onPointerDown={handleSeekMouseDown}
            onMouseDown={handleSeekMouseDown}
            onMouseUp={handleSeekMouseUp}
            onChange={handleMusicChange}
            type="range"
            min={0}
            max={1}
            step={0.01}
          />
        </div>
        <ReactPlayer
          ref={reactPlayerRef}
          onProgress={({ played, playedSeconds }) => {
            if (!seeking) {
              setPlayed(played);
              setPlayedSeconds(playedSeconds);
            }
          }}
          url={state.song.url}
          playing={state.isPlaying}
          hidden
        />
        <CardMedia className={classes.thumbnail} image={state.song.thumbnail} />
      </Card>
      {greaterThanMd ? (
        <Playlist playlist={data.playlist} />
      ) : (
        <div style={{ display: displayPlaylist }}>
          <Playlist playlist={data.playlist} />
        </div>
      )}
    </>
  );
}

export default SongPlayer;
