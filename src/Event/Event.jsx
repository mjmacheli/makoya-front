import React from 'react';

import './Event.scss';

import { Card, Icon, Image } from 'semantic-ui-react'

const Event = ({props}) => {
  console.log(props)
  return (
    <Card centered={true}>
    <Image src={props.image} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{props.title}</Card.Header>
      <Card.Meta>Job Description</Card.Meta>
      <Card.Description>
        {props.description }
      </Card.Description>
      <Card.Description>
        <a>
          <Icon name='male' />
          {props.gender}   
        </a>
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='point' />
         South Africa
      </a>
    </Card.Content>
  </Card>
  );
}

export default Event;