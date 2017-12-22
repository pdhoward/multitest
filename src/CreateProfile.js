

//////////////////////////////////////////////////////////////////////////
/////////////////  Component To Create New Contacts    //////////////////
////////////////////////////////////////////////////////////////////////

import React, {Component} from 'react'
import PropTypes          from 'prop-types'
import {Launcher}         from 'react-chat-window'
import Form               from "react-jsonschema-form";

const schema = {
  "title": "A registration form",
  "description": "xio labs",
  "type": "object",
  "required": [
    "name"
  ],
  "properties": {
    "avatarURL": {
      "type": "string",
      "format": "data-url",
      "title": "Avatar"
    },
    "name": {
      "type": "string",
      "title": "Company Name"
    },
    "contact": {
      "type": "string",
      "title": "Contact"
    },
    "url": {
      "type": "string",
      "title": "url"
    },
    "employees": {
      "type": "integer",
      "title": "# employees"
    },
    "email": {
      "type": "string",
      "title": "email"
    },
    "addr1": {
      "type": "string",
      "title": "Address 1"
    },
    "addr2": {
      "type": "string",
      "title": "Address 2"
    },
    "city": {
      "type": "string",
      "title": "City"
    },
    "state": {
      "type": "string",
      "title": "State"
    },
    "zip": {
      "type": "string",
      "title": "Zip"
    },
    "phone": {
      "type": "string",
      "title": "Telephone",
      "minLength": 10
    }
  }
}
/*
const formData = {
  firstName: "name please",
  password: "enter your secret",
  done: true
};

use in Component
<Form schema={schema}
  formData={formData}
  onChange={log("changed")}
  onSubmit={this.handleSubmit}
  onError={log("errors")}
/>
*/
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
    if (this.props.onCreateProfile)
        this.props.onCreateProfile(e.formData)

  }
  render() {
    return (
    <div className='container'>
      <div className='row'>
        <div className="col-xs-8 col-xs-offset-2">
        <Form schema={schema}
          onChange={log("changed")}
          onSubmit={this.handleSubmit}
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
    </div>
    )
  }

}

export default CreateContact
