import React, { useState } from 'react'

import { useHistory } from 'react-router-dom'

import { Link } from 'react-router-dom'

import './Login.scss'

import { Input, Button, Form, Container } from 'semantic-ui-react'

const Login = () => {
  
  const handleSubmit = (event) => {
    event.preventDefault()
    sendData()
  }
  
  const [ username, setUsername ] = useState('')

  const [ password, setPassword] = useState('')

  const url = `https://gentle-savannah-90866.herokuapp.com/user/login`
  
  const validateForm = () => username.length > 0 && password.length > 0
  
  let history = useHistory()

  const nextPage = (data) => history.push({
    pathname:'/company',
    state: {company:data}
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
      const data =  await response.json()
      localStorage.setItem('token', data.token)
      data.token &&  nextPage(data)
  }

  return (
    <Container as='fieldset' className='loginContainer'>
       <legend><h1>Login</h1></legend>
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
        <Button className='loginBtn' toggle fluid type='submit' 
          disabled={!validateForm()}>Login</Button>
        Don't have an account? <Link to='/login'>Register</Link>
      </Form>
    </Container>
  )
}

export default Login