import React from 'react'
import { Typography, Avatar, IconButton, makeStyles } from '@material-ui/core'
import { Delete } from '@material-ui/icons'

const useStyles = makeStyles({
    container: {
        display: 'grid',
        gridAutoFlow: 'column',
        gridTemplateColumns: '50px auto 50px',
        gridGap: 12,
        alignItems: 'center',
        marginTop: 10
    },
    avator: {
        width: 44,
        height: 44
    },
    text: {
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    },
    songInfoContainer: {
        overflow: 'hidden',
        whiteSpace: 'nowrap'
    },
})
 
function Playlist() {

    const song = {
        title: 'Abhishek',
        artist: 'Naidu',
        thumbnail: 'https://avatars0.githubusercontent.com/u/55599878?s=460&u=ed7ab421e2b7b0fdc9fd0ddeae2f73feeb72eede&v=4'
    }

    return (
    <div style={{ margin: '10px 0' }}>
        <Typography color="textSecondary" variant="button">
            PLAYLIST (5)
        </Typography>
        {Array.from({ length: 5 }, () => song).map((song, i) => (
            <PlaylistSong key={i} song={song} />
        ))}
    </div>
    )
}

function PlaylistSong({ song }) {

    const classes = useStyles()

    const { artist, thumbnail, title} = song
    return (
        <div className={classes.container}>
            <Avatar className={classes.avator} src={thumbnail} alt="Song Thumbnail" />
            <div className={classes.songInfoContainer}>
            <Typography className={classes.text} variant="subtitile2">
                {title}
            </Typography>
            <Typography className={classes.text} color="textSecondary" variant="body2">
                {artist}
            </Typography>
            </div>
            <IconButton>
                <Delete color="warning"/>
            </IconButton>
        </div>
    )
}

export default Playlist;
 