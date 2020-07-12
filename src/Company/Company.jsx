import _ from 'lodash'

import React, {useState} from 'react'

import { useHistory } from 'react-router-dom'

import { Search, Container } from 'semantic-ui-react'

import './Company.scss'

let source = []

_.times(5, () => {
  fetch(`https://gentle-savannah-90866.herokuapp.com/user/companies`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => response.json())
  .then(value => {
    source = value
  })
})

const initialState = { isLoading: false, results: [], value: '' }

const Company = (props) => {
  
  let history = useHistory()

  const [ isLoading, setIsLoading ] = useState(initialState.isLoading)
  const [ results, setResults ] = useState(initialState.results)
  const [ value, setValue ] = useState(initialState.value)
 
  const handleResultSelect = (e, { result }) => {

    setValue( result.title )

    fetch(`https://gentle-savannah-90866.herokuapp.com/user/employees`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ company: result.id })
    }).then(response => response.json())
    .then((value) => {
      console.log(value)
      value.map((val) => {
        val['description'] = `${val['name']}  ${val['surname']}`
        val['title'] = val['username']
        delete val['name']
        delete val['surname']
      })
      
      history.push({
          pathname:'/employeesearch',
          state: {employees:value, company: result}
        })
      })
  }

  const handleSearchChange = (e, { value }) => {
    setIsLoading(true)
    setValue(value)

    setTimeout(() => {
      if (value.length < 1) return (
        setIsLoading(false),
        setResults([]),
        setValue('')
      )

      const re = new RegExp(_.escapeRegExp(value), 'i')
      const isMatch = (result) => re.test(result.title)

      setIsLoading(false)
      setResults(_.filter(source, isMatch))

    }, 300)
  }

  return (
    <Container text>
      <Search
        fluid
        selectFirstResult
        loading={isLoading}
        className='centerSearch' 
        size='massive' 
        centered='true'
        placeholder='search company'
        minCharacters={2}
        onResultSelect={handleResultSelect}
        onSearchChange={_.debounce(handleSearchChange, 500, {
          leading: true,
        })}       
        results={results}  
        value={value}
        {...props}
      />
    </Container>
  )
}

export default Company