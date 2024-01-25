import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { uploadImageFirebase } from "../services/firebase/firebaseService"
import { setDataPost } from "../redux/slices/postSlice"
import { useRef } from 'react'

const BlogBanner = () => {
    const bannerBlogImageRef = useRef()
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
                bannerBlogImageRef.current.src = urlImage
                toast.dismiss(loading)
                toast.success("Uploaded")
            }catch(err){
                toast.dismiss(loading)
                toast.error(err)
            }
        }
        
    }
    

    return (
        <>
            <div className="aspect-video bg-blue-50 border-2 rounded-lg border-gray-300">
                <label htmlFor="blogBanner" className="cursor-pointer hover:opacity-70">
                    <img ref={ bannerBlogImageRef } src={(post.banner) ? post.banner : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjL9QNQqvqc71i44cblaNOKMQnqyJKcyRuqA&usqp=CAU"} alt="Blog Banner" className="w-full h-full object-contain"/>
                    <input autoFocus id="blogBanner" type="file" accept=".png, .jpg .jpeg" hidden onChange={ handlePhotoBanner } />
                </label>
            </div>
        </>
    )
}

export default BlogBanner