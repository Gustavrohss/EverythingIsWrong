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

const ImageStyle = styled.img`
    object-fit:cover;
    width:100%;
`



export default ImageStyle;