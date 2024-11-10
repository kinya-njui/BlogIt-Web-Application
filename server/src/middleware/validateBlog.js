function ValidateBlog(req, res, next) {
  const { title, synopsis, body, featuredImage } = req.body;
  if (!title) {
    res.status(400).json({ message: "Title is required" });
    return;
  }
  if (!synopsis) {
    res.status(400).json({ message: "Synopsis is required" });
    return;
  }
  if (!body) {
    res.status(400).json({ message: "Body is required" });
    return;
  }

  if (!featuredImage) {
    res.status(400).json({ message: "Featured image is required" });
    return;
  }
  next();
}
export default ValidateBlog;
