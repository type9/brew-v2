import React, {useState, useEffect} from 'react';
import styled from "styled-components";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

function Suggested(props){
    function populate(){
        return props.suggestedItems.map(ingr =>{
            return (
                <ListItem>
                    <ListItemText primary={ingr[0]} secondary={Math.round(ingr[1] * 100)/100}/>
                </ListItem>
            );
        })
    }
    const Suggested = styled.div`
        position: absolute;
        top: 60px;
        left: 300px;
        margin-top: 6px;
        margin-left: 6px;
        width: 200px;
        border-radius: 3px;
        background-color: ${props => props.theme.fg};
    `;

    const HeaderWrap = styled.div`
        margin-left: 10px;
    `;
    if(props.suggestedItems.length == 0) {
        return null;
    }

    return(
        <Suggested>
            <List dense={true}>
                <HeaderWrap>
                    <Typography variant="h6" color="textSecondary">Suggested</Typography>
                </HeaderWrap>
                {populate()}
            </List>
        </Suggested>
    );
}

export default Suggested;