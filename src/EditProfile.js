

//////////////////////////////////////////////////////////////////////////
/////////////////    Component To Edit Contacts        //////////////////
////////////////////////////////////////////////////////////////////////

import React, {Component} from 'react'
import PropTypes          from 'prop-types'
import Form               from "react-jsonschema-form";

const schema = {
  "title": "Member Registration",
  "description": "community",
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
    "firstname": {
      "type": "string",
      "title": "First Name"
    },
    "lastname": {
      "type": "string",
      "title": "Last Name"
    },
    "email": {
      "type": "string",
      "title": "email"
    },
    "cell": {
      "type": "string",
      "title": "Cell Phone",
      "minLength": 10
    },
    "subscribe": {
      "type": "object",
      "title": "Notifications by text",
      "properties": {
        "prayeralerts": {
          "type": "boolean",
          "title": "Prayer Alerts"
        },
        "moments": {
          "type": "boolean",
          "title": "Encouraging words (sent 2 or 3X a week)"
        },
        "updates": {
          "type": "boolean",
          "title": "Weekly Updates"
        }
      }
    },
    "id": {
      "type": "string",
      "title": "Id"
    },
  }
}
const uiSchema = {
  "subscribe": {
    "prayeralerts": {
      "ui:widget": "radio"
    },
    "moments": {
      "ui:widget": "radio"
    },
    "updates": {
      "ui:widget": "radio"
    }
  }
}
const formData = {
  "subscribe": {
      "prayeralerts": true,
      "moments": true,
      "updates": true
    },
};


const log = (type) => console.log.bind(console, type);

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { /* initial state */ };
    const profile = JSON.parse(decodeURIComponent(this.props.params.contact))
    console.log(profile)
    formData.firstname = profile.firstname
    formData.lastname = profile.lastname
    formData.cell = profile.cell
    formData.email = profile.email
  }

  static propTypes = {
    onUpdateProfile: PropTypes.func.isRequired
  }

  handleSubmit = (e) => {
    if (this.props.onUpdateProfile)
        this.props.onUpdateProfile(e.formData)

  }

  componentDidMount() {


  }

  render() {

    return (
    <div className='container'>
      <div className='row'>
        <div className="col-xs-8 col-xs-offset-2">
        <Form
          schema={schema}
          uiSchema={uiSchema}
          formData={formData}
          onChange={log("changed")}
          onSubmit={this.handleSubmit}
          onError={log("errors")}
        />
          </div>
        </div>
    </div>
    )
  }

}

export default EditProfile
