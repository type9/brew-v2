import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import styled from "styled-components";

const useStyles = makeStyles({
    root: {
      maxWidth: 220,
    },
    media: {
      height: 200,
      width: 200,
    },
})

function PartCard(props){
    const [part, setPart] = useState(null);

    function truncate(input) {
        if(!input){
            return;
        }
        if (input.length > 150) {
           return input.substring(0, 150) + '...';
        }
        return input;
    };

    useEffect(() => {
        console.log(props.focusedItem)
        if (!props.focusedItem){
            return;
        }

        let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${props.focusedItem}`;
        fetch(url)
            .then(res => {return res.json();})
            .then(result => {
                let ingr = {};
                let ingredientData = result['ingredients'][0]
                ingr.title = ingredientData['strIngredient'];
                ingr.imgUrl = `https://www.thecocktaildb.com/images/ingredients/${ingr.title.toLowerCase()}-Medium.png`;
                ingr.description = truncate(ingredientData['strDescription'])
                setPart(ingr);
            });
    });
    
    const classes = useStyles();

    const Wrapper = styled.div`
        position: absolute;
        bottom: 0px;
        right: 0px;
        margin-bottom: 6px;
        margin-right: 6px;
    `;

    if(part) {
        return (
            <Wrapper>
                <Card className={classes.root}>
                    <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        component="img"
                        alt={part.title}
                        image={part.imgUrl}
                        title={part.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h2">
                        {part.title}
                        </Typography>
                        <Typography variant="body4" color="textSecondary" component="p">
                        {part.description}
                        </Typography>
                    </CardContent>
                    </CardActionArea>
                </Card>
            </Wrapper>
        );
    } else {
        return null;
    }

}

export default PartCard;