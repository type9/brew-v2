import React, {useState, useEffect} from 'react';
import styled from "styled-components";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

function Suggested(props){
    function populate(){
        if(!props.suggestedItems) {
            return "";
        }

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
        left: 312px;
        margin-top: 6px;
        margin-left: 6px;
        border-radius: 3px;
        background-color: ${props => props.theme.fg};
    `;

    return(
        <Suggested>
            <List dense={true}>
                {populate()}
            </List>
        </Suggested>
    );
}

export default Suggested;