'use strict';

//////////////////////////////////////////////////////////////////////////
/////////////////  Component Renders List of Contacts  //////////////////
/////////////////    server side 'in memory' db    //////////////////////
////////////////////////////////////////////////////////////////////////

import React, {Component}     from 'react'
import { Link }               from 'react-router-dom'
import PropTypes              from 'prop-types'
import escapeRegExp           from 'escape-string-regexp'
import sortBy                 from 'sort-by'
import {Launcher}             from 'react-chat-window'
import Form                   from "react-jsonschema-form";

const schema = {
  title: "Todo",
  type: "object",
  required: ["title"],
  properties: {
    title: {type: "string", title: "Title", default: "A new task"},
    done: {type: "boolean", title: "Done?", default: false}
  }
};

const log = (type) => console.log.bind(console, type);

class ListContacts extends Component {

  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  }

  state = {
    query: '',
    messageList: [
      {
        author: 'them',
        type: 'text',
        data: {
          text: 'some text'
        }
      },
      {
        author: 'me',
        type: 'emoji',
        data: {
          code: 'someCode'
        }
      } ]
  }
  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: ''})
  }

  render() {
    const { contacts, onDeleteContact } = this.props
    const { query } = this.state

    let showingContacts

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingContacts = contacts.filter((contact) => match.test(contact.name))

    }
    else {
      showingContacts = contacts
    }

    showingContacts.sort(sortBy('name'))

    return (
      <div className = 'list-contacts'>
        <div className = 'list-contacts-top'>
          <input
            className = 'search-contacts'
            type='text'
            placeholder = 'Search contacts'
            value={this.state.query}
            onChange = { (event) => this.updateQuery(event.target.value)}
          />
        <Link
          to="/create"
          className = "add-contact"
        >Add Contact</Link>

      </div>

      {showingContacts.length !== contacts.length && (
        <div className = 'showing-contacts'>
          <span> Showing {showingContacts.length } out of {contacts.length } in our directory</span>
          <button onClick={this.clearQuery}> Show All </button>

        </div>
      )}

      <ol className='contact-list'>
        {showingContacts.map((contact) => (
            <li key={contact.id} className='contact-list-item'>
              <div className='contact-avatar' style={{
                backgroundImage: `url(${contact.avatarURL})`
                }}
                />

              <div className='contact-details'>
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>

             <button  onClick={()=>onDeleteContact(contact)} className='contact-remove' >
              Remove
             </button>

          </li>
        ))}
      </ol>

      <Form schema={schema}
       onChange={log("changed")}
       onSubmit={log("submitted")}
       onError={log("errors")} />

      <Launcher
        agentProfile={{
          teamName: 'react-live-chat',
          imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
        }}
        onMessageWasSent={this.state.messageList[0]}
        messageList={this.state.messageList}
      />

    </div>
    )
  }
}

export default ListContacts
