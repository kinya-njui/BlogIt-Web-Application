import React from "react";
import "./Feed.css";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { useNavigate, Link } from "react-router-dom";
import apiUrl from "../../utils/apiUrl";
import { Toaster, toast } from "sonner";

function Feed() {
  const client = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["writerFeed"],
    queryFn: async () => {
      const response = await fetch(`${apiUrl}/blogs/writer`, {
        credentials: "include",
      });

      if (response.ok === false) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json();
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const response = await fetch(`${apiUrl}/blog/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok === false) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      return data;
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["writerFeed"] });
      toast.success("Blog deleted successfully", {
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error(error.message, {
        duration: 3000,
      });
    },
  });

  const handleUpdateBlogRedirect = (id) => {
    if (!id) {
      return;
    }
    navigate(`/update-blog/${id}`);
  };

  if (isLoading) {
    return <div>Loading please wait!........</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }

  if (data && data.data.length === 0) {
    return (
      <>
        <div>No blog found for this writer</div>
        <Link to="/write">Create new blog</Link>
      </>
    );
  }

  return (
    <div>
      {data.data.map((blog) => (
        <div key={blog.id} className="feed-card">
          <Toaster position="top-center" richColors />
          <h2>{blog.title}</h2>
          <p>{blog.synopsis}</p>
          <div className="writer-details">
            <div className="author-info">
              <p>{blog.user.username}</p>
              <p>Posted on {blog.createdAt}</p>
            </div>
            <div className="cta-buttons">
              <button onClick={() => handleUpdateBlogRedirect(blog.id)}>
                update
              </button>
              <button onClick={() => deleteMutation.mutate(blog.id)}>
                delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default Feed;
