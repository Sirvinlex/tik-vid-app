import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    caption: String,
    topic: String,
    creator: String,
    creatorName: String,
    selectedFile: String,
    likes: {
        type: [String],
        default: [],
    },
    comments: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const PostVideo = mongoose.model('PostVideo', postSchema);

export default PostVideo;