import React, {Fragment} from 'react';

import Company from '../Company/Company'

import './Profile.scss';

import { Icon, Card, Image, } from 'semantic-ui-react'

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
          <span className='date'>{result.occupation}</span>
          </Card.Meta>
          
            {result.gender === 'Male' &&
              <Card.Description>
              <Icon name='male' size='small' />
                {result.description}
              </Card.Description>
            }
            {result.gender === 'Female' &&
              <Card.Description>
              <Icon name='female' size='small' />
                {result.description}
              </Card.Description>
            }
              
            
            
          
        </Card.Content>
      </Card>
    </Fragment>
  )
}

export default Profile;