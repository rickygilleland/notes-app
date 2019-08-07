import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NotesList from './NotesList'
import Note from './Note'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
          <Switch>
            <Route exact path='/' component={NotesList} />
            <Route exact path='/:id' component={Note} />
          </Switch>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
