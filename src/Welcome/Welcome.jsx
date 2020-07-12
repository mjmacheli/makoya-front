import React from 'react';

import { Button, Icon } from 'semantic-ui-react'

import { useHistory } from 'react-router-dom'

import './Welcome.scss';

const Welcome = (props) => {
  let history = useHistory()
  return (
    <div style={{textAlign: 'center', marginTop: '50vh'}}>
        <Button 
          size='big'
          style={{marginRight: '1rem'}}
          onClick={()=>{
            history.push({
              pathname:'/login',
            })
          }}
        >
          <Icon name='user' />
          Login
        </Button>

        <Button
          size='big'
          onClick={()=>{
          history.push({
            pathname:'/register',
          })
        }}>
          <Icon name='user plus' />
          Register
        </Button>
    </div>
  );
}

export default Welcome;
