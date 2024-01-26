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
    },
    desc: {
        type: String,
        maxlength: 200,
    },
    body: {
        type: [],
    },
    tags: {
        type: [String],
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
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