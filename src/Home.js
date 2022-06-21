import React from "react";
import BlogList from "./Bloglist";
import useFetch from "./useFetch";

const Home = () => {
  const { data: blogs, isLoading, error } = useFetch(
    "http://localhost:4000/blogs"
  );

  return (
    <div className="home">
      {isLoading && <span>Loading...</span>}
      {error && <span>{error}</span>}
      {blogs && <BlogList blogs={blogs} title="All Blogs" />}
    </div>
  );
};

export default Home;
