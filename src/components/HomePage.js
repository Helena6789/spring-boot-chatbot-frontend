import React from "react";
import {
  Tabs,
} from "antd";

import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import { processMessageToChatGPT } from "../utils";

class HomePage extends React.Component {
  state = {
    messages: [
      {
        message: "Hello, I'm ChatBot! Ask me anything!",
        sentTime: "just now",
        sender: "ChatBot"
      }
    ],
    isTyping: false,
  }

  handleSend = async (message) => {
    // const newMessage = {
    //   message,
    //   direction: 'outgoing',
    //   sender: "user"
    // };

    // const newMessages = [...messages, message];
    
    this.setState(
      {
        messages : [...messages, newMessage],
        isTyping: true,
      }
    )
    await processMessageToChatGPT(message);
  };

  render() {
    return (
      <>
        <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
        </Tabs>
        <div style={{ position:"relative", height: "800px", width: "700px"  }}>
        <MainContainer>
          <ChatContainer>       
            <MessageList 
              scrollBehavior="smooth" 
              typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
            >
              {messages.map((message, i) => {
                console.log(message)
                return <Message key={i} model={message} />
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />        
          </ChatContainer>
        </MainContainer>
      </div>
      </>

    );
  }
}

export default HomePage;
