import React, {useState, useEffect, useLayoutEffect} from 'react';
import styled from "styled-components";

import Part from '../part';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

function PartSearch(props){
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);

    //Binded to the text field to use the InputValue hook when text is entered
    const handleChange = event => {
        setInputValue(event.target.value);
    }

    const handleSelection = (event, value) => {
        let part = new Part(value);
        props.addPart(part);
    }

    function groupOptions(options){
        const grouped = options.map(option => {
            let group = null;
            let title = null;

            if(option['strDrink']){
                title = option['strDrink'];
                group = "Drinks";
            } else if(option['strIngredient']){
                title = option['strIngredient'];
                group = "Ingredients";
            }

            return {
                group: group,
                title: title,
                ...option,
            };
        });
        return grouped
    }

    let MAX_SUGGESTION_LENGTH = 5;
    useEffect(() => {
        let drinkQueryUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`;
        let ingredientQueryUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${inputValue}`;
        let options = [];
        fetch(drinkQueryUrl)
        .then(res => {return res.json();})
        .then(
            result => {
                if (result['drinks']){ // if we got drink results back
                    options = result['drinks'];
                    return fetch(ingredientQueryUrl)
                } else { // if results turned up null then we exit
                    // do nothing
                }
            }, error => {
                console.log(error);
            }
        )
        .then(res => {return res.json();})
        .then(
            result => {
                if(result === undefined) { // checks for if we got an empty response from above
                    setOptions(groupOptions(options));
                    return undefined;
                } else if (result['ingredients']){ // if we got ingredient results back
                    options = options.concat(result['ingredients']);
                    setOptions(options);
                    // setOptions(result['ingredients']);
                } else { // if results turned up null then we exit
                    return undefined;
                }
            }, error => {
                console.log(error);
            }
        );
    }, [inputValue]);

    return (
        <Autocomplete
            id="part-search"
            style={{ width: 288 }}
            onChange={handleSelection}
            getOptionLabel={(option) => option.title}
            options={groupOptions(options)}
            groupBy={(option) => option.group}
            autoComplete
            includeInputInList
            renderInput={params => (
                <TextField
                    {...params}
                    label="Search for Ingredient or Cocktail"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                />
            )}
        />
    );
}

export default PartSearch;