import React from 'react'

const LoginComponent = ({
    home: [homeLabel, homeCallback],
    login: [loginLabel, loginNav],
    finalize_login_callback
}) => {

    const [name, setName] = React.useState("")
    const [pass, setPass] = React.useState("")
    const [type, setType] = React.useState("password")

    return (
    <div>
        <button 
            onClick = {homeCallback}
        >{homeLabel}</button>
        Your username: <input
            onChange = {e => setName(e.target.value)}
            value = {name}
        />
        Your password: <input 
            type = {type}
            onChange = {e => {
                setPass(e.target.value)
                setType("password")
            }}
            value = {pass}
        />
        <button
            onClick = {() => {
                const validName = name.length > 0
                const validPass = pass.length > 0

                if (validName && validPass) {
                    finalize_login_callback(name, pass)
                    loginNav()
                }
                
                if (!validName) setName("At least one character!")
                if (!validPass) {
                    setPass("At least one character!")
                    setType("")
                }
            }}
        >{loginLabel}</button>
    </div>
    )
}

export default LoginComponent