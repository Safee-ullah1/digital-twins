import '../styles/globals.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase'
import  Login  from './Login'
import Loading from '../components/Loading';
import { useEffect } from 'react';
import { getFirestore, doc, collection, serverTimestamp, setDoc, addDoc } from 'firebase/firestore';
function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);
  
  if(loading) return <Loading/>
  if (!user) {
    return <Login/>}

  else return <Component {...pageProps} />
}

export default MyApp
