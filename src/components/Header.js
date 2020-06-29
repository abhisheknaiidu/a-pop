import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles, Link } from '@material-ui/core';
import { HeadsetTwoTone } from '@material-ui/icons';
// Got access to theme as well
const useStyles = makeStyles(theme => ({
    heading: {
        marginLeft: theme.spacing(2)
    },
}))

function Header() {
    //Styles can be used as hooks.
    const classes = useStyles() 

    return (
        <AppBar color="secondary" position="fixed">
            <Toolbar>
                <HeadsetTwoTone />
                <Typography className={classes.heading} variant="h6" component="h1">
                    <Link target="_blank" rel="noreferrer" href="https://github.com/abhisheknaiidu/A-POP" 
                    style={{paddingLeft: 10, textDecoration: 'none'}} color="inherit">
                        A-POP
                    </Link>
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
