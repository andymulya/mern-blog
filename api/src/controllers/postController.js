import Blog from "../models/Blog.js"
import User from "../models/User.js"


export const createPost = async (req, res, next) => {
    const { blogSlug, title, banner, desc, body, tags, draft } = req.post
    const authorId = req.userId

    // if(!banner) return next(errorCustomHandler(403, "You must provide a banner to publish the blog"))
    // if(!title) return next(errorCustomHandler(403, "You must provide a title to publish the blog"))
    // if(!desc || desc > 200) return next(errorCustomHandler(403, "You must provide a description and under 200 characters to publish the blog"))
    // if(!tags.length || tags.length > 10) return next(errorCustomHandler(403, "You must provide tags and max 10 tags to publish the blog"))
    // if(!body.length) return next(errorCustomHandler(403, "There must be some blog content to publish it"))
    
    // const newTags = tags.map((tag) => tag.toLowerCase())
    // const blogSlug = createSlug(title)

    try{
        const blog = await Blog.create({
            blogSlug,
            title,
            banner,
            desc,
            body,
            tags,
            author: authorId,
            draft: Boolean(draft)
        })
    
        await User.findOneAndUpdate({ _id: authorId }, { $inc: { "accountInfo.totalPost": (!draft) && 1 }, $push: { "blogs": blog._id } })
        
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: "Created is succesfully",
            data:{
                slug: blog.blogSlug
            }
        })
    }catch(err){
        next(err)
    }
}