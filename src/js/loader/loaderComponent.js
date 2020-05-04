import React from 'react'


const LoaderComponent = ({
    showLoading
    }) => {
        console.log(showLoading);
        console.log(showLoading ? "block" : "none");
        return (<div style= {{display: showLoading ? "block" : "none"}}>Loading BLÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ</div>)
    };


export default LoaderComponent