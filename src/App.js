

//////////////////////////////////////////////////////////////////////////
/////////////////  Main App for Bot Contact Mgmt        //////////////////
/////////////////    Connecting Business to Bots   //////////////////////
////////////////////////////////////////////////////////////////////////


import React, { Component }   from 'react';
import ListContacts           from './ListContacts';
import * as ContactsAPI       from './utils/ContactsAPI'
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
    ContactsAPI.remove(contact).then(cnt =>{
      this.setState( (state) => ({
        contacts: state.contacts.filter((c) => c.id !== contact.id )
      }) )
    })
  }

  createProfile(profile) {
    ContactsAPI.profile(profile).then(profile => {
      this.setState(state => ({
        contacts: state.contacts.concat([profile])
      }))
    })
  }
  updateProfile(profile, cb) {
    console.log("entered appjs -- executing contactsapi")
    console.log(profile)
    ContactsAPI.updateProfile(profile).then(profile => {
      console.log("APP JS - value returned from api call to server")
      console.log(profile)
      this.setState({
        contacts: profile })
      cb()
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
                this.updateProfile(profile, function(){
                  history.push('/')
                })
              }}
              />
            )} />
       </div>
    );
  }
}

export default App;
