

//////////////////////////////////////////////////////////////////////////
/////////////////  Main App for Bot Contact Mgmt        //////////////////
/////////////////    Connecting Business to Bots   //////////////////////
////////////////////////////////////////////////////////////////////////


import React, { Component }   from 'react';
import ListContacts           from './ListContacts';
import * as ContactsAPI       from './utils/ContactsAPI'
import CreateContact          from './CreateContacts'
import CreateProfile          from './CreateProfile'
import EditProfile            from './EditProfile'
import { Route }              from 'react-router-dom'

// note lifecycle method to load all contacts when mounted

class App extends Component {
  state = {
    contacts: [ ],
    profiles: [ ]
  }

  removeContact = (contact) => {
    this.setState( (state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id )
    }) )
    ContactsAPI.remove(contact)
  }

  // included for illustration purposes. This could lead to unpredictable results
  // by mutating state directly
  addContact = (contact) => {
    this.setState( (state) => ({
      contacts: this.state.contacts.push(contact)
    }) )
    ContactsAPI.create(contact)
  }
  // this is the correct way to update state. Array.slice() and spread operators
  // would also be apropriate
  createContact(contact) {
    ContactsAPI.create(contact).then(contact => {
      this.setState(state => ({
        contacts: state.contacts.concat([contact])
      }))
    })
  }
  createProfile(profile) {
    ContactsAPI.profile(profile).then(profile => {
      this.setState(state => ({
        contacts: state.contacts.concat([profile])
      }))
    })
  }
  updateProfile(profile) {
    ContactsAPI.updateProfile(profile).then(profile => {
      console.log("updating profile")
      console.log(profile)
      this.setState({
        contacts: profile })    
    })
  }
  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contacts })
    })
  }
  render() {
    return (
      <div className = 'app'>
        <Route exact path ="/" render={() => (
          <ListContacts
            onDeleteContact = { this.removeContact }
            contacts={this.state.contacts}
            />
          )} />

        <Route exact path ="/create" render={({history}) => (
          <CreateContact
            onCreateContact={ (contact) => {
              this.createContact(contact)
              history.push('/')
            }}
            />
          )} />

        <Route exact path ="/profile" render={({history}) => (
          <CreateProfile
            onCreateProfile={ (profile) => {
              this.createProfile(profile)
              history.push('/')
            }}
            />
          )} />
        <Route path ="/edit/:contact" render={({history, match}) => (
          <EditProfile
              params={match.params}
              onUpdateProfile={ (profile) => {
                this.updateProfile(profile)
                history.push('/')
              }}
              />
            )} />
       </div>
    );
  }
}

export default App;
