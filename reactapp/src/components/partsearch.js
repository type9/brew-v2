import React, {useState, useEffect, useRef, useMemo} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import throttle from 'lodash/throttle';

import styled from "styled-components";

function PartSearch(){
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const loaded = useRef(false);

    //Binded to the text field to use the InputValue hook when text is entered
    const handleChange = event => {
        setInputValue(event.target.value);
    }

    let MAX_SUGGESTION_LENGTH = 5;
    // Fetching and population of options data that autcomplete will use
    // const fetchSuggestions = useMemo(() => {
    //     throttle(() => {
    //         let queryUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`;
    //         fetch(queryUrl)
    //             .then(res => res.json())
    //             .then(
    //                 (result) => {
    //                     let list = [];
    //                     for(let x = 0; x < MAX_SUGGESTION_LENGTH; x++ ){
    //                         list.push(result['drinks'][x]['strDrink']);
    //                     };
    //                     setOptions(list);
    //                 }, error => {
    //                     console.log(error);
    //                 }
    //             );
    //     }, 200);
    // }, [inputValue]);

    //When input data changes we fetch the suggestions, populate them into a list, then set them as the options
    // useEffect(() => {
    //     let active = true;
    //     if(inputValue === ''){
    //         setOptions([]);
    //         return undefined;
    //     }

    //     console.log(fetchSuggestions);
    //     fetchSuggestions(inputValue, results => {
    //         if(active){
    //             setOptions(results || []);
    //         }
    //     });

    //     return () => {
    //         active = false;
    //     };
    // }, [inputValue, fetchSuggestions])
    useEffect(() => {
        console.log("inputValue Changed")
        let queryUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`;
        fetch(queryUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    let list = [];
                    if(result['drinks']){
                        for(let x = 0; x < MAX_SUGGESTION_LENGTH; x++ ){
                            const drink = result['drinks'][x];
                            if(drink){
                                list.push(drink['strDrink']);
                            }
                        };
                    }
                    setOptions(list);
                }, error => {
                    console.log(error);
                }
            );
    }, [inputValue]);

    return (
        <Autocomplete
            id="part-search"
            style={{ width: 300 }}
            getOptionLabel={option => (typeof option === 'string' ? option : option.description)}
            filterOptions={x => x}
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