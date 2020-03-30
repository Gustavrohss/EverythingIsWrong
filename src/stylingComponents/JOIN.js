import React from 'react';

import styled from 'styled-components';


const JOIN = styled.button`
background: ${props => props.secondary ? "red" : "palevioletred"};
font-size: 1em;
margin: 1em;
padding: 0.25em 1em;
border: 2px solid palevioletred;
border-radius: 3px;
color: white;
&:hover{
    background: lightgoldenrodyellow;
    color: blue;
}
`;

export default JOIN