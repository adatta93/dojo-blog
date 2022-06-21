import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("mario");
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    let blog = { title, body, author };
    console.log(blog);
    fetch("http://localhost:4000/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    }).then((res) => {
      setIsPending(false);
      history.push("/");
    });
  };

  return (
    <div className="create-blog">
      <h2>Create New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog Title</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog Body</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}></textarea>
        <label>Blog Body</label>
        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          <option value="mario">Mario</option>
          <option value="luigi">Luigi</option>
        </select>
        {isPending ? (
          <button disabled>adding blog</button>
        ) : (
          <button>Add Blog</button>
        )}
      </form>
    </div>
  );
};

export default CreateBlog;
