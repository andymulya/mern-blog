import { useDispatch, useSelector } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast'
import { uploadImageFirebase } from "../services/firebase/firebaseService"
import { setDataPost } from "../redux/slices/postSlice"

const BlogBanner = () => {
    const post = useSelector((state) => state.post)
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.user) 


    const handlePhotoBanner = async (e) => {
        const img = e.target.files[0]
        
        if(img){
            const loading = toast.loading("Upload ...")
            
            try{
                const urlImage = await uploadImageFirebase(img, `${ user.username }/images/blog/banner/`, user.username)
                dispatch(setDataPost({ ...post, banner: urlImage }))
                toast.dismiss(loading)
                toast.success("Success")
            }catch(err){
                toast.dismiss(loading)
                toast.error(err)
            }
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
                    <img src={ (post.banner) ? post.banner : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjL9QNQqvqc71i44cblaNOKMQnqyJKcyRuqA&usqp=CAU" } alt="Blog Banner" className="w-full h-full object-contain"/>
                    <input id="blogBanner" type="file" accept=".png, .jpg .jpeg" hidden onChange={ handlePhotoBanner } />
                </label>
            </div>
        </>
    )
}

export default BlogBanner