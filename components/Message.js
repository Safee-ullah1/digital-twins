import { useAuthState } from "react-firebase-hooks/auth";
import styled from '@emotion/styled'
import { auth } from "../firebase";
import { GlassContainer } from "./glass";

function Message({user, message}) {
    const [userLoggedIn] = useAuthState(auth);
    const MessageType = user === userLoggedIn.email ? Sender : Receiver;
    return (
        <Container>
            <MessageType>
                {message.message}
            </MessageType>
            </Container>
    )
}

export default Message

const Container = styled.div``;
const MessageElement = styled.p`
${GlassContainer}
width: fit-content;
padding: 10px;
border-radius: 8px;
margin: 10px;
min-width: 60px;
padding-bottom: 16px;
position: relative;
text-align: right;

`;

const Sender = styled(MessageElement)`
 margin-left: auto;
 background-color: #838cc7;
`;

const Receiver = styled(MessageElement)`
    background-color: whitesmoke;
    text-align: left;
`;