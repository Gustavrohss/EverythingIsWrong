import styled from 'styled-components';
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



//Different colors for the ImageBox Component
const colors = {correct : "seagreen",
                wrong : "crimson",
                selected : "dimgray",
                notSelected : "darkgray",
                background : "white"}
/**
 * Properties that are sent:
 *    blocked   (boolean)   - hovering should be blocked
 *    reveal    (boolean)   - if it should be revealed
 *    correct   (boolean)   - if the selected item is correct
 *    selected  (boolean)   - if this is a selected item
 * 
 */
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

/**
 * properties:
 *    transparent (boolean) - if the object should be transparent or not.
 */
export const ImageStyle = styled.img`
    object-fit:cover;
    width:15rem;
    opacity:${props => props.transparent ? 0.5 : 1.0};
    /*border-radius:inherit;
    border-width:inherit;*/
`


/**
 * 
 * 
 */
export const ImageWrapper = styled.div`
  
 @media (min-width:1000px) {
    display:flex;
    flex-direction:"column";
    flex: 1;
    overflow: hidden;
  }

`
