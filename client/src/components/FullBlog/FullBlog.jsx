import React from "react";
import "./FullBlog.css";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import apiUrl from "../../utils/apiUrl";
function FullBlog() {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["fullBlog", id],
    queryFn: async () => {
      const response = await fetch(`${apiUrl}/blog/${id}`, {
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

  if (isLoading) {
    return <div>Loading please wait!........</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }

  console.log(data);

  return (
    <div className="full-blog-container">
      <h1>{data.title}</h1>
      <div>
        <img src={data.featuredImage} alt="blog image" />
      </div>
      <h2>{data.synopsis}</h2>
      <p dangerouslySetInnerHTML={{ __html: data.body }}></p>
    </div>
  );
}

export default FullBlog;
