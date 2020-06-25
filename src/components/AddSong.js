import React from 'react'
import { TextField, InputAdornment, Button, Dialog, DialogContent, DialogTitle, DialogActions, makeStyles} from '@material-ui/core';
import { Link, AddBoxOutlined } from '@material-ui/icons';

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

    const [dialog, showDialog] = React.useState(false)
    
    function handleCloseDialog() {
        showDialog(false)
    }

    return (
        <div className={classes.container}>
            <Dialog
            className={classes.dialog}
              open={dialog}
              onClose={handleCloseDialog}
            >
                <DialogTitle> Edit Song </DialogTitle>
                <DialogContent>
                    <img src="https://avatars0.githubusercontent.com/u/55599878?s=460&u=ed7ab421e2b7b0fdc9fd0ddeae2f73feeb72eede&v=4"
                    alt="Song thumbnail"
                    className={classes.thumbnail}
                    />
                    <TextField
                    margin="dense"
                    name="title"
                    label="Title"
                    fullWidth
                    />
                    <TextField
                    margin="dense"
                    name="artist"
                    label="Artist"
                    fullWidth
                    />
                    <TextField
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
        className={classes.addSongButton}
        onClick={ () => showDialog(true)}
        variant="contained" color="secondary"
        endIcon={<AddBoxOutlined/>} >
            Add
        </Button>
        </div>
    )
}

export default AddSong;
 