import _ from 'lodash'
import React, { Component } from 'react'

import { Search,  Container } from 'semantic-ui-react'

import Event from '../Event/Event'

import './Dashboard.scss'

const initialState = { 
  isLoading: false, 
  results: [], value: '', 
  holder: 'Search company', 
  source: ''
}

class Dashboard extends Component {

  state = initialState

  componentWillMount() {
    _.times( 2 , () => {
      
      fetch(`${process.env.URL}/user/companies`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response => response.json())
      .then(value => this.setState({source:value}))
    })
  } 
    
  handleResultSelect = async (e, { result }) => {

    if (result.username) {
      this.setState({profile: result})
    }
    

      fetch(`${process.env.URL}/user/employees`, {
         method: 'POST',
         mode: 'cors',
         headers: {
           "Content-Type": "application/json"
         },
         body: JSON.stringify({ company: result.id })
       }).then(response => response.json())
       .then((value) => {
         value.map((val) => {
           val['description'] = `${val['name']}  ${val['surname']}  : ${val['age']}`
           val['title'] = val['username']
           delete val['name']
           delete val['surname']
         })
         this.setState({source:value})
       })

       this.setState({ value: '', holder: `Search in ${result.title}`})
  }
  
  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')

      const isMatch = (result) => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(this.state.source, isMatch),
      })
    }, 500)
  }

  render() {
    const { isLoading, value, results, holder,profile } = this.state

    return (

        this.state.profile ? 
        <Container>
          <Event props={profile} />
          </Container> : (
        <Container textAlign='center'>
          <Search
            fluid
            loading={isLoading}
            className='centerSearch' 
            size='massive' 
            centered='true'
            placeholder={holder}
            onResultSelect={this.handleResultSelect}
            selectFirstResult={true}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            results={results}
            value={value}
            {...this.props}
          />
        </Container>
      )
    )
  }
}

export default Dashboard