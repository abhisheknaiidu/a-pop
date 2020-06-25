import React from 'react'
import { CircularProgress } from '@material-ui/core';

function SongList() {
    
    let loading = true;

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
        SongList
    </div>
}

export default SongList;
 