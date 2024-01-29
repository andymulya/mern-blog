import Blog from "../models/Blog.js"
import User from "../models/User.js"


export const createPost = async (req, res, next) => {
    const { blogSlug, title, banner, desc, body, tags, author, draft } = req.post
    
    try{
        const blog = await Blog.create({
            blogSlug,
            title,
            banner,
            desc,
            body,
            tags,
            author,
            draft
        })
    
        await User.findOneAndUpdate({ _id: author }, { $inc: { "accountInfo.totalPost": (!draft) && 1 }, $push: { "blogs": blog._id } })
        
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

export const getLatestBlog = async (req, res, next) => {
    const { page } = req.body
    let maxLimit = 5

    try{
        const blogs = await Blog.find({ draft: false })
        .select("blogSlug title banner desc tags activity createdAt -_id")
        .populate("author", "personalInfo.fullName personalInfo.username personalInfo.profileImg -_id")
        .skip((page - 1) * maxLimit)
        .sort({ createdAt: -1 })
        .limit(maxLimit)

        if(!blogs) return next()
    
        res.status(200).json({
            success: true,
            message: "Success",
            blogs,
            page
        })
    }catch(err){
        next(err)
    }
}

export const getTrendingBlogs = async (req, res, next) => {

    try{
        const blogs = await Blog.find({ draft: false })
        .select("blogSlug title createdAt -_id")
        .populate("author", "personalInfo.fullName personalInfo.username personalInfo.profileImg -_id")
        .sort({"activity.totalRead": -1, "activity.totalLike": -1, createdAt: -1})
        .limit(5)

        if(!blogs) return next()

        res.status(200).json({
            success: true,
            message: "Success",
            blogs
        })

    }catch(err){
        next(err)
    }
    
}

export const getBlogsByCategory = async (req, res, next) => {
    const { tag, page } = req.body
    let maxLimit = 5

    try{

        const blogs = await Blog.find({ draft: false, tags: tag })
        .select("blogSlug title banner desc tags activity createdAt -_id")
        .populate("author", "personalInfo.fullName personalInfo.username personalInfo.profileImg -_id")
        .skip((page - 1) * maxLimit)
        .sort({ createdAt: -1 })
        .limit(maxLimit)


        res.status(200).json({
            success: true,
            message: "Success",
            blogs
        })
    }catch(err){
        next(err)
    }

}

export const getAllBlogsCount = async (req, res, next) => {
    const { tag } = req.body
    let blogCount = null

    try{
        if(tag){
            blogCount = await Blog.countDocuments({ draft: false, tags: tag })

        }else{
            blogCount = await Blog.countDocuments({ draft: false })
        }
        
        res.status(200).json({
            success: true,
            message: "Success",
            totalBlogs: blogCount
        })
    }catch(err){
        next(err)
    }
}