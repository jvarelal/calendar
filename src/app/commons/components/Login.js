import React from 'react'

const Login = ({ }) => {
    const [user, setUser] = React.useState();
    const onChange = (target) => setUser({ ...task, [target.name]: target.value })
    return <Container>
        <InputForm name="email" required={true} label="Correo electrónico:"
            value={user.email} onChange={onChange} />
        <InputForm name="password" required={true} label="Password:"
            value={user.password} onChange={onChange} />
    </Container>
}