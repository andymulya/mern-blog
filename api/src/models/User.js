import mongoose, { Schema } from 'mongoose'

const userSchema = mongoose.Schema({
    personalInfo : {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        username: {
            type: String,
            required: true,
            minlength: [6 , "Username must be 6 letters long"],
            lowercase: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        profileImg: {
            type: String,
            default: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
        },
        bio: {
            type: String,
            maxlength: [300, "Bio should not be more than 300"],
            default: ""
        }
    },
    socialLinks: {
        youtube: {
            type: String,
            default: "",
        },
        instagram: {
            type: String,
            default: "",
        },
        facebook: {
            type: String,
            default: "",
        },
        twitter: {
            type: String,
            default: "",
        },
        github: {
            type: String,
            default: "",
        },
        website: {
            type: String,
            default: "",
        }
    },
    accountInfo: {
        totalPost: {
            type: Number,
            default: 0
        },
        totalReads: {
            type: Number,
            default: 0
        }
    },
    googleAuth: {
        type: Boolean,
        default: false
    },
    blogs: {
        type: [ Schema.Types.ObjectId ],
        ref: "Blogs",
        default: [],
    }
}, { timestamps: true })

const User = mongoose.model("Users", userSchema)

export default User