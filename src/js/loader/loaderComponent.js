import React from 'react'
import Spinner from '../../stylingComponents/Spinner'

const LoaderComponent = ({
    showLoading
    }) => {
        //console.log(showLoading);
        //console.log(showLoading ? "block" : "none");
        return (<div style= {{display: showLoading ? "block" : "none"}}>
            <Spinner />
        </div>)
    };


export default LoaderComponent