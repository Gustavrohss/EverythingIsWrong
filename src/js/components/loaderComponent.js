import React from 'react'
import Spinner from '../styledComponents/Spinner'

const styles = {
    div: {
        background:"black",
        opacity:"0.5",
        position:"fixed", /* important to use fixed, not absolute */
        top:"0",
        left:"0",
        width:"100%",
        height:"100%",
        display:"block",
        zIndex:"1"
        /*z-index:"9999";  may not be necessary */
    }
}

const LoaderComponent = ({
    showLoading
    }) => {
        //console.log(showLoading);
        //console.log(showLoading ? "block" : "none");
        return (
        
        <div style= {{display: showLoading ? "block" : "none"}}>
            <div style ={styles.div}></div>
            <Spinner />
        </div>)
    };


export default LoaderComponent