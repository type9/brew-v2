import React, {Component} from "React"
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import PartSearch from "./partsearch";
import styled from "styled-components";

class Sidebar extends Component{
    render(){
        //STYLE
        const Sidebar = styled.div`
            background-color: ${props => props.theme.fg}; 
            height: calc(100vh - 60px);
            margin: 0!important;
            ${'' /* margin-top: ${props => props.theme.spc_4}; */}
        `;

        const SearchContainer = styled.div`
            height: 60px;
            width: 100%;
            padding: 6px;
        `;

        return(
            <Sidebar>
                <SearchContainer>
                    <PartSearch />
                </SearchContainer>
            </Sidebar>
        )
    }
}

export default Sidebar;