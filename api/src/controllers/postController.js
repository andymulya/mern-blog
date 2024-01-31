import Blog from "../models/Blog.js"
import User from "../models/User.js"
import { errorCustomHandler } from "../utils/index.js"


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

export const searchBlogs = async (req, res, next) => {
    const { tag, query, userId, page } = req.body
    let findQuery = {}
    let maxLimit = 5
    
    if(tag){
        findQuery = { draft: false, tags: tag }
    }else if(query){
        findQuery = { draft: false, title: new RegExp(query, 'i') }
    }else if(userId){
        findQuery = { draft: false, author: userId }
    }

    try{

        const blogs = await Blog.find(findQuery)
        .select("blogSlug title banner desc tags activity createdAt -_id")
        .populate("author", "personalInfo.fullName personalInfo.username personalInfo.profileImg -_id")
        .skip((page - 1) * maxLimit)
        .sort({ createdAt: -1 })
        .limit(maxLimit)


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

export const getAllBlogsCount = async (req, res, next) => {
    const { tag, userId, query } = req.body
    let findQuery = {}
    let blogCount = null

    if(tag){
        findQuery = { draft: false, tags: tag }
    }else if(query){
        findQuery = { draft: false, title: new RegExp(query, 'i') }
    }else if(userId){
        findQuery = { draft: false, author: userId }
    }else{
        findQuery = { draft: false }
    }

    try{
        blogCount = await Blog.countDocuments(findQuery)
        
        res.status(200).json({
            success: true,
            message: "Success",
            totalBlogs: blogCount
        })
    }catch(err){
        next(err)
    }
}

export const getBlog = async (req, res, next) => {
    const { slug } = req.body

    try{
        const updateTotalReads = await Blog.findOneAndUpdate({ blogSlug: slug }, { $inc: { "activity.totalReads": 1 } })
        
        if(!blog) return next(errorCustomHandler(404, "Blog not found"))
        
        const blog = await Blog.findOne({ blogSlug: updateTotalReads.blogSlug })
        .select("-_id -draft -comments -updatedAt")
        .populate("author", "personalInfo.fullName personalInfo.username personalInfo.profileImg")
        
        
        res.status(200).json({
            success: true,
            message: "Success",
            blog
        })
    }catch(err){
        next(err)
    }
}