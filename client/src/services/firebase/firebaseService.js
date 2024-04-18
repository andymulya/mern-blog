import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "./firebaseConfig"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from "./firebaseConfig"
import { generateFileName } from "../../utils"


export const googleAuth = async () => {
    
    try{
        const provider = new GoogleAuthProvider()
        const res = await signInWithPopup(auth, provider)
        return res
    }catch(err){
        if(err) return err
    }
}

export const uploadImageFirebase = async (img, pathname, name) => {
    const res = new Promise((resolve, reject) => {
                        
        try{
            if(img){
                const storageRef = ref(storage, pathname + generateFileName(name))
                const upload = uploadBytesResumable(storageRef, img)

                upload.on("state_changed", () => {}, (err) => {
                    if(err) upload.cancel()
                }, 
                async () => {
                    getDownloadURL(upload.snapshot.ref).then((url) => resolve(url))
                })
            }
        }catch(err){
            reject(err)
        }
    })

    return res.then((url) => url)
}