import React from 'react';
import SongList from './SongList';
import { useSubscription } from '@apollo/react-hooks';
import { GET_SONGS } from '../graphql/subscriptions';
import { makeStyles, TextField, InputAdornment } from '@material-ui/core';
import { Search } from '@material-ui/icons'

const useStyles = makeStyles( theme => ( {
    container: {
        display: 'flex',
        alignItems: 'center'
    },
    textInput: {
        margin: theme.spacing(1)
    },
    dialog: {
        textAlign: 'center',
    },
    thumbnail: {
        width: '90%'
    }
}))

// state = {
//     data: useSubscription(GET_SONGS),
//     searchTerm: ''
// }

function SearchBar() {
    const classes = useStyles()
    const { data } = useSubscription(GET_SONGS)
    const [searchTerm, setSearchTerm] = React.useState('')

    function handleEditSearchTerm(sch) {
        setSearchTerm(sch.target.value)
    }

    function handleDynamicSearch() {
        return data.songs.filter(song => song.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    return (
        <div className={classes.container}>
            {/* <input type='text' placeholder='Search for a song by name!' /> */}
            <TextField 
            className = { classes.textInput }
            value = { searchTerm }
            onChange = { handleEditSearchTerm }
            placeholder = "Search for a song by name!" 
            fullWidth
            margin="normal" 
            type="text" 
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    <Search/>
                    </InputAdornment>
                )
            }}/>
            <div>
                {handleDynamicSearch().map((song) => (
                    <SongList.Song key={song.id} song={song} />
                ))}
            </div>
        </div>
    );
}

export default SearchBar;