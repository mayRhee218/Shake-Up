import React from 'react';
import { Card, makeStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { Route, Link } from 'react-router-dom';

export default function CarouselSlide(props) {
    const { thumbnail, profile, vid} = props.video;

    const useStyles = makeStyles(() => ({
        card: {
            thumbnail,
            backgroundRepeat: 'no-repeat',
            backgroundSize:'cover',
            borderRadius: 5,
            margin: '0px 15px',
            padding: '10px 10px',
            width: '75vw',
            height:'25vh',
            boxShadow: '10px 10px 10px grey', 
            display: 'flex',
            flexDirection: 'column', 
        },

        title: {
            justifyContent:'center',
            alignSelf:'center'
        },

        circle: {
            width: '15px',
            height: '15px',
            borderRadius:'50%'
        }

    }));

    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <div className={classes.circle} >
                <Avatar alt="" src={profile}/>
            </div>
        </Card>
    );
}