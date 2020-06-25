import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';
import { HeadsetTwoTone } from '@material-ui/icons';

const useStyles = makeStyles({
    heading: {
        marginLeft: '10px'
    }
})

function Header() {
    //Styles can be used as hooks.
    const classes = useStyles() 

    return (
        <AppBar position="fixed">
            <Toolbar>
                <HeadsetTwoTone />
                <Typography className={classes.heading} variant="h6" component="h1">
                    Zepta Music Sharing
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
 