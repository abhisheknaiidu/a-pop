import React from 'react'
import { Typography } from '@material-ui/core'

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
    return (
        <div>
            Playlist Song
        </div>
    )
}

export default Playlist;
 