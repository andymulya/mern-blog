import { useState } from "react"
import { useSelector } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import app from "../services/firebase/firebaseConfig"

const BlogBanner = () => {
    const [banner, setBanner] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjL9QNQqvqc71i44cblaNOKMQnqyJKcyRuqA&usqp=CAU")
    const { user } = useSelector((state) => state.user) 

    const handlePhotoBanner = async (e) => {
        const img = e.target.files[0]

        try{
            if(img){
                toast.loading('Uploading ...')
                const storage = getStorage(app)
                const generateFilename = `${new Date().getTime()} - ${user.username}`
                
                const metadata = {
                    contentType: img.type
                }
    
                const storageRef = ref(storage, `${user.username}/images/post/banner` + generateFilename)
                const upload = uploadBytesResumable(storageRef, img, metadata)
                
                upload.on("state_changed", (snapshot) => {
                    
                    switch(snapshot.state){
                        case "paused":
                            console.log('Upload is paused')
                            break
                        case "running":
                            console.log(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100))
                            break
                    }
                },
                (error) => {
                    toast.dismiss()
                    toast.error(error.message)
                }, 
                () => {
                    getDownloadURL(upload.snapshot.ref).then((downloadURL) => {
                        setBanner(downloadURL)
                        toast.dismiss()
                        toast.success("Success")
                    })
                })
            }
        }catch(err){
            toast.dismiss()
            toast.error(err)
        }
    }

    return (
        <>
            <Toaster toastOptions={{
                success: {
                    className: "bg-green-100 border border-green-500 font-bold",
                    position: "bottom-right"
                },
                error: {
                    className: "bg-red-100 border border-red-500 font-bold",
                    position: "bottom-right"
                }
            }} />

            <div className="aspect-video bg-blue-50 border-2 rounded-lg border-gray-300">
                <label htmlFor="blogBanner" className="cursor-pointer hover:opacity-70">
                    <img src={ banner } alt="Blog Banner" className="w-full h-full object-contain"/>
                    <input id="blogBanner" type="file" accept=".png, .jpg .jpeg" hidden onChange={ handlePhotoBanner } />
                </label>
            </div>
        </>
    )
}

export default BlogBanner