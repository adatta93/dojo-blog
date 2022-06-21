import React from "react";
import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, isLoading, error } = useFetch(
    "http://localhost:4000/blogs/" + id
  );
  const history = useHistory();

  const handleClick = () => {
    fetch("http://localhost:4000/blogs/" + blog.id, {
      method: "DELETE",
    }).then((res) => {
      history.push("/");
    });
  };

  return (
    <div className="blog-details">
      {isLoading && <span>Loading Blog...</span>}
      {error && <span>{error}</span>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>
          <button onClick={handleClick}>Delete</button>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
