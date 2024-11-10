import React from "react";
import "./Landing.css";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <section className="hero-section">
      <h2 className="hero-title">Unleash Your Voice, Inspire the World</h2>
      <Link to="/login" className="login-link">
        Start Writing
      </Link>
      <Link to="/blogs" className="blogs-link">
        Explore Blogs
      </Link>
      <p className="hero-title-text">
        BlogIt is more than a platform—it's a space where every voice finds its
        place. Share your thoughts, inspire minds, and connect with readers
        across the world who are eager to hear your story. Whether you're here
        to share personal experiences, teach valuable insights, or discover new
        perspectives, BlogIt welcomes you into a vibrant community of
        storytellers and avid readers, ready to explore a world of ideas
        together. Join us and be part of something bigger—where words create
        change, and stories unite us all.
      </p>
    </section>
  );
}

export default Landing;
