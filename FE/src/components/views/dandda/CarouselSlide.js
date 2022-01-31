import React from 'react';
import { Card, makeStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

export default function CarouselSlide(props) {
    const { backgroundImage, title, profile_name, profile_src } = props.content;

    const useStyles = makeStyles(() => ({
        card: {
            backgroundImage,
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
        profile: {
            width: '10vw',
            height:'6vh',
            textAlign:'right'
        },

        title: {
            justifyContent:'center',
            alignSelf:'center'
        }
    }));

    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <Avatar className={classes.profile} alt={profile_name} src={profile_src}/>
            <h1 className={classes.title}>{title}</h1>
        </Card>
    );
}