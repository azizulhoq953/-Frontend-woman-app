import React, { useState } from "react";
import CreatePost from "./CreatePost";
import FetchPosts from "./FetchPosts";

function App() {
  const [newPost, setNewPost] = useState(null);

  const handlePostCreated = (post) => {
    setNewPost(post);
  };

  return (
    <div>
      <CreatePost onPostCreated={handlePostCreated} />
      <FetchPosts />
    </div>
  );
}

export default App;
