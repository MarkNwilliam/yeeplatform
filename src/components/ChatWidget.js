import React, { useEffect , useState} from 'react';
import { Widget, addResponseMessage, toggleMsgLoader } from '@ryaneewx/react-chat-widget';
import '@ryaneewx/react-chat-widget/lib/styles.css';
import '../css/chat.css';

const ChatWidget = ({ handleNewUserMessage }) => {


const [chatWindowOpen, setChatWindowOpen] = useState(true);


  const handleToggle = (open) => {
    setChatWindowOpen((prev) => !prev);
  };


  return (
    <Widget
      handleNewUserMessage={handleNewUserMessage}
      title="Ebook Chatbot"
      subtitle="Ask me anything about this ebook"
      profileAvatar="https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp"
      emojis="true"
      handleToggle={handleToggle}
    />
  );
};

export default ChatWidget;
