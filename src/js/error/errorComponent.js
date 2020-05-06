import React from 'react'
import ErrorStyle from '../../stylingComponents/ErrorStyle'


const ErrorComponent = ({
    error
    }) => {console.log(error);
        return (<div>
                    <ErrorStyle>
                    {error.message }
                    </ErrorStyle> 
                </div>)
    };


export default ErrorComponent