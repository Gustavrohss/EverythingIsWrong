import styled from 'styled-components';

/**
 * Styling for buttons. 
 * 
 * properties:
 * 		color - value for background color
 * 
 */

const AboutButton = styled.button`
	background: ${props => props.color};
	position: relative;
	padding: 10px 40px;
  	margin: 0px 10px 10px 0px;
	border-radius: 10px;
	font-family: cursive;
	font-size: 25px;
	color: #FFF;
	text-decoration: none;	
	&:hover{
    	background: white;
    	color: ${props => props.color};
	}
`;

export default AboutButton

