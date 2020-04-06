import React from 'react';

import styled from 'styled-components';


const GameRoundButton = styled.button`
background: ${props => props.primary ? "lightblue" : "orchid"};
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
    background: lemonchiffon;
    color: blue;
}
`;

export default GameRoundButton