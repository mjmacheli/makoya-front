import React, {useState} from 'react'

import { useHistory, Link } from 'react-router-dom'

import { Input, Button, Form, Container } from 'semantic-ui-react'

const Register = () => {

    const [ username, setUsername ] = useState('')

    const [ password, setPassword] = useState('')

    let history = useHistory()

    const url = `https://gentle-savannah-90866.herokuapp.com/user/register`
    
    const validateForm = () => username.length > 0 && password.length > 0

    const handleSubmit = (event) => {
        event.preventDefault()
        sendData()
    }

    const nextPage = (user) => history.push({
      pathname:'/company',
      state: {user}
    })

    const sendData = async () => {
        const response = await fetch(url, {
          method: 'POST',
          mode: 'cors',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ username, password })
        })
        const data = await response.json()
        response.status === 201 && nextPage(data)
    }

    return (
    <Container as='fieldset' className='loginContainer'>
       <legend><h1>Register</h1></legend>
      <Form onSubmit={handleSubmit} >

        <Form.Field required >
          <label>Username</label>
          <Input placeholder='username'
            icon='user' iconPosition='left' 
            onChange={ e => setUsername(e.target.value)} />
        </Form.Field>
        
        <Form.Field required>
          <label>Password</label>
          <Input 
            icon='lock' 
            iconPosition='left' 
            placeholder=' password'
            type='password'
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Field>

        <Form.Field required>
          <label>Confirm Password</label>
          <Input 
            icon='lock' 
            iconPosition='left' 
            placeholder='Confirm Password'
            type='password'
          />
        </Form.Field>
        <Button className='loginBtn' toggle fluid type='submit' disabled={!validateForm()}>Register</Button>
        Have an account? <Link to='/login'>Login</Link>
      </Form>
    </Container>
    )}

export default Register