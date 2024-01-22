import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import app from "./firebaseConfig";


export const googleAuth = async () => {
    
    try{
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app)
        const res = await signInWithPopup(auth, provider)
        return res
    }catch(err){
        if(err) throw err
    }
}