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
            message: "Created is succesfully"
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
        .sort({"activity.totalReads": -1, "activity.totalLikes": -1, createdAt: -1})
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
    const { tag, query, userId, page, eleminateBlog, limit } = req.body
    let findQuery = {}
    let maxLimit = limit || 5
    
    if(tag){
        findQuery = { draft: false, tags: tag, blogSlug: { $ne: eleminateBlog  } }
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
    const { slug, mode } = req.body

    try{
        const blog = await Blog.findOne({ blogSlug: slug })
        .select("-_id -draft -comments -updatedAt")
        .populate("author", "personalInfo.fullName personalInfo.username personalInfo.profileImg")
        
        if(!blog) return next(errorCustomHandler(404, "Blog not found"))
        
        if(mode !== "edit"){
            await Blog.findOneAndUpdate({ blogSlug: blog.blogSlug }, { $inc: { "activity.totalReads": 1 } })
            await User.findOneAndUpdate({ "personalInfo.username": blog.author.personalInfo.username }, { $inc: { "accountInfo.totalReads": 1 } })
        }
        
        res.status(200).json({
            success: true,
            message: "Success",
            blog
        })
    }catch(err){
        next(err)
    }
}

export const updateBlog = async (req, res, next) => {
    const { blogSlug: oldBlogSlug } = req.body
    const { blogSlug: newBlogSlug, title, banner, desc, body, tags, author, draft } = req.post

    try{
        await Blog.findOneAndUpdate({ blogSlug: oldBlogSlug }, { blogSlug: newBlogSlug, title, banner, desc, body, tags })

        res.status(200).json({
            success: true,
            message: "Update success"
        })
    }catch(err){
        next(err)
    }
}

export const likeBlog = async (req, res ,next) => {
    const userId = req.userId
    const { slug, totalLikesState } = req.body

    const findUserBlog = await Blog.findOne({ blogSlug: slug, author: userId})

    try{
        if(!findUserBlog){
            await Blog.findOneAndUpdate({ blogSlug: slug }, { "activity.totalLikes": totalLikesState })
            
            res.status(200).json({
                success: true,
                message: "Like success"
            })
        }else{
            next(errorCustomHandler(403, "You can't like your own blog"))
        }
    }catch(err){
        next(err)
    }
    
}