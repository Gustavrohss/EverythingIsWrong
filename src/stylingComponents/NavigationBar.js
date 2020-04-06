import React from 'react';
import { Nav, Navbar} from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  .navbar { background-color: greenyellow; }
  a, .navbar-nav, .navbar-light .nav-link {
    color: black    ;
    &:hover { color: white; }
  }
  .navbar-brand {
    position: relative;
	padding: 10px 40px;
  margin: 0px 10px 10px 0px;
  float: left;
	border-radius: 10px;
	font-family: 'Pacifico', cursive;
	font-size: 25px;
	color: #FFF;
	text-decoration: none;	    color: black;
    &:hover { color: white; }
  }
  .animate
{
	transition: all 0.1s;
	-webkit-transition: all 1s;
}
  

`;
export const NavigationBar = () => (
  <Styles>
    <Navbar expand="md">
      <Navbar.Brand onAnimationEnd="animate" href="/">Have fun!!</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
     
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item> 
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles>
)