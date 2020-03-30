import React from 'react';
import { Nav, Navbar} from 'react-bootstrap';
import styled from 'styled-components';
const Styles = styled.div`
  .navbar { background-color: lightsteelblue; }
  a, .navbar-nav, .navbar-light .nav-link {
    color: black    ;
    &:hover { color: white; }
  }
  .navbar-brand {
    font-size: 1.2em;
    color: black;
    &:hover { color: white; }
  }
  

`;
export const NavigationBar = () => (
  <Styles>
    <Navbar expand="md">
      <Navbar.Brand href="/">Eveything is Wrong!</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
     
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item> 
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles>
)