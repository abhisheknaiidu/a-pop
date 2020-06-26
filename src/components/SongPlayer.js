import React from 'react'
import Playlist from './Playlist'
import { Card, CardContent, Typography, IconButton, Slider, CardMedia, makeStyles } from '@material-ui/core'
import { SkipPrevious, PlayArrow, SkipNext, Pause } from '@material-ui/icons'
import { SongContext } from '../App'

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

    const { state, dispatch } = React.useContext(SongContext)

    // It dispatches a new action
    function handleSongPlay() {
        dispatch({ type: "PLAY_SONG" })
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
                type="range"
                min={0}
                max={1}
                step={0.01}
                />
            </div>
            <CardMedia className={classes.thumbnail}
            image={ state.song.thumbnail }
            />
        </Card>
        <Playlist />
        </>
    )
}

export default SongPlayer;
 