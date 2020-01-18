import React, {Component} from "react"

import styled from "styled-components"

class Nav extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        //STYLE
        const Nav = styled.nav`
            background-color: ${props => props.theme.fg};
            color: ${props => props.theme.seconadry};
        `;

        return(
            <Nav>
                <a class="brand">Twist</a>
                <div class="collaspe">
                    <ul class="nav">
                        <li class="item-active">Simulation</li>
                        <li class="item">Other</li>
                    </ul>
                </div>
            </Nav>
        );
    }
}

export default Nav;