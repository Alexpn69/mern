import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  file: {
    contentType: String,
    filename: String,
    path: String,
  },
});

const Article = mongoose.model("Article", articleSchema);
export default Article;
