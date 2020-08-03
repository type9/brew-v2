import React, {useState, useEffect, cloneElement} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        height: 'calc(100vh - 126px)',
        overflow: 'scroll',
    },
});

function BucketList(props){
    const classes = useStyles();

    function populate() {
        return props.partBucket.map(part => {
            return React.cloneElement(
                <ListItem width={288}>
                    <ListItemText
                    primary={part.title}
                    secondary={part.group}
                    marginLeft={0}
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
        <Grid className={classes.root}>
            <div>
            <List>
                {populate()}
            </List>
            </div>
        </Grid>
    );
}

export default BucketList;