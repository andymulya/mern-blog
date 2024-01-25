import Blog from "../models/Blog.js"
import User from "../models/User.js"


export const createPost = async (req, res, next) => {
    const { blogSlug, title, banner, desc, body, tags, draft } = req.post
    const authorId = req.userId


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