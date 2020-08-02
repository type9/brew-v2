import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import styled from "styled-components";

function PartCard(props){
    if (!props.focusedItem){
        return null;
    }
    
    let title = props.focusedItem;
    let imgUrl = null;
    let description = "";

    
    const Wrapper = styled.div`
        position: absolute;
        bottom: 0px;
        right: 0px;
        margin-bottom: 6px;
        margin-right: 6px;
        maxWidth: 275;
    `;

    return(
        <Wrapper>
            <Card>
                <CardActionArea>
                <CardMedia
                    component="img"
                    alt={title}
                    image={imgUrl}
                    title={title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                    {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {description}
                    </Typography>
                </CardContent>
                </CardActionArea>
            </Card>
        </Wrapper>
    );
}

export default PartCard;