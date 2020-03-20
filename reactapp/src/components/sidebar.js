import React, {Component} from "React"

import styled from "styled-components"

class Sidebar extends Component{
    render(){
        //STYLE
        const Sidebar = styled.div`
            background-color: ${props => props.theme.fg}; 
            height: calc(100vh - 60px);
            margin: 0!important;
            ${'' /* margin-top: ${props => props.theme.spc_4}; */}
        `;

        return(
            <Sidebar>
            </Sidebar>
        )
    }
}

export default Sidebar;