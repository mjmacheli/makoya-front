import _ from 'lodash'

import React, {useState, Fragment} from 'react'

import { useHistory } from 'react-router-dom'

import { Search, Grid, Container } from 'semantic-ui-react'

import './EmployeeSearch.scss'

const initialState = { isLoading: false, results: [], value: '' }

const EmployeeSearch = (props) => {

  let history = useHistory()

  const { state } = props['location']

  const { company } = state

  const { employees } = state

  const source = _.times(15, (i) => {
    return employees[i]
  })
  
  const [ isLoading, setIsLoading ] = useState(initialState.isLoading)

  const [ results, setResults ] = useState(initialState.results)

  const [ value, setValue ] = useState(initialState.value)
 
  const handleResultSelect = (e, { result }) => {

    setValue( result.title )

    history.push({
      pathname:'/profile',
      state: {result}
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
    <Grid  centered columns='equal'>
        <Grid.Column width={8}>
          <Container text>
            <Search
              fluid
              loading={isLoading}
              className='searchBar' 
              size='massive' 
              centered='true'
              selectFirstResult
              placeholder={`search in ${company.title}`}
              onResultSelect={handleResultSelect}
              onSearchChange={_.debounce(handleSearchChange, 500, {
                leading: true,
              })}
              results={results}
              value={value}
              {...props}
            />
          </Container>
        </Grid.Column>
      </Grid>
  )
}

export default EmployeeSearch