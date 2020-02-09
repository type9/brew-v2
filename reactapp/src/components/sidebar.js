import React, {Component} from "React"

import styled from "styled-components"

class Sidebar extends Component{
    render(){
        //STYLE
        const Sidebar = styled.aside`
            background-color: ${props => props.theme.fg};
            height: calc(100vh - ${props => props.theme.spc_4});
            margin-top: ${props => props.theme.spc_4};
            width: 16em;
            position: fixed;
        `;

        return(
            <Sidebar>
            </Sidebar>
        )
    }
}

export default Sidebar;