import path from "path";

class fileController {
  async download(req, res) {
    const { fn } = req.params;
    const filePath = path.join("files", fn);
    res.download(filePath, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
      }
    });
  }
}

export default new fileController();
