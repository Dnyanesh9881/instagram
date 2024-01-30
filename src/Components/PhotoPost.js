import React from "react";

const PhotoPost = ({ post, onDelete }) => {

  


 

  return (
    <div className="photo-post">
      <img
        style={{ width: "300px", height: "400px", objectFit: "contain" }}
        src={post.image}
        alt="postimage"
      />
      <p>{post.text}</p>
      <button onClick={()=>onDelete(post._id)}> delete </button>
    </div>
  );
};

export default PhotoPost;
