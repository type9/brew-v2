import React, {Component} from "React"
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import PartSearch from "./partsearch";
import BucketList from "./bucket";
import styled from "styled-components";

class Sidebar extends Component{
    constructor(props) {
        super(props);
    }

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
            padding: 12px 6px 6px 6px;
        `;

        const BucketContainer = styled.div`
            padding: 0px 6px 6px 6px;
            width: 100%;
            overflow: scroll;
        `;

        return(
            <Sidebar>
                <SearchContainer>
                    <PartSearch
                        addPart={this.props.addPart}
                    />
                </SearchContainer>
                <BucketContainer>
                    <BucketList
                        partBucket={this.props.partBucket}
                        removePart={this.props.removePart}
                    />
                </BucketContainer>
            </Sidebar>
        )
    }
}

export default Sidebar;