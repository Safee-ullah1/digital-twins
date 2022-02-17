import styled from '@emotion/styled'
import { Avatar, AvatarGroup, Button, IconButton } from '@mui/material'
import { Chat as ChatIcon, MoreVert } from '@mui/icons-material';
import { Search as SearchIcon } from '@mui/icons-material';
import { validate } from "email-validator";
import { auth, db } from '../firebase';
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, query, where, addDoc } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import ChatElement from './ChatElement';
import { GlassContainer } from './glass';
import { Shine } from './animations';

function Sidebar() {
    const [user, loading] = useAuthState(auth);
    const chatRef = query(
        collection(db, "chats"), 
        where('users', 'array-contains', user.email)
    );
    const createChat = () => {
        const input = prompt(
            "Enter Email to chat with"
        )
        console.log(input);
        if (!input) return null;
        console.log(input);
        console.log(validate(input));
        console.log(chatAlreadyExists(input));
        if (validate(input) && input !== user.email && !chatAlreadyExists(input)) {
            // We need to add the chat into the db
            
            const chat = {
                users: [user.email, input],
            }
            addDoc(collection(db, "chats"), chat);
        }
    }
    const [chatSnapshot] = useCollection(chatRef);
    const chatAlreadyExists = (recipientEmail) =>
        !!chatSnapshot?.docs.find(
            chat => chat?.data().users.find(user => user === recipientEmail)?.length > 0
        );


    return (
        <Container>
            <ChatList>
                <Header>
                    <UserAvatar src={user?.photoURL} />
                    <IconContainer>
                        <IconButton>
                            <ChatIcon />
                        </IconButton>
                        <IconButton>
                            <MoreVert />
                        </IconButton>
                    </IconContainer>
                </Header>

                <Search>
                    <SearchIcon />
                    <SearchInput placeholder='Search in Chats' />
                </Search>
                <SidebarButton onClick={createChat}>
                    START A NEW CHAT
                </SidebarButton>
                {chatSnapshot?.docs.map(chat => {
                    return <ChatElement key={chat.id} id={chat.id} users={chat.data().users} />
                })}
            </ChatList>
            {/* List of chats */}

            <SidebarButton onClick={()=>{auth.signOut()}}>
                LOGOUT
            </SidebarButton>
        </Container>
    )
}
export default Sidebar;
const Container = styled.div`
    ${GlassContainer}
    border-radius: 0px;
    backdrop-filter: blur(5px);
    flex: 0.45;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 300px;
    max-width: 350px;
    border-right: 1px solid whitesmoke ;
    overflow: scroll;
    height: 100vh;

::-webkit-scrollbar {
    display: none;
}
-ms-overflow-style: none;
scrollbar-width: none;


`;
const ChatList = styled.div``;
const Header = styled.div`
    
    display: flex;
    position: sticky;
    top: 0;
    background: linear-gradient(139deg, rgba(255,255,255,0.6276978417266187) 0%, rgba(255,255,255,0.24424460431654678) 50%, rgba(255,255,255,0) 100%);
    z-index: 1;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;

`;
const UserAvatar = styled(Avatar)`
    cursor: pointer;
    :hover {
        opacity: 0.8;
    }
`;
const IconContainer = styled.div``;

const SearchInput = styled.input`
    background-color: transparent;
    outline-width: 0;
    border: none;
    flex: 1;
    border-radius: 3px;
    color: white;
    ::placeholder{
       color : #ccc;
    }
`;

const Search = styled.div`

display: flex;
align-items: center;
padding: 20px;
border-radius: 2px;
`;
const SidebarButton = styled(Button)`
    width: 100%;
    ${Shine}
    &&&{
        color: white;
        padding: 30px;
        border-top: 1px solid whitesmoke;
        border-bottom: 1px solid whitesmoke;
    }
`;
