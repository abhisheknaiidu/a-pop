import React from 'react'
import Playlist from './Playlist'
import { Card, CardContent, Typography, IconButton, Slider, CardMedia, makeStyles } from '@material-ui/core'
import { SkipPrevious, PlayArrow, SkipNext, Pause } from '@material-ui/icons'
import { SongContext } from '../App'
import { useQuery } from '@apollo/react-hooks'
import { GET_PLAYLIST_SONGS } from '../graphql/queries'
import ReactPlayer from 'react-player'

const useStyles = makeStyles( theme => ({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0px 15px'
    },
    content: {
        flex: '1 0 auto'
    },
    thumbnail: {
        width: 150
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    },
    playIcon: {
        height: 38,
        width: 38
    }
}))

function SongPlayer() {
    const classes = useStyles()

    const [played, setPlayed] = React.useState(0)
    const { data } = useQuery(GET_PLAYLIST_SONGS)
    const { state, dispatch } = React.useContext(SongContext)

    // It dispatches a new action
    function handleSongPlay() {
        dispatch(state.isPlaying ? { type: 'PAUSE_SONG' } : { type: 'PLAY_SONG' })
    }
    
    return (
        <>
        <Card className={classes.container} variant="outlined">
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography variant="h5" component="h3">
                        { state.song.title }
                    </Typography>
                    <Typography variant="subtitle1" component="p" color="textSecondary">
                        { state.song.title }
                    </Typography>
                </CardContent>
            <div className={classes.controls}>
                <IconButton>
                    <SkipPrevious/>
                </IconButton>
                <IconButton onClick={handleSongPlay}>
                    { state.isPlaying ? <Pause className={classes.playIcon}/> : <PlayArrow className={classes.playIcon}/>}
                </IconButton>
                <IconButton>
                    <SkipNext/>
                </IconButton>
                <Typography variant="subtitle1" component="p" color="textSecondary">
                        00:01:30
                </Typography>
                </div>
                <Slider
                value={played}
                type="range"
                min={0}
                max={1}
                step={0.01}
                />
            </div>
            <ReactPlayer 
            onProgress={ ({ played, playedSeconds }) => {
                setPlayed(played)
            }}
            url={state.song.url} playing={state.isPlaying} hidden />
            <CardMedia className={classes.thumbnail}
            image={ state.song.thumbnail }
            />
        </Card>
        <Playlist playlist={data.playlist}/>
        </>
    )
}

export default SongPlayer;
 