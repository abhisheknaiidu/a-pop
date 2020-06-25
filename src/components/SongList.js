import React from 'react'
import { Card, CircularProgress, CardMedia, CardContent, Typography, CardActions, IconButton, makeStyles} from '@material-ui/core';
import { PlayArrow, Save } from '@material-ui/icons';

function SongList() {
    const song = {
        title: 'Abhishek',
        artist: 'Naidu',
        thumbnail: 'https://avatars0.githubusercontent.com/u/55599878?s=460&u=ed7ab421e2b7b0fdc9fd0ddeae2f73feeb72eede&v=4'
    }
    let loading = false;

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
        {Array.from({ length: 10 }, () => song).map((song, i) => (
            <Song key={i} song={song} />
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
    const classes = useStyles()
    const { thumbnail, artist, title} = song
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
                        <IconButton size="small" color="primary">
                            <PlayArrow/>
                        </IconButton>
                        <IconButton size="small" color="primary">
                            <Save/>
                        </IconButton>
                    </CardActions>
                </div>
            </div>
        </Card>
    )
}

export default SongList;
 