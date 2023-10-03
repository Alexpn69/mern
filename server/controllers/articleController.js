import Article from "../models/article.js";

class articleController {
  async getAllArticles(req, res, next) {
    try {
      const records = await Article.find();
      if (!records) {
        return res.status(404).send({ error: "No results found" });
      }
      return res.status(200).json(records);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  }

  async getArticle(req, res) {
    const { title } = req.params;
    try {
      const article = await Article.findOne({ title });
      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }
      return res.status(200).json(article);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  }

  async createArticle(req, res) {
    try {
      const { title, content } = req.body;
      if (!title || !content) {
        return res.status(400).json({ error: "Title&Content are required" });
      }

      let articleData = {
        title,
        content,
      };
      if (req.file) {
        const { path } = req.file;
        articleData.file = {
          contentType: req.file.mimetype,
          filename: path.slice(13),
          path,
        };
      }
      const article = await Article.create(articleData);
      res.status(201).json(article);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
}
export default new articleController();
