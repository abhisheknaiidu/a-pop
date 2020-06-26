import React from 'react'
import { TextField, InputAdornment, Button, Dialog, DialogContent, DialogTitle, DialogActions, makeStyles} from '@material-ui/core'
import { Link, AddBoxOutlined } from '@material-ui/icons'
import ReactPlayer from 'react-player'
import Soundcloud from 'react-player/lib/players/SoundCloud'
import YoutubePlayer from 'react-player/lib/players/YouTube'

const useStyles = makeStyles( theme => ( {
    container: {
        display: 'flex',
        alignItems: 'center'
    },
    urlInput: {
        margin: theme.spacing(1)
    },
    addSongButton: {
        margin: theme.spacing(1)
    },
    dialog: {
        textAlign: 'center',
    },
    thumbnail: {
        width: '90%'
    }
}))

function AddSong() {
    
    const classes = useStyles()
    const[url, setUrl] = React.useState('')
    const [dialog, showDialog] = React.useState(false)
    const [playable, setPlayable] = React.useState(false)
    const [song, setSong] = React.useState( {
        title: '',
        artist: '',
        thumbnail: '',
        duration: 0
    })

    async function handleEditSong( {player} ) {
        const nestedPlayer = player.player.player
        let songDetails;
        if(nestedPlayer.getVideoData) {
            songDetails = getYoutubeInfo(nestedPlayer)
        } else if (nestedPlayer.getCurrentSound) {
          songDetails = await getSoundcloudInfo(nestedPlayer)
        }
        setSong( { ...songDetails, url })
    }

    function getYoutubeInfo(player) {
        const { title, video_id, author} = player.getVideoData()
        const duration = player.getDuration()
        const thumbnail = `http://img.youtube.com/vi/${video_id}/0.jpg`
        return {
            title,
            author,
            video_id,
            duration,
            thumbnail
        }
    }

    function getSoundcloudInfo(player) {
        return new Promise( resolve => {
            player.getCurrentSound( songDetails => {
                if(songDetails) {
                    resolve({
                        duration: Number(songDetails.duration / 1000), // Convert into sec from ms
                        title: songDetails.title,
                        artist: songDetails.user.username,
                        thumbnail: songDetails.artwork_url.replace('-large', '-t500x500')
                    })
                }
            })
        })
    }

    //Check whether this song is playable or not,
    React.useEffect( () => {
      const isPlayable = YoutubePlayer.canPlay(url) || Soundcloud.canPlay(url)
      setPlayable(isPlayable)
    }, [url]) // its gonna be dependent and sync with the url

    function handleCloseDialog() {
        showDialog(false)
    }

    const { thumbnail, artist, title } = song
    return (
        <div className={classes.container}>
            <Dialog
            className={classes.dialog}
              open={dialog}
              onClose={handleCloseDialog}
            >
                <DialogTitle> Edit Song </DialogTitle>
                <DialogContent>
                    <img src={thumbnail}
                    alt="Song thumbnail"
                    className={classes.thumbnail}
                    />
                    <TextField
                    value={title}
                    margin="dense"
                    name="title"
                    label="Title"
                    fullWidth
                    />
                    <TextField
                    value={artist}
                    margin="dense"
                    name="artist"
                    label="Artist"
                    fullWidth
                    />
                    <TextField
                    value={thumbnail}
                    margin="dense"
                    name="thumbnail"
                    label="Thubmnail"
                    fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">
                        Cancel
                    </Button>
                    <Button color="primary" variant="outlined">
                        Add Song
                    </Button>
                </DialogActions>
            </Dialog>
            <TextField
            onChange={event => setUrl(event.target.value)}
            value={url} // making control, to be able to clear out the form easily
            className={classes.urlInput}
            placeholder="Add either Youtube 📹 or Soundcloud 🎶 Url "
            fullWidth
            margin="normal"
            type="url"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    <Link/>
                    </InputAdornment>
                )
            }}
        />
        <Button
        disabled={!playable}
        className={classes.addSongButton}
        onClick={ () => showDialog(true)}
        variant="contained" color="secondary"
        endIcon={<AddBoxOutlined/>} >
            Add
        </Button>
    {/* onReady will give us all the Songdetails when the react player is loaded
    on the url */}
        <ReactPlayer url={url} hidden onReady={handleEditSong} />
        </div>
    )
}

export default AddSong;
 