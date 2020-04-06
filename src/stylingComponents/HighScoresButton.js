import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';


const HighScoresButton = styled.button`
background: ${props => props.primary ? "lightblue" : "green"};
position: relative;
	padding: 10px 40px;
  margin: 0px 10px 10px 0px;
  float: left;
	border-radius: 10px;
	font-family: 'Pacifico', cursive;
	font-size: 25px;
	color: #FFF;
	text-decoration: none;	
&:hover{
    background: lightblue;
    color: blue;
}
`;

export default HighScoresButton