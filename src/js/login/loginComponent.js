import React from 'react'

const LoginComponent = ({
    home: [homeLabel, homeCallback]
}) => {

    return (
    <div>
        <button onClick = {homeCallback}>{homeLabel}</button>
        
    </div>
    )
}

export default LoginComponent