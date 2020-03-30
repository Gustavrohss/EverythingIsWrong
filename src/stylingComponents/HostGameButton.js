import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';


const HostGameButton = styled.button`
background: ${props => props.primary ? "red" : "palevioletred"};
font-size: 1em;
margin: 1em;
padding: 0.25em 1em;
border: 2px solid palevioletred;
border-radius: 3px;
color: white;
&:hover{
    background: lightblue;
    color: blue;
}
`;

export default HostGameButton