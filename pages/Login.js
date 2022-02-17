import { Backdrop, Button, Fade, Modal, TextField } from '@mui/material'
import Head from 'next/head'
import styled from '@emotion/styled'
import facepaint from 'facepaint'
import { css } from '@emotion/react'
import { auth, googleProvider, emailProvider } from '../firebase'
import { createUserWithEmailAndPassword, signInAnonymously, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { AccountCircleOutlined, CloseOutlined, EmailOutlined, Facebook, Google, MasksOutlined, NoAccountsOutlined, PrivacyTipOutlined, QuestionMarkRounded, VignetteOutlined } from '@mui/icons-material'
import { GlassContainer } from '../components/glass'
import { HoverUp, Shine } from '../components/animations'
import { useState } from 'react'

function Login() {
    const errorMessage = "Error";
    const [open, setOpen] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    //const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const signUserInAnonymously = () => {
        setIsLoggingIn(true);
        signInAnonymously(auth)
            .then(() => {
                // Signed in..
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ...
            }).finally(() => {
                setIsLoggingIn(false);
                setEmail("");
                setPassword("");
            });
    }

    const signIn = (provider) => {
        signInWithPopup(auth, provider).catch(alert)
    }
    function signInWithEmail(e) {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
            }).catch((error) => {
                console.log(error)
                handleOpen();
                const errorCode = error.code;
                const errorMessage = error.message;
                setError1(errorMessage);
            }).finally(() => {

            })
        setEmail("");
        setPassword("");
    }
    function signUpWithEmail(e) {
        e.preventDefault();
        setIsLoggingIn(false);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                console.log(error)
                handleOpen();
                const errorCode = error.code;
                const errorMessage = error.message;
                setError1(errorMessage);
            }).finally(() => {
                setEmail("");
                setPassword("");
            })
    } const [error1, setError1] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    return (
        <Container>
            <Head>
                <title>Login</title>

            </Head>
            <CustomModal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
            >
                <Fade in={open}>
                    <ModalStyle>
                        <CloseButton >
                            <CloseOutlined onClick={handleClose} />
                        </CloseButton>
                        <ModalHeadText>
                            Login Failed
                        </ModalHeadText>
                        <ModalBodyText>
                            Failed to {isLoggingIn ? "Log in" : "Sign up"} due to the following error
                        </ModalBodyText>
                        <ModalBodyText>
                            {error1}
                        </ModalBodyText>
                        <ModalBodyText>
                            Please try again or {isLoggingIn ? "sign up" : "log in"} if you don't have an account
                        </ModalBodyText>
                        <SignUpSignIn >
                            <div style={{ width: "70%" }} />
                            <SignUpSignInButton variant='contained' onClick={handleClose}>
                                <SignInButtonText >Try Again</SignInButtonText>
                            </SignUpSignInButton>
                        </SignUpSignIn>
                    </ModalStyle>
                </Fade>

            </CustomModal>
            <LogoContainer>
                <Logo src='/dept-logo.png' />

                <InputContainer>
                    <Input
                        id="login"
                        placeholder='Email'
                        type='email'
                        variant="standard"
                        color='secondary'
                        icon={<EmailOutlined />}
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                    <Input
                        placeholder='Password'
                        type='password'
                        variant="standard"
                        color='secondary'
                        onChange={(e) => { setPassword(e.target.value) }}
                        icon={<VignetteOutlined />}
                    />

                    <SignUpSignIn>
                        <SignUpSignInButton style={{ marginLeft: '0px' }} variant='contained' type='submit' onClick={signInWithEmail}>
                            <SignInButtonText>Sign in</SignInButtonText>
                        </SignUpSignInButton>
                        <SignUpSignInButton style={{ marginRight: '0px' }} variant='contained' type='submit' onClick={signUpWithEmail}>
                            <SignInButtonText>Sign up</SignInButtonText>
                        </SignUpSignInButton>
                    </SignUpSignIn>

                </InputContainer>

                <AnoymousButton variant='contained' onClick={signUserInAnonymously}>
                    <AccountCircleOutlined
                        style={{
                            margin: '5px',
                            width: '30px',
                            height: '30px',
                            marginTop: '-5px',
                            marginLeft: '-5px'

                        }} />
                    <SignInButtonText>Sign in Anonymously</SignInButtonText>
                </AnoymousButton>

                <GoogleButton variant='contained' onClick={() => signIn(googleProvider)}>
                    <Google
                        style={{
                            margin: '5px',
                            width: '30px',
                            height: '30px',
                            marginTop: '-5px',
                            marginRight: '10px',
                            marginLeft: '-20px'

                        }} />
                    <SignInButtonText>Sign in with Google</SignInButtonText>
                </GoogleButton>
            </LogoContainer>
        </Container>
    )
}

export default Login
const breakpoints = [576, 768, 992, 1200];
const mq = facepaint(breakpoints.map(bp => `@media (min-width: ${bp}px)`));

