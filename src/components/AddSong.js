import React from "react";
import {
  TextField,
  InputAdornment,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  makeStyles,
} from "@material-ui/core";
import { Link, AddBoxOutlined } from "@material-ui/icons";
import ReactPlayer from "react-player";
import Soundcloud from "react-player/lib/players/SoundCloud";
import YoutubePlayer from "react-player/lib/players/YouTube";
import { useMutation, useSubscription } from "@apollo/react-hooks";
import { ADD_SONG } from "../graphql/mutations";
import { GET_SONGS } from "../graphql/subscriptions";
import swal from "sweetalert";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
  },
  urlInput: {
    margin: theme.spacing(1),
  },
  addSongButton: {
    margin: theme.spacing(1),
  },
  dialog: {
    textAlign: "center",
  },
  thumbnail: {
    width: "90%",
  },
}));

function AddSong() {
  const classes = useStyles();
  // Returns Mutate function
  const [addSong, { error }] = useMutation(ADD_SONG);
  const [url, setUrl] = React.useState("");
  const [dialog, showDialog] = React.useState(false);
  const [playable, setPlayable] = React.useState(false);
  const { data } = useSubscription(GET_SONGS);
  const [song, setSong] = React.useState({
    title: "",
    artist: "",
    thumbnail: "",
    duration: 0,
  });

  async function handleEditSong({ player }) {
    const nestedPlayer = player.player.player;
    let songDetails;
    if (nestedPlayer.getVideoData) {
      songDetails = getYoutubeInfo(nestedPlayer);
    } else if (nestedPlayer.getCurrentSound) {
      songDetails = await getSoundcloudInfo(nestedPlayer);
    }
    setSong({ ...songDetails, url });
  }

  function getYoutubeInfo(player) {
    const { title, video_id, author } = player.getVideoData();
    const duration = player.getDuration();
    const thumbnail = `https://img.youtube.com/vi/${video_id}/0.jpg`;
    // console.log(title.slice(0, 10));
    return {
      title: title.slice(0, 25),
      artist: author,
      video_id,
      duration,
      thumbnail,
    };
  }

  function getSoundcloudInfo(player) {
    return new Promise((resolve) => {
      player.getCurrentSound((songDetails) => {
        if (songDetails) {
          resolve({
            duration: Number(songDetails.duration / 1000), // Convert into sec from ms
            title: songDetails.title,
            artist: songDetails.user.username,
            thumbnail: songDetails.artwork_url.replace("-large", "-t500x500"),
          });
        }
      });
    });
  }

  function handleSongDetails(event) {
    const { name, value } = event.target;
    setSong((prevSongDetails) => ({
      ...prevSongDetails,
      // Using computed property syntax, we can dyanamically update the syntax
      // where name is set to value
      [name]: value,
    }));
  }

  async function handleAddSong() {
    // One Approach, but its not gonna helps in catching the errors!
    // like the exclamations condition added to the end of the every mutation objects
    // addSong({ variables: { ...song}})

    try {
      const { url, thumbnail, duration, title, artist } = song;
      await addSong({
        variables: {
          url: url.length > 0 ? url : null,
          duration: duration > 0 ? duration : null,
          thumbnail: thumbnail.length > 0 ? thumbnail : null,
          artist: artist.length > 0 ? artist : null,
          title: title.length > 0 ? title : null,
        },
      });
      handleCloseDialog();
      setSong({
        title: "",
        artist: "",
        thumbnail: "",
        duration: 0,
      });
      setUrl("");
    } catch (error) {
      console.error("Error adding Song", error);
    }
  }
  // either title, artist, thumbnail field
  function handleInputError(field) {
    // return only if there is a error
    // return error && error.graphQLErrors[0].extensions.path.includes(field)
    return error?.networkError?.extensions?.path.includes(field);
  }

  //Check whether this song is playable or not,
  React.useEffect(() => {
    const isPlayable = YoutubePlayer.canPlay(url) || Soundcloud.canPlay(url);
    setPlayable(isPlayable);
  }, [url]); // its gonna be dependent and sync with the url

  function handleCloseDialog() {
    showDialog(false);
  }

  function handleShowDialogBox() {
    let flag = 0;
    data.songs.forEach((element) => {
      if (element.url === url) {
        flag = 1;
      }
    });
    flag === 1
      ? swal("Oops", "Song is already present in list!!", "error")
      : showDialog(true);
  }

  const { thumbnail, artist, title } = song;
  // console.dir(error)
  return (
    <div className={classes.container}>
      <Dialog
        className={classes.dialog}
        open={dialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle> Edit Song </DialogTitle>
        <DialogContent>
          <img
            src={thumbnail}
            alt="Song thumbnail"
            className={classes.thumbnail}
            // loading="lazy"
          />
          <TextField
            value={title}
            margin="dense"
            name="title"
            onChange={handleSongDetails}
            error={handleInputError("title")}
            helperText={handleInputError("title") && "Fill out the title field"}
            // inputProps={{ maxLength: 22 }}
            label="Title"
            fullWidth
          />
          <TextField
            value={artist}
            margin="dense"
            name="artist"
            error={handleInputError("artist")}
            helperText={
              handleInputError("artist") && "Fill out the artist field"
            }
            onChange={handleSongDetails}
            inputProps={{ maxLength: 17 }}
            label="Artist"
            fullWidth
          />
          <TextField
            value={thumbnail}
            margin="dense"
            name="thumbnail"
            error={handleInputError("thumbnail")}
            helperText={
              handleInputError("thumbnail") && "Fill out the thumbnail field"
            }
            onChange={handleSongDetails}
            label="Thubmnail"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button color="primary" onClick={handleAddSong} variant="outlined">
            Add Song
          </Button>
        </DialogActions>
      </Dialog>
      <TextField
        onChange={(event) => setUrl(event.target.value)}
        value={url} // making control, to be able to clear out the form easily
        className={classes.urlInput}
        placeholder="Add either Youtube 📹 or Soundcloud 🎶 Url "
        fullWidth
        margin="normal"
        type="url"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Link />
            </InputAdornment>
          ),
        }}
      />
      <Button
        disabled={!playable}
        className={classes.addSongButton}
        onClick={handleShowDialogBox}
        variant="contained"
        color="secondary"
        endIcon={<AddBoxOutlined />}
      >
        Add
      </Button>
      {/* onReady will give us all the Songdetails when the react player is loaded
    on the url */}
      <ReactPlayer url={url} hidden onReady={handleEditSong} />
    </div>
  );
}

export default AddSong;
