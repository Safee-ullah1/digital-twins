import { collection, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";

export default function getUserData(email){
    const [userSnapshot] = useCollection(
        query(collection(db, "users"),
         where('email', '==', email)));
    const user = userSnapshot?.docs[0]?.data();
    return user;
}

