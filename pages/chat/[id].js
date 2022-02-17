import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import Head from 'next/head';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from '@emotion/styled';
import ChatScreen from '../../components/ChatScreen';
import Sidebar from '../../components/Sidebar';
import { auth, db } from '../../firebase';
import getRecipientEmail from '../../utils/getRecipientEmail';
import getUserData from '../../utils/getUserData';

function Chat({ chat, messages }) {
    const [user] = useAuthState(auth);
    const recepientEmail = getRecipientEmail(chat.users, user);

    const recepient = getUserData(recepientEmail);
    return (
        <Container>
            <Head>
                <title>Chat with {recepient? recepient?.name : recepientEmail}</title>
            </Head>
            <Sidebar />
            <ChatContainer>
                <ChatScreen recepientEmail={recepientEmail} recepient={recepient} chat={chat} messages={messages} />
            </ChatContainer>
        </Container>
    )
}

export default Chat;

export async function getServerSideProps(context) {
    
    const chatRef = doc(db, "chats", context.query.id);
    
    const messagesRes = await getDocs(
        query(collection(chatRef, 'messages'),
            orderBy('timestamp', 'asc')));
    const messages = messagesRes.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    })).map(messages => ({
        ...messages,
        timestamp: messages.timestamp.toDate().getTime()
    }));

    const chatRes = await getDoc(chatRef);
    const chat = {
        id: chatRes.id,
        ...chatRes.data()
    };
    return {
        props:{
            messages: JSON.stringify(messages),
            chat: chat
        }
    };
};
const Container = styled.div`
background-image: url('/bg1.jpg');
display: flex;
flex-direction: row;
`;
const ChatContainer = styled.div`

flex: 1;
`;