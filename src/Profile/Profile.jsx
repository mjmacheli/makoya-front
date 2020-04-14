import React, {Fragment} from 'react';

import Company from '../Company/Company'

import './Profile.scss';

import { Card, Icon, Image } from 'semantic-ui-react'

const Profile = ({location}) => {

  const { result } = location['state']
  
  return (
    <Fragment as='div' className=''>
      <Company className={null}/>
      <Card>
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
        <Card.Content extra>
          <a>
            <Icon name='user' />
            22 Friends
          </a>
      </Card.Content>
      </Card>
   
    </Fragment>
  )
}

export default Profile;