import React from 'react'
import Playlist from './Playlist'
import { Card, CardContent, Typography, IconButton, Slider, CardMedia, makeStyles } from '@material-ui/core'
import { SkipPrevious, PlayArrow, SkipNext } from '@material-ui/icons'

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

    return (
        <>
        <Card className={classes.container} variant="outlined">
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography variant="h5" component="h3">
                        Title
                    </Typography>
                    <Typography variant="subtitle1" component="p" color="textSecondary">
                        Artist
                    </Typography>
                </CardContent>
            <div className={classes.controls}>
                <IconButton>
                    <SkipPrevious/>
                </IconButton>
                <IconButton>
                    <PlayArrow className={classes.playIcon}/>
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
            image="https://avatars0.githubusercontent.com/u/55599878?s=460&u=ed7ab421e2b7b0fdc9fd0ddeae2f73feeb72eede&v=4"
            />
        </Card>
        <Playlist />
        </>
    )
}

export default SongPlayer;
 