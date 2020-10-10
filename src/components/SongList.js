import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  makeStyles,
  TextField,
  InputAdornment,
  useMediaQuery,
} from "@material-ui/core";
import { PlayArrow, Pause, Search } from "@material-ui/icons";
import Skeleton from "@material-ui/lab/Skeleton";
import { useSubscription, useMutation, useQuery } from "@apollo/react-hooks";
import { GET_SONGS } from "../graphql/subscriptions";
import { SongContext } from "../App";
import { REMOVE_OR_ADD_FROM_PLAYLIST } from "../graphql/mutations";
import { GET_PLAYLIST_SONGS } from "../graphql/queries";
import PlaylistAddOutlinedIcon from "@material-ui/icons/PlaylistAddOutlined";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import NightIcon from "./NightIcon";
import DayIcon from "./DayIcon";
import { useMyTheme } from "../theme";

const useStyles = makeStyles((theme) => ({
  containerSearch: {
    display: "flex",
    alignItems: "center",
  },
  textInput: {
    margin: theme.spacing(1),
  },
  containerSongList: {
    margin: theme.spacing(3),
  },
  songInfoContainer: {
    display: "flex",
    alignItems: "center",
  },
  songInfo: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  skeletonSongInfo: {
    width: "100%",
    justifyContent: "space-between",
  },
  thumbnail: {
    objectFit: "cover",
    width: 140,
    height: 76,
  },
}));

function SongList() {
  const greaterThanSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const [darkTheme, changeTheme] = useMyTheme();

  //But now we are subscribing to new data changes
  const { data, loading, error } = useSubscription(GET_SONGS);
  const {
    data: { playlist },
  } = useQuery(GET_PLAYLIST_SONGS);
  const classes = useStyles();

  // Integrating Search bar inside SongList component
  // for easier functionality / Implementation
  const [searchTerm, setSearchTerm] = React.useState("");

  // const song = {
  //     title: 'Abhishek',
  //     artist: 'Naidu',
  //     thumbnail: 'https://avatars0.githubusercontent.com/u/55599878?s=460&u=ed7ab421e2b7b0fdc9fd0ddeae2f73feeb72eede&v=4'
  // }

  if (error) {
    return <div>Error fetching songs</div>;
  }

  if (loading) {
    return (
      <React.Fragment>
        <div className={classes.containerSearch}>
          <TextField
            className={classes.textInput}
            placeholder="Search for a song by name!"
            fullWidth
            margin="normal"
            type="text"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </div>
        {[...Array(50)].map((i, j) => (
          <SkeletonList key={j} />
        ))}
      </React.Fragment>
    );
  }

  function SkeletonList() {
    return (
      <div className={classes.containerSongList}>
        <div className={classes.songInfoContainer}>
          <Skeleton variant="rect" width={140} height={140}></Skeleton>
          <div className={classes.skeletonSongInfo}>
            <CardContent>
              <Typography component="h3" variant="h2">
                <Skeleton />
              </Typography>
              <Typography component="p" variant="h5">
                <Skeleton width="30%" />
              </Typography>
            </CardContent>
          </div>
        </div>
      </div>
    );
  }

  function handleEditSearchTerm(sch) {
    setSearchTerm(sch.target.value);
  }

  function handleDynamicSearch() {
    return data.songs.filter((song) =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  function isInPlaylist({ id: idRef }) {
    return playlist.some((song) => song.id === idRef);
  }

  return (
    <React.Fragment>
      <div className={classes.containerSearch}>
        {/* <input type='text' placeholder='Search for a song by name!' /> */}
        <TextField
          // variant="body1"
          // component="p"
          className={classes.textInput}
          value={searchTerm}
          onChange={handleEditSearchTerm}
          placeholder="Search for a song by name!"
          fullWidth
          margin="normal"
          type="text"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        {!greaterThanSm && (
          <IconButton
            color="primary"
            size="big"
            style={{ marginLeft: "auto" }}
            onClick={() => changeTheme(!darkTheme)}
          >
            <>{!darkTheme ? <NightIcon /> : <DayIcon />}</>
          </IconButton>
        )}
      </div>
      <div>
        {handleDynamicSearch().map((song) => (
          /* There might be a more performant way to achieve this ... */
          <Song key={song.id} song={song} inPlaylist={isInPlaylist(song)} />
        ))}
      </div>
    </React.Fragment>
  );
}

function Song({ song, inPlaylist }) {
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
    <Card className={classes.containerSongList}>
      <div className={classes.songInfoContainer}>
        <CardMedia className={classes.thumbnail} image={thumbnail} />
        <div className={classes.songInfo}>
          <CardContent>
            <Typography
              className={classes.title}
              gutterBottom
              variant="h5"
              component="h2"
            >
              {title}
            </Typography>
            <Typography
              className={classes.artist}
              variant="body1"
              component="p"
              color="textSecondary"
            >
              {artist}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton onClick={handleSongPlay} size="small">
              {/* here, everyone in the song list, are getting updated, 
                            but we just need the appropriate one to get updated 
                            so we can check for that using useEffects */}
              {currentSongPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
            <IconButton onClick={handleRemoveOrAddFromPlaylist} size="small">
              {inPlaylist ? (
                <PlaylistAddCheckIcon />
              ) : (
                <PlaylistAddOutlinedIcon />
              )}
            </IconButton>
          </CardActions>
        </div>
      </div>
    </Card>
  );
}

export default SongList;
