import React from 'react';

import { Button } from 'semantic-ui-react'

import { useHistory } from 'react-router-dom'

import './Welcome.scss';

const Welcome = (props) => {
  let history = useHistory()
  return (
    <div>
        <Button 
          onClick={()=>{
            history.push({
              pathname:'/login',
            })
          }}
          >
          Login
        </Button>

        <Button
         onClick={()=>{
          history.push({
            pathname:'/register',
          })
        }}>
          Register
        </Button>
    </div>
  );
}

export default Welcome;