const Container = styled.div`
    background-color: rgb(65, 88, 208); 
    //background-image: linear-gradient(43deg, rgb(65, 88, 208) 0%, rgb(200, 80, 192) 46%, rgb(255, 204, 112) 100%); 
    background-image: url('/bg1.jpg');
    
    display: grid;
    place-items: center;
    height: 100vh;
    background-color: whitesmoke;
`;
const Logo = styled.img`
width: 200px;
height: 200px;
margin-bottom: 20px;
`;
const responsive = css(mq({
    width: ['340px', '500px', '600px'],
    //height: ['100%', '100%', '100%', '100%', '100%'],
}));
const responsiveButton = css(mq({
    width: ['270px', '300px', '400px'],
    //height: ['100%', '100%', '100%', '100%', '100%'],
}));

const InputContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    ${responsiveButton}
`;
const SignUpSignIn = styled.div`
flex: 1;
    display: flex;
    flex-direction: row;
    align-content: space-between;
    margin-top: 2px;
    padding-inline-start: 0px;
    
    ${responsiveButton}
`;
const Input = styled.input`
    
    ${GlassContainer}
    ${responsiveButton}
    border: none;
    border-radius: 8px;
    margin-bottom: 10px;
    border-bottom: 1px solid #ccc;
    padding: 12px;
    font-size: 1.2em;
    outline: none;
    ${Shine}
    
    color: #fff;
    background: linear-gradient(114deg, rgba(146,0,255,0.5) 0%, rgba(213,199,226,0.2) 35%, rgba(255,217,217,0.2) 67%, rgba(255,255,255,0) 100%);
    &&&{
        
        ::placeholder{
        color: #ddd;
    }
    
        color: #fff;
    }
    transition: 0.1s ease-in-out;
      :focus {
        opacity: 0.7;
        border-bottom: 2px solid #fff;
        transform:translateY(-5px);
    } 
`;

const LogoContainer = styled.div`
    ${responsive}
    ${HoverUp}
    ${GlassContainer}
    display: flex;
    padding: 20px;
    min-height: 400px;
    flex-direction: column;
    align-items: center;
`;

const SignInButton = styled(Button)`
   ${responsiveButton}
   ${GlassContainer}
    ${Shine}
    &&&{
    border-radius: 10px;
    padding-top: 10px;
    margin: 8px;
   } 

`;

const GoogleButton = styled(SignInButton)`
    background-image: linear-gradient(-60deg, #4285f400, #34a85355, #fbbc0566, #ea4335dd);
    &&&{
        :hover{
            background-image: linear-gradient(-60deg, #4285f4, #34a853, #fbbc05, #ea4335);
        }
    }
`;

const SignUpSignInButton = styled(SignInButton)`
background: linear-gradient(114deg, rgba(146,0,255,0.6934426229508197) 0%, rgba(213,199,226,0.4) 35%, rgba(255,217,217,0.2) 67%, rgba(255,255,255,0) 100%);
&&&{
    width: 55%;
}
`;
const AnoymousButton = styled(SignInButton)`
background: linear-gradient(114deg, rgba(146,0,255,0.6934426229508197) 0%, rgba(213,199,226,0.4) 35%, rgba(255,217,217,0.2) 67%, rgba(255,255,255,0) 100%);

`;

const SignInButtonText = styled.span`
    font-size: 1.2em;
    font-weight: bold;
    align-self: left;
    color: white;
`;
const CustomModal = styled(Modal)`
    &&&{
        
            
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
    }
`;
const responsiveModal = css(mq({
    width: ['300px', '350px', '400px'],
    //height: ['100%', '100%', '100%', '100%', '100%'],
}));
const ModalStyle = styled.div`
    ${GlassContainer}
    ${responsiveModal}
    &&&{
        //filter: blur(10px);
        display: grid;
        border-radius: 10px;
        margin-top: 20px;
        height: fit-content;

    }
    
  
`;
const CloseButton = styled.button`
    ${GlassContainer}
    &&&{
        border: none;
        background: linear-gradient(140deg, rgba(255,0,0,0.3) 0%, rgba(255,53,0,0.5) 34%, rgba(255,144,144,0.5) 75%, rgba(255,255,255,0) 100%);
        :hover{
            background: linear-gradient(140deg, rgba(255,0,0,0.6) 0%, rgba(255,53,0,0.8) 34%, rgba(255,144,144,0.8) 75%, rgba(255,255,255,0) 100%);
        }
        border-radius: 50%;
        left: 300px;
        top: 10px;
        position: relative;
        width: 35px;
        height: 35px;
        padding: 2px;

        cursor: pointer;
        z-index: 10;
    }
`;
const ModalHeadText = styled.label`

    &&&{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
        font-size: 1.8em;
        font-weight: bold;
        color:orangered;
        font-family: Roboto;
    }   
`;
const ModalBodyText = styled.label`
    &&&{

        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
        padding: 10px;
        font-size: 1.2em;
        font-weight: bold;
        color:white;
        font-family: Roboto;
    }
`;