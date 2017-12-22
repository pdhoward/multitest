

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

class EditProfile extends Component {
  constructor (props){
            super(props);
            this.state={
                busy : true,
                sessionId : localStorage.getItem('sessionId') || null,
                resetKey : this.props || ''
            };
            console.log(this.props.params)
        }

  static propTypes = {
    onUpdateProfile: PropTypes.func.isRequired
  }

  handleSubmit = (e) => {
    if (this.props.onUpdateProfile)
        this.props.onUpdateProfile(e.formData)

  }

  componentDidMount() {
    //const { contact } = JSON.parse(this.props.match.params)
    console.log(this.props)

    //const { match: { params } } = this.props;
    /*
  axios.get(`/api/users/${params.userId}`)
    .then(({ data: user }) => {
      console.log('user', user);

      this.setState({ user });
    });
    */
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
    </div>
    )
  }

}

export default EditProfile
