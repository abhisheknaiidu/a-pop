import React from 'react'
import Playlist from './Playlist'
import { Card, CardContent, Typography, IconButton, Slider, CardMedia } from '@material-ui/core'
import { SkipPrevious, PlayArrow, SkipNext } from '@material-ui/icons'

function SongPlayer() {
    return (
        <>
        <Card variant="outlined">
            <div>
                <CardContent>
                    <Typography variant="h5" component="h3">
                        Title
                    </Typography>
                    <Typography variant="subtitle1" component="p" color="textSecondary">
                        Artist
                    </Typography>
                </CardContent>
            <div>
                <IconButton>
                    <SkipPrevious/>
                </IconButton>
                <IconButton>
                    <PlayArrow/>
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
            <CardMedia
            image="https://avatars0.githubusercontent.com/u/55599878?s=460&u=ed7ab421e2b7b0fdc9fd0ddeae2f73feeb72eede&v=4"
            />
        </Card>
        <Playlist />
        </>
    )
}

export default SongPlayer;
 