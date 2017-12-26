

//////////////////////////////////////////////////////////////////////////
/////////////////    Component To Edit Contacts        //////////////////
////////////////////////////////////////////////////////////////////////

import React, {Component} from 'react'
import PropTypes          from 'prop-types'
import Form               from "react-jsonschema-form";
import Model              from "./models/member.js"


const log = (type) => console.log.bind(console, type);

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { /* initial state */ };
    const profile = JSON.parse(decodeURIComponent(this.props.params.contact))
    console.log(profile)
    Model.formData.firstname = profile.firstname
    Model.formData.lastname = profile.lastname
    Model.formData.cell = profile.cell
    Model.formData.email = profile.email
    Model.formData.id = profile.id
    Model.formData.subscribe.prayeralerts = profile.prayeralerts
    Model.formData.subscribe.updates = profile.updates
    Model.formData.subscribe.moments = profile.moments
  }

  static propTypes = {
    onUpdateProfile: PropTypes.func.isRequired
  }

  handleSubmit = (e) => {
    if (this.props.onUpdateProfile)
        this.props.onUpdateProfile(e.Model.formData)

  }

  componentDidMount() {


  }

  render() {

    return (
    <div className='container'>
      <div className='row'>
        <div className="col-xs-8 col-xs-offset-2">
        <Form
          schema={Model.schema}
          uiSchema={Model.uiSchema}
          formData={Model.formData}
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
