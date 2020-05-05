import styled from 'styled-components';

const JoinGameButton = styled.button`
	background: ${props => props.primary ? "lightblue" : "blue"};
	position: relative;
	padding: 10px 40px;
  	margin: 0px 10px 10px 0px;
  	float: left;
	border-radius: 10px;
    border-bottom: 5px solid #2980B9;
	font-family: 'Pacifico', cursive;
	font-size: 25px;
	color: #FFF;
	text-decoration: none;	
	&:hover{
    	background: lightblue;
    	color: blue;
	}`;

export default JoinGameButton