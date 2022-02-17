import { InsertEmoticon, MoreVert } from "@mui/icons-material";
import { Avatar, Button, IconButton } from "@mui/material";
import { addDoc, collection, doc, getDocs, orderBy, query, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from '@emotion/styled'
import { auth, db } from "../firebase";
import Message from "./Message";
import { GlassContainer } from "./glass";
import { Shine } from "./animations";

function ChatScreen({ recepient, recepientEmail, chat, messages }) {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const chatRef = doc(db, "chats", router.query.id);

  const [input, setInput] = useState("");
  const [messagesSnapsot] = useCollection(
    query(
      collection(chatRef, 'messages'),
      orderBy('timestamp', 'asc')
    )
  );
  const showMessages = () => {
    if (messagesSnapsot)
      return messagesSnapsot.docs.map(message => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }} />
      ))
      else{
        return JSON.parse(messages).map(message => (
          <Message
            key={message.id}
            user={message.user}
            message={{
              ...message,
              timestamp: message.timestamp,
            }} />
        )) 
      }
  };
const sendMessage = (e) => {
  e.preventDefault();
  const messageCollection = collection(db, "chats", router.query.id, 'messages');
  const messageData = {
    timestamp: serverTimestamp(),
    message: input,
    user: user.email,
    photoURL: user.photoURL,
  };
  addDoc(messageCollection, messageData);
  setInput("");
}

  return (
    <Container>
      <Header>
        <Avatar src={recepient?.photoURL} />
        <HeaderInformation>
          <h3>{recepient ? recepient?.name : recepientEmail}</h3>
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            <MoreVert />
          </IconButton>
        </HeaderIcons>
      </Header>
      <ChatContainer>
        <MessageContainer>
        {showMessages()}
        <EndOfMessages />
        </MessageContainer>
          <InputContainer>
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <ShinyButton
            disabled={!input}
            type="submit"
            onClick={sendMessage}
          >Send Message</ShinyButton>
          </InputContainer>
      </ChatContainer>
    </Container>
  )
}

export default ChatScreen

const ShinyButton = styled(Button)`
${Shine}&&&{
        color: white;
        padding: 5px;
}

`;
const Header = styled.div`
  ${GlassContainer}
  width: 100%;
  position: sticky;
  z-index: 100;
  border-radius: 0px;
  top: 0;
  display: flex;
  padding: 10px;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;
const ChatContainer = styled.div`
 flex: 1;
  box-shadow: 9px 9px 4px -6px rgba(0,0,0,0.4) inset;
  -webkit-box-shadow: 9px 9px 4px -6px rgba(0,0,0,0.4) inset;
  -moz-box-shadow: 9px 9px 4px -6px rgba(0,0,0,0.4) inset;
`;
const HeaderIcons = styled.div``;
const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;
`;

const Container = styled.div`
flex: 1;
`;
const EndOfMessages = styled.div``;
const MessageContainer = styled.div`
  padding: 30px;
  background-color: transparent;
  min-height: 90vh;
`;
const InputContainer = styled.form`
  ${GlassContainer}
  background: linear-gradient(139deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 5px;
  position: sticky;
  bottom: 0;
  z-index: 100;
`;
const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;

font-size: 1.6em;
font-weight: 900;
font-family: Roboto;
&&&{
  color: #FFFFFFFF;
}
  border-radius: 10px;
  padding: 10px;
  margin-left: 15px;
  margin-right: 15px;
  background-color: transparent;
  z-index: 100;
`;