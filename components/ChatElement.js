import { Avatar } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from '@emotion/styled'
import getRecipientEmail from "../utils/getRecipientEmail";
import {auth, db} from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import getUserData from "../utils/getUserData";
function ChatElement({key, id, users}) {
    const [user] = useAuthState(auth);
    const router = useRouter();
    const recipientEmail = getRecipientEmail(users, user)
    //const [recepientSnapshot] = useCollection(query(collection(db, "users"), where('email', '==', getRecipientEmail(users, user))));
    const recepient = getUserData(recipientEmail);

    
    const enterChat = () => {
        router.push(`/chat/${id}`)
    }
    
    return (
    <Container onClick={enterChat}>
        {recepient? (
            <UserAvatar
                src={recepient?.photoURL}
                
            />
        ) : (
        <UserAvatar>{recipientEmail[0]}</UserAvatar>
        )}
        <p>{recepient? recepient?.name : recipientEmail}</p>
    </Container>
  )
}

export default ChatElement;

const Container = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 25px;
    word-break: break-word;
    :hover{
        background-color: #e9eaeb;
    }
`;
const UserAvatar = styled(Avatar)`
    margin: 5px;
    margin-right: 15px;
`;