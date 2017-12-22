

//////////////////////////////////////////////////////////////////////////
/////////////////    Component To Edit Contacts        //////////////////
////////////////////////////////////////////////////////////////////////

import React, {Component} from 'react'
import PropTypes          from 'prop-types'
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
    },
    "id": {
      "type": "string",
      "title": "Id"
    },
  }
}

const formData = {

};


const log = (type) => console.log.bind(console, type);

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { /* initial state */ };
    console.log(this.props)
    const profile = JSON.parse(this.props.params.contact)
    formData.name = profile.name
    formData.url = profile.url
    formData.contact = profile.contact
    formData.phone = profile.phone
    formData.addr1 = profile.addr1
    formData.addr2 = profile.addr2
    formData.city = profile.city
    formData.state = profile.state
    formData.zip = profile.zip
    formData.id = profile.id
    formData.employees = profile.employees
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
        <Form schema={schema}
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
