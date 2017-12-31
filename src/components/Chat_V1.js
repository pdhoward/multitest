
import React, {Component}     from 'react'
import ChatBot                from 'react-simple-chatbot';

const steps = [
  {
    id: '0',
    message: 'Welcome to react chatbot!',
    trigger: '1',
  },
  {
    id: '1',
    message: 'Bye!',
    end: true,
  },
];


class Chat extends Component {
render() {
  return (
  <div className='container bg-faded'>
    <div className='row'>
      <div className='chat-widget'>
        <ChatBot steps={steps}/>
      </div>
    </div>
  </div>
    )
  }
}


export default Chat
