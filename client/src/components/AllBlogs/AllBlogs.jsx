import React from "react";
import "./AllBlogs.css";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import apiUrl from "../../utils/apiUrl";

function BlogCard({
  id,
  profileImage,
  username,
  blogTitle,
  blogSynopsis,
  blogBody,
  blogImage,
  timestamp,
}) {
  const navigate = useNavigate();

  const handleRedirectToFullBlog = () => {
    if (!id) {
      return;
    }
    navigate(`/full-blog/${id}`);
  };
  return (
    <div className="blog-card">
      <div className="blog-header">
        <img
          src={profileImage}
          alt={`${username}'s profile`}
          className="profile-image"
        />
        <div className="user-info">
          <h4 className="username">{username}</h4>
          <p className="timestamp">{timestamp}</p>
        </div>
      </div>
      <div className="blog-body">
        <div className="blog-content">
          <h2 className="blog-title">{blogTitle}</h2>
          <p className="blog-excerpt">{blogSynopsis}</p>
          <p
            className="blog-body"
            dangerouslySetInnerHTML={{ __html: blogBody }}
          ></p>
          <button
            className="read-more-button"
            onClick={handleRedirectToFullBlog}
          >
            Read More
          </button>
        </div>
        <img src={blogImage} alt={blogTitle} className="blog-image" />
      </div>
    </div>
  );
}

function AllBlogs() {
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["allBlogs"],
    queryFn: async () => {
      const response = await fetch(`${apiUrl}/all-blogs`, {
        credentials: "include",
      });

      console.log("response", response);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json();
      console.log("data", data);
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading please wait!........</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      {data.map((blog) => (
        <BlogCard
          key={blog.id}
          id={blog.id}
          profileImage={blog.profileImage}
          username={`${blog.user.firstName} ${blog.user.lastName}`}
          blogTitle={blog.title}
          blogSynopsis={blog.synopsis}
          blogBody={blog.body}
          blogImage={blog.featuredImage}
          timestamp={`created at ${blog.createdAt}  updated at ${blog.updatedAt}`}
        />
      ))}
    </div>
  );
}

export default AllBlogs;
