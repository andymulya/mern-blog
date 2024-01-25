import mongoose, { Schema } from "mongoose"

const blogSchema = mongoose.Schema({

    blogSlug: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    banner: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        maxlength: 200,
        required: true
    },
    body: {
        type: [],
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    activity: {
        totalLikes: {
            type: Number,
            default: 0
        },
        totalComments: {
            type: Number,
            default: 0
        },
        totalReads: {
            type: Number,
            default: 0
        },
        totalParentComments: {
            type: Number,
            default: 0
        },
    },
    comments: {
        type: [Schema.Types.ObjectId],
        ref: 'comments'
    },
    draft: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

const Blog = mongoose.model("Blogs", blogSchema)

export default Blog