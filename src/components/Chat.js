
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
  }

  componentDidMount() {
    this.handleEnd = this.handleEnd.bind(this);
  }

  updateRegistration(values, cb) {
    let msg = {}
    msg.name = values['name'].value
    msg.age = values['age'].value
    msg.gender = values['gender'].value
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
            trigger: '3',
          },
          {
            id: '3',
            message: 'Hi {previousValue}! What is your gender?',
            trigger: 'gender',
          },
          {
            id: 'gender',
            options: [
              { value: 'male', label: 'Male', trigger: '5' },
              { value: 'female', label: 'Female', trigger: '5' },
            ],
          },
          {
            id: '5',
            message: 'How old are you?',
            trigger: 'age',
          },
          {
            id: 'age',
            user: true,
            trigger: '7',
            validator: (value) => {
              if (isNaN(value)) {
                return 'value must be a number';
              } else if (value < 0) {
                return 'value must be positive';
              } else if (value > 120) {
                return `${value}? Come on!`;
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
              { value: 'gender', label: 'Gender', trigger: 'update-gender' },
              { value: 'age', label: 'Age', trigger: 'update-age' },
            ],
          },
          {
            id: 'update-name',
            update: 'name',
            trigger: '7',
          },
          {
            id: 'update-gender',
            update: 'gender',
            trigger: '7',
          },
          {
            id: 'update-age',
            update: 'age',
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
