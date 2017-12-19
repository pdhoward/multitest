

//////////////////////////////////////////////////////////////////////////
/////////////////  Component To Create New Contacts    //////////////////
////////////////////////////////////////////////////////////////////////

import React, {Component} from 'react'
import { Link }           from "react-router-dom"
import PropTypes          from 'prop-types'
import serializeForm      from 'form-serialize'
import {Launcher}         from 'react-chat-window'
import Form               from "react-jsonschema-form";

const schema = {
  "title": "A registration form",
  "description": "xio labs",
  "type": "object",
  "required": [
    "firstName",
    "lastName"
  ],
  "properties": {
    "firstName": {
      "type": "string",
      "title": "First name"
    },
    "lastName": {
      "type": "string",
      "title": "Last name"
    },
    "age": {
      "type": "integer",
      "title": "Age"
    },
    "bio": {
      "type": "string",
      "title": "Bio"
    },
    "password": {
      "type": "string",
      "title": "Password",
      "minLength": 3
    },
    "telephone": {
      "type": "string",
      "title": "Telephone",
      "minLength": 10
    }
  }
}
const formData = {
  firstName: "name please",
  password: "enter your secret",
  done: true
};

const log = (type) => console.log.bind(console, type);



class CreateContact extends Component {

  static propTypes = {
    onCreateProfile: PropTypes.func.isRequired
  }

  state = {
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

  handleSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, {hash: true})
    if (this.props.onCreateProfile)
        this.props.onCreateProfile(values)

  }
  render() {
    return (
    <div className='container'>
      <div className='row'>
        <div className="col-xs-8 col-xs-offset-2">
        <Form schema={schema}
          formData={formData}
          onChange={log("changed")}
          onSubmit={log("submitted")}
          onError={log("errors")}
        />
          </div>
        </div>
      <div>
        <Launcher
          agentProfile={{
            teamName: 'react-live-chat',
            imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
          }}
          onMessageWasSent={this.state.messageList[0]}
          messageList={this.state.messageList}
          />
      </div>
      <div>
          <Link className="close-create-contact" to="/">Close</Link>
            <form onSubmit={this.handleSubmit} className="create-contact-form">
              <div className="create-contact-details">
                <button>Add Profile</button>
              </div>
            </form>
      </div>
      </div>
    )
  }

}

export default CreateContact
