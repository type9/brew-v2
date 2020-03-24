import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import throttle from 'lodash/throttle';

import styled from "styled-components";

function PartSearch(props){
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);

    //Binded to the text field to use the InputValue hook when text is entered
    const handleChange = event => {
        setInputValue(event.target.value);
    }

    const handleSelection = (event, value) => {
        console.log("handleSelected " + value);
        props.addPart(value);
    }

    let MAX_SUGGESTION_LENGTH = 5;
    useEffect(() => {
        console.log("inputValue Changed")
        let queryUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`;
        fetch(queryUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    setOptions(result['drinks']);
                }, error => {
                    console.log(error);
                }
            );
    }, [inputValue]);

    return (
        <Autocomplete
            id="part-search"
            style={{ width: 300 }}
            onChange={handleSelection}
            getOptionLabel={option => (typeof option === 'string' ? option : option.strDrink)}
            options={options}
            autoComplete
            includeInputInList
            renderInput={params => (
                <TextField
                    {...params}
                    label="Search for a cocktail"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                />
            )}
        />
    );
}

export default PartSearch;