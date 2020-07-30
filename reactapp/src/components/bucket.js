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
        flexGrow: 3,
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

    function populate() {
        return props.partBucket.map(part => {
            return React.cloneElement(
                <ListItem>
                    <ListItemText
                    primary={part.title}
                    secondary={part.group}
                    />
                    <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={() => {props.removePart(part.group, part.id)}}>
                        <DeleteIcon />
                    </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>,
                {
                    title: part.title,
                    group: part.group,
                }
            )
        });
    }

    return(
        <Grid item xs={12} md={10} >
            <Typography variant="h6">
            Currently displaying:
            </Typography>
            <div>
            <List dense={dense}>
                {populate()}
            </List>
            </div>
        </Grid>
    );
}

export default BucketList;