import React from 'react'
import { TextField, InputAdornment, Button} from '@material-ui/core';
import { Link, AddBoxOutlined } from '@material-ui/icons';

function AddSong() {
    return (
        <div>
            <TextField
            placeholder="Add either Youtube 📹 or Soundcloud 🎶 Url "
            fullWidth
            margin="normal"
            type="url"
            InputProps={{
                startAdornment: (
                    <InputAdornment>
                    <Link/>
                    </InputAdornment>
                )
            }}
        />
        <Button variant="contained" color="secondary"
        endIcon={<AddBoxOutlined/>} >
            Add
        </Button>
        </div>
    )
}

export default AddSong;
 