import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from "./firebaseConfig";


export const googleAuth = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app)

    try{
        const res = await signInWithPopup(auth, provider)
        return res
    }catch(err){
        console.log(err)
    }
}
