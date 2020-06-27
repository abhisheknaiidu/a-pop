import React from 'react'
import { Card, CircularProgress, CardMedia, CardContent, Typography, CardActions, IconButton, makeStyles} from '@material-ui/core';
import { PlayArrow, Save, Pause } from '@material-ui/icons';
import { useSubscription, useMutation } from '@apollo/react-hooks';
import { GET_SONGS } from '../graphql/subscriptions';
import { SongContext } from '../App';
import { REMOVE_OR_ADD_FROM_PLAYLIST } from '../graphql/mutations';

function SongList() {

    //But now we are subscribing to new data changes
    const { data, loading, error } = useSubscription(GET_SONGS)

    // const song = {
    //     title: 'Abhishek',
    //     artist: 'Naidu',
    //     thumbnail: 'https://avatars0.githubusercontent.com/u/55599878?s=460&u=ed7ab421e2b7b0fdc9fd0ddeae2f73feeb72eede&v=4'
    // }

    if(error) {
        return(
            <div>
                Error fetching songs
            </div>
        )
    }

    if(loading) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 50
            }}>
                <CircularProgress />
            </div>
        )
    }
    
    return <div>
        {/* Return each song 10 times */}
        {/* {Array.from({ length: 10 }, () => song).map((song, i) => ( */}
        {data.songs.map((song) => (
            <Song key={song.id} song={song} />
        ))}
    </div>
}

const useStyles = makeStyles( theme => ({
    container: {
        margin: theme.spacing(3)
    },
    songInfoContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    songInfo: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    },
    thumbnail: {
        objectFit: 'cover',
        width: 140,
        height: 140
    }
}))

function Song({ song }) {

    const [currentSongPlaying, setCurrentSongPlaying] = React.useState(false)
    const {state, dispatch} = React.useContext(SongContext)
    const classes = useStyles()
    const [addOrRemoveFromPlaylist] = useMutation(REMOVE_OR_ADD_FROM_PLAYLIST)
    const { thumbnail, artist, title, id} = song

    React.useEffect( () => {
        const isSongPlaying = state.isPlaying && id === state.song.id
        setCurrentSongPlaying(isSongPlaying)
        //Our dependency array
    }, [id, state.song.id, state.isPlaying]) // we have to identify given song by ID

    function handleSongPlay() {
        dispatch( { type: 'SET_SONG', payload: { song } })
        dispatch(state.isPlaying ? { type: 'PAUSE_SONG' } : { type: 'PLAY_SONG' })
    }

    function handleRemoveOrAddFromPlaylist() {
        addOrRemoveFromPlaylist({
            variables: { input: { ...song, __typename: 'Song' } }
        })
    }

    return (
        <Card className={classes.container}>
            <div className={classes.songInfoContainer}>
                <CardMedia className={classes.thumbnail} image={thumbnail} />
                <div className={classes.songInfo}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {title}
                        </Typography>
                        <Typography variant="body1" component="p" color="textSecondary">
                            {artist}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <IconButton onClick={handleSongPlay} size="small" color="primary">
                            {/* here, everyone in the song list, are getting updated, 
                            but we just need the appropriate one to get updated 
                            so we can check for that using useEffects */}
                           { currentSongPlaying ? <Pause/> : <PlayArrow/>}
                        </IconButton>
                        <IconButton onClick={handleRemoveOrAddFromPlaylist} size="small" color="primary">
                            <Save/>
                        </IconButton>
                    </CardActions>
                </div>
            </div>
        </Card>
    )
}

export default SongList;
 