import React, {Fragment} from 'react';

import Company from '../Company/Company'

import './Profile.scss';

import { Card, Icon, Image, Grid } from 'semantic-ui-react'

const Profile = ({location}) => {

  const { result } = location['state']
  
  return (
    <Fragment>
      <Company className='midBar'/>
      <Card 
      centered 
      raised 
      className='cardStyles'
      >
      <Image src={result.image} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{result.title}</Card.Header>
          <Card.Meta>
            <span className='date'>Joined in 2015</span>
          </Card.Meta>
          <Card.Description>
            Matthew is a musician living in Nashville.
          </Card.Description>
        </Card.Content>
      </Card>
    </Fragment>
  )
}

export default Profile;