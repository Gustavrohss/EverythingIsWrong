import styled from 'styled-components';
import React from 'react'
/*
const ImageBox = ({image, execute}) => (
                    <ImageStyle
                        src = {image}
                        height = {"300px"}
                        alt = {"Sorry, we couldn't show the image!"}
                        onClick = {execute}
                    </ImageStyle>
);*/

/*export const ImageBoxStyle = styled.div`
    border-width:5px;
    border-color:${props => props.color || "grey"};
    border-style:solid;
    border-radius:5px;
    padding:5px;
    background: ${props => props.choice ? props.color==="green" ? props.color : "yellow" : "white"};
    &:hover{
    	background:grey;
      border-color:white;
	  }
`*/

const colors = {correct : "seagreen",
                wrong : "crimson",
                selected : "dimgray",
                notSelected : "darkgray",
                background : "white"}

export const ImageBoxStyle = styled.div.attrs(({correct}) => ({
  revealColor: correct ? colors.correct : colors.wrong
}))`
    border-width:5px;
    border-color:${props => props.reveal ? props.revealColor : (props.selected ? colors.selected : colors.notSelected)};
    border-style:solid;
    border-radius:5px;
    padding:5px;
    background: ${props => props.reveal ? props.revealColor : colors.background};
    ${props => !props.blocked && `&:hover{
    	background:${colors.notSelected};
      border-color:${colors.background};
	  }`}
`


export const ImageStyle = styled.img`
    object-fit:cover;
    width:15rem;
    opacity:${props => props.transparent ? 0.5 : 1.0};
    /*border-radius:inherit;
    border-width:inherit;*/
`
