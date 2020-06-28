import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';
import { HeadsetTwoTone } from '@material-ui/icons';
// Got access to theme as well
const useStyles = makeStyles(theme => ({
    heading: {
        marginLeft: theme.spacing(2)
    }
}))

function Header() {
    //Styles can be used as hooks.
    const classes = useStyles() 

    return (
        <AppBar color="secondary" position="fixed">
            <Toolbar>
                <HeadsetTwoTone />
                <Typography className={classes.heading} variant="h6" component="h1">
                    A-POP
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
