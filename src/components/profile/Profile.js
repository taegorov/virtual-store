import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosTwoToneIcon from '@material-ui/icons/ArrowBackIosTwoTone';



export default function Profile() {

    const useStyles = makeStyles({
        backButton: {
            margin: '1em',
        },
    });

    const profileStyle = useStyles();

    return (
        <div>
            <Button
                className={profileStyle.backButton}
                size="large"
                color="primary"
                variant="contained"
                startIcon={<ArrowBackIosTwoToneIcon />}
                component={Link} to={'/'}
            >
                Back to Store
            </Button>

            <p>helo this is ur profile page :^)</p>
        </div>
    )
}
