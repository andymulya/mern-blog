import { createReactEditorJS } from "react-editor-js"
import PropTypes from 'prop-types'
import Image from "@editorjs/image"
import { useSelector } from "react-redux"
import { toolsEditor } from "../utils"
import { uploadImageFirebase } from "../services/firebase/firebaseService"



const BlogBody = ({ handleInitialize }) => {
    const ReactEditorJs = createReactEditorJS()
    const { user } = useSelector((state) => state.user)
    
    const uploadImageByUrl = async (img) => {
        const urlImage = new Promise((resolve, reject) => {
            try{
                resolve(img)
            }catch(err){
                reject(err)
            }
        })
    
        return await urlImage.then((url) => ({
            success: 1,
            file: { url }
        }))
    }
    

    const uploadImageByFile = async (img) => {
        
        try{
            if(img){
                const url = await uploadImageFirebase(img, `${ user.username }/images/blog/content/`, user.username)
                return {
                    success: 1,
                    file: { url }
                }
            }
        }catch(err){
            if(err) throw err
        }
    }

    return (
        <ReactEditorJs onInitialize={ handleInitialize } holder="textEditor" tools={{ 
            image: {
                class: Image,
                config: {
                    uploader: {
                        uploadByUrl: uploadImageByUrl,
                        uploadByFile: uploadImageByFile
                    }
                }
            }, ...toolsEditor 
        }} placeholder="Let's write an awesome content" >

            <div id="textEditor" />

        </ReactEditorJs>
    )
}

BlogBody.propTypes = {
    handleInitialize: PropTypes.func
}

export default BlogBody