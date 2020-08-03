import React, {Component} from "react";
import styled from "styled-components";
import logo from '../logo.svg';
import githubmark from '../githubmark.png';

class Nav extends Component{
    render() {
        //STYLE
        const Nav = styled.nav`
            position: relative;
            z-index:1;
            width:100%;
            background-color: ${props => props.theme.fg};
            color: ${props => props.theme.secondary};

            box-shadow: ${props => props.theme.shadow_nav};
        `;
        const NavWrap = styled.div`
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;
        const NavWrapLeft = styled(NavWrap)`
            justify-content: start;
        `;
        const NavWrapCenter = styled(NavWrap)`
            justify-content: center;
        `;
        const NavWrapRight = styled(NavWrap)`
            justify-content: end;
            padding-right: ${props => props.theme.spc_2};
        `;
        const NavWrapLinks = styled(NavWrap)`
            flex: 0 0 auto;
        `;

        const NavLink = styled.a`
            display: inline-block;
            line-height: calc(60px - 4px);
            flex: 0 0 auto;
            margin-right: ${props => props.theme.spc_2};
            color: ${props => props.theme.primary};
            font-family: ${props => props.theme.fam_rale};
            font-size:$ ${props => props.theme.spc_3};
            cursor: pointer;
            border-bottom: 4px solid transparent;

            transition-duration:0.2s;
            :link {
                text-decoration: none;
            }
            :hover {
                border-bottom: 4px solid ${props => props.theme.secondary};
            }
            :active {
                border-bottom: 4px solid ${props => props.theme.secondary};
            }
        `;
        const NavLinkActive = styled(NavLink)`
            border-bottom: 4px solid ${props => props.theme.secondary};
        `;
        const NavBrand = styled(NavLink)`
            margin-left: ${props => props.theme.spc_1};
        `;
        const NavLogoWrap = styled.div`
            margin-left: ${props => props.theme.spc_4};
        `;
        //LINKS
        let gitLink = "https://github.com/type9/brew-v2";

        return(
            <Nav>
                <NavWrap>
                    <NavWrapLeft>
                        <NavLogoWrap>
                            <img src={logo} alt='twist logo' width={50} height={50}/>
                        </NavLogoWrap>
                        <NavBrand href="/">TWIST</NavBrand>
                    </NavWrapLeft>
                    <NavWrapCenter>
                        <NavWrapLinks>
                            <NavLinkActive href="/">EXPLORE</NavLinkActive>
                            {/* <NavLink href="/guide">GUIDE</NavLink> */}
                        </NavWrapLinks>
                    </NavWrapCenter>
                    <NavWrapRight>
                        <a href={gitLink}>
                            <img src={githubmark} alt='github mark' width={30} height={30}/>
                        </a>
                    </NavWrapRight>
                </NavWrap>
            </Nav>
        );
    }
}

export default Nav;