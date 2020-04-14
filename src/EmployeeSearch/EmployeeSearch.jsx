import _ from 'lodash'

import React, {useState, Fragment} from 'react'

import { useHistory } from 'react-router-dom'

import { Search, Grid } from 'semantic-ui-react'

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
    <Fragment>
      <Grid>
        <Grid.Column width={6}>
          <Search
          fluid
            loading={isLoading}
            className='centerSearch' 
            size='massive' 
            centered='true'
            placeholder={`search in ${company.title}`}
            onResultSelect={handleResultSelect}
            onSearchChange={_.debounce(handleSearchChange, 500, {
              leading: true,
            })}
            results={results}
            value={value}
            {...props}
          />
        </Grid.Column>
      </Grid>
    </Fragment>
  )
}

export default EmployeeSearch