import React from 'react'


const ErrorComponent = ({
    error
    }) => {console.log(error);
        return (<div>
                    <h3 className="error"> { "placeholder: " + error.message } </h3>
                </div>)
    };


export default ErrorComponent