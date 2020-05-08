import React from 'react'

const styles = {
    color: "red"
}

const ErrorComponent = ({
    error
}) => (<div style = {styles}>
    {error.message}
</div>)

export default ErrorComponent