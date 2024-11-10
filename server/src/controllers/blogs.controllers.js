import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// create blog
async function createBlog(req, res) {
  try {
    const { title, synopsis, body, featuredImage } = req.body;
    const userId = req.userId;
    console.log(userId);
    const newBlog = await prisma.blog.create({
      data: {
        title,
        synopsis,
        body,
        featuredImage,
        writer: userId,
      },
    });
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// fetching all
async function getAllBlogs(_req, res) {
  try {
    const allBlogs = await prisma.blog.findMany({
      include: {
        user: true,
      },
    });

    if (!allBlogs) {
      res.status(404).json({ message: "No blogs found" });
      return;
    }

    res.status(200).json(allBlogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
}

//fetching single blog using id
async function getSingleBlog(req, res) {
  try {
    const { id } = req.params;
    const blog = await prisma.blog.findUnique({
      where: {
        id: id,
      },
    });
    if (!blog) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//fetching all blogs of a  single writer
async function getWriterBlogs(req, res) {
  const writerId = req.userId;

  try {
    const writerBlogs = await prisma.blog.findMany({
      where: {
        writer: writerId,
      },
      include: {
        user: true,
      },
    });

    res.status(200).json({ data: writerBlogs });
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
}

//delete blog

async function deleteBlogById(req, res) {
  const { id } = req.params;
  const writerId = req.userId;
  try {
    const deletedBlog = await prisma.blog.delete({
      where: {
        id: id,
        writer: writerId,
      },
    });
    res.status(200).json({ message: "Blog deleted successfully", deletedBlog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// update blog

async function updateBlog(req, res) {
  const { id } = req.params;
  const { title, synopsis, body, featuredImage } = req.body;
  const writerId = req.userId;
  try {
    const updatedBlog = await prisma.blog.update({
      where: {
        id: id,
        writer: writerId,
      },
      data: {
        title,
        synopsis,
        body,
        featuredImage,
      },
    });
    res.status(200).json({ message: "Blog updated successfully", updatedBlog });
  } catch (error) {
    res.status(500).json({ message: "something went wrong! please try again" });
  }
}

export {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  getWriterBlogs,
  deleteBlogById,
  updateBlog,
};
