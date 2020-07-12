import React, {useState} from 'react'

import { useHistory, Link } from 'react-router-dom'

import { Input, Button, Form, Container } from 'semantic-ui-react'

const Register = () => {

    const [ username, setUsername ] = useState('')

    const [ password, setPassword] = useState('')

    const [ confirm, setConfirm ] = useState('')

    const [ exists, setExists ] = useState(false)

    let history = useHistory()

    const url = `https://gentle-savannah-90866.herokuapp.com/user/register`
    
    const validateForm = () => username.length > 0 && password.length > 0 && (confirm === password)

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
        response.status === 409 && setExists(true)
    }

    return (
    <Container as='fieldset' className='loginContainer'>
       <legend><h1>Register</h1></legend>
      <Form onSubmit={handleSubmit} >

      <Form.Field required >
          <label>Full Names</label>
          <Input placeholder='fullname'
            icon='user' iconPosition='left' />
        </Form.Field>

        <Form.Field required >
          <label>Phone Number</label>
          <Input placeholder='phone number'
            icon='phone' iconPosition='left' />
        </Form.Field>

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
            onChange={e => setConfirm(e.target.value)}
          />
        </Form.Field>
        { ((password.length > 2) && (confirm !== password)) && <p style={{color: 'red'}}>passwords do not match</p>}
        { exists && <p style={{color: 'red'}}>user already exists</p>}
        <Button 
          className='loginBtn' 
          toggle 
          fluid 
          type='submit' 
          disabled={!validateForm()}>Register</Button>
        
        Have an account? <Link to='/login'>Login</Link>
      </Form>
    </Container>
    )}

export default Register