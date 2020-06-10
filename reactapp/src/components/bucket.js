import React, {useState, useEffect, cloneElement} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FolderIcon from '@material-ui/icons/Folder';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import styled from "styled-components";
import PartSearch from './partsearch';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    }
}));

function BucketList(props){
    const classes = useStyles();
    const [dense, setDense] = useState(false);
    const [primary, setPrimary] = useState(false);
    const [secondary, setSecondary] = useState(false);

    // When the part bucket updates, we retrieve an updated subgraph from the server
    // useEffect(() => {
    //     if(props.partBucket.length === 0){
    //         return undefined;
    //     }
    //     console.log("Fetching subgraph");
    //     let nodes = [];
    //     props.partBucket.map(data => {
    //         console.log(data);
    //         let ingrNum = 1;
    //         while(data['strIngredient' + ingrNum]) {
    //             nodes.push(data['strIngredient' + ingrNum]);
    //             ingrNum += 1;
    //         }
    //     });

    //     let data = {nodes: nodes};
    //     console.log(data);
    //     fetch('/api/subgraph', {
    //         method: "POST",
    //         body: JSON.stringify(data)
    //     })
    //     .then((response) => { return response.json(); })
    //     .then((data) => {
    //         props.setGraphData(data);
    //     })
    // }, [props.partBucket]);

    function populate(element) {
        return props.partBucket.map(data =>
            React.cloneElement(element, {
                name: data['strDrink'],
            }),
        );
    }

    return(
        <Grid item xs={12} md={8} >
            <Typography variant="h6">
            Currently simulating:
            </Typography>
            <div>
            <List dense={dense}>
                {populate(
                <ListItem>
                    <ListItemAvatar>
                    <Avatar>
                        <FolderIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                    primary={props.name ? 'Secondary text' : null}
                    secondary={secondary ? 'Secondary text' : null}
                    />
                    <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>,
                )}
            </List>
            </div>
        </Grid>
    );
}

export default BucketList;