
import React, {Component}     from 'react'
import PropTypes              from 'prop-types';
import * as ContactsAPI       from '../utils/ContactsAPI'
import Review                 from './Review';
import ChatBot                from 'react-simple-chatbot';


const post = (msg = "this worked") => console.log.bind(console, msg);

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {}
    };
    this.handleEnd = this.handleEnd.bind(this);
    this.updateRegistration = this.updateRegistration.bind(this);
  }

  componentDidMount() {
  }

  updateRegistration(values, cb) {
    let msg = {}
    msg.name = values['name'].value
    msg.prayeralerts = values['prayeralerts'].value
    msg.moments = values['moments'].value
    msg.updates = values['updates'].value
    msg.cell = values['cell'].value
    ContactsAPI.updateRegistration(msg, (values) => {
      console.log("call back from http round trip")
      console.log(values)
      this.setState({
        values: values })
      cb()
    })
  }

  handleEnd({ steps, values }) {
     console.log("-----steps")
     console.log(steps);
     console.log("------values")
     console.log(values);
     this.updateRegistration(steps, function(){
       alert(`Chat handleEnd callback! Number: ${values[0]}`);
     })

  }

  render() {
    return (

  <div className='container bg-faded'>
    <div className='row'>
     <div className='chat-widget'>

      <ChatBot
        handleEnd={this.handleEnd}
        steps={[
          {
            id: '1',
            message: 'What is your name?',
            trigger: 'name',
          },
          {
            id: 'name',
            user: true,
            trigger: '2',
          },
          {
            id: '2',
            message: 'Hi {previousValue}! Would you like prayer alerts?',
            trigger: 'prayeralerts',
          },
          {
            id: 'prayeralerts',
            options: [
              { value: 'yes', label: 'Yes', trigger: '3' },
              { value: 'no', label: 'No', trigger: '3' },
            ],
          },
          {
            id: '3',
            message: 'Updates?',
            trigger: 'updates',
          },
          {
            id: 'updates',
            options: [
              { value: 'yes', label: 'Yes', trigger: '4' },
              { value: 'no', label: 'No', trigger: '4' },
            ],
          },
          {
            id: '4',
            message: 'Moments?',
            trigger: 'moments',
          },
          {
            id: 'moments',
            options: [
              { value: 'yes', label: 'Yes', trigger: '5' },
              { value: 'no', label: 'No', trigger: '5' },
            ],
          },
          {
            id: '5',
            message: 'What is your cell phone?',
            trigger: 'cell',
          },
          {
            id: 'cell',
            user: true,
            trigger: '7',
            validator: (value) => {
              if (value.length > 10) {
                return 'invalid cell number';
              } else if (value.length < 10) {
                return 'invalid cell number - did you include area code';
              }
              return true;
            },
          },
          {
            id: '7',
            message: 'Great! Check out your summary',
            trigger: 'review',
          },
          {
            id: 'review',
            component: <Review />,
            asMessage: true,
            trigger: 'update',
          },
          {
            id: 'update',
            message: 'Would you like to update some field?',
            trigger: 'update-question',
          },
          {
            id: 'update-question',
            options: [
              { value: 'yes', label: 'Yes', trigger: 'update-yes' },
              { value: 'no', label: 'No', trigger: 'end-message' },
            ],
          },
          {
            id: 'update-yes',
            message: 'What field would you like to update?',
            trigger: 'update-fields',
          },
          {
            id: 'update-fields',
            options: [
              { value: 'name', label: 'Name', trigger: 'update-name' },
              { value: 'prayeralerts', label: 'PrayerAlerts', trigger: 'update-prayeralerts' },
              { value: 'updates', label: 'Updates', trigger: 'update-updates' },
              { value: 'moments', label: 'Moments', trigger: 'update-moments' },
              { value: 'cell', label: 'Cell', trigger: 'update-cell' },
            ],
          },
          {
            id: 'update-name',
            update: 'name',
            trigger: '7',
          },
          {
            id: 'update-prayeralerts',
            update: 'prayeralerts',
            trigger: '7',
          },
          {
            id: 'update-updates',
            update: 'updates',
            trigger: '7',
          },
          {
            id: 'update-moments',
            update: 'moments',
            trigger: '7',
          },
          {
            id: 'update-cell',
            update: 'cell',
            trigger: '7',
          },
          {
            id: 'end-message',
            message: 'Thanks! Your data was submitted successfully!',
            end: true,
          },
        ]}
      />
      </div>
    </div>
  </div>

    );
  }
}

export default Chat;
