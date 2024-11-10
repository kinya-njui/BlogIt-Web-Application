import React, { useState, useEffect } from "react";
import { Editor } from "primereact/editor";
import { useMutation, useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import apiUrl from "../../utils/apiUrl.js";
import imageUploadToCloudinary from "../../utils/imageUpload/imageUploadToCloudinary.js";
import { Toaster, toast } from "sonner";

function UpdateBlog() {
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [body, setBody] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");

  const Navigate = useNavigate();

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

    onSuccess: (data) => {
      setTitle(data.title);
      setSynopsis(data.synopsis);
      setBody(data.body);
      setFeaturedImage(data.featuredImage);
    },
  });

  const { mutate, isLoading: isUpdating } = useMutation({
    mutationFn: async (updatedBlog) => {
      const response = await fetch(`${apiUrl}/blog/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBlog),
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
      toast.success("Blog updated successfully", {
        duration: 3000,
      });

      setTimeout(() => {
        Navigate("/writer-feed");
      }, 3000);
    },
    onError: (error) => {
      toast.error(error.message, {
        duration: 3000,
      });
    },
  });

  const handleImageUpload = async (files) => {
    if (files && files[0]) {
      const url = await imageUploadToCloudinary(files[0]);
      console.log("image url", url);
      if (url) {
        setFeaturedImage(url);
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBlog = {
      title,
      synopsis,
      body,
      featuredImage,
    };
    console.log("data that is being posted", newBlog);
    mutate(newBlog);
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <Toaster position="top-center" richColors />
      <h1 className="my-7 text-center text-blue-800 text-4xl font-semibold ">
        Create New Blog
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label>Featured Image (required)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files)}
          />
        </div>
        <div className="mb-4">
          <label>Title (required)</label>
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Title here"
            maxLength="150"
            className="w-full p-2 border rounded"
          />
          <p>{title.length}/100</p>
        </div>
        <div className="mb-4">
          <label>Synopsis (required)</label>
          <textarea
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
            placeholder="Enter Synopsis here"
            maxLength="300"
            className="w-full p-2 border rounded"
          />
          <p>{synopsis.length}/300</p>
        </div>
        <div className="mb-4">
          <label>Body (required)</label>
          <Editor
            style={{ height: "320px" }}
            value={body}
            onTextChange={(e) => setBody(e.htmlValue)}
          />
          <p>{body.length}/1000</p>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full bg-blue-800 text-white px-4 py-2 rounded text-2xl font-semibold disabled:bg-blue-500"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Please wait..." : "Publish"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateBlog;
